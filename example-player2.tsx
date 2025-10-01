import React, { useRef, useState, useEffect, useCallback } from 'react';

// ============================================================================
// TYPES
// ============================================================================

interface RadioPlayerProps {
  streamUrl: string;
  title?: string;
  station?: string;
  artwork?: string;
  autoPlay?: boolean;
  showVisualizer?: boolean;
  showEqualizer?: boolean;
  onPlay?: () => void;
  onPause?: () => void;
  onError?: (error: string) => void;
}

interface AudioState {
  isPlaying: boolean;
  isLoading: boolean;
  volume: number;
  isMuted: boolean;
  error: string | null;
  hasInteracted: boolean;
}

interface EQBand {
  frequency: number;
  gain: number;
  type: BiquadFilterType;
  label: string;
}

// ============================================================================
// CUSTOM HOOK - Audio Player with Web Audio API
// ============================================================================

function useRadioPlayer(streamUrl: string, autoPlay: boolean = false) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceNodeRef = useRef<MediaElementAudioSourceNode | null>(null);
  const filtersRef = useRef<BiquadFilterNode[]>([]);
  const gainNodeRef = useRef<GainNode | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout>();
  const animationFrameRef = useRef<number>();

  const [state, setState] = useState<AudioState>({
    isPlaying: false,
    isLoading: false,
    volume: 0.8,
    isMuted: false,
    error: null,
    hasInteracted: false,
  });

  // EQ bands configuration (5-band equalizer)
  const [eqBands] = useState<EQBand[]>([
    { frequency: 60, gain: 0, type: 'lowshelf', label: '60Hz' },
    { frequency: 250, gain: 0, type: 'peaking', label: '250Hz' },
    { frequency: 1000, gain: 0, type: 'peaking', label: '1kHz' },
    { frequency: 4000, gain: 0, type: 'peaking', label: '4kHz' },
    { frequency: 12000, gain: 0, type: 'highshelf', label: '12kHz' },
  ]);

  // Initialize Web Audio API
  const initializeAudioContext = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || audioContextRef.current) return;

    try {
      // Create audio context
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      audioContextRef.current = audioContext;

      // Create source node
      const source = audioContext.createMediaElementSource(audio);
      sourceNodeRef.current = source;

      // Create analyser for visualizer
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      analyser.smoothingTimeConstant = 0.8;
      analyserRef.current = analyser;

      // Create gain node for volume control
      const gainNode = audioContext.createGain();
      gainNode.gain.value = state.volume;
      gainNodeRef.current = gainNode;

      // Create EQ filters
      const filters = eqBands.map((band) => {
        const filter = audioContext.createBiquadFilter();
        filter.type = band.type;
        filter.frequency.value = band.frequency;
        filter.gain.value = band.gain;
        if (band.type === 'peaking') {
          filter.Q.value = 1;
        }
        return filter;
      });
      filtersRef.current = filters;

      // Connect audio graph: source -> filters -> analyser -> gain -> destination
      let previousNode: AudioNode = source;
      filters.forEach((filter) => {
        previousNode.connect(filter);
        previousNode = filter;
      });
      previousNode.connect(analyser);
      analyser.connect(gainNode);
      gainNode.connect(audioContext.destination);

    } catch (err) {
      console.error('Failed to initialize Web Audio API:', err);
    }
  }, [eqBands]);

  // Initialize audio and cleanup
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = state.volume;

    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
      audio.pause();
      audio.src = '';
    };
  }, []);

  // Auto-play handler
  useEffect(() => {
    if (autoPlay && state.hasInteracted) {
      play();
    }
  }, [autoPlay, state.hasInteracted]);

  const play = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    // Initialize audio context on first interaction
    if (!audioContextRef.current) {
      initializeAudioContext();
    }

    // Resume audio context if suspended
    if (audioContextRef.current?.state === 'suspended') {
      await audioContextRef.current.resume();
    }

    try {
      setState(prev => ({ ...prev, isLoading: true, error: null, hasInteracted: true }));
      await audio.play();
      setState(prev => ({ ...prev, isPlaying: true, isLoading: false }));
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to play stream';
      setState(prev => ({ ...prev, error: errorMsg, isLoading: false, isPlaying: false }));
      
      if (errorMsg.includes('network') || errorMsg.includes('NETWORK')) {
        attemptReconnect();
      }
    }
  };

  const pause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.pause();
    setState(prev => ({ ...prev, isPlaying: false }));
  };

  const toggle = () => {
    if (state.isPlaying) {
      pause();
    } else {
      play();
    }
  };

  const setVolume = (newVolume: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    const clampedVolume = Math.max(0, Math.min(1, newVolume));
    audio.volume = clampedVolume;
    
    // Update Web Audio API gain node if available
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = clampedVolume;
    }
    
    setState(prev => ({ ...prev, volume: clampedVolume, isMuted: clampedVolume === 0 }));
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (state.isMuted) {
      const newVolume = state.volume || 0.8;
      audio.volume = newVolume;
      if (gainNodeRef.current) {
        gainNodeRef.current.gain.value = newVolume;
      }
      setState(prev => ({ ...prev, isMuted: false }));
    } else {
      audio.volume = 0;
      if (gainNodeRef.current) {
        gainNodeRef.current.gain.value = 0;
      }
      setState(prev => ({ ...prev, isMuted: true }));
    }
  };

  const setEQBandGain = (index: number, gain: number) => {
    if (filtersRef.current[index]) {
      const clampedGain = Math.max(-12, Math.min(12, gain));
      filtersRef.current[index].gain.value = clampedGain;
    }
  };

  const resetEQ = () => {
    filtersRef.current.forEach((filter) => {
      filter.gain.value = 0;
    });
  };

  const attemptReconnect = () => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
    }

    reconnectTimeoutRef.current = setTimeout(() => {
      setState(prev => ({ ...prev, error: null }));
      play();
    }, 3000);
  };

  // Audio event handlers
  const handleLoadStart = () => {
    setState(prev => ({ ...prev, isLoading: true }));
  };

  const handleCanPlay = () => {
    setState(prev => ({ ...prev, isLoading: false, error: null }));
  };

  const handleError = () => {
    setState(prev => ({
      ...prev,
      error: 'Stream error. Retrying...',
      isLoading: false,
      isPlaying: false,
    }));
    attemptReconnect();
  };

  const handleEnded = () => {
    setState(prev => ({ ...prev, isPlaying: false }));
  };

  const handleWaiting = () => {
    setState(prev => ({ ...prev, isLoading: true }));
  };

  const handlePlaying = () => {
    setState(prev => ({ ...prev, isLoading: false, isPlaying: true }));
  };

  return {
    audioRef,
    analyserRef,
    state,
    eqBands,
    actions: {
      play,
      pause,
      toggle,
      setVolume,
      toggleMute,
      setEQBandGain,
      resetEQ,
    },
    eventHandlers: {
      onLoadStart: handleLoadStart,
      onCanPlay: handleCanPlay,
      onError: handleError,
      onEnded: handleEnded,
      onWaiting: handleWaiting,
      onPlaying: handlePlaying,
    },
  };
}

// ============================================================================
// VISUALIZER COMPONENT
// ============================================================================

function AudioVisualizer({ 
  analyser, 
  isPlaying 
}: { 
  analyser: AnalyserNode | null; 
  isPlaying: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    if (!analyser || !isPlaying) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      animationFrameRef.current = requestAnimationFrame(draw);

      analyser.getByteFrequencyData(dataArray);

      ctx.fillStyle = 'rgba(15, 23, 42, 0.3)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const barWidth = (canvas.width / bufferLength) * 2.5;
      let barHeight;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        barHeight = (dataArray[i] / 255) * canvas.height * 0.8;

        const gradient = ctx.createLinearGradient(0, canvas.height - barHeight, 0, canvas.height);
        gradient.addColorStop(0, '#8b5cf6');
        gradient.addColorStop(0.5, '#3b82f6');
        gradient.addColorStop(1, '#06b6d4');

        ctx.fillStyle = gradient;
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);

        x += barWidth + 1;
      }
    };

    draw();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [analyser, isPlaying]);

  return (
    <canvas
      ref={canvasRef}
      width={600}
      height={120}
      className="w-full h-full rounded-lg"
    />
  );
}

// ============================================================================
// EQUALIZER COMPONENT
// ============================================================================

function Equalizer({
  bands,
  onBandChange,
  onReset,
}: {
  bands: EQBand[];
  onBandChange: (index: number, gain: number) => void;
  onReset: () => void;
}) {
  const [gains, setGains] = useState<number[]>(bands.map(b => b.gain));

  const handleChange = (index: number, value: number) => {
    const newGains = [...gains];
    newGains[index] = value;
    setGains(newGains);
    onBandChange(index, value);
  };

  const handleReset = () => {
    setGains(bands.map(() => 0));
    onReset();
  };

  return (
    <div className="bg-white/5 rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-semibold">Equalizer</h3>
        <button
          onClick={handleReset}
          className="text-blue-300 hover:text-blue-200 text-sm transition-colors"
        >
          Reset
        </button>
      </div>
      
      <div className="flex items-end justify-around gap-2 h-32">
        {bands.map((band, index) => (
          <div key={band.frequency} className="flex flex-col items-center gap-2 flex-1">
            <input
              type="range"
              min="-12"
              max="12"
              step="1"
              value={gains[index]}
              onChange={(e) => handleChange(index, parseFloat(e.target.value))}
              className="h-24 slider-vertical cursor-pointer"
              style={{
                writingMode: 'bt-lr',
                WebkitAppearance: 'slider-vertical',
                width: '8px',
              }}
              aria-label={`${band.label} gain`}
            />
            <div className="text-center">
              <div className="text-white text-xs font-medium">{gains[index] > 0 ? '+' : ''}{gains[index]}dB</div>
              <div className="text-blue-200 text-xs">{band.label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function RadioPlayer({
  streamUrl,
  title = 'Radio Stream',
  station = 'Live Radio',
  artwork,
  autoPlay = false,
  showVisualizer = true,
  showEqualizer = true,
  onPlay,
  onPause,
  onError,
}: RadioPlayerProps) {
  const { audioRef, analyserRef, state, eqBands, actions, eventHandlers } = useRadioPlayer(streamUrl, autoPlay);

  // Callback handlers
  useEffect(() => {
    if (state.isPlaying && onPlay) onPlay();
    if (!state.isPlaying && onPause) onPause();
  }, [state.isPlaying]);

  useEffect(() => {
    if (state.error && onError) onError(state.error);
  }, [state.error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-8">
      <div className="w-full max-w-2xl">
        {/* Audio Element - Hidden */}
        <audio
          ref={audioRef}
          src={streamUrl}
          preload="none"
          crossOrigin="anonymous"
          {...eventHandlers}
        />

        {/* Player Card */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20">
          {/* Artwork */}
          <div className="mb-6">
            <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg">
              {artwork ? (
                <img src={artwork} alt={title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <svg
                    className="w-24 h-24 text-white/50"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                    />
                  </svg>
                </div>
              )}
              
              {/* Live Indicator */}
              {state.isPlaying && (
                <div className="absolute top-4 right-4 flex items-center gap-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                  LIVE
                </div>
              )}
            </div>
          </div>

          {/* Track Info */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-white mb-1">{title}</h2>
            <p className="text-blue-200">{station}</p>
            {state.error && (
              <p className="text-red-300 text-sm mt-2">{state.error}</p>
            )}
          </div>

          {/* Visualizer */}
          {showVisualizer && (
            <div className="mb-6 h-32 bg-slate-900/50 rounded-lg overflow-hidden">
              <AudioVisualizer
                analyser={analyserRef.current}
                isPlaying={state.isPlaying}
              />
            </div>
          )}

          {/* Main Controls */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <button
              onClick={actions.toggle}
              disabled={state.isLoading}
              className="w-16 h-16 rounded-full bg-white text-purple-900 hover:bg-blue-100 disabled:bg-gray-300 disabled:text-gray-500 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 flex items-center justify-center"
              aria-label={state.isPlaying ? 'Pause' : 'Play'}
            >
              {state.isLoading ? (
                <svg className="animate-spin w-8 h-8" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : state.isPlaying ? (
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                </svg>
              ) : (
                <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>
          </div>

          {/* Volume Control */}
          <div className="flex items-center gap-3 mb-6">
            <button
              onClick={actions.toggleMute}
              className="text-white hover:text-blue-200 transition-colors"
              aria-label={state.isMuted ? 'Unmute' : 'Mute'}
            >
              {state.isMuted || state.volume === 0 ? (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                </svg>
              ) : state.volume < 0.5 ? (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7 9v6h4l5 5V4l-5 5H7z" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                </svg>
              )}
            </button>

            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={state.isMuted ? 0 : state.volume}
              onChange={(e) => actions.setVolume(parseFloat(e.target.value))}
              className="flex-1 h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-blue-400"
              aria-label="Volume"
            />

            <span className="text-white text-sm font-medium w-12 text-right">
              {Math.round((state.isMuted ? 0 : state.volume) * 100)}%
            </span>
          </div>

          {/* Equalizer */}
          {showEqualizer && (
            <Equalizer
              bands={eqBands}
              onBandChange={actions.setEQBandGain}
              onReset={actions.resetEQ}
            />
          )}
        </div>

        {/* Instructions */}
        {!state.hasInteracted && (
          <div className="mt-4 text-center">
            <p className="text-blue-200 text-sm">
              Click play to start streaming
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
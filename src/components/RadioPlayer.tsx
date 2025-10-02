'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Radio, Wifi, WifiOff, Loader2, Sliders } from 'lucide-react';

// ============================================================================
// TYPES
// ============================================================================

export interface RadioPlayerProps {
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

  const [state, setState] = useState<AudioState>({
    isPlaying: false,
    isLoading: false,
    volume: 0.7,
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      audioContextRef.current = audioContext;

      const source = audioContext.createMediaElementSource(audio);
      sourceNodeRef.current = source;

      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 512;
      analyser.smoothingTimeConstant = 0.85;
      analyserRef.current = analyser;

      const gainNode = audioContext.createGain();
      gainNode.gain.value = state.volume;
      gainNodeRef.current = gainNode;

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eqBands]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = state.volume;

    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
      audio.pause();
      audio.src = '';
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (autoPlay && state.hasInteracted) {
      play();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoPlay, state.hasInteracted]);

  const play = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!audioContextRef.current) {
      initializeAudioContext();
    }

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
    
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = clampedVolume;
    }
    
    setState(prev => ({ ...prev, volume: clampedVolume, isMuted: clampedVolume === 0 }));
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (state.isMuted) {
      const newVolume = state.volume || 0.7;
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

  const handleLoadStart = () => setState(prev => ({ ...prev, isLoading: true }));
  const handleCanPlay = () => setState(prev => ({ ...prev, isLoading: false, error: null }));
  const handleError = () => {
    const audio = audioRef.current;
    let errorMessage = 'Stream error. Retrying...';

    if (audio) {
      const error = audio.error;
      if (error) {
        switch (error.code) {
          case error.MEDIA_ERR_ABORTED:
            errorMessage = 'Playback aborted';
            break;
          case error.MEDIA_ERR_NETWORK:
            errorMessage = 'Network error. Check your connection.';
            break;
          case error.MEDIA_ERR_DECODE:
            errorMessage = 'Audio decode error. File may be corrupted.';
            break;
          case error.MEDIA_ERR_SRC_NOT_SUPPORTED:
            errorMessage = 'Audio format not supported or file not found.';
            break;
          default:
            errorMessage = error.message || 'Unknown error occurred';
        }
      }
    }

    setState(prev => ({
      ...prev,
      error: errorMessage,
      isLoading: false,
      isPlaying: false,
    }));

    // Only retry on network errors
    if (audio?.error?.code === audio?.error?.MEDIA_ERR_NETWORK) {
      attemptReconnect();
    }
  };
  const handleEnded = () => setState(prev => ({ ...prev, isPlaying: false }));
  const handleWaiting = () => setState(prev => ({ ...prev, isLoading: true }));
  const handlePlaying = () => setState(prev => ({ ...prev, isLoading: false, isPlaying: true }));

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
// VISUALIZER COMPONENT - Advanced 3D-style frequency bars
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
      // Clear canvas
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.fillStyle = 'rgba(10, 10, 15, 1)';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
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

      // Create gradient background
      const bgGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      bgGradient.addColorStop(0, 'rgba(10, 10, 15, 0.4)');
      bgGradient.addColorStop(1, 'rgba(15, 23, 42, 0.4)');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const barWidth = (canvas.width / bufferLength) * 2.5;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const barHeight = (dataArray[i] / 255) * canvas.height * 0.9;

        // Create multi-color gradient for each bar
        const gradient = ctx.createLinearGradient(0, canvas.height - barHeight, 0, canvas.height);

        // Spirit tech colors
        if (barHeight > canvas.height * 0.7) {
          gradient.addColorStop(0, '#FF1744'); // Cosmic red
          gradient.addColorStop(0.5, '#ec4899'); // Pink
          gradient.addColorStop(1, '#7F39FB'); // Cosmic purple
        } else if (barHeight > canvas.height * 0.4) {
          gradient.addColorStop(0, '#7F39FB'); // Cosmic purple
          gradient.addColorStop(0.5, '#985EFF'); // Electric violet
          gradient.addColorStop(1, '#00D4FF'); // Astral blue
        } else {
          gradient.addColorStop(0, '#00D4FF'); // Astral blue
          gradient.addColorStop(0.5, '#00FFD4'); // Quantum teal
          gradient.addColorStop(1, '#00D4FF'); // Astral blue
        }

        ctx.fillStyle = gradient;

        // Add glow effect
        ctx.shadowBlur = 15;
        ctx.shadowColor = barHeight > canvas.height * 0.5 ? '#FF1744' : '#00D4FF';

        // Draw bar with rounded top
        ctx.beginPath();
        ctx.roundRect(x, canvas.height - barHeight, barWidth - 2, barHeight, [4, 4, 0, 0]);
        ctx.fill();

        x += barWidth + 1;
      }

      // Reset shadow
      ctx.shadowBlur = 0;
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
      width={800}
      height={180}
      className="w-full h-full rounded-xl"
    />
  );
}

// ============================================================================
// EQUALIZER COMPONENT - Professional 5-band EQ
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-[#1e293b]/80 to-[#0f172a]/80 backdrop-blur-xl rounded-2xl p-6 border border-[#FF1744]/20 shadow-[0_0_30px_rgba(255,23,68,0.15)]"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Sliders className="w-5 h-5 text-[#FF1744]" />
          <h3 className="text-white font-bold text-lg">Equalizer</h3>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleReset}
          className="text-[#00D4FF] hover:text-[#00FFD4] text-sm font-semibold transition-colors px-3 py-1 rounded-lg bg-[#00D4FF]/10 hover:bg-[#00D4FF]/20"
        >
          Reset
        </motion.button>
      </div>

      <div className="flex items-end justify-around gap-4 h-40">
        {bands.map((band, index) => (
          <div key={band.frequency} className="flex flex-col items-center gap-3 flex-1">
            <div className="relative h-32 w-full flex items-center justify-center">
              <input
                type="range"
                min="-12"
                max="12"
                step="1"
                value={gains[index]}
                onChange={(e) => handleChange(index, parseFloat(e.target.value))}
                className="eq-slider h-32 cursor-pointer"
                style={{
                  writingMode: 'bt-lr',
                  WebkitAppearance: 'slider-vertical',
                  width: '12px',
                  background: `linear-gradient(to top,
                    ${gains[index] > 0 ? '#FF1744' : '#00D4FF'} 0%,
                    ${gains[index] > 0 ? '#ec4899' : '#00FFD4'} 50%,
                    ${gains[index] > 0 ? '#7F39FB' : '#7F39FB'} 100%)`,
                  borderRadius: '6px',
                  outline: 'none',
                }}
                aria-label={`${band.label} gain`}
              />
            </div>
            <div className="text-center">
              <motion.div
                className="text-white text-sm font-bold mb-1"
                animate={{
                  color: gains[index] !== 0 ? '#FF1744' : '#94a3b8',
                  scale: gains[index] !== 0 ? 1.1 : 1
                }}
              >
                {gains[index] > 0 ? '+' : ''}{gains[index]}dB
              </motion.div>
              <div className="text-[#94a3b8] text-xs font-medium">{band.label}</div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// ============================================================================
// MAIN COMPONENT - RadioPlayer
// ============================================================================

export default function RadioPlayer({
  streamUrl,
  title = 'Live Radio Stream',
  station = 'My Radio Station',
  artwork,
  autoPlay = false,
  showVisualizer = true,
  showEqualizer = true,
  onPlay,
  onPause,
  onError,
}: RadioPlayerProps) {
  const { audioRef, analyserRef, state, eqBands, actions, eventHandlers } = useRadioPlayer(streamUrl, autoPlay);
  const [showEQ, setShowEQ] = useState(false);

  useEffect(() => {
    if (state.isPlaying && onPlay) onPlay();
    if (!state.isPlaying && onPause) onPause();
  }, [state.isPlaying, onPlay, onPause]);

  useEffect(() => {
    if (state.error && onError) onError(state.error);
  }, [state.error, onError]);

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        src={streamUrl}
        preload="metadata"
        crossOrigin="anonymous"
        {...eventHandlers}
      />

      {/* Main Player Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-br from-[#1e293b]/90 to-[#0f172a]/90 backdrop-blur-2xl rounded-3xl shadow-[0_0_60px_rgba(255,23,68,0.3)] border-2 border-[#FF1744]/30 overflow-hidden"
      >
        {/* Artwork Section */}
        <div className="relative">
          <div className="relative w-full aspect-video overflow-hidden bg-gradient-to-br from-[#7F39FB] via-[#FF1744] to-[#00D4FF]">
            {artwork ? (
              <img src={artwork} alt={title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
                {/* Animated background */}
                <motion.div
                  className="absolute inset-0 opacity-30"
                  animate={{
                    background: [
                      'radial-gradient(circle at 20% 50%, #7F39FB 0%, transparent 50%)',
                      'radial-gradient(circle at 80% 50%, #FF1744 0%, transparent 50%)',
                      'radial-gradient(circle at 50% 80%, #00D4FF 0%, transparent 50%)',
                      'radial-gradient(circle at 20% 50%, #7F39FB 0%, transparent 50%)',
                    ],
                  }}
                  transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                />
                <Radio className="w-32 h-32 text-white/40 relative z-10" />
              </div>
            )}

            {/* Live Indicator */}
            <AnimatePresence>
              {state.isPlaying && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute top-6 right-6 flex items-center gap-2 bg-[#FF1744] text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg"
                >
                  <motion.span
                    className="w-3 h-3 bg-white rounded-full"
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  LIVE
                </motion.div>
              )}
            </AnimatePresence>

            {/* Connection Status */}
            <div className="absolute top-6 left-6">
              {state.error ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-2 bg-red-500/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-semibold"
                >
                  <WifiOff className="w-4 h-4" />
                  Reconnecting...
                </motion.div>
              ) : state.isLoading ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-2 bg-yellow-500/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-semibold"
                >
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Buffering...
                </motion.div>
              ) : state.isPlaying ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-2 bg-green-500/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-semibold"
                >
                  <Wifi className="w-4 h-4" />
                  Connected
                </motion.div>
              ) : null}
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-8 space-y-6">
          {/* Track Info */}
          <div className="text-center space-y-2">
            <motion.h2
              className="text-3xl font-black bg-gradient-to-r from-[#FF1744] via-[#ec4899] to-[#7F39FB] bg-clip-text text-transparent"
              animate={{ opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              {title}
            </motion.h2>
            <p className="text-[#94a3b8] text-lg font-semibold">{station}</p>
          </div>

          {/* Visualizer */}
          {showVisualizer && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="bg-[#0a0a0f] rounded-xl overflow-hidden border border-[#FF1744]/20 shadow-[0_0_20px_rgba(255,23,68,0.1)]"
            >
              <div className="h-48">
                <AudioVisualizer
                  analyser={analyserRef.current}
                  isPlaying={state.isPlaying}
                />
              </div>
            </motion.div>
          )}

          {/* Main Controls */}
          <div className="flex items-center justify-center gap-6">
            {/* Play/Pause Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={actions.toggle}
              disabled={state.isLoading}
              className="relative w-20 h-20 rounded-full bg-gradient-to-br from-[#FF1744] to-[#ec4899] text-white disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed transition-all shadow-[0_0_30px_rgba(255,23,68,0.5)] hover:shadow-[0_0_40px_rgba(255,23,68,0.7)] flex items-center justify-center group"
              aria-label={state.isPlaying ? 'Pause' : 'Play'}
            >
              <AnimatePresence mode="wait">
                {state.isLoading ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0, rotate: 0 }}
                    animate={{ opacity: 1, rotate: 360 }}
                    exit={{ opacity: 0 }}
                    transition={{ rotate: { duration: 1, repeat: Infinity, ease: 'linear' } }}
                  >
                    <Loader2 className="w-10 h-10" />
                  </motion.div>
                ) : state.isPlaying ? (
                  <motion.div
                    key="pause"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                  >
                    <Pause className="w-10 h-10" fill="currentColor" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="play"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                  >
                    <Play className="w-10 h-10 ml-1" fill="currentColor" />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Pulse effect when playing */}
              {state.isPlaying && (
                <motion.div
                  className="absolute inset-0 rounded-full bg-[#FF1744]"
                  animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
            </motion.button>

            {/* EQ Toggle Button */}
            {showEqualizer && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowEQ(!showEQ)}
                className={`p-4 rounded-xl transition-all ${
                  showEQ
                    ? 'bg-[#FF1744] text-white shadow-[0_0_20px_rgba(255,23,68,0.4)]'
                    : 'bg-[#1e293b] text-[#94a3b8] hover:text-white'
                }`}
                aria-label="Toggle Equalizer"
              >
                <Sliders className="w-6 h-6" />
              </motion.button>
            )}
          </div>

          {/* Volume Control */}
          <div className="flex items-center gap-4 px-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={actions.toggleMute}
              className="text-[#94a3b8] hover:text-[#FF1744] transition-colors"
              aria-label={state.isMuted ? 'Unmute' : 'Mute'}
            >
              {state.isMuted || state.volume === 0 ? (
                <VolumeX className="w-6 h-6" />
              ) : (
                <Volume2 className="w-6 h-6" />
              )}
            </motion.button>

            <div className="flex-1 relative group">
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={state.isMuted ? 0 : state.volume}
                onChange={(e) => actions.setVolume(parseFloat(e.target.value))}
                className="w-full h-2 bg-[#1e293b] rounded-full appearance-none cursor-pointer accent-[#FF1744] hover:accent-[#ec4899] transition-all"
                style={{
                  background: `linear-gradient(to right, #FF1744 0%, #ec4899 ${(state.isMuted ? 0 : state.volume) * 100}%, #1e293b ${(state.isMuted ? 0 : state.volume) * 100}%, #1e293b 100%)`,
                }}
                aria-label="Volume"
              />
            </div>

            <span className="text-white text-sm font-bold w-12 text-right">
              {Math.round((state.isMuted ? 0 : state.volume) * 100)}%
            </span>
          </div>

          {/* Equalizer */}
          <AnimatePresence>
            {showEQ && showEqualizer && (
              <Equalizer
                bands={eqBands}
                onBandChange={actions.setEQBandGain}
                onReset={actions.resetEQ}
              />
            )}
          </AnimatePresence>

          {/* Error Message */}
          <AnimatePresence>
            {state.error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-center text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg p-3"
              >
                {state.error}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Instructions */}
      {!state.hasInteracted && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 text-center"
        >
          <p className="text-[#94a3b8] text-sm">
            🎵 Click play to start streaming
          </p>
        </motion.div>
      )}
    </div>
  );
}


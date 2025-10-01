# 🎵 Radio Player - Usage Examples

## Quick Start Examples

### Example 1: Basic Radio Player

```tsx
import RadioPlayer from '@/components/RadioPlayer';

export default function BasicRadio() {
  return (
    <div className="min-h-screen bg-black p-8">
      <RadioPlayer
        streamUrl="https://stream.example.com/radio.mp3"
        title="Live Radio"
        station="My Station"
      />
    </div>
  );
}
```

### Example 2: With Custom Artwork

```tsx
import RadioPlayer from '@/components/RadioPlayer';

export default function RadioWithArtwork() {
  return (
    <RadioPlayer
      streamUrl="https://stream.example.com/radio.mp3"
      title="Jazz Night"
      station="Jazz FM 101.5"
      artwork="https://example.com/artwork.jpg"
      showVisualizer={true}
      showEqualizer={true}
    />
  );
}
```

### Example 3: Multiple Stations

```tsx
'use client';

import { useState } from 'react';
import RadioPlayer from '@/components/RadioPlayer';

const stations = [
  {
    id: 1,
    name: 'Jazz FM',
    url: 'https://stream.jazz.fm/live',
    artwork: '/jazz-logo.jpg',
  },
  {
    id: 2,
    name: 'Rock Radio',
    url: 'https://stream.rock.com/live',
    artwork: '/rock-logo.jpg',
  },
  {
    id: 3,
    name: 'Classical',
    url: 'https://stream.classical.com/live',
    artwork: '/classical-logo.jpg',
  },
];

export default function MultiStationPlayer() {
  const [currentStation, setCurrentStation] = useState(stations[0]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-blue-900 p-8">
      {/* Station Selector */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="flex gap-4 justify-center">
          {stations.map((station) => (
            <button
              key={station.id}
              onClick={() => setCurrentStation(station)}
              className={`px-6 py-3 rounded-lg font-bold transition-all ${
                currentStation.id === station.id
                  ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              {station.name}
            </button>
          ))}
        </div>
      </div>

      {/* Radio Player */}
      <RadioPlayer
        key={currentStation.id} // Force re-mount on station change
        streamUrl={currentStation.url}
        title={`Now Playing on ${currentStation.name}`}
        station={currentStation.name}
        artwork={currentStation.artwork}
        showVisualizer={true}
        showEqualizer={true}
      />
    </div>
  );
}
```

### Example 4: With Event Handlers

```tsx
'use client';

import { useState } from 'react';
import RadioPlayer from '@/components/RadioPlayer';

export default function RadioWithEvents() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  return (
    <div className="min-h-screen bg-black p-8">
      {/* Status Display */}
      <div className="max-w-4xl mx-auto mb-4 text-center">
        <div className="text-white text-lg mb-2">
          Status: {isPlaying ? '🎵 Playing' : '⏸️ Paused'}
        </div>
        {errors.length > 0 && (
          <div className="text-red-400 text-sm">
            Last error: {errors[errors.length - 1]}
          </div>
        )}
      </div>

      {/* Radio Player */}
      <RadioPlayer
        streamUrl="https://stream.example.com/radio.mp3"
        title="Live Stream"
        station="My Radio"
        onPlay={() => {
          setIsPlaying(true);
          console.log('Started playing');
          // Track analytics, update UI, etc.
        }}
        onPause={() => {
          setIsPlaying(false);
          console.log('Paused');
        }}
        onError={(error) => {
          setErrors((prev) => [...prev, error]);
          console.error('Player error:', error);
          // Send to error tracking service
        }}
      />
    </div>
  );
}
```

### Example 5: Embedded in Sidebar

```tsx
import RadioPlayer from '@/components/RadioPlayer';

export default function LayoutWithRadio({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar with Radio */}
      <aside className="w-96 bg-gray-900 p-4 overflow-y-auto">
        <h2 className="text-white text-xl font-bold mb-4">Radio</h2>
        <RadioPlayer
          streamUrl="https://stream.example.com/radio.mp3"
          title="Background Music"
          station="Chill Radio"
          showEqualizer={false} // Hide EQ for compact view
        />
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-800">
        {children}
      </main>
    </div>
  );
}
```

### Example 6: With Dynamic Metadata

```tsx
'use client';

import { useState, useEffect } from 'react';
import RadioPlayer from '@/components/RadioPlayer';

export default function RadioWithMetadata() {
  const [metadata, setMetadata] = useState({
    title: 'Loading...',
    artist: '',
    album: '',
  });

  useEffect(() => {
    // Poll metadata API every 10 seconds
    const fetchMetadata = async () => {
      try {
        const res = await fetch('/api/now-playing');
        const data = await res.json();
        setMetadata(data);
      } catch (error) {
        console.error('Failed to fetch metadata:', error);
      }
    };

    fetchMetadata();
    const interval = setInterval(fetchMetadata, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <RadioPlayer
      streamUrl="https://stream.example.com/radio.mp3"
      title={`${metadata.artist} - ${metadata.title}`}
      station={metadata.album || 'Live Radio'}
    />
  );
}
```

## Public Test Streams

Here are some free public radio streams you can use for testing:

### MP3 Streams

```tsx
// SomaFM - Groove Salad
streamUrl: "https://ice1.somafm.com/groovesalad-128-mp3"

// SomaFM - Drone Zone
streamUrl: "https://ice1.somafm.com/dronezone-128-mp3"

// SomaFM - Lush
streamUrl: "https://ice1.somafm.com/lush-128-mp3"

// Radio Paradise - Main Mix
streamUrl: "https://stream.radioparadise.com/mp3-128"

// KEXP 90.3 FM Seattle
streamUrl: "https://kexp-mp3-128.streamguys1.com/kexp128.mp3"
```

### Example with Real Stream

```tsx
import RadioPlayer from '@/components/RadioPlayer';

export default function RealRadio() {
  return (
    <RadioPlayer
      streamUrl="https://ice1.somafm.com/groovesalad-128-mp3"
      title="Groove Salad"
      station="SomaFM"
      showVisualizer={true}
      showEqualizer={true}
    />
  );
}
```

## API Route for Metadata (Optional)

Create `app/api/now-playing/route.ts`:

```tsx
export async function GET() {
  try {
    // Fetch from your stream's metadata endpoint
    const response = await fetch('https://your-stream.com/metadata');
    const data = await response.json();
    
    return Response.json({
      title: data.title || 'Unknown Track',
      artist: data.artist || 'Unknown Artist',
      album: data.album || '',
      artwork: data.artwork || '',
    });
  } catch (error) {
    return Response.json(
      { error: 'Failed to fetch metadata' },
      { status: 500 }
    );
  }
}
```

## Customization Examples

### Custom Colors

```tsx
// Modify the RadioPlayer component or create a wrapper
import RadioPlayer from '@/components/RadioPlayer';

export default function CustomColorRadio() {
  return (
    <div className="custom-radio-theme">
      <style jsx global>{`
        .custom-radio-theme {
          --radio-primary: #00ff00;
          --radio-secondary: #0000ff;
        }
      `}</style>
      <RadioPlayer
        streamUrl="https://stream.example.com/radio.mp3"
        title="Custom Theme"
        station="My Radio"
      />
    </div>
  );
}
```

### Minimal Player (No Visualizer/EQ)

```tsx
import RadioPlayer from '@/components/RadioPlayer';

export default function MinimalRadio() {
  return (
    <RadioPlayer
      streamUrl="https://stream.example.com/radio.mp3"
      title="Simple Radio"
      station="Minimal FM"
      showVisualizer={false}
      showEqualizer={false}
    />
  );
}
```

## Integration with State Management

### With Zustand

```tsx
// store/radioStore.ts
import { create } from 'zustand';

interface RadioState {
  isPlaying: boolean;
  currentStation: string;
  volume: number;
  setIsPlaying: (playing: boolean) => void;
  setCurrentStation: (station: string) => void;
  setVolume: (volume: number) => void;
}

export const useRadioStore = create<RadioState>((set) => ({
  isPlaying: false,
  currentStation: '',
  volume: 0.7,
  setIsPlaying: (playing) => set({ isPlaying: playing }),
  setCurrentStation: (station) => set({ currentStation: station }),
  setVolume: (volume) => set({ volume }),
}));

// Usage in component
import RadioPlayer from '@/components/RadioPlayer';
import { useRadioStore } from '@/store/radioStore';

export default function RadioWithStore() {
  const { setIsPlaying } = useRadioStore();

  return (
    <RadioPlayer
      streamUrl="https://stream.example.com/radio.mp3"
      title="Radio with State"
      station="My Station"
      onPlay={() => setIsPlaying(true)}
      onPause={() => setIsPlaying(false)}
    />
  );
}
```

## Tips & Best Practices

1. **Always use HTTPS** for stream URLs in production
2. **Test CORS** before deploying - ensure your stream server allows cross-origin requests
3. **Handle errors gracefully** - provide fallback streams or helpful error messages
4. **Optimize for mobile** - the player is responsive but test on actual devices
5. **Consider bandwidth** - lower bitrate streams for mobile users
6. **Add loading states** - the player handles this but you can add page-level loading
7. **Persist settings** - save volume and EQ settings to localStorage
8. **Analytics** - track play/pause events for insights
9. **Accessibility** - the player has ARIA labels but test with screen readers
10. **Performance** - use React.memo or dynamic imports for large apps

## Troubleshooting

### Stream Won't Play

```tsx
// Check CORS headers
// Add this to your stream server:
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, HEAD
```

### Visualizer Not Showing

```tsx
// Ensure crossOrigin is set (already included in component)
<audio crossOrigin="anonymous" />
```

### Autoplay Blocked

```tsx
// Don't rely on autoplay - always provide a play button
<RadioPlayer
  streamUrl="..."
  autoPlay={false} // Recommended
/>
```

## Next Steps

1. Replace the example stream URL with your actual stream
2. Add custom artwork for your station
3. Implement metadata fetching if available
4. Add multiple stations if needed
5. Customize colors to match your brand
6. Add analytics tracking
7. Test on various devices and browsers
8. Deploy and enjoy! 🎉


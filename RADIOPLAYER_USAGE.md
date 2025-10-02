# RadioPlayer Component - Standalone Usage Guide

## Overview
A fully-featured, self-contained radio/audio player component with visualizer, equalizer, and modern UI.

## Dependencies Required

```json
{
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "framer-motion": "^12.0.0",
    "lucide-react": "^0.544.0"
  }
}
```

## Installation

### Option 1: Copy the Component
1. Copy `src/components/RadioPlayer.tsx` to your project
2. Install the required dependencies above
3. Import and use

### Option 2: Import from Package (if published)
```bash
npm install @your-org/component-library
```

## Basic Usage

```tsx
import RadioPlayer from './components/RadioPlayer';

function App() {
  return (
    <RadioPlayer
      streamUrl="https://example.com/audio.mp3"
      title="My Radio Station"
      station="Station Name"
      autoPlay={false}
      showVisualizer={true}
      showEqualizer={true}
      onPlay={() => console.log('Playing')}
      onPause={() => console.log('Paused')}
      onError={(error) => console.error('Error:', error)}
    />
  );
}
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `streamUrl` | `string` | ✅ Yes | - | URL of the audio stream/file |
| `title` | `string` | No | `"Live Stream"` | Title displayed on player |
| `station` | `string` | No | `"Radio Station"` | Station/artist name |
| `artwork` | `string` | No | `undefined` | URL to artwork image |
| `autoPlay` | `boolean` | No | `false` | Auto-play on mount |
| `showVisualizer` | `boolean` | No | `true` | Show audio visualizer |
| `showEqualizer` | `boolean` | No | `true` | Show equalizer controls |
| `onPlay` | `() => void` | No | - | Callback when playback starts |
| `onPause` | `() => void` | No | - | Callback when playback pauses |
| `onError` | `(error: string) => void` | No | - | Callback on error |

## Features

### ✅ Audio Playback
- Play/Pause controls
- Volume control with mute
- Auto-reconnect on stream errors
- CORS support for cross-origin streams

### ✅ Visualizer
- Real-time frequency visualization
- Animated bars synced to audio
- Customizable colors

### ✅ Equalizer
- 5-band EQ (60Hz, 250Hz, 1kHz, 4kHz, 12kHz)
- Real-time audio processing
- Preset controls

### ✅ UI/UX
- Responsive design
- Smooth animations
- Loading states
- Error handling
- Connection status indicator

## Audio File Requirements

### Supported Formats
- MP3
- AAC
- WAV
- OGG
- FLAC (browser-dependent)

### CORS Requirements
For cross-origin audio files, the server must include:
```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET
```

### Recommended Audio Settings
- **Bitrate**: 128-320 kbps for MP3
- **Sample Rate**: 44.1kHz or 48kHz
- **Channels**: Stereo (2 channels)

## Common Issues & Solutions

### Issue: "The element has no supported sources"
**Cause**: Audio file format not supported or CORS issue
**Solution**: 
- Verify the audio file URL is accessible
- Check CORS headers on the server
- Try a different audio format
- Test with a direct MP3 file first

### Issue: "Stream error. Retrying..."
**Cause**: Network issue or invalid stream URL
**Solution**:
- Verify the stream URL is correct and accessible
- Check network connectivity
- Ensure the stream is live (for live streams)

### Issue: Visualizer not working
**Cause**: Web Audio API not initialized
**Solution**:
- User must interact with page first (browser security)
- Set `autoPlay={false}` and let user click play

## Advanced Examples

### With Custom Artwork
```tsx
<RadioPlayer
  streamUrl="https://example.com/stream.mp3"
  title="Chill Beats Radio"
  station="24/7 Lofi"
  artwork="https://example.com/artwork.jpg"
  showVisualizer={true}
  showEqualizer={true}
/>
```

### With Event Handlers
```tsx
<RadioPlayer
  streamUrl="https://example.com/stream.mp3"
  title="My Station"
  onPlay={() => {
    console.log('Started playing');
    // Track analytics, update UI, etc.
  }}
  onPause={() => {
    console.log('Paused');
  }}
  onError={(error) => {
    console.error('Player error:', error);
    // Show error notification
  }}
/>
```

### Minimal Setup (No Visualizer/EQ)
```tsx
<RadioPlayer
  streamUrl="https://example.com/audio.mp3"
  title="Simple Player"
  showVisualizer={false}
  showEqualizer={false}
/>
```

## Styling

The component uses Tailwind CSS classes. To customize:

1. **Colors**: Modify the gradient and color classes in the component
2. **Size**: Adjust the `max-w-4xl` class for different widths
3. **Border**: Change `border-[#FF1744]` to your brand color

## Browser Support

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Tips

1. **Preload**: Set `preload="none"` for faster initial load
2. **Lazy Load**: Only render player when needed
3. **Cleanup**: Component auto-cleans up audio context on unmount

## TypeScript Support

Full TypeScript support with exported types:

```tsx
import RadioPlayer, { type RadioPlayerProps } from './components/RadioPlayer';

const props: RadioPlayerProps = {
  streamUrl: "https://example.com/stream.mp3",
  title: "My Stream",
  // ... other props with full type checking
};
```

## License

MIT - Free to use in personal and commercial projects

## Support

For issues or questions:
- Check this documentation first
- Verify audio file/stream is accessible
- Test with a known-working MP3 file
- Check browser console for errors


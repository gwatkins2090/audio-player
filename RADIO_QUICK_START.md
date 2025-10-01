# 🎵 Radio Player - Quick Start Guide

## 🚀 Get Started in 3 Steps

### Step 1: Start the Dev Server

```bash
pnpm dev
# or
npm run dev
```

### Step 2: Navigate to Radio Page

Open your browser and go to:
```
http://localhost:3000
```

Click the **"Radio"** button in the top-right corner, or visit:
```
http://localhost:3000/radio
```

### Step 3: Update Stream URL

Edit `src/app/radio/page.tsx` and change the stream URL:

```tsx
const [currentStation] = useState({
  streamUrl: 'YOUR_ACTUAL_STREAM_URL', // ← Change this!
  title: 'Your Show Title',
  station: 'Your Station Name',
  artwork: '/path/to/artwork.jpg', // Optional
});
```

## 🎧 Test with Free Public Streams

Don't have a stream yet? Try these free public radio streams:

### SomaFM Streams (High Quality)

```tsx
// Groove Salad - Ambient/Downtempo
streamUrl: "https://ice1.somafm.com/groovesalad-128-mp3"

// Drone Zone - Ambient Space Music
streamUrl: "https://ice1.somafm.com/dronezone-128-mp3"

// Lush - Sensuous and Mellow
streamUrl: "https://ice1.somafm.com/lush-128-mp3"

// Deep Space One - Deep Ambient Electronic
streamUrl: "https://ice1.somafm.com/deepspaceone-128-mp3"
```

### Other Popular Streams

```tsx
// Radio Paradise - Eclectic Mix
streamUrl: "https://stream.radioparadise.com/mp3-128"

// KEXP 90.3 FM Seattle
streamUrl: "https://kexp-mp3-128.streamguys1.com/kexp128.mp3"
```

## 📝 Example Configuration

Here's a complete example using SomaFM Groove Salad:

```tsx
// src/app/radio/page.tsx
const [currentStation] = useState({
  streamUrl: 'https://ice1.somafm.com/groovesalad-128-mp3',
  title: 'Groove Salad',
  station: 'SomaFM - Ambient Downtempo',
  artwork: undefined, // Or add your own artwork URL
});
```

## 🎨 Features You Get

### Visualizer
- Real-time frequency bars
- Dynamic colors based on amplitude
- Smooth animations
- 3D-style effects

### Equalizer
- 5 bands: 60Hz, 250Hz, 1kHz, 4kHz, 12kHz
- Range: -12dB to +12dB
- Reset button
- Real-time audio processing

### Controls
- Play/Pause with loading states
- Volume slider with mute
- Connection status indicators
- Auto-reconnect on failures

## 🔧 Customization

### Change Title and Station

```tsx
title: "Your Custom Title"
station: "Your Station Name"
```

### Add Artwork

```tsx
artwork: "/images/station-logo.jpg"
// or
artwork: "https://example.com/artwork.jpg"
```

### Hide Visualizer or EQ

```tsx
showVisualizer={false}  // Hide visualizer
showEqualizer={false}   // Hide equalizer
```

### Add Event Handlers

```tsx
onPlay={() => console.log('Started playing')}
onPause={() => console.log('Paused')}
onError={(error) => console.error('Error:', error)}
```

## 🎯 Navigation

### Radio Button Location
- **Where**: Top-right corner of the header
- **Style**: Gradient button with Radio icon
- **Route**: `/radio`

### Back to Main Page
- Click the "Back" button on the radio page
- Or navigate to `/`

## 📱 Mobile Support

The player is fully responsive:
- ✅ Works on phones
- ✅ Works on tablets
- ✅ Works on desktop
- ✅ Touch-friendly controls
- ✅ Optimized layouts

## 🐛 Troubleshooting

### Stream Won't Play?

1. **Check CORS**: Your stream must allow cross-origin requests
2. **Check URL**: Make sure the stream URL is correct
3. **Check Format**: MP3 works best, AAC also supported
4. **Check HTTPS**: Use HTTPS streams in production

### Visualizer Not Showing?

1. **Click Play**: Visualizer only shows when playing
2. **Check Browser**: Ensure modern browser (Chrome 90+, Firefox 88+, Safari 14+)
3. **Check CORS**: Stream must have proper CORS headers

### Autoplay Not Working?

This is expected! Browsers block autoplay without user interaction. Always provide a play button.

## 🌟 Pro Tips

1. **Use MP3 streams** for best compatibility
2. **Test on mobile** before deploying
3. **Add custom artwork** for better UX
4. **Monitor errors** with onError callback
5. **Use HTTPS** in production

## 📚 More Information

- **Full Documentation**: See `RADIO_PLAYER_IMPLEMENTATION.md`
- **Usage Examples**: See `RADIO_PLAYER_EXAMPLES.md`
- **Summary**: See `RADIO_PLAYER_SUMMARY.md`

## 🎉 That's It!

You're ready to rock! 🎸

Just update the stream URL and enjoy your new radio player! 🎵✨

---

**Need help?** Check the documentation files or the component code for more details.

**Want to customize?** The component is fully customizable - just modify the props!

**Ready to deploy?** Make sure to use a real stream URL and test thoroughly!


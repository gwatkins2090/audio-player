# 🚀 Quick Start Guide

Get up and running with the Component Library in 5 minutes!

## For Development (Component Showcase)

```bash
# 1. Install dependencies
pnpm install

# 2. Start the dev server
pnpm dev

# 3. Open your browser
# Visit http://localhost:3000
```

That's it! You'll see the interactive component showcase where you can:
- Browse all components
- View live previews
- Toggle code view
- Search components
- Customize in the playground
- Copy code snippets

## For Integration (Use in Your Project)

### Quick Copy Method (Fastest)

```bash
# 1. Copy components to your Next.js project
cp -r src/components /path/to/your/project/src/
cp -r src/lib /path/to/your/project/src/

# 2. Install required dependencies
cd /path/to/your/project
npm install framer-motion lucide-react three @react-three/fiber @react-three/drei tailwindcss clsx tailwind-merge

# 3. Use components
```

```tsx
// In your page/component
import { HeroBanner } from '@/components/hero';
import Mandala from '@/components/sacred/Mandala';

export default function MyPage() {
  return (
    <>
      <HeroBanner
        title="Welcome"
        subtitle="Beautiful components"
        primaryCTA={{ text: 'Get Started', href: '/start' }}
      />
      <Mandala size={300} layers={6} />
    </>
  );
}
```

## Component Examples

### Hero Banner
```tsx
<HeroBanner
  title="Your Title"
  subtitle="Your subtitle"
  chips={['Next.js', 'TypeScript', 'React']}
  primaryCTA={{ text: 'Get Started', href: '/start' }}
/>
```

### Sacred Geometry
```tsx
<Mandala size={300} layers={6} opacity={0.8} />
<FlowerOfLife size={400} rings={3} />
```

### Spirit UI
```tsx
<QuantumButton onClick={() => alert('Clicked!')}>
  Click Me
</QuantumButton>

<GlassMorphism className="p-8">
  <h2>Content</h2>
</GlassMorphism>
```

### 3D Components
```tsx
import dynamic from 'next/dynamic';

const QuantumScene = dynamic(
  () => import('@/components/quantum/QuantumScene'),
  { ssr: false }
);

<div className="h-screen">
  <QuantumScene />
</div>
```

## Tailwind Setup

Add to your `tailwind.config.js`:

```js
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        cosmic: {
          purple: '#7F39FB',
          violet: '#985EFF'
        },
        astral: {
          blue: '#00D4FF',
          teal: '#00FFD4'
        }
      }
    }
  }
}
```

## Next Steps

- 📖 Read [USAGE.md](./USAGE.md) for detailed integration guide
- 📦 Check [README.md](./README.md) for full documentation
- 🔄 See [CHANGELOG.md](./CHANGELOG.md) for version history
- 🎨 Explore the interactive showcase at http://localhost:3000

## Need Help?

- Check the interactive showcase for live examples
- Read component-specific README files in `src/components/*/README.md`
- Review the USAGE.md for troubleshooting

## Available Components

✅ **Hero Components**: HeroBanner  
✅ **Sacred Geometry**: Mandala, FlowerOfLife  
✅ **Spirit UI**: QuantumButton, GlassMorphism, ConsciousnessText, SpiritCursor  
✅ **3D Quantum**: QuantumScene, SacredGeometry3D, ConsciousnessMandala  
✅ **Backgrounds**: AnimatedBackground  
✅ **Interactive Playground**: Component customization tool  

Happy coding! 🎉


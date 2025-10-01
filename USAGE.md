# Usage Guide

This guide explains how to integrate the Component Library into your Next.js projects.

## Installation Methods

### Method 1: Copy Components (Recommended)

This is the simplest method and gives you full control over the components.

1. **Copy the components folder**:
   ```bash
   cp -r src/components /path/to/your/project/src/
   cp -r src/lib /path/to/your/project/src/
   ```

2. **Install required dependencies**:
   ```bash
   npm install framer-motion lucide-react three @react-three/fiber @react-three/drei tailwindcss clsx tailwind-merge
   ```

3. **Update your Tailwind config** (`tailwind.config.js`):
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
           },
           void: {
             black: '#0A0A0F',
             ether: '#F0F0FF'
           }
         },
         fontFamily: {
           orbitron: ['Orbitron', 'sans-serif'],
           'space-mono': ['Space Mono', 'monospace'],
         }
       }
     }
   }
   ```

4. **Import and use components**:
   ```tsx
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

### Method 2: Git Submodule

Use this method to keep the component library in sync with updates.

1. **Add as submodule**:
   ```bash
   git submodule add https://github.com/your-org/component-library.git src/component-library
   ```

2. **Import from submodule**:
   ```tsx
   import { HeroBanner } from '@/component-library/src/components/hero';
   ```

3. **Update submodule**:
   ```bash
   git submodule update --remote
   ```

### Method 3: NPM Package (If Published)

1. **Install package**:
   ```bash
   npm install @your-org/component-library
   ```

2. **Import components**:
   ```tsx
   import { HeroBanner, Mandala, QuantumButton } from '@your-org/component-library';
   ```

## Component Examples

### Hero Banner

```tsx
import { HeroBanner } from '@/components/hero';

<HeroBanner
  title="Your Amazing Title"
  subtitle="A compelling subtitle that draws users in"
  chips={['Next.js', 'TypeScript', 'React']}
  primaryCTA={{
    text: 'Get Started',
    href: '/get-started'
  }}
  secondaryCTA={{
    text: 'Learn More',
    onClick: () => console.log('Learn more clicked')
  }}
  showProfileImage={true}
  profileImagePlaceholder="/images/profile.jpg"
  showScrollIndicator={true}
  minHeight="600px"
/>
```

### Sacred Geometry Components

```tsx
import Mandala from '@/components/sacred/Mandala';
import FlowerOfLife from '@/components/sacred/FlowerOfLife';

// Mandala
<Mandala
  size={300}
  layers={6}
  opacity={0.8}
  spinSeconds={60}
  colorA="#7F39FB"
  colorB="#00FFD4"
/>

// Flower of Life
<FlowerOfLife
  size={400}
  rings={3}
  opacity={0.6}
  spinSeconds={80}
  stroke="#9b87f5"
/>
```

### Spirit UI Components

```tsx
import { QuantumButton, GlassMorphism, ConsciousnessText } from '@/components/spirit';

// Quantum Button
<QuantumButton onClick={() => alert('Clicked!')}>
  Click Me
</QuantumButton>

// Glass Morphism Container
<GlassMorphism className="p-8">
  <h2>Glassmorphic Content</h2>
  <p>Beautiful frosted glass effect</p>
</GlassMorphism>

// Consciousness Text
<ConsciousnessText>
  Animated gradient text
</ConsciousnessText>
```

### 3D Quantum Components

```tsx
import { QuantumScene, SacredGeometry3D } from '@/components/quantum';

// Quantum Scene
<div className="h-screen">
  <QuantumScene />
</div>

// Sacred Geometry 3D
<div className="h-96">
  <SacredGeometry3D />
</div>
```

## Customization

### Theming

All components use Tailwind CSS and can be customized through your Tailwind config. The components also accept className props for additional styling.

### Custom Colors

Most components accept color props:

```tsx
<HeroBanner
  gradientFrom="#1a0033"
  gradientVia="#330066"
  gradientTo="#1a0033"
  orbColor1="rgba(255,107,107,0.25)"
  orbColor2="rgba(255,193,7,0.18)"
/>
```

### Animation Control

Components with animations accept timing props:

```tsx
<Mandala spinSeconds={120} /> // Slower rotation
<FlowerOfLife spinSeconds={30} /> // Faster rotation
```

## TypeScript Support

All components are fully typed. Import types as needed:

```tsx
import type { HeroBannerProps } from '@/components/hero/HeroBanner';

const myHeroConfig: HeroBannerProps = {
  title: "My Title",
  subtitle: "My Subtitle",
  // ... other props with full IntelliSense
};
```

## Best Practices

1. **Performance**: Use dynamic imports for heavy 3D components:
   ```tsx
   const QuantumScene = dynamic(() => import('@/components/quantum/QuantumScene'), {
     ssr: false
   });
   ```

2. **Responsive Design**: Most components are responsive by default, but test on various screen sizes.

3. **Accessibility**: Add appropriate ARIA labels and alt text where needed.

4. **Bundle Size**: Only import components you need to keep bundle size small.

## Troubleshooting

### Three.js SSR Issues

If you encounter SSR issues with 3D components, disable SSR:

```tsx
import dynamic from 'next/dynamic';

const QuantumScene = dynamic(
  () => import('@/components/quantum/QuantumScene'),
  { ssr: false }
);
```

### Tailwind Classes Not Working

Make sure your Tailwind config includes the component paths:

```js
content: [
  './src/**/*.{js,ts,jsx,tsx}',
  './src/components/**/*.{js,ts,jsx,tsx}', // Add this
]
```

### Font Issues

Install the required fonts in your layout:

```tsx
import { Orbitron, Space_Mono } from 'next/font/google';

const orbitron = Orbitron({ subsets: ['latin'] });
const spaceMono = Space_Mono({ weight: ['400', '700'], subsets: ['latin'] });
```

## Support

For issues, questions, or contributions, please visit the GitHub repository.


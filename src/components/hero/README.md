# HeroBanner Component

A stunning, reusable hero banner component with animated sacred geometry (spinning mandala and flower of life), parallax effects, and customizable content.

## Features

- 🎨 **Beautiful Sacred Geometry**: Spinning mandala and flower of life patterns with parallax mouse tracking
- ✨ **Smooth Animations**: Framer Motion powered animations with reduced motion support
- 🎯 **Fully Customizable**: Extensive props for colors, sizes, content, and behavior
- 📱 **Responsive**: Works beautifully on all screen sizes
- ♿ **Accessible**: Respects user's motion preferences
- 🎭 **Ambient Effects**: Animated orbs and breathing vignette overlay

## Installation

### Dependencies

This component requires the following dependencies:

```bash
npm install framer-motion lucide-react
# or
yarn add framer-motion lucide-react
# or
pnpm add framer-motion lucide-react
```

### Required Files

To use this component in another project, copy these files:

1. `src/components/hero/HeroBanner.tsx` - Main component
2. `src/components/hero/index.ts` - Export file
3. `src/components/sacred/Mandala.tsx` - Spinning mandala component
4. `src/components/sacred/FlowerOfLife.tsx` - Flower of life component

Make sure your project uses **Tailwind CSS** for styling.

## Basic Usage

```tsx
import { HeroBanner } from '@/components/hero';

export default function MyPage() {
  return (
    <HeroBanner
      title="Your Amazing Title"
      subtitle="Your compelling subtitle goes here"
      chips={['React', 'TypeScript', 'Next.js']}
      primaryCTA={{
        text: 'Get Started',
        href: '#get-started',
      }}
      secondaryCTA={{
        text: 'Learn More',
        onClick: () => console.log('Learn more clicked'),
      }}
    />
  );
}
```

## Props

### Content Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | **Required** | Main heading text |
| `subtitle` | `string` | **Required** | Subtitle/description text |
| `chips` | `string[]` | `[]` | Array of technology/feature chips to display |

### CTA Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `primaryCTA` | `{ text: string; href: string }` | `undefined` | Primary call-to-action button |
| `secondaryCTA` | `{ text: string; onClick?: () => void; href?: string }` | `undefined` | Secondary call-to-action button |

### Profile Image Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `showProfileImage` | `boolean` | `false` | Whether to show profile image area |
| `profileImageUrl` | `string` | `undefined` | URL of profile image |
| `profileImagePlaceholder` | `string` | `'Add profile image'` | Placeholder text when no image |

### Scroll Indicator Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `showScrollIndicator` | `boolean` | `true` | Whether to show scroll indicator |
| `scrollIndicatorText` | `string` | `'Scroll'` | Text for scroll indicator |
| `onScrollClick` | `() => void` | `undefined` | Callback when scroll indicator is clicked |

### Background Customization

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `gradientFrom` | `string` | `'#0a0a0f'` | Starting color of radial gradient |
| `gradientVia` | `string` | `'#120a26'` | Middle color of radial gradient |
| `gradientTo` | `string` | `'#0a0a0f'` | Ending color of radial gradient |

### Sacred Geometry Customization

#### Mandala

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `mandalaSize` | `number` | `1100` | Size of mandala in pixels |
| `mandalaLayers` | `number` | `9` | Number of concentric layers |
| `mandalaOpacity` | `number` | `0.4` | Opacity of mandala (0-1) |
| `mandalaSpinSeconds` | `number` | `90` | Rotation duration in seconds |

#### Flower of Life

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `flowerOfLifeSize` | `number` | `1400` | Size of flower of life in pixels |
| `flowerOfLifeRings` | `number` | `6` | Number of hexagonal rings |
| `flowerOfLifeOpacity` | `number` | `0.2` | Opacity of flower of life (0-1) |
| `flowerOfLifeSpinSeconds` | `number` | `130` | Rotation duration in seconds |

### Orb Customization

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `showOrbs` | `boolean` | `true` | Whether to show ambient orbs |
| `orbColor1` | `string` | `'rgba(127,57,251,0.25)'` | Color of first orb (purple) |
| `orbColor2` | `string` | `'rgba(0,255,212,0.18)'` | Color of second orb (teal) |

### Layout Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `minHeight` | `string` | `'92vh'` | Minimum height of hero section |
| `className` | `string` | `''` | Additional CSS classes |

## Advanced Examples

### Custom Colors

```tsx
<HeroBanner
  title="Custom Theme"
  subtitle="With custom gradient and orb colors"
  gradientFrom="#1a0a2e"
  gradientVia="#16213e"
  gradientTo="#0f3460"
  orbColor1="rgba(255,107,107,0.25)"
  orbColor2="rgba(78,205,196,0.18)"
/>
```

### With Profile Image

```tsx
<HeroBanner
  title="John Doe"
  subtitle="Full Stack Developer & Designer"
  showProfileImage={true}
  profileImageUrl="/images/profile.jpg"
  chips={['React', 'Node.js', 'Design']}
/>
```

### Minimal Version

```tsx
<HeroBanner
  title="Simple & Clean"
  subtitle="No extra features"
  showOrbs={false}
  showScrollIndicator={false}
  mandalaOpacity={0.2}
  flowerOfLifeOpacity={0.1}
/>
```

### Custom Scroll Behavior

```tsx
<HeroBanner
  title="Smooth Scrolling"
  subtitle="Click the indicator to scroll"
  onScrollClick={() => {
    document.getElementById('content')?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  }}
  scrollIndicatorText="Explore"
/>
```

## Accessibility

The component includes:

- Reduced motion support (respects `prefers-reduced-motion`)
- Semantic HTML structure
- Proper ARIA attributes for decorative elements
- Keyboard accessible buttons and links

## Performance Tips

1. **Reduce Motion**: The component automatically respects user's motion preferences
2. **Optimize Geometry**: Reduce `mandalaLayers` and `flowerOfLifeRings` for better performance on low-end devices
3. **Disable Orbs**: Set `showOrbs={false}` if you need better performance

## Browser Support

Works in all modern browsers that support:
- CSS Grid
- CSS Custom Properties
- Framer Motion
- ES6+

## License

This component is part of the Back To Sourcecode project.


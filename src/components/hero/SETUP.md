# HeroBanner Setup Guide

Quick guide to integrate the HeroBanner component into a new project.

## 📋 Checklist

- [ ] Install dependencies
- [ ] Copy component files
- [ ] Configure Tailwind CSS
- [ ] Import and use component

## 1. Install Dependencies

```bash
npm install framer-motion lucide-react
```

## 2. Copy Files

Copy these files to your project:

```
src/components/
├── hero/
│   ├── HeroBanner.tsx
│   └── index.ts
└── sacred/
    ├── Mandala.tsx
    └── FlowerOfLife.tsx
```

### File Structure

```
your-project/
├── src/
│   └── components/
│       ├── hero/
│       │   ├── HeroBanner.tsx    # Main component
│       │   └── index.ts          # Export file
│       └── sacred/
│           ├── Mandala.tsx       # Spinning mandala
│           └── FlowerOfLife.tsx  # Flower of life pattern
```

## 3. Tailwind CSS Configuration

Make sure your `tailwind.config.js` includes the component paths:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Your custom theme extensions
    },
  },
  plugins: [],
}
```

## 4. TypeScript Configuration (Optional)

If using TypeScript, ensure your `tsconfig.json` has path aliases configured:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/components/*": ["src/components/*"]
    }
  }
}
```

## 5. Basic Usage

```tsx
import { HeroBanner } from '@/components/hero';

export default function HomePage() {
  return (
    <HeroBanner
      title="Your Title"
      subtitle="Your subtitle"
      primaryCTA={{
        text: 'Get Started',
        href: '#start',
      }}
    />
  );
}
```

## 6. Customization

### Quick Customization Options

```tsx
<HeroBanner
  // Content
  title="Your Title"
  subtitle="Your subtitle"
  chips={['Tag 1', 'Tag 2', 'Tag 3']}
  
  // Colors
  gradientFrom="#1a0033"
  gradientVia="#330066"
  gradientTo="#1a0033"
  orbColor1="rgba(255,107,107,0.25)"
  orbColor2="rgba(255,193,7,0.18)"
  
  // Sacred Geometry
  mandalaOpacity={0.4}
  mandalaSpinSeconds={90}
  flowerOfLifeOpacity={0.2}
  flowerOfLifeSpinSeconds={130}
  
  // Layout
  minHeight="100vh"
  showProfileImage={false}
  showScrollIndicator={true}
/>
```

## 7. Performance Optimization

For better performance on lower-end devices:

```tsx
<HeroBanner
  title="Optimized Hero"
  subtitle="Better performance"
  
  // Reduce geometry complexity
  mandalaLayers={6}           // Default: 9
  flowerOfLifeRings={4}       // Default: 6
  
  // Lower opacity
  mandalaOpacity={0.2}        // Default: 0.4
  flowerOfLifeOpacity={0.1}   // Default: 0.2
  
  // Disable orbs if needed
  showOrbs={false}            // Default: true
/>
```

## 8. Common Issues

### Issue: Component not rendering

**Solution**: Make sure all dependencies are installed and Tailwind CSS is properly configured.

### Issue: Animations not working

**Solution**: Check that `framer-motion` is installed and imported correctly.

### Issue: Sacred geometry not visible

**Solution**: Increase opacity values or check that the background gradient isn't too bright.

### Issue: TypeScript errors

**Solution**: Ensure path aliases are configured in `tsconfig.json`.

## 9. Browser Compatibility

The component works in all modern browsers:

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers

## 10. Accessibility

The component includes:

- ✅ Reduced motion support
- ✅ Semantic HTML
- ✅ ARIA attributes
- ✅ Keyboard navigation

## 11. Next Steps

1. Check out `examples.tsx` for more usage patterns
2. Read `README.md` for detailed prop documentation
3. Customize colors and animations to match your brand
4. Add your own profile image if using `showProfileImage={true}`

## 12. Support

For issues or questions:

1. Check the README.md for detailed documentation
2. Review examples.tsx for usage patterns
3. Ensure all dependencies are correctly installed
4. Verify Tailwind CSS configuration

## Quick Copy-Paste Template

```tsx
'use client';

import { HeroBanner } from '@/components/hero';

export default function MyHero() {
  return (
    <HeroBanner
      title="Your Amazing Title"
      subtitle="Your compelling subtitle that describes what you do"
      chips={['Feature 1', 'Feature 2', 'Feature 3']}
      primaryCTA={{
        text: 'Get Started',
        href: '#get-started',
      }}
      secondaryCTA={{
        text: 'Learn More',
        onClick: () => {
          document.getElementById('content')?.scrollIntoView({ 
            behavior: 'smooth' 
          });
        },
      }}
      onScrollClick={() => {
        document.getElementById('content')?.scrollIntoView({ 
          behavior: 'smooth' 
        });
      }}
    />
  );
}
```

---

**That's it!** You're ready to use the HeroBanner component in your project. 🎉


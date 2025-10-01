# 🚀 HeroBanner Quick Start

Get up and running with the HeroBanner component in 5 minutes!

## ⚡ Super Quick Start

### 1. Copy Files (30 seconds)

Copy these two folders to your new project:

```
src/components/hero/     → Copy entire folder
src/components/sacred/   → Copy entire folder
```

### 2. Install Dependencies (1 minute)

```bash
npm install framer-motion lucide-react
```

### 3. Use It! (30 seconds)

```tsx
import { HeroBanner } from '@/components/hero';

export default function Home() {
  return (
    <HeroBanner
      title="Your Amazing Title"
      subtitle="Your compelling subtitle"
      primaryCTA={{ text: 'Get Started', href: '#start' }}
    />
  );
}
```

**Done!** 🎉

---

## 📋 What You Get

✨ **Spinning Mandala** - Beautiful animated sacred geometry  
✨ **Parallax Effects** - Interactive mouse tracking  
✨ **Smooth Animations** - Professional Framer Motion effects  
✨ **Fully Responsive** - Works on all devices  
✨ **Accessible** - Respects reduced motion preferences  
✨ **40+ Props** - Highly customizable  

---

## 🎨 Common Customizations

### Add Technology Chips

```tsx
<HeroBanner
  title="Your Title"
  subtitle="Your subtitle"
  chips={['React', 'TypeScript', 'Next.js']}
/>
```

### Add Profile Image

```tsx
<HeroBanner
  title="Your Name"
  subtitle="Your role"
  showProfileImage={true}
  profileImageUrl="/images/profile.jpg"
/>
```

### Custom Colors

```tsx
<HeroBanner
  title="Custom Theme"
  subtitle="With your brand colors"
  gradientFrom="#1a0033"
  gradientVia="#330066"
  gradientTo="#1a0033"
  orbColor1="rgba(255,107,107,0.25)"
  orbColor2="rgba(255,193,7,0.18)"
/>
```

### Add Scroll Behavior

```tsx
<HeroBanner
  title="Your Title"
  subtitle="Your subtitle"
  onScrollClick={() => {
    document.getElementById('content')?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  }}
/>
```

### Both CTAs

```tsx
<HeroBanner
  title="Your Title"
  subtitle="Your subtitle"
  primaryCTA={{
    text: 'Get Started',
    href: '/signup',
  }}
  secondaryCTA={{
    text: 'Learn More',
    onClick: () => console.log('Learn more'),
  }}
/>
```

---

## 🎯 Popular Presets

### Portfolio Hero

```tsx
<HeroBanner
  title="Jane Developer"
  subtitle="Full Stack Engineer & Designer"
  chips={['React', 'Node.js', 'Design']}
  showProfileImage={true}
  profileImageUrl="/profile.jpg"
  primaryCTA={{ text: 'View Projects', href: '#projects' }}
  secondaryCTA={{ text: 'Contact', href: '#contact' }}
/>
```

### Landing Page Hero

```tsx
<HeroBanner
  title="Revolutionary Product"
  subtitle="Transform the way you work"
  chips={['AI-Powered', 'Cloud-Native', 'Secure']}
  primaryCTA={{ text: 'Start Free Trial', href: '/signup' }}
  secondaryCTA={{ text: 'Watch Demo', onClick: openDemo }}
/>
```

### Minimal Hero

```tsx
<HeroBanner
  title="Less is More"
  subtitle="Clean and simple"
  showOrbs={false}
  showScrollIndicator={false}
  mandalaOpacity={0.15}
  flowerOfLifeOpacity={0.08}
/>
```

---

## 🔧 Troubleshooting

### Component not showing?

1. ✅ Check dependencies are installed
2. ✅ Verify Tailwind CSS is configured
3. ✅ Ensure path aliases work (`@/components`)

### Animations not working?

1. ✅ Install `framer-motion`
2. ✅ Check browser console for errors

### Sacred geometry not visible?

1. ✅ Increase opacity: `mandalaOpacity={0.6}`
2. ✅ Check background isn't too bright

---

## 📚 Learn More

- **Full Documentation**: See `README.md`
- **Setup Guide**: See `SETUP.md`
- **12 Examples**: See `examples.tsx`
- **Overview**: See `COMPONENT_SUMMARY.md`

---

## 💡 Pro Tips

1. **Start Simple**: Use minimal props first, then customize
2. **Check Examples**: `examples.tsx` has 12 ready-to-use patterns
3. **Performance**: Reduce geometry complexity on mobile
4. **Branding**: Match `orbColor1/2` to your brand colors
5. **Testing**: Test with reduced motion enabled

---

## 🎊 You're Ready!

The HeroBanner component is now ready to use in your project.

**Next Steps:**
1. ✅ Copy the files
2. ✅ Install dependencies  
3. ✅ Import and use
4. 🎨 Customize to match your brand
5. 🚀 Ship it!

---

**Questions?** Check the full documentation in `README.md`

**Happy coding!** ✨🌀


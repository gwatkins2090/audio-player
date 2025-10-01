/**
 * HeroBanner Component Examples
 *
 * This file contains various usage examples of the HeroBanner component.
 * Copy and modify these examples for your own projects.
 */

import HeroBanner from './HeroBanner';

// Example 1: Basic Usage
export function BasicHero() {
  return (
    <HeroBanner
      title="Welcome to My Site"
      subtitle="Building amazing digital experiences"
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

// Example 2: Portfolio Hero with Profile Image
export function PortfolioHero() {
  return (
    <HeroBanner
      title="Jane Developer"
      subtitle="Full Stack Engineer crafting elegant solutions to complex problems"
      chips={['React', 'Node.js', 'Python', 'AWS', 'Design']}
      showProfileImage={true}
      profileImageUrl="/images/profile.jpg"
      primaryCTA={{
        text: 'View Projects',
        href: '#projects',
      }}
      secondaryCTA={{
        text: 'Contact Me',
        href: '#contact',
      }}
    />
  );
}

// Example 3: Minimal Hero (Performance Optimized)
export function MinimalHero() {
  return (
    <HeroBanner
      title="Less is More"
      subtitle="A clean, minimal approach"
      showOrbs={false}
      showScrollIndicator={false}
      mandalaOpacity={0.15}
      flowerOfLifeOpacity={0.08}
      mandalaLayers={6}
      flowerOfLifeRings={4}
    />
  );
}

// Example 4: Custom Color Theme (Warm Colors)
export function WarmThemeHero() {
  return (
    <HeroBanner
      title="Warm & Inviting"
      subtitle="A different color palette for a unique feel"
      chips={['Design', 'Branding', 'UX']}
      gradientFrom="#2d1b00"
      gradientVia="#5c2e00"
      gradientTo="#2d1b00"
      orbColor1="rgba(255,107,107,0.25)"
      orbColor2="rgba(255,193,7,0.18)"
      primaryCTA={{
        text: 'Explore',
        href: '#explore',
      }}
    />
  );
}

// Example 5: Cool Blue Theme
export function CoolThemeHero() {
  return (
    <HeroBanner
      title="Ocean Depths"
      subtitle="Dive into a sea of possibilities"
      chips={['Innovation', 'Technology', 'Future']}
      gradientFrom="#0a1929"
      gradientVia="#1e3a5f"
      gradientTo="#0a1929"
      orbColor1="rgba(33,150,243,0.25)"
      orbColor2="rgba(0,188,212,0.18)"
      primaryCTA={{
        text: 'Discover',
        href: '#discover',
      }}
    />
  );
}

// Example 6: Landing Page Hero
export function LandingPageHero() {
  const handleScrollToFeatures = () => {
    document.getElementById('features')?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  return (
    <HeroBanner
      title="Revolutionary Product"
      subtitle="Transform the way you work with cutting-edge technology"
      chips={['AI-Powered', 'Cloud-Native', 'Secure', 'Scalable']}
      primaryCTA={{
        text: 'Start Free Trial',
        href: '/signup',
      }}
      secondaryCTA={{
        text: 'Watch Demo',
        onClick: () => console.log('Open demo video'),
      }}
      onScrollClick={handleScrollToFeatures}
      scrollIndicatorText="See Features"
    />
  );
}

// Example 7: Agency Hero
export function AgencyHero() {
  return (
    <HeroBanner
      title="Digital Agency"
      subtitle="We create experiences that inspire, engage, and convert"
      chips={['Strategy', 'Design', 'Development', 'Marketing']}
      primaryCTA={{
        text: 'View Our Work',
        href: '#portfolio',
      }}
      secondaryCTA={{
        text: 'Get in Touch',
        href: '#contact',
      }}
      showProfileImage={false}
      minHeight="100vh"
    />
  );
}

// Example 8: Event Hero
export function EventHero() {
  return (
    <HeroBanner
      title="Tech Conference 2025"
      subtitle="Join us for three days of innovation, networking, and inspiration"
      chips={['March 15-17', 'San Francisco', 'In-Person & Virtual']}
      primaryCTA={{
        text: 'Register Now',
        href: '/register',
      }}
      secondaryCTA={{
        text: 'View Schedule',
        href: '#schedule',
      }}
      gradientFrom="#1a0033"
      gradientVia="#330066"
      gradientTo="#1a0033"
      showScrollIndicator={true}
      scrollIndicatorText="Learn More"
    />
  );
}

// Example 9: Product Launch Hero
export function ProductLaunchHero() {
  return (
    <HeroBanner
      title="Introducing Nova"
      subtitle="The next generation of productivity tools, designed for modern teams"
      chips={['Launching Soon', 'Early Access', 'Limited Spots']}
      primaryCTA={{
        text: 'Join Waitlist',
        href: '/waitlist',
      }}
      secondaryCTA={{
        text: 'Learn More',
        onClick: () => console.log('Show product details'),
      }}
      mandalaSpinSeconds={60}
      flowerOfLifeSpinSeconds={100}
    />
  );
}

// Example 10: Personal Brand Hero
export function PersonalBrandHero() {
  return (
    <HeroBanner
      title="Back To Sourcecode"
      subtitle="Ethereal interfaces. Spirit‑techno systems. Code that communes with the source."
      chips={['Next.js 15', 'TypeScript', 'Framer Motion', 'Edge‑first', 'AI‑native']}
      primaryCTA={{
        text: 'Explore Projects',
        href: '#projects',
      }}
      secondaryCTA={{
        text: 'About the Agent',
        onClick: () => {
          document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
        },
      }}
      showProfileImage={true}
      profileImagePlaceholder="Add profile image at /public/images/profile.jpg"
      onScrollClick={() => {
        document.getElementById('content')?.scrollIntoView({ behavior: 'smooth' });
      }}
    />
  );
}

// Example 11: No CTAs (Content Focus)
export function ContentFocusHero() {
  return (
    <HeroBanner
      title="The Art of Code"
      subtitle="Exploring the intersection of technology, design, and human experience"
      chips={['Blog', 'Tutorials', 'Insights']}
      showScrollIndicator={true}
      scrollIndicatorText="Start Reading"
      onScrollClick={() => {
        document.getElementById('articles')?.scrollIntoView({ behavior: 'smooth' });
      }}
    />
  );
}

// Example 12: High Energy Hero (Faster Animations)
export function HighEnergyHero() {
  return (
    <HeroBanner
      title="Move Fast"
      subtitle="Break things. Build better. Repeat."
      chips={['Startup', 'Innovation', 'Disruption']}
      mandalaSpinSeconds={45}
      flowerOfLifeSpinSeconds={60}
      mandalaOpacity={0.5}
      flowerOfLifeOpacity={0.3}
      primaryCTA={{
        text: 'Join Us',
        href: '/careers',
      }}
    />
  );
}


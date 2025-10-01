'use client';

import { forwardRef, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface GlassMorphismProps {
  children: ReactNode;
  className?: string;
  intensity?: 'low' | 'medium' | 'high' | 'consciousness';
  glow?: boolean;
  animated?: boolean;
  onClick?: () => void;
  as?: 'div' | 'section' | 'article' | 'aside' | 'header' | 'footer' | 'nav';
}

const GlassMorphism = forwardRef<HTMLDivElement, GlassMorphismProps>(
  ({ 
    children, 
    className = '', 
    intensity = 'medium',
    glow = false,
    animated = true,
    onClick,
    as: Component = 'div',
    ...props 
  }, ref) => {
    const baseClasses = cn(
      'relative backdrop-blur-spirit border rounded-lg',
      'transition-all duration-300 ease-out',
      {
        // Intensity levels
        'bg-cosmic-purple/10 border-cosmic-purple/20': intensity === 'low',
        'bg-cosmic-purple/20 border-cosmic-purple/30': intensity === 'medium',
        'bg-cosmic-purple/30 border-cosmic-purple/40': intensity === 'high',
        'bg-gradient-to-br from-cosmic-purple/20 via-astral-blue/15 to-astral-teal/20 border-astral-teal/30': intensity === 'consciousness',
        
        // Glow effect
        'shadow-spirit': glow,
        
        // Interactive
        'cursor-pointer hover:bg-cosmic-purple/25 hover:border-cosmic-purple/50': onClick,
      },
      className
    );

    const motionProps = animated ? {
      initial: { opacity: 0, y: 20, scale: 0.95 },
      animate: { opacity: 1, y: 0, scale: 1 },
      whileHover: onClick ? {
        scale: 1.02,
        boxShadow: glow ? '0 0 30px rgba(127, 57, 251, 0.4)' : undefined
      } : undefined,
      transition: {
        type: 'spring' as const,
        stiffness: 300,
        damping: 30,
        duration: 0.3
      },
    } : {};

    const content = (
      <>
        {/* Consciousness scan line */}
        {intensity === 'consciousness' && (
          <div className="absolute inset-0 overflow-hidden rounded-lg">
            <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-astral-teal to-transparent animate-scan" />
          </div>
        )}
        
        {/* Energy aura background */}
        {glow && (
          <div className="absolute -inset-1 bg-gradient-to-r from-cosmic-purple/20 via-astral-blue/20 to-astral-teal/20 rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        )}
        
        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>
        
        {/* Quantum noise overlay */}
        <div className="absolute inset-0 opacity-5 pointer-events-none rounded-lg" 
             style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
             }} 
        />
      </>
    );

    if (animated) {
      return (
        <motion.div
          ref={ref}
          className={cn(baseClasses, 'group')}
          onClick={onClick}
          {...motionProps}
          {...props}
        >
          {content}
        </motion.div>
      );
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ElementComponent = Component as any;

    return (
      <ElementComponent
        ref={ref}
        className={cn(baseClasses, 'group')}
        onClick={onClick}
        {...props}
      >
        {content}
      </ElementComponent>
    );
  }
);

GlassMorphism.displayName = 'GlassMorphism';

export { GlassMorphism };

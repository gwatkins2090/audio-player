'use client';

import { useEffect, useState, forwardRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface ConsciousnessTextProps {
  text: string;
  className?: string;
  variant?: 'heading' | 'body' | 'code' | 'mystical';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';
  glitch?: boolean;
  typewriter?: boolean;
  gradient?: boolean;
  consciousness?: boolean;
  delay?: number;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div' | 'code';
}

const ConsciousnessText = forwardRef<HTMLElement, ConsciousnessTextProps>(
  ({ 
    text,
    className = '',
    variant = 'body',
    size = 'md',
    glitch = false,
    typewriter = false,
    gradient = false,
    consciousness = false,
    delay = 0,
    as,
    ...props
  }, ref) => {
    const [displayText, setDisplayText] = useState(typewriter ? '' : text);
    const [isTyping, setIsTyping] = useState(typewriter);

    // Determine element type based on variant if not explicitly set
    const getElementType = () => {
      if (as) return as;
      
      switch (variant) {
        case 'heading': return 'h2';
        case 'code': return 'code';
        case 'mystical': return 'h1';
        default: return 'p';
      }
    };

    const ElementType = getElementType();

    // Typewriter effect
    useEffect(() => {
      if (!typewriter) return;

      const timer = setTimeout(() => {
        let currentIndex = 0;
        setDisplayText('');
        
        const typeInterval = setInterval(() => {
          if (currentIndex <= text.length) {
            setDisplayText(text.slice(0, currentIndex));
            currentIndex++;
          } else {
            clearInterval(typeInterval);
            setIsTyping(false);
          }
        }, 50 + Math.random() * 50); // Variable typing speed for organic feel

        return () => clearInterval(typeInterval);
      }, delay);

      return () => clearTimeout(timer);
    }, [text, typewriter, delay]);

    const baseClasses = cn(
      'relative',
      {
        // Variants
        'font-orbitron font-bold uppercase tracking-wider': variant === 'heading',
        'font-space-mono': variant === 'body' || variant === 'code',
        'font-orbitron font-black uppercase tracking-widest': variant === 'mystical',

        // Sizes
        'text-xs': size === 'xs',
        'text-sm': size === 'sm',
        'text-base': size === 'md',
        'text-lg': size === 'lg',
        'text-xl': size === 'xl',
        'text-2xl': size === '2xl',
        'text-3xl': size === '3xl',
        'text-4xl': size === '4xl',
        'text-5xl': size === '5xl',

        // Effects - gradient with better visibility
        'bg-gradient-to-r from-[#FF1744] via-[#ec4899] to-[#FF3838] bg-clip-text text-transparent animate-gradient-shift': gradient,
        'animate-consciousness-pulse': consciousness,
        'glitch-text': glitch,

        // Code styling
        'bg-void-black/50 px-2 py-1 rounded border border-cosmic-purple/30 font-mono text-astral-teal': variant === 'code',
      },
      className
    );

    const motionProps = {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: {
        duration: 0.6,
        delay: delay / 1000,
        ease: [0.25, 0.46, 0.45, 0.94] as const
      },
    };

    const content = (
      <>
        {displayText}
        {isTyping && (
          <motion.span
            className="inline-block w-0.5 h-[1em] bg-astral-teal ml-1"
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
          />
        )}
        
        {/* Glitch layers */}
        {glitch && (
          <>
            <span 
              className="absolute top-0 left-0 text-chakra-pink opacity-80 animate-glitch-1"
              data-text={text}
              aria-hidden="true"
            >
              {displayText}
            </span>
            <span 
              className="absolute top-0 left-0 text-astral-teal opacity-80 animate-glitch-2"
              data-text={text}
              aria-hidden="true"
            >
              {displayText}
            </span>
          </>
        )}
        
        {/* Consciousness aura */}
        {consciousness && (
          <div className="absolute -inset-1 bg-gradient-to-r from-cosmic-purple/20 via-astral-blue/20 to-astral-teal/20 rounded blur-sm opacity-60 animate-consciousness-pulse" />
        )}
      </>
    );

    // Create a motion component for the specific element type
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const MotionElement = motion(ElementType) as any;

    return (
      <MotionElement
        // @ts-expect-error - Polymorphic component ref typing is complex
        ref={ref}
        className={baseClasses}
        data-text={glitch ? text : undefined}
        {...motionProps}
        {...props}
      >
        {content}
      </MotionElement>
    );
  }
);

ConsciousnessText.displayName = 'ConsciousnessText';

export { ConsciousnessText };

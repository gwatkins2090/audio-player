'use client';

import { forwardRef, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface QuantumButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'consciousness';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  href?: string;
  target?: string;
  rel?: string;
  glitch?: boolean;
  consciousness?: boolean;
}

const QuantumButton = forwardRef<HTMLButtonElement | HTMLAnchorElement, QuantumButtonProps>(
  ({ 
    children, 
    variant = 'primary', 
    size = 'md', 
    className = '', 
    onClick, 
    disabled = false,
    type = 'button',
    href,
    target,
    rel,
    glitch = false,
    consciousness = false,
    ...props 
  }, ref) => {
    const baseClasses = cn(
      'quantum-button relative inline-flex items-center justify-center',
      'font-space-mono font-bold uppercase tracking-wider',
      'border-2 transition-all duration-300 ease-out',
      'focus:outline-none focus:ring-2 focus:ring-astral-teal focus:ring-offset-2 focus:ring-offset-void-black',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      'overflow-hidden group',
      {
        // Variants
        'bg-transparent border-astral-teal text-astral-teal hover:text-void-black hover:shadow-quantum': variant === 'primary',
        'bg-transparent border-cosmic-purple text-cosmic-purple hover:text-void-ether hover:shadow-spirit': variant === 'secondary',
        'bg-transparent border-transparent text-void-ether hover:border-astral-teal hover:text-astral-teal': variant === 'ghost',
        'bg-gradient-to-r from-cosmic-purple via-astral-blue to-astral-teal border-transparent text-void-black font-orbitron': variant === 'consciousness',
        
        // Sizes
        'px-4 py-2 text-sm h-10': size === 'sm',
        'px-6 py-3 text-base h-12': size === 'md',
        'px-8 py-4 text-lg h-14': size === 'lg',
        'px-10 py-5 text-xl h-16': size === 'xl',
        
        // States
        'animate-consciousness-pulse': consciousness,
        'glitch-text': glitch,
      },
      className
    );

    const motionProps = {
      whileHover: { scale: 1.05 },
      whileTap: { scale: 0.95 },
      transition: { type: 'spring' as const, stiffness: 400, damping: 17 },
    };

    const content = (
      <>
        {/* Quantum expansion background */}
        <div className="absolute inset-0 bg-current transform scale-0 group-hover:scale-100 transition-transform duration-500 ease-out rounded-full opacity-20" />
        
        {/* Energy ripple effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-current to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out opacity-30" />
        
        {/* Content */}
        <span className="relative z-10 flex items-center gap-2">
          {children}
        </span>
        
        {/* Consciousness aura for special variant */}
        {consciousness && (
          <div className="absolute -inset-1 bg-gradient-to-r from-cosmic-purple via-astral-blue to-astral-teal rounded-lg blur-sm opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
        )}
      </>
    );

    if (href) {
      return (
        <motion.a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          target={target}
          rel={rel}
          className={baseClasses}
          onClick={onClick}
          {...motionProps}
          {...props}
        >
          {content}
        </motion.a>
      );
    }

    return (
      <motion.button
        ref={ref as React.Ref<HTMLButtonElement>}
        type={type}
        className={baseClasses}
        onClick={onClick}
        disabled={disabled}
        {...motionProps}
        {...props}
      >
        {content}
      </motion.button>
    );
  }
);

QuantumButton.displayName = 'QuantumButton';

export { QuantumButton };

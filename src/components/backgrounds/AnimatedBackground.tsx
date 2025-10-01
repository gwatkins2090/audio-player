'use client';

import React from 'react';
import { motion, useReducedMotion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Mandala from '@/components/sacred/Mandala';
import FlowerOfLife from '@/components/sacred/FlowerOfLife';

export interface AnimatedBackgroundProps {
  // Background customization
  gradientFrom?: string;
  gradientVia?: string;
  gradientTo?: string;
  
  // Sacred geometry customization
  mandalaSize?: number;
  mandalaLayers?: number;
  mandalaOpacity?: number;
  mandalaSpinSeconds?: number;
  
  flowerOfLifeSize?: number;
  flowerOfLifeRings?: number;
  flowerOfLifeOpacity?: number;
  flowerOfLifeSpinSeconds?: number;
  
  // Orb customization
  showOrbs?: boolean;
  orbColor1?: string;
  orbColor2?: string;
  
  // Layout
  className?: string;
  showParallax?: boolean;
}

export default function AnimatedBackground({
  gradientFrom = '#0a0a0f',
  gradientVia = '#120a26',
  gradientTo = '#0a0a0f',
  mandalaSize = 1100,
  mandalaLayers = 9,
  mandalaOpacity = 0.4,
  mandalaSpinSeconds = 90,
  flowerOfLifeSize = 1400,
  flowerOfLifeRings = 6,
  flowerOfLifeOpacity = 0.2,
  flowerOfLifeSpinSeconds = 130,
  showOrbs = true,
  orbColor1 = 'rgba(127,57,251,0.25)',
  orbColor2 = 'rgba(0,255,212,0.18)',
  className = '',
  showParallax = true,
}: AnimatedBackgroundProps) {
  const prefers = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const xNear = useSpring(useTransform(mx, (v) => v * 0.015), { stiffness: 100, damping: 30 });
  const yNear = useSpring(useTransform(my, (v) => v * 0.015), { stiffness: 100, damping: 30 });
  const xFar = useSpring(useTransform(mx, (v) => v * 0.008), { stiffness: 100, damping: 30 });
  const yFar = useSpring(useTransform(my, (v) => v * 0.008), { stiffness: 100, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!showParallax || prefers) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mx.set(e.clientX - centerX);
    my.set(e.clientY - centerY);
  };

  return (
    <div
      className={`relative w-full h-full overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      style={{
        background: `linear-gradient(135deg, ${gradientFrom}, ${gradientVia}, ${gradientTo})`,
        // @ts-expect-error - CSS custom properties
        '--tw-gradient-from': gradientFrom,
        '--tw-gradient-via': gradientVia,
        '--tw-gradient-to': gradientTo,
        '--tw-gradient-stops': `var(--tw-gradient-from), var(--tw-gradient-via), var(--tw-gradient-to)`,
      }}
    >
      {/* Sacred backgrounds with subtle parallax */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div style={{ x: xFar, y: yFar }} className="absolute">
          <FlowerOfLife
            size={flowerOfLifeSize}
            rings={flowerOfLifeRings}
            opacity={flowerOfLifeOpacity}
            spinSeconds={flowerOfLifeSpinSeconds}
            reduceMotion={prefers ?? undefined}
            direction={-1}
            strokeOpacityMult={1.35}
            strokeWidthMult={1.35}
          />
        </motion.div>
        <motion.div style={{ x: xNear, y: yNear }} className="absolute">
          <Mandala
            size={mandalaSize}
            layers={mandalaLayers}
            opacity={mandalaOpacity}
            spinSeconds={mandalaSpinSeconds}
            reduceMotion={prefers ?? undefined}
            direction={1}
            strokeOpacityMult={1.4}
            strokeWidthMult={1.4}
          />
        </motion.div>
      </div>

      {/* Ambient orbs */}
      {showOrbs && (
        <>
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -top-20 -left-20 w-[36rem] h-[36rem] rounded-full blur-3xl"
            style={{ background: `radial-gradient(closest-side, ${orbColor1}, rgba(0,0,0,0))` }}
            animate={prefers ? undefined : { x: [0, 20, -10, 0], y: [0, -10, 10, 0] }}
            transition={{ duration: 16, repeat: Infinity }}
          />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -bottom-20 -right-20 w-[40rem] h-[40rem] rounded-full blur-3xl"
            style={{ background: `radial-gradient(closest-side, ${orbColor2}, rgba(0,0,0,0))` }}
            animate={prefers ? undefined : { x: [0, -15, 15, 0], y: [0, 10, -5, 0] }}
            transition={{ duration: 20, repeat: Infinity }}
          />
        </>
      )}

      {/* Breathing vignette overlay */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(circle at center, rgba(0,0,0,0) 0%, rgba(0,0,0,0.4) 100%)',
        }}
        animate={prefers ? undefined : { opacity: [0.4, 0.5, 0.4] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
    </div>
  );
}


'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface FlowerOfLifeProps {
  size?: number;
  rings?: number; // number of concentric hex rings
  stroke?: string;
  opacity?: number;
  className?: string;
  spinSeconds?: number;
  reduceMotion?: boolean;
  direction?: 1 | -1;
  strokeOpacityMult?: number;
  strokeWidthMult?: number;
}

export default function FlowerOfLife({
  size = 900,
  rings = 3,
  opacity = 0.18,
  className = '',
  spinSeconds = 80,
  reduceMotion,
  direction = -1,
  strokeOpacityMult = 1.25,
  strokeWidthMult = 1.3,
}: FlowerOfLifeProps) {
  const prefers = useReducedMotion();
  const rm = reduceMotion ?? prefers;
  const cx = size / 2;
  const cy = size / 2;
  const r = size * 0.09; // base circle radius

  const centers: Array<{ x: number; y: number }> = [{ x: cx, y: cy }];

  // hexagonal lattice around center
  for (let k = 1; k <= rings; k++) {
    const steps = 6 * k;
    for (let i = 0; i < steps; i++) {
      const angle = (i / steps) * Math.PI * 2;
      const radius = k * r * Math.sqrt(3);
      centers.push({ x: cx + Math.cos(angle) * radius, y: cy + Math.sin(angle) * radius });
    }
  }

  return (
    <div className={`pointer-events-none ${className}`} style={{ width: size, height: size }}>
      <motion.svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ opacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: opacity }}
        transition={{ duration: 1.2 }}
      >
        <defs>
          <linearGradient id="folStroke" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7F39FB" />
            <stop offset="100%" stopColor="#00FFD4" />
          </linearGradient>
          <radialGradient id="folGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00FFD4" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#7F39FB" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#7F39FB" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Subtle background glow */}
        <circle cx={size / 2} cy={size / 2} r={size / 2.1} fill="url(#folGlow)" opacity={0.5} />

        <motion.g
          style={{ originX: '50%', originY: '50%' }}
          animate={{ rotate: rm ? 0 : 360 * direction }}
          transition={{ duration: spinSeconds, repeat: Infinity, ease: 'linear' }}
        >
          {centers.map((c, idx) => (
            <circle
              key={idx}
              cx={c.x}
              cy={c.y}
              r={r}
              fill="none"
              stroke="url(#folStroke)"
              strokeOpacity={0.45 * strokeOpacityMult}
              strokeWidth={0.8 * strokeWidthMult}
            />
          ))}
        </motion.g>
      </motion.svg>
    </div>
  );
}


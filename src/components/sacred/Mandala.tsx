'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface MandalaProps {
  size?: number; // in px
  layers?: number;
  colorA?: string;
  colorB?: string;
  opacity?: number;
  className?: string;
  spinSeconds?: number;
  reduceMotion?: boolean;
  direction?: 1 | -1;
  strokeOpacityMult?: number;
  strokeWidthMult?: number;
}

export default function Mandala({
  size = 800,
  layers = 6,
  colorA = '#7F39FB', // cosmic purple
  colorB = '#00FFD4', // quantum teal
  opacity = 0.3,
  className = '',
  spinSeconds = 60,
  reduceMotion,
  direction = 1,
  strokeOpacityMult = 1.25,
  strokeWidthMult = 1.3,
}: MandalaProps) {
  const prefers = useReducedMotion();
  const rm = reduceMotion ?? prefers;
  const rings = Array.from({ length: layers }, (_, i) => i);
  const spokes = 24;

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
          <radialGradient id="mandalaGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={colorB} stopOpacity="1" />
            <stop offset="60%" stopColor={colorA} stopOpacity="0.45" />
            <stop offset="100%" stopColor={colorA} stopOpacity="0" />
          </radialGradient>
          <linearGradient id="mandalaStroke" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={colorA} />
            <stop offset="100%" stopColor={colorB} />
          </linearGradient>
        </defs>

        {/* Soft glow */}
        <circle cx={size / 2} cy={size / 2} r={size / 2.0} fill="url(#mandalaGlow)" opacity={0.55} />
        <circle cx={size / 2} cy={size / 2} r={size / 2.35} fill="url(#mandalaGlow)" opacity={0.35} />

        {/* Rotating groups */}
        <motion.g
          style={{ originX: '50%', originY: '50%' }}
          animate={{ rotate: rm ? 0 : 360 * direction }}
          transition={{ duration: spinSeconds, repeat: Infinity, ease: 'linear' }}
        >
          {/* Concentric rings */}
          {rings.map((r) => {
            const radius = (size / 2.2) * ((r + 1) / layers);
            return (
              <circle
                key={`ring-${r}`}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke="url(#mandalaStroke)"
                strokeOpacity={(0.6 - r * (0.5 / layers)) * strokeOpacityMult}
                strokeWidth={0.8 * strokeWidthMult}
              />
            );
          })}

          {/* Radial spokes */}
          {Array.from({ length: spokes }, (_, i) => i).map((i) => {
            const angle = (i / spokes) * Math.PI * 2;
            const x1 = size / 2 + Math.cos(angle) * (size * 0.05);
            const y1 = size / 2 + Math.sin(angle) * (size * 0.05);
            const x2 = size / 2 + Math.cos(angle) * (size / 2.2);
            const y2 = size / 2 + Math.sin(angle) * (size / 2.2);
            return (
              <line
                key={`spoke-${i}`}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="url(#mandalaStroke)"
                strokeOpacity={0.35 * strokeOpacityMult}
                strokeWidth={0.7 * strokeWidthMult}
              />
            );
          })}
        </motion.g>

        {/* Inner seed of life */}
        {Array.from({ length: 6 }, (_, i) => i).map((i) => {
          const angle = (i / 6) * Math.PI * 2;
          const cx = size / 2 + Math.cos(angle) * (size * 0.09);
          const cy = size / 2 + Math.sin(angle) * (size * 0.09);
          return (
            <circle
              key={`seed-${i}`}
              cx={cx}
              cy={cy}
              r={size * 0.09}
              fill="none"
              stroke="url(#mandalaStroke)"
              strokeOpacity={0.6 * strokeOpacityMult}
              strokeWidth={0.8 * strokeWidthMult}
            />
          );
        })}

        {/* Core */}
        <circle cx={size / 2} cy={size / 2} r={size * 0.02} fill={colorB} fillOpacity={0.9} />
      </motion.svg>
    </div>
  );
}


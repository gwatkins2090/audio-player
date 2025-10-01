'use client';

import React from 'react';
import { motion, useReducedMotion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import Mandala from '@/components/sacred/Mandala';
import FlowerOfLife from '@/components/sacred/FlowerOfLife';

export interface HeroBannerProps {
  // Content props
  title: string;
  subtitle: string;
  chips?: string[];
  
  // CTA props
  primaryCTA?: {
    text: string;
    href: string;
  };
  secondaryCTA?: {
    text: string;
    onClick?: () => void;
    href?: string;
  };
  
  // Profile image props
  showProfileImage?: boolean;
  profileImageUrl?: string;
  profileImagePlaceholder?: string;
  
  // Scroll indicator props
  showScrollIndicator?: boolean;
  scrollIndicatorText?: string;
  onScrollClick?: () => void;
  
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
  minHeight?: string;
  className?: string;
}

export default function HeroBanner({
  title,
  subtitle,
  chips = [],
  primaryCTA,
  secondaryCTA,
  showProfileImage = false,
  profileImageUrl,
  profileImagePlaceholder = 'Add profile image',
  showScrollIndicator = true,
  scrollIndicatorText = 'Scroll',
  onScrollClick,
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
  minHeight = '92vh',
  className = '',
}: HeroBannerProps) {
  const prefers = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const xFar = useSpring(useTransform(mx, (v) => v * 0.6), { stiffness: 60, damping: 20 });
  const yFar = useSpring(useTransform(my, (v) => v * 0.6), { stiffness: 60, damping: 20 });
  const xNear = useSpring(useTransform(mx, (v) => v * 0.3), { stiffness: 60, damping: 20 });
  const yNear = useSpring(useTransform(my, (v) => v * 0.3), { stiffness: 60, damping: 20 });

  const handleScrollClick = () => {
    if (onScrollClick) {
      onScrollClick();
    }
  };

  const handleSecondaryCTA = () => {
    if (secondaryCTA?.onClick) {
      secondaryCTA.onClick();
    } else if (secondaryCTA?.href) {
      window.location.href = secondaryCTA.href;
    }
  };

  return (
    <section
      onMouseMove={(e) => {
        if (prefers) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const dx = (e.clientX - (rect.left + rect.width / 2)) / rect.width; // -0.5..0.5
        const dy = (e.clientY - (rect.top + rect.height / 2)) / rect.height;
        mx.set(dx * 60);
        my.set(dy * 60);
      }}
      className={`relative flex items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] ${className}`}
      style={{
        minHeight,
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
            className="pointer-events-none absolute -bottom-24 -right-20 w-[28rem] h-[28rem] rounded-full blur-3xl"
            style={{ background: `radial-gradient(closest-side, ${orbColor2}, rgba(0,0,0,0))` }}
            animate={prefers ? undefined : { x: [0, -10, 15, 0], y: [0, 12, -8, 0] }}
            transition={{ duration: 20, repeat: Infinity }}
          />
        </>
      )}

      {/* Soft vignette + breathing */}
      <motion.div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60"
        animate={prefers ? undefined : { opacity: [0.85, 0.9, 0.85] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <motion.h1
              className="text-5xl md:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-white via-[#e9ddff] to-[#9b87f5] bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {title}
            </motion.h1>

            <motion.p
              className="mt-5 text-lg md:text-2xl text-[#c9c7d3]"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              {subtitle}
            </motion.p>

            {/* Ethereal chips */}
            {chips.length > 0 && (
              <motion.div
                className="mt-6 flex flex-wrap items-center justify-start gap-3"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.5 }}
              >
                {chips.map((chip) => (
                  <span key={chip} className="text-xs md:text-sm text-[#cfc9ea] bg-white/5 border border-white/10 rounded-full px-3 py-1">
                    {chip}
                  </span>
                ))}
              </motion.div>
            )}

            {/* CTAs */}
            {(primaryCTA || secondaryCTA) && (
              <motion.div
                className="mt-10 flex items-center justify-start md:justify-start gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                {primaryCTA && (
                  <a
                    href={primaryCTA.href}
                    className="relative inline-flex items-center justify-center rounded-xl px-6 py-3 font-semibold text-white bg-gradient-to-r from-[#7F39FB] to-[#00FFD4] shadow-[0_8px_30px_rgb(127,57,251,0.25)] hover:shadow-[0_8px_50px_rgb(0,255,212,0.25)] transition-shadow"
                  >
                    {primaryCTA.text}
                  </a>
                )}
                {secondaryCTA && (
                  <button
                    onClick={handleSecondaryCTA}
                    className="rounded-xl px-6 py-3 font-semibold text-[#c9c7d3] bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                  >
                    {secondaryCTA.text}
                  </button>
                )}
              </motion.div>
            )}
          </div>
          
          {showProfileImage && (
            <div className="hidden md:flex justify-center">
              <div>
                <div className="relative w-56 h-56 md:w-72 md:h-72 mx-auto rounded-full overflow-hidden border border-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
                  {profileImageUrl ? (
                    <Image src={profileImageUrl} alt="Profile" fill className="object-cover" />
                  ) : (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-br from-[#7F39FB]/35 to-[#00FFD4]/35" />
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,_rgba(255,255,255,0.12),_transparent_40%)]" />
                    </>
                  )}
                </div>
                {!profileImageUrl && profileImagePlaceholder && (
                  <p className="mt-4 text-center text-sm text-[#c9c7d3] opacity-80">{profileImagePlaceholder}</p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Scroll indicator */}
        {showScrollIndicator && (
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 bottom-6 text-[#a79dc9]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <button onClick={handleScrollClick} className="flex flex-col items-center gap-2 opacity-80 hover:opacity-100 transition-opacity">
              <span className="text-xs tracking-widest uppercase">{scrollIndicatorText}</span>
              <ChevronDown className="w-6 h-6 animate-bounce" />
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}


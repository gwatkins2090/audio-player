'use client';

import { useEffect, useRef } from 'react';
import { useTranscendenceStore } from '@/lib/transcendence/store';

export interface SpiritCursorProps {
  className?: string;
}

export const SpiritCursor: React.FC<SpiritCursorProps> = ({ className = '' }) => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const { setCursorPosition, ui } = useTranscendenceStore();
  
  useEffect(() => {
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let animationId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setCursorPosition(mouseX, mouseY);
    };

    const animateCursor = () => {
      const dx = mouseX - cursorX;
      const dy = mouseY - cursorY;
      
      cursorX += dx * 0.1;
      cursorY += dy * 0.1;
      
      if (cursorRef.current) {
        cursorRef.current.style.left = `${cursorX}px`;
        cursorRef.current.style.top = `${cursorY}px`;
      }
      
      animationId = requestAnimationFrame(animateCursor);
    };

    // Only show custom cursor on non-touch devices
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (!isTouchDevice && !ui.reducedMotion) {
      document.addEventListener('mousemove', handleMouseMove);
      animateCursor();
      
      // Hide default cursor
      document.body.style.cursor = 'none';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      document.body.style.cursor = 'auto';
    };
  }, [setCursorPosition, ui.reducedMotion]);

  // Don't render on touch devices or when reduced motion is enabled
  if (typeof window !== 'undefined' && ('ontouchstart' in window || ui.reducedMotion)) {
    return null;
  }

  // Don't render on server
  if (typeof window === 'undefined') {
    return null;
  }

  return (
    <div
      ref={cursorRef}
      className={`spirit-cursor fixed pointer-events-none z-[9999] mix-blend-screen ${className}`}
      style={{ width: '40px', height: '40px' }}
    >
      {/* Inner core */}
      <div className="cursor-inner absolute w-2 h-2 bg-astral-teal rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-quantum animate-pulse-core" />
      
      {/* Outer ring */}
      <div className="cursor-outer absolute w-10 h-10 border-2 border-cosmic-violet rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-rotate-field" />
      
      {/* Energy trails */}
      <div className="cursor-trail-1 absolute w-6 h-6 border border-astral-blue rounded-full transform -translate-x-1/2 -translate-y-1/2 opacity-60 animate-pulse" style={{ animationDelay: '0.1s' }} />
      <div className="cursor-trail-2 absolute w-8 h-8 border border-chakra-pink rounded-full transform -translate-x-1/2 -translate-y-1/2 opacity-40 animate-pulse" style={{ animationDelay: '0.2s' }} />
    </div>
  );
};

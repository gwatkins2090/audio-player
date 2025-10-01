'use client';

import { useEffect, useRef, useState } from 'react';

interface SpiritCursorDemoProps {
  className?: string;
}

/**
 * Demo version of SpiritCursor that only affects its container
 * Safe for use in component showcases
 */
export const SpiritCursorDemo: React.FC<SpiritCursorDemoProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  
  useEffect(() => {
    if (!containerRef.current || !cursorRef.current) return;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let animationId: number;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const handleMouseEnter = () => {
      setIsHovering(true);
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
    };

    const animateCursor = () => {
      const dx = mouseX - cursorX;
      const dy = mouseY - cursorY;
      
      cursorX += dx * 0.15;
      cursorY += dy * 0.15;
      
      if (cursorRef.current) {
        cursorRef.current.style.left = `${cursorX}px`;
        cursorRef.current.style.top = `${cursorY}px`;
      }
      
      animationId = requestAnimationFrame(animateCursor);
    };

    const container = containerRef.current;
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);
    animateCursor();

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full ${isHovering ? 'cursor-none' : ''} ${className}`}
    >
      {/* Custom cursor - only visible when hovering */}
      {isHovering && (
        <div
          ref={cursorRef}
          className="spirit-cursor absolute pointer-events-none z-50 mix-blend-screen"
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
      )}
      
      {/* Content */}
      <div className="flex items-center justify-center h-full">
        <div className="text-center z-10">
          <h3 className="text-2xl font-bold text-white mb-3">Move your cursor here</h3>
          <p className="text-gray-300 text-lg">Experience the ethereal cursor effect</p>
          <p className="text-sm text-gray-500 mt-4">
            (Cursor effect is scoped to this area only)
          </p>
        </div>
      </div>
    </div>
  );
};


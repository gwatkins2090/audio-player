'use client';

import React from 'react';

interface Cursor1Props {
  size?: number;
  className?: string;
}

export const Cursor1: React.FC<Cursor1Props> = ({ size = 64, className = '' }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 64 64" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <radialGradient id="gradient1" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ff00ff">
            <animate attributeName="stop-color" 
                     values="#ff00ff;#00ffff;#ffff00;#ff00ff" 
                     dur="4s" 
                     repeatCount="indefinite"/>
          </stop>
          <stop offset="50%" stopColor="#00ffff">
            <animate attributeName="stop-color" 
                     values="#00ffff;#ffff00;#ff00ff;#00ffff" 
                     dur="4s" 
                     repeatCount="indefinite"/>
          </stop>
          <stop offset="100%" stopColor="#ffff00">
            <animate attributeName="stop-color" 
                     values="#ffff00;#ff00ff;#00ffff;#ffff00" 
                     dur="4s" 
                     repeatCount="indefinite"/>
          </stop>
        </radialGradient>
        
        <radialGradient id="gradient2" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ff6b6b">
            <animate attributeName="stop-color" 
                     values="#ff6b6b;#4ecdc4;#45b7d1;#ff6b6b" 
                     dur="3s" 
                     repeatCount="indefinite"/>
          </stop>
          <stop offset="100%" stopColor="#4ecdc4">
            <animate attributeName="stop-color" 
                     values="#4ecdc4;#45b7d1;#ff6b6b;#4ecdc4" 
                     dur="3s" 
                     repeatCount="indefinite"/>
          </stop>
        </radialGradient>
        
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      <circle cx="32" cy="32" r="28" fill="url(#gradient1)" opacity="0.3" filter="url(#glow)">
        <animate attributeName="r" values="28;32;28" dur="2s" repeatCount="indefinite"/>
      </circle>
      
      <circle cx="32" cy="32" r="20" fill="none" stroke="url(#gradient2)" strokeWidth="2">
        <animate attributeName="r" values="20;24;20" dur="2s" repeatCount="indefinite"/>
        <animate attributeName="stroke-width" values="2;3;2" dur="2s" repeatCount="indefinite"/>
      </circle>
      
      <circle cx="32" cy="32" r="12" fill="url(#gradient1)" opacity="0.8">
        <animate attributeName="r" values="12;14;12" dur="1.5s" repeatCount="indefinite"/>
      </circle>
      
      <g transform="translate(32, 32)">
        <circle cx="0" cy="-18" r="3" fill="url(#gradient2)">
          <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="4s" repeatCount="indefinite"/>
        </circle>
        <circle cx="0" cy="-18" r="3" fill="url(#gradient2)">
          <animateTransform attributeName="transform" type="rotate" from="120" to="480" dur="4s" repeatCount="indefinite"/>
        </circle>
        <circle cx="0" cy="-18" r="3" fill="url(#gradient2)">
          <animateTransform attributeName="transform" type="rotate" from="240" to="600" dur="4s" repeatCount="indefinite"/>
        </circle>
      </g>
      
      <circle cx="32" cy="32" r="4" fill="white" opacity="0.9">
        <animate attributeName="opacity" values="0.9;0.5;0.9" dur="1s" repeatCount="indefinite"/>
      </circle>
    </svg>
  );
};


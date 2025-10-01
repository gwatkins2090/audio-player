'use client';

import React from 'react';

interface Cursor2Props {
  size?: number;
  className?: string;
}

export const Cursor2: React.FC<Cursor2Props> = ({ size = 64, className = '' }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 64 64" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="warmGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f093fb">
            <animate attributeName="stop-color" 
                     values="#f093fb;#f5576c;#ffa726;#f093fb" 
                     dur="5s" 
                     repeatCount="indefinite"/>
          </stop>
          <stop offset="100%" stopColor="#f5576c">
            <animate attributeName="stop-color" 
                     values="#f5576c;#ffa726;#f093fb;#f5576c" 
                     dur="5s" 
                     repeatCount="indefinite"/>
          </stop>
        </linearGradient>
        
        <linearGradient id="coolGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4facfe">
            <animate attributeName="stop-color" 
                     values="#4facfe;#00f2fe;#43e97b;#4facfe" 
                     dur="4s" 
                     repeatCount="indefinite"/>
          </stop>
          <stop offset="100%" stopColor="#00f2fe">
            <animate attributeName="stop-color" 
                     values="#00f2fe;#43e97b;#4facfe;#00f2fe" 
                     dur="4s" 
                     repeatCount="indefinite"/>
          </stop>
        </linearGradient>
        
        <filter id="glow2">
          <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      <rect x="8" y="8" width="48" height="48" rx="24" fill="url(#warmGrad)" opacity="0.2" filter="url(#glow2)">
        <animate attributeName="rx" values="24;12;24" dur="3s" repeatCount="indefinite"/>
      </rect>
      
      <rect x="12" y="12" width="40" height="40" rx="20" fill="none" stroke="url(#coolGrad)" strokeWidth="2">
        <animate attributeName="rx" values="20;8;20" dur="3s" repeatCount="indefinite"/>
        <animateTransform attributeName="transform" type="rotate" from="0 32 32" to="360 32 32" dur="8s" repeatCount="indefinite"/>
      </rect>
      
      <circle cx="32" cy="32" r="16" fill="url(#warmGrad)" opacity="0.6">
        <animate attributeName="r" values="16;18;16" dur="2s" repeatCount="indefinite"/>
      </circle>
      
      <g transform="translate(32, 32)">
        <rect x="-2" y="-22" width="4" height="8" fill="url(#coolGrad)" rx="2">
          <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="3s" repeatCount="indefinite"/>
        </rect>
        <rect x="-2" y="-22" width="4" height="8" fill="url(#warmGrad)" rx="2">
          <animateTransform attributeName="transform" type="rotate" from="90" to="450" dur="3s" repeatCount="indefinite"/>
        </rect>
        <rect x="-2" y="-22" width="4" height="8" fill="url(#coolGrad)" rx="2">
          <animateTransform attributeName="transform" type="rotate" from="180" to="540" dur="3s" repeatCount="indefinite"/>
        </rect>
        <rect x="-2" y="-22" width="4" height="8" fill="url(#warmGrad)" rx="2">
          <animateTransform attributeName="transform" type="rotate" from="270" to="630" dur="3s" repeatCount="indefinite"/>
        </rect>
      </g>
      
      <circle cx="32" cy="32" r="6" fill="white" opacity="0.9">
        <animate attributeName="r" values="6;8;6" dur="1.5s" repeatCount="indefinite"/>
      </circle>
      
      <circle cx="32" cy="32" r="3" fill="url(#warmGrad)">
        <animate attributeName="opacity" values="1;0.5;1" dur="1s" repeatCount="indefinite"/>
      </circle>
    </svg>
  );
};


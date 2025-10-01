'use client';

import React from 'react';

interface GeometricMandalaProps {
  size?: number;
  className?: string;
}

export const GeometricMandala: React.FC<GeometricMandalaProps> = ({ size = 200, className = '' }) => {
  return (
    <svg 
      id="geometric" 
      width={size}
      height={size}
      viewBox="0 0 200 200" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <g id="triangle">
          <path d="M 0,-40 L 6,-25 L -6,-25 Z" fill="#10B981" stroke="#059669" strokeWidth="1"/>
        </g>
        <g id="diamond">
          <path d="M 0,-35 L 5,-28 L 0,-21 L -5,-28 Z" fill="#34D399" stroke="#10B981" strokeWidth="1"/>
        </g>
      </defs>
      <circle cx="100" cy="100" r="95" fill="#ECFDF5" stroke="#10B981" strokeWidth="2"/>
      <circle cx="100" cy="100" r="80" fill="none" stroke="#10B981" strokeWidth="2"/>
      <g transform="translate(100,100)">
        <use href="#triangle" transform="rotate(0)"/>
        <use href="#triangle" transform="rotate(45)"/>
        <use href="#triangle" transform="rotate(90)"/>
        <use href="#triangle" transform="rotate(135)"/>
        <use href="#triangle" transform="rotate(180)"/>
        <use href="#triangle" transform="rotate(225)"/>
        <use href="#triangle" transform="rotate(270)"/>
        <use href="#triangle" transform="rotate(315)"/>
      </g>
      <g transform="translate(100,100)">
        <use href="#diamond" transform="rotate(22.5)"/>
        <use href="#diamond" transform="rotate(67.5)"/>
        <use href="#diamond" transform="rotate(112.5)"/>
        <use href="#diamond" transform="rotate(157.5)"/>
        <use href="#diamond" transform="rotate(202.5)"/>
        <use href="#diamond" transform="rotate(247.5)"/>
        <use href="#diamond" transform="rotate(292.5)"/>
        <use href="#diamond" transform="rotate(337.5)"/>
      </g>
      <circle cx="100" cy="100" r="50" fill="none" stroke="#10B981" strokeWidth="1.5"/>
      <circle cx="100" cy="100" r="40" fill="none" stroke="#34D399" strokeWidth="1"/>
      <circle cx="100" cy="100" r="25" fill="#10B981"/>
      <circle cx="100" cy="100" r="20" fill="#D1FAE5"/>
      <circle cx="100" cy="100" r="10" fill="#10B981"/>
      <g transform="translate(100,100)" fill="#34D399">
        <circle cx="0" cy="-15" r="2"/>
        <circle cx="0" cy="15" r="2"/>
        <circle cx="15" cy="0" r="2"/>
        <circle cx="-15" cy="0" r="2"/>
      </g>
    </svg>
  );
};


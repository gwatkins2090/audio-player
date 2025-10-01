'use client';

import React from 'react';

interface SunburstMandalaProps {
  size?: number;
  className?: string;
}

export const SunburstMandala: React.FC<SunburstMandalaProps> = ({ size = 200, className = '' }) => {
  return (
    <svg 
      id="sunburst" 
      width={size}
      height={size}
      viewBox="0 0 200 200" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <g id="ray">
          <path d="M 0,-70 L 3,-40 L 0,-35 L -3,-40 Z" fill="#F59E0B" stroke="#D97706" strokeWidth="0.5"/>
        </g>
        <g id="curve">
          <path d="M 0,-55 Q 5,-48 0,-45 Q -5,-48 0,-55" fill="#FCD34D" stroke="#F59E0B" strokeWidth="0.5"/>
        </g>
      </defs>
      <circle cx="100" cy="100" r="95" fill="#FFFBEB" stroke="#F59E0B" strokeWidth="2"/>
      <g transform="translate(100,100)">
        <use href="#ray" transform="rotate(0)"/>
        <use href="#ray" transform="rotate(15)"/>
        <use href="#ray" transform="rotate(30)"/>
        <use href="#ray" transform="rotate(45)"/>
        <use href="#ray" transform="rotate(60)"/>
        <use href="#ray" transform="rotate(75)"/>
        <use href="#ray" transform="rotate(90)"/>
        <use href="#ray" transform="rotate(105)"/>
        <use href="#ray" transform="rotate(120)"/>
        <use href="#ray" transform="rotate(135)"/>
        <use href="#ray" transform="rotate(150)"/>
        <use href="#ray" transform="rotate(165)"/>
        <use href="#ray" transform="rotate(180)"/>
        <use href="#ray" transform="rotate(195)"/>
        <use href="#ray" transform="rotate(210)"/>
        <use href="#ray" transform="rotate(225)"/>
        <use href="#ray" transform="rotate(240)"/>
        <use href="#ray" transform="rotate(255)"/>
        <use href="#ray" transform="rotate(270)"/>
        <use href="#ray" transform="rotate(285)"/>
        <use href="#ray" transform="rotate(300)"/>
        <use href="#ray" transform="rotate(315)"/>
        <use href="#ray" transform="rotate(330)"/>
        <use href="#ray" transform="rotate(345)"/>
      </g>
      <g transform="translate(100,100)">
        <use href="#curve" transform="rotate(0)"/>
        <use href="#curve" transform="rotate(30)"/>
        <use href="#curve" transform="rotate(60)"/>
        <use href="#curve" transform="rotate(90)"/>
        <use href="#curve" transform="rotate(120)"/>
        <use href="#curve" transform="rotate(150)"/>
        <use href="#curve" transform="rotate(180)"/>
        <use href="#curve" transform="rotate(210)"/>
        <use href="#curve" transform="rotate(240)"/>
        <use href="#curve" transform="rotate(270)"/>
        <use href="#curve" transform="rotate(300)"/>
        <use href="#curve" transform="rotate(330)"/>
      </g>
      <circle cx="100" cy="100" r="60" fill="none" stroke="#F59E0B" strokeWidth="2"/>
      <circle cx="100" cy="100" r="50" fill="none" stroke="#FCD34D" strokeWidth="1"/>
      <circle cx="100" cy="100" r="35" fill="none" stroke="#F59E0B" strokeWidth="1.5"/>
      <circle cx="100" cy="100" r="25" fill="#F59E0B"/>
      <circle cx="100" cy="100" r="18" fill="#FEF3C7"/>
      <circle cx="100" cy="100" r="12" fill="#F59E0B"/>
      <circle cx="100" cy="100" r="6" fill="#FCD34D"/>
    </svg>
  );
};


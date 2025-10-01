'use client';

import React from 'react';

interface LotusMandalaProps {
  size?: number;
  className?: string;
}

export const LotusMandala: React.FC<LotusMandalaProps> = ({ size = 200, className = '' }) => {
  return (
    <svg 
      id="lotus" 
      width={size}
      height={size}
      viewBox="0 0 200 200" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <g id="petal">
          <path d="M 0,-60 Q 10,-40 0,-20 Q -10,-40 0,-60" fill="#8B5CF6" stroke="#6D28D9" strokeWidth="1"/>
        </g>
        <g id="layer2">
          <path d="M 0,-50 Q 8,-35 0,-20 Q -8,-35 0,-50" fill="#A78BFA" stroke="#7C3AED" strokeWidth="1"/>
        </g>
      </defs>
      <circle cx="100" cy="100" r="95" fill="#F3E8FF" stroke="#8B5CF6" strokeWidth="2"/>
      <g transform="translate(100,100)">
        <use href="#petal" transform="rotate(0)"/>
        <use href="#petal" transform="rotate(30)"/>
        <use href="#petal" transform="rotate(60)"/>
        <use href="#petal" transform="rotate(90)"/>
        <use href="#petal" transform="rotate(120)"/>
        <use href="#petal" transform="rotate(150)"/>
        <use href="#petal" transform="rotate(180)"/>
        <use href="#petal" transform="rotate(210)"/>
        <use href="#petal" transform="rotate(240)"/>
        <use href="#petal" transform="rotate(270)"/>
        <use href="#petal" transform="rotate(300)"/>
        <use href="#petal" transform="rotate(330)"/>
      </g>
      <g transform="translate(100,100)">
        <use href="#layer2" transform="rotate(15)"/>
        <use href="#layer2" transform="rotate(45)"/>
        <use href="#layer2" transform="rotate(75)"/>
        <use href="#layer2" transform="rotate(105)"/>
        <use href="#layer2" transform="rotate(135)"/>
        <use href="#layer2" transform="rotate(165)"/>
        <use href="#layer2" transform="rotate(195)"/>
        <use href="#layer2" transform="rotate(225)"/>
        <use href="#layer2" transform="rotate(255)"/>
        <use href="#layer2" transform="rotate(285)"/>
        <use href="#layer2" transform="rotate(315)"/>
        <use href="#layer2" transform="rotate(345)"/>
      </g>
      <circle cx="100" cy="100" r="15" fill="#8B5CF6" stroke="#6D28D9" strokeWidth="2"/>
      <circle cx="100" cy="100" r="8" fill="#F3E8FF"/>
    </svg>
  );
};


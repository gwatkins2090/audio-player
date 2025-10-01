'use client';

import React from 'react';

interface CelticMandalaProps {
  size?: number;
  className?: string;
}

export const CelticMandala: React.FC<CelticMandalaProps> = ({ size = 200, className = '' }) => {
  return (
    <svg 
      id="celtic" 
      width={size}
      height={size}
      viewBox="0 0 200 200" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <g id="knot">
          <path d="M -5,-60 Q -2,-55 0,-50 Q 2,-55 5,-60 L 3,-50 Q 0,-52 -3,-50 Z" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="1"/>
        </g>
        <g id="arc">
          <path d="M -8,-55 Q 0,-48 8,-55" fill="none" stroke="#60A5FA" strokeWidth="2" strokeLinecap="round"/>
        </g>
      </defs>
      <circle cx="100" cy="100" r="95" fill="#EFF6FF" stroke="#3B82F6" strokeWidth="2"/>
      <circle cx="100" cy="100" r="80" fill="none" stroke="#3B82F6" strokeWidth="2"/>
      <circle cx="100" cy="100" r="75" fill="none" stroke="#60A5FA" strokeWidth="1"/>
      <g transform="translate(100,100)">
        <use href="#knot" transform="rotate(0)"/>
        <use href="#knot" transform="rotate(30)"/>
        <use href="#knot" transform="rotate(60)"/>
        <use href="#knot" transform="rotate(90)"/>
        <use href="#knot" transform="rotate(120)"/>
        <use href="#knot" transform="rotate(150)"/>
        <use href="#knot" transform="rotate(180)"/>
        <use href="#knot" transform="rotate(210)"/>
        <use href="#knot" transform="rotate(240)"/>
        <use href="#knot" transform="rotate(270)"/>
        <use href="#knot" transform="rotate(300)"/>
        <use href="#knot" transform="rotate(330)"/>
      </g>
      <g transform="translate(100,100)">
        <use href="#arc" transform="rotate(15)"/>
        <use href="#arc" transform="rotate(45)"/>
        <use href="#arc" transform="rotate(75)"/>
        <use href="#arc" transform="rotate(105)"/>
        <use href="#arc" transform="rotate(135)"/>
        <use href="#arc" transform="rotate(165)"/>
        <use href="#arc" transform="rotate(195)"/>
        <use href="#arc" transform="rotate(225)"/>
        <use href="#arc" transform="rotate(255)"/>
        <use href="#arc" transform="rotate(285)"/>
        <use href="#arc" transform="rotate(315)"/>
        <use href="#arc" transform="rotate(345)"/>
      </g>
      <circle cx="100" cy="100" r="45" fill="none" stroke="#3B82F6" strokeWidth="2.5"/>
      <g fill="none" stroke="#60A5FA" strokeWidth="1.5">
        <circle cx="100" cy="65" r="8"/>
        <circle cx="130" cy="80" r="8"/>
        <circle cx="130" cy="120" r="8"/>
        <circle cx="100" cy="135" r="8"/>
        <circle cx="70" cy="120" r="8"/>
        <circle cx="70" cy="80" r="8"/>
      </g>
      <circle cx="100" cy="100" r="30" fill="none" stroke="#3B82F6" strokeWidth="2"/>
      <circle cx="100" cy="100" r="22" fill="none" stroke="#60A5FA" strokeWidth="1.5"/>
      <circle cx="100" cy="100" r="15" fill="#3B82F6"/>
      <circle cx="100" cy="100" r="10" fill="#DBEAFE"/>
      <g fill="#3B82F6">
        <circle cx="100" cy="93" r="2"/>
        <circle cx="107" cy="100" r="2"/>
        <circle cx="100" cy="107" r="2"/>
        <circle cx="93" cy="100" r="2"/>
      </g>
    </svg>
  );
};


'use client';

import React from 'react';

interface ZenMandalaProps {
  size?: number;
  className?: string;
}

export const ZenMandala: React.FC<ZenMandalaProps> = ({ size = 200, className = '' }) => {
  return (
    <svg 
      id="zen" 
      width={size}
      height={size}
      viewBox="0 0 200 200" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <g id="petal-zen">
          <path d="M 0,-55 C 5,-50 8,-45 8,-38 C 8,-32 5,-28 0,-25 C -5,-28 -8,-32 -8,-38 C -8,-45 -5,-50 0,-55" fill="none" stroke="#6366F1" strokeWidth="1.5"/>
        </g>
        <g id="dot-cluster">
          <circle cx="0" cy="-45" r="1.5" fill="#6366F1"/>
          <circle cx="-3" cy="-47" r="1" fill="#818CF8"/>
          <circle cx="3" cy="-47" r="1" fill="#818CF8"/>
        </g>
      </defs>
      <circle cx="100" cy="100" r="95" fill="#F5F3FF" stroke="#6366F1" strokeWidth="2"/>
      <g transform="translate(100,100)" fill="none" stroke="#C7D2FE" strokeWidth="1">
        <circle r="82"/>
        <circle r="78"/>
      </g>
      <g transform="translate(100,100)">
        <use href="#petal-zen" transform="rotate(0)"/>
        <use href="#petal-zen" transform="rotate(30)"/>
        <use href="#petal-zen" transform="rotate(60)"/>
        <use href="#petal-zen" transform="rotate(90)"/>
        <use href="#petal-zen" transform="rotate(120)"/>
        <use href="#petal-zen" transform="rotate(150)"/>
        <use href="#petal-zen" transform="rotate(180)"/>
        <use href="#petal-zen" transform="rotate(210)"/>
        <use href="#petal-zen" transform="rotate(240)"/>
        <use href="#petal-zen" transform="rotate(270)"/>
        <use href="#petal-zen" transform="rotate(300)"/>
        <use href="#petal-zen" transform="rotate(330)"/>
      </g>
      <g transform="translate(100,100)">
        <use href="#dot-cluster" transform="rotate(15)"/>
        <use href="#dot-cluster" transform="rotate(45)"/>
        <use href="#dot-cluster" transform="rotate(75)"/>
        <use href="#dot-cluster" transform="rotate(105)"/>
        <use href="#dot-cluster" transform="rotate(135)"/>
        <use href="#dot-cluster" transform="rotate(165)"/>
        <use href="#dot-cluster" transform="rotate(195)"/>
        <use href="#dot-cluster" transform="rotate(225)"/>
        <use href="#dot-cluster" transform="rotate(255)"/>
        <use href="#dot-cluster" transform="rotate(285)"/>
        <use href="#dot-cluster" transform="rotate(315)"/>
        <use href="#dot-cluster" transform="rotate(345)"/>
      </g>
      <g fill="none" stroke="#6366F1">
        <circle cx="100" cy="100" r="60" strokeWidth="1"/>
        <circle cx="100" cy="100" r="50" strokeWidth="1.5"/>
        <circle cx="100" cy="100" r="38" strokeWidth="1"/>
      </g>
      <g fill="none" stroke="#818CF8" strokeWidth="1">
        <circle cx="100" cy="100" r="32"/>
        <circle cx="100" cy="100" r="26"/>
      </g>
      <g transform="translate(100,100)" fill="none" stroke="#6366F1" strokeWidth="1.5">
        <path d="M 0,-18 Q 5,-15 8,-10 Q 5,-5 0,-2 Q -5,-5 -8,-10 Q -5,-15 0,-18"/>
        <path d="M 18,0 Q 15,5 10,8 Q 5,5 2,0 Q 5,-5 10,-8 Q 15,-5 18,0"/>
        <path d="M 0,18 Q 5,15 8,10 Q 5,5 0,2 Q -5,5 -8,10 Q -5,15 0,18"/>
        <path d="M -18,0 Q -15,5 -10,8 Q -5,5 -2,0 Q -5,-5 -10,-8 Q -15,-5 -18,0"/>
      </g>
      <circle cx="100" cy="100" r="10" fill="#6366F1"/>
      <circle cx="100" cy="100" r="6" fill="#E0E7FF"/>
      <circle cx="100" cy="100" r="3" fill="#6366F1"/>
    </svg>
  );
};


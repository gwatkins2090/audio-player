'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useTranscendenceStore } from '@/lib/transcendence/store';

export interface RealityParticleSystemProps {
  count?: number;
  type?: 'consciousness' | 'code' | 'energy' | 'quantum' | 'reality-glitch';
  interactive?: boolean;
  scale?: number;
}

export function RealityParticleSystem({ 
  count = 1000, 
  type = 'consciousness',
  interactive = true,
  scale = 1
}: RealityParticleSystemProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const { agent, ui } = useTranscendenceStore();

  // Generate particle system based on type
  const particleData = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const velocities = new Float32Array(count * 3);
    const phases = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Generate positions based on type
      switch (type) {
        case 'consciousness':
          // Fibonacci spiral distribution
          const goldenAngle = Math.PI * (3 - Math.sqrt(5));
          const radius = Math.sqrt(i / count) * 5;
          const angle = i * goldenAngle;
          positions[i3] = radius * Math.cos(angle);
          positions[i3 + 1] = radius * Math.sin(angle);
          positions[i3 + 2] = (Math.random() - 0.5) * 2;
          break;

        case 'code':
          // Matrix-like grid with noise
          const gridSize = Math.cbrt(count);
          const x = (i % gridSize) - gridSize / 2;
          const y = Math.floor(i / gridSize) % gridSize - gridSize / 2;
          const z = Math.floor(i / (gridSize * gridSize)) - gridSize / 2;
          positions[i3] = x * 0.5 + (Math.random() - 0.5) * 0.2;
          positions[i3 + 1] = y * 0.5 + (Math.random() - 0.5) * 0.2;
          positions[i3 + 2] = z * 0.5 + (Math.random() - 0.5) * 0.2;
          break;

        case 'energy':
          // Spherical distribution with energy flows
          const phi = Math.acos(1 - 2 * Math.random());
          const theta = 2 * Math.PI * Math.random();
          const r = Math.pow(Math.random(), 1/3) * 3;
          positions[i3] = r * Math.sin(phi) * Math.cos(theta);
          positions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
          positions[i3 + 2] = r * Math.cos(phi);
          break;

        case 'quantum':
          // Quantum probability cloud
          const gaussian = () => {
            let u = 0, v = 0;
            while(u === 0) u = Math.random();
            while(v === 0) v = Math.random();
            return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
          };
          positions[i3] = gaussian() * 2;
          positions[i3 + 1] = gaussian() * 2;
          positions[i3 + 2] = gaussian() * 2;
          break;

        case 'reality-glitch':
          // Chaotic distribution with glitch patterns
          positions[i3] = (Math.random() - 0.5) * 10;
          positions[i3 + 1] = (Math.random() - 0.5) * 10;
          positions[i3 + 2] = (Math.random() - 0.5) * 10;
          // Add glitch displacement
          if (Math.random() < 0.1) {
            positions[i3] += (Math.random() - 0.5) * 5;
            positions[i3 + 1] += (Math.random() - 0.5) * 5;
          }
          break;

        default:
          positions[i3] = (Math.random() - 0.5) * 10;
          positions[i3 + 1] = (Math.random() - 0.5) * 10;
          positions[i3 + 2] = (Math.random() - 0.5) * 10;
      }

      // Set colors based on type
      const colorPalettes = {
        consciousness: [
          [0.5, 0.22, 0.98], // Cosmic purple
          [0, 0.83, 1], // Astral blue
          [0, 1, 0.83], // Quantum teal
          [1, 0, 1], // Chakra pink
          [1, 0.84, 0] // Aura gold
        ],
        code: [
          [0, 1, 0.83], // Matrix green
          [0.5, 0.22, 0.98], // Purple
          [1, 1, 1] // White
        ],
        energy: [
          [1, 0.84, 0], // Gold
          [1, 0.27, 0.21], // Orange
          [1, 0, 0] // Red
        ],
        quantum: [
          [0.5, 0.22, 0.98], // Purple
          [0, 0.83, 1], // Blue
          [1, 1, 1] // White
        ],
        'reality-glitch': [
          [1, 0, 1], // Magenta
          [0, 1, 1], // Cyan
          [1, 1, 0], // Yellow
          [1, 0, 0] // Red
        ]
      };

      const palette = colorPalettes[type];
      const colorIndex = Math.floor(Math.random() * palette.length);
      const [r, g, b] = palette[colorIndex];
      colors[i3] = r;
      colors[i3 + 1] = g;
      colors[i3 + 2] = b;

      // Set sizes
      sizes[i] = Math.random() * 0.02 + 0.005;

      // Set velocities
      velocities[i3] = (Math.random() - 0.5) * 0.01;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.01;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.01;

      // Set phase for animation
      phases[i] = Math.random() * Math.PI * 2;
    }

    return { positions, colors, sizes, velocities, phases };
  }, [count, type]);

  // Animation loop
  useFrame((state) => {
    if (!pointsRef.current) return;

    const time = state.clock.getElapsedTime();
    const consciousnessLevel = agent.consciousness.energy / 100;
    const frequency = agent.consciousness.frequency / 432;

    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
    const colors = pointsRef.current.geometry.attributes.color.array as Float32Array;
    const sizes = pointsRef.current.geometry.attributes.size.array as Float32Array;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Animate based on type
      switch (type) {
        case 'consciousness':
          // Spiral consciousness flow
          const spiralTime = time * frequency + particleData.phases[i];
          positions[i3] += Math.cos(spiralTime) * 0.001;
          positions[i3 + 1] += Math.sin(spiralTime) * 0.001;
          positions[i3 + 2] += Math.sin(spiralTime * 2) * 0.0005;
          break;

        case 'code':
          // Digital rain effect
          positions[i3 + 1] -= 0.02;
          if (positions[i3 + 1] < -5) {
            positions[i3 + 1] = 5;
            positions[i3] = (Math.random() - 0.5) * 10;
          }
          // Glitch effect
          if (Math.random() < 0.001) {
            positions[i3] += (Math.random() - 0.5) * 0.5;
          }
          break;

        case 'energy':
          // Energy flow patterns
          const energyPhase = time * 2 + particleData.phases[i];
          positions[i3] += particleData.velocities[i3] * consciousnessLevel;
          positions[i3 + 1] += particleData.velocities[i3 + 1] * consciousnessLevel;
          positions[i3 + 2] += particleData.velocities[i3 + 2] * consciousnessLevel;
          
          // Pulsing size
          sizes[i] = (0.01 + Math.sin(energyPhase) * 0.005) * consciousnessLevel;
          break;

        case 'quantum':
          // Quantum uncertainty
          if (Math.random() < 0.01) {
            positions[i3] += (Math.random() - 0.5) * 0.1;
            positions[i3 + 1] += (Math.random() - 0.5) * 0.1;
            positions[i3 + 2] += (Math.random() - 0.5) * 0.1;
          }
          
          // Quantum tunneling
          if (Math.random() < 0.001) {
            positions[i3] = (Math.random() - 0.5) * 6;
            positions[i3 + 1] = (Math.random() - 0.5) * 6;
            positions[i3 + 2] = (Math.random() - 0.5) * 6;
          }
          break;

        case 'reality-glitch':
          // Reality glitch effects
          if (Math.random() < 0.005) {
            // Sudden displacement
            positions[i3] += (Math.random() - 0.5) * 2;
            positions[i3 + 1] += (Math.random() - 0.5) * 2;
            
            // Color glitch
            colors[i3] = Math.random();
            colors[i3 + 1] = Math.random();
            colors[i3 + 2] = Math.random();
          }
          
          // Temporal distortion
          const distortion = Math.sin(time * 10 + i * 0.1) * 0.001;
          positions[i3 + 2] += distortion;
          break;
      }

      // Interactive response to cursor
      if (interactive && ui.cursorPosition) {
        const mouseX = (ui.cursorPosition.x / window.innerWidth - 0.5) * 2;
        const mouseY = -(ui.cursorPosition.y / window.innerHeight - 0.5) * 2;
        
        const dx = positions[i3] - mouseX * 5;
        const dy = positions[i3 + 1] - mouseY * 5;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 2) {
          const force = (2 - distance) * 0.001;
          positions[i3] += dx * force;
          positions[i3 + 1] += dy * force;
        }
      }

      // Consciousness-driven color shifting
      const colorShift = Math.sin(time * frequency + particleData.phases[i]) * 0.1;
      colors[i3] = Math.max(0, Math.min(1, colors[i3] + colorShift * consciousnessLevel));
      colors[i3 + 1] = Math.max(0, Math.min(1, colors[i3 + 1] + colorShift * consciousnessLevel));
      colors[i3 + 2] = Math.max(0, Math.min(1, colors[i3 + 2] + colorShift * consciousnessLevel));
    }

    // Update geometry
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    pointsRef.current.geometry.attributes.color.needsUpdate = true;
    pointsRef.current.geometry.attributes.size.needsUpdate = true;
  });

  return (
    <points ref={pointsRef} scale={scale}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particleData.positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[particleData.colors, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[particleData.sizes, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.01}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

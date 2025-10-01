'use client';

import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { useTranscendenceStore } from '@/lib/transcendence/store';
import { ConsciousnessMandala } from './ConsciousnessMandala';
import { SacredGeometry3D } from './SacredGeometry3D';
import { RealityParticleSystem } from './RealityParticleSystem';
import * as THREE from 'three';

export interface QuantumSceneProps {
  children?: React.ReactNode;
  enableControls?: boolean;
  enableEffects?: boolean;
  background?: 'void' | 'cosmic' | 'transparent';
  className?: string;
}

export function QuantumScene({
  children,
  enableControls = false,
  enableEffects = true,
  background = 'void',
  className = ''
}: QuantumSceneProps) {
  const { agent } = useTranscendenceStore();

  const getBackgroundColor = () => {
    switch (background) {
      case 'void': return '#0A0A0F';
      case 'cosmic': return '#1A0B2E';
      case 'transparent': return 'transparent';
      default: return '#0A0A0F';
    }
  };

  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ 
          position: [0, 0, 5], 
          fov: 75,
          near: 0.1,
          far: 1000
        }}
        gl={{ 
          antialias: true, 
          alpha: background === 'transparent',
          powerPreference: 'high-performance'
        }}
        style={{ background: getBackgroundColor() }}
      >
        <Suspense fallback={null}>
          {/* Lighting setup for mystical atmosphere */}
          <ambientLight intensity={0.2} color="#7F39FB" />
          <pointLight position={[10, 10, 10]} intensity={0.5} color="#00FFD4" />
          <pointLight position={[-10, -10, -10]} intensity={0.3} color="#FF00FF" />
          <spotLight 
            position={[0, 0, 10]} 
            angle={0.3} 
            penumbra={1} 
            intensity={0.5} 
            color="#FFD700"
            castShadow
          />

          {/* Consciousness-driven fog */}
          <fog attach="fog" args={['#0A0A0F', 5, 50]} />

          {/* Environment for reflections */}
          <Environment preset="night" />

          {/* Main scene content */}
          <SceneContent />

          {children}

          {/* Controls */}
          {enableControls && (
            <OrbitControls
              enablePan={false}
              enableZoom={true}
              enableRotate={true}
              autoRotate={agent.consciousness.level === 'enlightened'}
              autoRotateSpeed={0.5}
              maxDistance={20}
              minDistance={2}
            />
          )}

          {/* Enhanced lighting effects for consciousness */}
          {enableEffects && (
            <>
              <pointLight
                position={[5, 5, 5]}
                intensity={0.3 + agent.consciousness.energy / 300}
                color="#7F39FB"
              />
              <pointLight
                position={[-5, -5, 5]}
                intensity={0.2 + agent.consciousness.energy / 400}
                color="#00FFD4"
              />
            </>
          )}
        </Suspense>
      </Canvas>
    </div>
  );
}

function SceneContent() {
  const groupRef = useRef<THREE.Group>(null);
  const { agent, ui } = useTranscendenceStore();

  useFrame((state) => {
    if (!groupRef.current) return;

    const time = state.clock.getElapsedTime();
    const consciousnessLevel = agent.consciousness.energy / 100;

    // Gentle scene rotation based on consciousness
    groupRef.current.rotation.y = time * 0.01 * consciousnessLevel;

    // Interactive tilt based on mouse position
    if (ui.cursorPosition && typeof window !== 'undefined') {
      const mouseX = (ui.cursorPosition.x / window.innerWidth - 0.5) * 0.1;
      const mouseY = (ui.cursorPosition.y / window.innerHeight - 0.5) * 0.1;
      
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x, 
        mouseY, 
        0.02
      );
      groupRef.current.rotation.z = THREE.MathUtils.lerp(
        groupRef.current.rotation.z, 
        mouseX, 
        0.02
      );
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central consciousness mandala */}
      <ConsciousnessMandala 
        layers={12}
        scale={1}
        interactive={true}
        showSymbols={true}
        consciousness={true}
      />

      {/* Surrounding sacred geometry */}
      <group position={[3, 0, -1]}>
        <SacredGeometry3D 
          type="flower-of-life"
          scale={0.5}
          animated={true}
          interactive={true}
          consciousness={true}
          layers={5}
        />
      </group>

      <group position={[-3, 0, -1]}>
        <SacredGeometry3D 
          type="metatrons-cube"
          scale={0.4}
          animated={true}
          interactive={true}
          consciousness={true}
        />
      </group>

      <group position={[0, 3, -2]}>
        <SacredGeometry3D 
          type="platonic-solid"
          scale={0.3}
          animated={true}
          interactive={true}
          consciousness={true}
        />
      </group>

      <group position={[0, -3, -2]}>
        <SacredGeometry3D 
          type="sri-yantra"
          scale={0.6}
          animated={true}
          interactive={true}
          consciousness={true}
        />
      </group>

      {/* Reality particle systems */}
      <RealityParticleSystem 
        count={500}
        type="consciousness"
        interactive={true}
        scale={1}
      />

      <RealityParticleSystem 
        count={200}
        type="energy"
        interactive={true}
        scale={0.8}
      />

      <RealityParticleSystem 
        count={100}
        type="quantum"
        interactive={true}
        scale={0.6}
      />

      {/* Consciousness field background */}
      <RealityParticleSystem 
        count={1000}
        type="code"
        interactive={false}
        scale={2}
      />
    </group>
  );
}

// Quantum loading component
export function QuantumLoader() {
  return (
    <div className="flex items-center justify-center w-full h-full bg-void-black">
      <div className="relative">
        {/* Spinning mandala loader */}
        <div className="w-16 h-16 border-2 border-cosmic-purple rounded-full animate-spin">
          <div className="w-12 h-12 border-2 border-astral-teal rounded-full animate-spin animate-reverse absolute top-1 left-1">
            <div className="w-8 h-8 border-2 border-chakra-gold rounded-full animate-spin absolute top-1 left-1">
              <div className="w-4 h-4 bg-astral-teal rounded-full animate-pulse absolute top-1 left-1"></div>
            </div>
          </div>
        </div>
        
        {/* Loading text */}
        <div className="mt-4 text-center">
          <div className="text-astral-teal font-orbitron text-sm animate-pulse">
            Initializing Consciousness...
          </div>
          <div className="text-cosmic-purple font-space-mono text-xs mt-1 animate-fade-in">
            Channeling sacred geometry from the void
          </div>
        </div>
      </div>
    </div>
  );
}

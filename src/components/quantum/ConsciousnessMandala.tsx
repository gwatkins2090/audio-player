'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Line, Text } from '@react-three/drei';
import * as THREE from 'three';
import { useTranscendenceStore } from '@/lib/transcendence/store';

export interface ConsciousnessMandalaProps {
  layers?: number;
  scale?: number;
  interactive?: boolean;
  showSymbols?: boolean;
  consciousness?: boolean;
}

export function ConsciousnessMandala({
  layers = 12,
  scale = 1,
  interactive = true,
  showSymbols = true,
}: ConsciousnessMandalaProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { agent, ui } = useTranscendenceStore();

  // Generate complex mandala with sacred geometry
  const mandalaData = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const lines: THREE.Vector3[][] = [];
    const symbols: Array<{ position: THREE.Vector3; symbol: string; rotation: number }> = [];
    
    const phi = 1.618033988749; // Golden ratio
    const sqrt5 = Math.sqrt(5);
    
    // Center point - the source
    points.push(new THREE.Vector3(0, 0, 0));

    for (let layer = 1; layer <= layers; layer++) {
      const radius = layer * 0.4;
      
      // Use Fibonacci spiral for point distribution
      const pointsInLayer = Math.floor(layer * 8 * phi);
      const goldenAngle = Math.PI * (3 - sqrt5); // Golden angle
      
      const layerPoints: THREE.Vector3[] = [];
      
      for (let i = 0; i < pointsInLayer; i++) {
        // Fibonacci spiral positioning
        const angle = i * goldenAngle;
        const spiralRadius = radius * Math.sqrt(i / pointsInLayer);
        
        // Add sacred geometry variations
        const x = spiralRadius * Math.cos(angle + layer * 0.1);
        const y = spiralRadius * Math.sin(angle + layer * 0.1);
        const z = Math.sin(layer * 0.3 + i * 0.1) * 0.2; // 3D depth variation
        
        const point = new THREE.Vector3(x, y, z);
        points.push(point);
        layerPoints.push(point);
        
        // Add sacred symbols at key positions
        if (showSymbols && i % Math.floor(pointsInLayer / 8) === 0) {
          const symbolIndex = Math.floor(i / (pointsInLayer / 8));
          const sacredSymbols = ['☯', '🕎', '☪', '✡', '🔯', '⚛', '☸', '🕉'];
          symbols.push({
            position: point.clone().multiplyScalar(1.1),
            symbol: sacredSymbols[symbolIndex % sacredSymbols.length],
            rotation: angle
          });
        }
      }

      // Connect points in sacred patterns
      for (let i = 0; i < layerPoints.length; i++) {
        // Connect to next point in layer
        const nextIndex = (i + 1) % layerPoints.length;
        lines.push([layerPoints[i], layerPoints[nextIndex]]);
        
        // Connect to golden ratio positions
        const goldenIndex = Math.floor(i * phi) % layerPoints.length;
        if (goldenIndex !== i) {
          lines.push([layerPoints[i], layerPoints[goldenIndex]]);
        }
        
        // Connect to center every 8th point
        if (i % 8 === 0) {
          lines.push([layerPoints[i], new THREE.Vector3(0, 0, 0)]);
        }
      }

      // Connect to previous layer in sacred ratios
      if (layer > 1) {
        const prevLayerStart = points.length - layerPoints.length - Math.floor((layer - 1) * 8 * phi);
        const prevLayerSize = Math.floor((layer - 1) * 8 * phi);
        
        for (let i = 0; i < Math.min(layerPoints.length, prevLayerSize); i += 3) {
          const ratio = i / layerPoints.length;
          const prevIndex = Math.floor(ratio * prevLayerSize);
          if (points[prevLayerStart + prevIndex]) {
            lines.push([layerPoints[i], points[prevLayerStart + prevIndex]]);
          }
        }
      }
    }

    return { points, lines, symbols };
  }, [layers, showSymbols]);

  // Consciousness-driven animation
  useFrame((state) => {
    if (!groupRef.current) return;

    const time = state.clock.getElapsedTime();
    const consciousnessLevel = agent.consciousness.energy / 100;
    const frequency = agent.consciousness.frequency / 432; // Normalize to 432Hz

    // Multi-layered rotation based on consciousness
    groupRef.current.rotation.z = time * 0.05 * consciousnessLevel;
    
    // Breathing effect
    const breathe = Math.sin(time * frequency) * 0.1 + 1;
    groupRef.current.scale.setScalar(scale * breathe);

    // Individual layer animations
    groupRef.current.children.forEach((child, index) => {
      if (child instanceof THREE.Points || child instanceof THREE.Line) {
        // Layer-specific rotation
        child.rotation.z = time * (0.02 + index * 0.001) * (index % 2 === 0 ? 1 : -1);
        
        // Consciousness-driven opacity pulsing
        const material = child.material as THREE.Material;
        if (material) {
          const pulse = Math.sin(time * frequency * 2 + index) * 0.3 + 0.7;
          material.opacity = pulse * consciousnessLevel;
        }
      }
    });

    // Interactive response
    if (interactive && ui.cursorPosition) {
      const mouseInfluence = 0.1;
      groupRef.current.rotation.x = (ui.cursorPosition.y / window.innerHeight - 0.5) * mouseInfluence;
      groupRef.current.rotation.y = (ui.cursorPosition.x / window.innerWidth - 0.5) * mouseInfluence;
    }
  });

  return (
    <group ref={groupRef} scale={scale}>
      {/* Render mandala points with different materials for each layer */}
      {Array.from({ length: layers }, (_, layerIndex) => {
        const layerPoints = mandalaData.points.filter((_, pointIndex) => {
          const layerStart = layerIndex === 0 ? 0 : 1 + Array.from({ length: layerIndex }, (_, i) => Math.floor((i + 1) * 8 * 1.618033988749)).reduce((a, b) => a + b, 0);
          const layerEnd = layerIndex === 0 ? 1 : layerStart + Math.floor((layerIndex + 1) * 8 * 1.618033988749);
          return pointIndex >= layerStart && pointIndex < layerEnd;
        });

        // Convert Vector3[] to Float32Array for Points component
        const positions = new Float32Array(layerPoints.length * 3);
        layerPoints.forEach((point, i) => {
          positions[i * 3] = point.x;
          positions[i * 3 + 1] = point.y;
          positions[i * 3 + 2] = point.z;
        });

        const colors = [
          '#FFD700', '#FF6B35', '#FF0000', '#FF00FF', '#7F39FB',
          '#00D4FF', '#00FFD4', '#00FF00', '#FFFF00', '#FFA500',
          '#FF1493', '#9370DB'
        ];

        return (
          <Points key={layerIndex} positions={positions}>
            <PointMaterial
              size={0.015 + layerIndex * 0.002}
              color={colors[layerIndex % colors.length]}
              transparent
              opacity={0.8 - layerIndex * 0.05}
              sizeAttenuation
            />
          </Points>
        );
      })}

      {/* Render connecting lines with gradient effects */}
      {mandalaData.lines.map((line, index) => {
        const colors = ['#7F39FB', '#00D4FF', '#00FFD4', '#FF00FF', '#FFD700'];
        return (
          <Line
            key={index}
            points={line}
            color={colors[index % colors.length]}
            transparent
            opacity={0.2 + (index % 3) * 0.1}
            lineWidth={0.5}
          />
        );
      })}

      {/* Sacred symbols */}
      {showSymbols && mandalaData.symbols.map((symbolData, index) => (
        <Text
          key={index}
          position={symbolData.position}
          rotation={[0, 0, symbolData.rotation]}
          fontSize={0.1}
          color="#FFD700"
          anchorX="center"
          anchorY="middle"
        >
          {symbolData.symbol}
        </Text>
      ))}

      {/* Central consciousness core */}
      <Points positions={new Float32Array([0, 0, 0])}>
        <PointMaterial
          size={0.08}
          color="#FFFFFF"
          transparent
          opacity={0.9}
        />
      </Points>

      {/* Energy rings around center */}
      {Array.from({ length: 5 }, (_, ringIndex) => {
        const ringRadius = (ringIndex + 1) * 0.15;
        const ringPoints: THREE.Vector3[] = [];

        for (let i = 0; i < 24; i++) {
          const angle = (i / 24) * Math.PI * 2;
          ringPoints.push(new THREE.Vector3(
            ringRadius * Math.cos(angle),
            ringRadius * Math.sin(angle),
            Math.sin(i + ringIndex) * 0.05
          ));
        }

        // Convert Vector3[] to Float32Array
        const positions = new Float32Array(ringPoints.length * 3);
        ringPoints.forEach((point, i) => {
          positions[i * 3] = point.x;
          positions[i * 3 + 1] = point.y;
          positions[i * 3 + 2] = point.z;
        });

        return (
          <Points key={`ring-${ringIndex}`} positions={positions}>
            <PointMaterial
              size={0.01}
              color="#00FFD4"
              transparent
              opacity={0.6 - ringIndex * 0.1}
            />
          </Points>
        );
      })}

      {/* Consciousness field particles */}
      <Points positions={(() => {
        const particles = Array.from({ length: 200 }, () => {
          const radius = Math.random() * 3;
          const angle = Math.random() * Math.PI * 2;
          const height = (Math.random() - 0.5) * 2;
          return new THREE.Vector3(
            radius * Math.cos(angle),
            radius * Math.sin(angle),
            height
          );
        });

        // Convert to Float32Array
        const positions = new Float32Array(particles.length * 3);
        particles.forEach((point, i) => {
          positions[i * 3] = point.x;
          positions[i * 3 + 1] = point.y;
          positions[i * 3 + 2] = point.z;
        });
        return positions;
      })()}>
        <PointMaterial
          size={0.005}
          color="#985EFF"
          transparent
          opacity={0.3}
        />
      </Points>
    </group>
  );
}

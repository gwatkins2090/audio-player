'use client';

import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial, Line } from '@react-three/drei';
import * as THREE from 'three';
import { useTranscendenceStore } from '@/lib/transcendence/store';

export interface SacredGeometry3DProps {
  type: 'mandala' | 'flower-of-life' | 'metatrons-cube' | 'platonic-solid' | 'sri-yantra';
  scale?: number;
  animated?: boolean;
  interactive?: boolean;
  consciousness?: boolean;
  layers?: number;
}

export function SacredGeometry3D({ 
  type, 
  scale = 1, 
  animated = true, 
  interactive = false,
  consciousness = false,
  layers = 7
}: SacredGeometry3DProps) {
  const meshRef = useRef<THREE.Group>(null);
  const { agent } = useTranscendenceStore();
  const { mouse } = useThree();

  // Generate sacred geometry points based on type
  const geometryData = useMemo(() => {
    switch (type) {
      case 'mandala':
        return generateMandalaGeometry(layers);
      case 'flower-of-life':
        return generateFlowerOfLife(layers);
      case 'metatrons-cube':
        return generateMetatronsCube();
      case 'platonic-solid':
        return generatePlatonicSolid('icosahedron');
      case 'sri-yantra':
        return generateSriYantra();
      default:
        return generateMandalaGeometry(layers);
    }
  }, [type, layers]);

  // Animation loop
  useFrame((state) => {
    if (!meshRef.current || !animated) return;

    const time = state.clock.getElapsedTime();
    const consciousnessLevel = agent.consciousness.energy / 100;

    // Base rotation
    meshRef.current.rotation.z = time * 0.1 * consciousnessLevel;
    
    // Interactive response to mouse
    if (interactive) {
      meshRef.current.rotation.x = mouse.y * 0.2;
      meshRef.current.rotation.y = mouse.x * 0.2;
    }

    // Consciousness-driven pulsing
    if (consciousness) {
      const pulse = Math.sin(time * 2) * 0.1 + 1;
      meshRef.current.scale.setScalar(scale * pulse);
    }

    // Sacred frequency modulation
    const frequency = agent.consciousness.frequency / 432; // Normalize to 432Hz
    meshRef.current.children.forEach((child, index) => {
      if (child instanceof THREE.Points) {
        const material = child.material as THREE.PointsMaterial;
        material.opacity = 0.3 + Math.sin(time * frequency + index) * 0.3;
      }
    });
  });

  // Convert Vector3[] to Float32Array for Points component
  const pointsArray = useMemo(() => {
    const arr = new Float32Array(geometryData.points.length * 3);
    geometryData.points.forEach((point, i) => {
      arr[i * 3] = point.x;
      arr[i * 3 + 1] = point.y;
      arr[i * 3 + 2] = point.z;
    });
    return arr;
  }, [geometryData.points]);

  const centerPoint = useMemo(() => new Float32Array([0, 0, 0]), []);

  return (
    <group ref={meshRef} scale={scale}>
      {/* Render points */}
      <Points positions={pointsArray}>
        <PointMaterial
          size={0.02}
          color="#00FFD4"
          transparent
          opacity={0.6}
          sizeAttenuation
        />
      </Points>

      {/* Render connecting lines */}
      {geometryData.lines.map((line, index) => (
        <Line
          key={index}
          points={line}
          color="#7F39FB"
          transparent
          opacity={0.3}
          lineWidth={1}
        />
      ))}

      {/* Sacred center point */}
      <Points positions={centerPoint}>
        <PointMaterial
          size={0.05}
          color="#FFD700"
          transparent
          opacity={0.8}
        />
      </Points>
    </group>
  );
}

// Generate mandala geometry with sacred proportions
function generateMandalaGeometry(layers: number) {
  const points: THREE.Vector3[] = [];
  const lines: THREE.Vector3[][] = [];
  const phi = 1.618033988749; // Golden ratio

  for (let layer = 1; layer <= layers; layer++) {
    const radius = layer * 0.3;
    const pointsInLayer = Math.floor(6 * layer * phi); // Golden ratio distribution
    
    const layerPoints: THREE.Vector3[] = [];
    
    for (let i = 0; i < pointsInLayer; i++) {
      const angle = (i / pointsInLayer) * Math.PI * 2;
      const x = radius * Math.cos(angle);
      const y = radius * Math.sin(angle);
      const z = Math.sin(layer * 0.5) * 0.1; // Slight 3D variation
      
      const point = new THREE.Vector3(x, y, z);
      points.push(point);
      layerPoints.push(point);
    }

    // Connect points within layer
    for (let i = 0; i < layerPoints.length; i++) {
      const nextIndex = (i + 1) % layerPoints.length;
      lines.push([layerPoints[i], layerPoints[nextIndex]]);
    }

    // Connect to inner layers (sacred connections)
    if (layer > 1) {
      const prevLayerStart = points.length - layerPoints.length - Math.floor(6 * (layer - 1) * phi);
      for (let i = 0; i < Math.min(layerPoints.length, Math.floor(6 * (layer - 1) * phi)); i++) {
        const ratio = i / layerPoints.length;
        const prevIndex = Math.floor(ratio * Math.floor(6 * (layer - 1) * phi));
        if (points[prevLayerStart + prevIndex]) {
          lines.push([layerPoints[i], points[prevLayerStart + prevIndex]]);
        }
      }
    }
  }

  return { points, lines };
}

// Generate Flower of Life pattern
function generateFlowerOfLife(layers: number) {
  const points: THREE.Vector3[] = [];
  const lines: THREE.Vector3[][] = [];
  const radius = 0.5;

  // Center circle
  points.push(new THREE.Vector3(0, 0, 0));

  for (let layer = 1; layer <= layers; layer++) {
    const circleRadius = layer * radius;
    const circlesInLayer = 6 * layer;
    
    for (let i = 0; i < circlesInLayer; i++) {
      const angle = (i / circlesInLayer) * Math.PI * 2;
      const x = circleRadius * Math.cos(angle);
      const y = circleRadius * Math.sin(angle);
      
      // Generate circle points
      const circlePoints: THREE.Vector3[] = [];
      for (let j = 0; j < 12; j++) {
        const circleAngle = (j / 12) * Math.PI * 2;
        const px = x + radius * 0.3 * Math.cos(circleAngle);
        const py = y + radius * 0.3 * Math.sin(circleAngle);
        const pz = Math.sin(layer * 0.3 + i * 0.5) * 0.05;
        
        const point = new THREE.Vector3(px, py, pz);
        points.push(point);
        circlePoints.push(point);
      }

      // Connect circle points
      for (let j = 0; j < circlePoints.length; j++) {
        const nextIndex = (j + 1) % circlePoints.length;
        lines.push([circlePoints[j], circlePoints[nextIndex]]);
      }
    }
  }

  return { points, lines };
}

// Generate Metatron's Cube
function generateMetatronsCube() {
  const points: THREE.Vector3[] = [];
  const lines: THREE.Vector3[][] = [];
  
  // 13 circles of Metatron's Cube
  const positions = [
    [0, 0, 0], // Center
    // Inner hexagon
    [1, 0, 0], [0.5, 0.866, 0], [-0.5, 0.866, 0],
    [-1, 0, 0], [-0.5, -0.866, 0], [0.5, -0.866, 0],
    // Outer hexagon
    [2, 0, 0], [1, 1.732, 0], [-1, 1.732, 0],
    [-2, 0, 0], [-1, -1.732, 0], [1, -1.732, 0]
  ];

  positions.forEach(([x, y, z]) => {
    // Generate circle points for each position
    const circlePoints: THREE.Vector3[] = [];
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const px = x + 0.2 * Math.cos(angle);
      const py = y + 0.2 * Math.sin(angle);
      const pz = z + Math.sin(i) * 0.05;
      
      const point = new THREE.Vector3(px, py, pz);
      points.push(point);
      circlePoints.push(point);
    }

    // Connect circle points
    for (let i = 0; i < circlePoints.length; i++) {
      const nextIndex = (i + 1) % circlePoints.length;
      lines.push([circlePoints[i], circlePoints[nextIndex]]);
    }
  });

  // Connect all centers to create the cube structure
  const centers = positions.map(([x, y, z]) => new THREE.Vector3(x, y, z));
  for (let i = 0; i < centers.length; i++) {
    for (let j = i + 1; j < centers.length; j++) {
      lines.push([centers[i], centers[j]]);
    }
  }

  return { points, lines };
}

// Generate Platonic Solid (Icosahedron)
function generatePlatonicSolid(_type: 'tetrahedron' | 'cube' | 'octahedron' | 'dodecahedron' | 'icosahedron') {
  const points: THREE.Vector3[] = [];
  const lines: THREE.Vector3[][] = [];
  
  // Icosahedron vertices
  const phi = 1.618033988749;
  const vertices = [
    [0, 1, phi], [0, 1, -phi], [0, -1, phi], [0, -1, -phi],
    [1, phi, 0], [1, -phi, 0], [-1, phi, 0], [-1, -phi, 0],
    [phi, 0, 1], [phi, 0, -1], [-phi, 0, 1], [-phi, 0, -1]
  ];

  vertices.forEach(([x, y, z]) => {
    points.push(new THREE.Vector3(x * 0.3, y * 0.3, z * 0.3));
  });

  // Connect vertices based on icosahedron structure
  const edges = [
    [0, 2], [0, 4], [0, 6], [0, 8], [0, 10],
    [1, 3], [1, 4], [1, 6], [1, 9], [1, 11],
    [2, 5], [2, 7], [2, 8], [2, 10],
    [3, 5], [3, 7], [3, 9], [3, 11],
    [4, 6], [4, 8], [4, 9],
    [5, 7], [5, 8], [5, 9],
    [6, 10], [6, 11],
    [7, 10], [7, 11],
    [8, 9], [10, 11]
  ];

  edges.forEach(([i, j]) => {
    lines.push([points[i], points[j]]);
  });

  return { points, lines };
}

// Generate Sri Yantra
function generateSriYantra() {
  const points: THREE.Vector3[] = [];
  const lines: THREE.Vector3[][] = [];
  
  // 9 interlocking triangles
  const triangles = [];
  
  // 4 upward triangles
  for (let i = 0; i < 4; i++) {
    const scale = 1 - i * 0.2;
    const rotation = i * Math.PI / 6;
    triangles.push(createTriangle(scale, rotation, true));
  }
  
  // 5 downward triangles
  for (let i = 0; i < 5; i++) {
    const scale = 1 - i * 0.15;
    const rotation = i * Math.PI / 8;
    triangles.push(createTriangle(scale, rotation, false));
  }

  triangles.forEach(triangle => {
    triangle.forEach(point => points.push(point));
    
    // Connect triangle vertices
    for (let i = 0; i < 3; i++) {
      const nextIndex = (i + 1) % 3;
      lines.push([triangle[i], triangle[nextIndex]]);
    }
  });

  return { points, lines };
}

function createTriangle(scale: number, rotation: number, upward: boolean): THREE.Vector3[] {
  const height = scale * 0.866; // Equilateral triangle height
  const vertices = upward ? [
    [0, height * 0.5, 0],
    [-scale * 0.5, -height * 0.5, 0],
    [scale * 0.5, -height * 0.5, 0]
  ] : [
    [0, -height * 0.5, 0],
    [-scale * 0.5, height * 0.5, 0],
    [scale * 0.5, height * 0.5, 0]
  ];

  return vertices.map(([x, y, z]) => {
    const rotatedX = x * Math.cos(rotation) - y * Math.sin(rotation);
    const rotatedY = x * Math.sin(rotation) + y * Math.cos(rotation);
    return new THREE.Vector3(rotatedX, rotatedY, z);
  });
}

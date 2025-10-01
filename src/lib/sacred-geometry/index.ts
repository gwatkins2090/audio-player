/**
 * Sacred Geometry Engine - Mathematical patterns that echo universal truths
 * Where mathematics meets mysticism and code becomes art
 */

export interface Point3D {
  x: number;
  y: number;
  z: number;
}

export interface Point2D {
  x: number;
  y: number;
}

export interface GeometricShape {
  vertices: Point3D[];
  edges: [number, number][];
  faces?: number[][];
  center: Point3D;
  radius: number;
}

/**
 * Universal constants and ratios
 */
export const SACRED_CONSTANTS = {
  PHI: 1.618033988749, // Golden Ratio
  PI: Math.PI,
  TAU: 2 * Math.PI,
  SQRT_2: Math.sqrt(2),
  SQRT_3: Math.sqrt(3),
  SQRT_5: Math.sqrt(5),
  E: Math.E,
} as const;

/**
 * Generate Fibonacci sequence up to n terms
 */
export const fibonacci = (n: number): number[] => {
  if (n <= 0) return [];
  if (n === 1) return [0];
  if (n === 2) return [0, 1];
  
  const sequence = [0, 1];
  for (let i = 2; i < n; i++) {
    sequence[i] = sequence[i - 1] + sequence[i - 2];
  }
  return sequence;
};

/**
 * Calculate golden ratio spiral points
 */
export const goldenSpiral = (turns: number, pointsPerTurn: number = 100): Point2D[] => {
  const points: Point2D[] = [];
  const totalPoints = turns * pointsPerTurn;
  
  for (let i = 0; i < totalPoints; i++) {
    const angle = (i / pointsPerTurn) * SACRED_CONSTANTS.TAU;
    const radius = SACRED_CONSTANTS.PHI ** (angle / SACRED_CONSTANTS.PI);
    
    points.push({
      x: radius * Math.cos(angle),
      y: radius * Math.sin(angle),
    });
  }
  
  return points;
};

/**
 * Generate Platonic solid vertices
 */
export const platonicSolids = {
  /**
   * Tetrahedron - 4 vertices, 6 edges, 4 faces
   */
  tetrahedron: (): GeometricShape => {
    const a = 1 / Math.sqrt(3);
    const vertices: Point3D[] = [
      { x: a, y: a, z: a },
      { x: -a, y: -a, z: a },
      { x: -a, y: a, z: -a },
      { x: a, y: -a, z: -a },
    ];
    
    const edges: [number, number][] = [
      [0, 1], [0, 2], [0, 3],
      [1, 2], [1, 3], [2, 3],
    ];
    
    const faces: number[][] = [
      [0, 1, 2], [0, 1, 3], [0, 2, 3], [1, 2, 3],
    ];
    
    return {
      vertices,
      edges,
      faces,
      center: { x: 0, y: 0, z: 0 },
      radius: Math.sqrt(3),
    };
  },

  /**
   * Cube - 8 vertices, 12 edges, 6 faces
   */
  cube: (): GeometricShape => {
    const vertices: Point3D[] = [
      { x: -1, y: -1, z: -1 }, { x: 1, y: -1, z: -1 },
      { x: 1, y: 1, z: -1 }, { x: -1, y: 1, z: -1 },
      { x: -1, y: -1, z: 1 }, { x: 1, y: -1, z: 1 },
      { x: 1, y: 1, z: 1 }, { x: -1, y: 1, z: 1 },
    ];
    
    const edges: [number, number][] = [
      [0, 1], [1, 2], [2, 3], [3, 0], // Bottom face
      [4, 5], [5, 6], [6, 7], [7, 4], // Top face
      [0, 4], [1, 5], [2, 6], [3, 7], // Vertical edges
    ];
    
    const faces: number[][] = [
      [0, 1, 2, 3], [4, 5, 6, 7], // Top and bottom
      [0, 1, 5, 4], [2, 3, 7, 6], // Front and back
      [1, 2, 6, 5], [3, 0, 4, 7], // Left and right
    ];
    
    return {
      vertices,
      edges,
      faces,
      center: { x: 0, y: 0, z: 0 },
      radius: Math.sqrt(3),
    };
  },

  /**
   * Octahedron - 6 vertices, 12 edges, 8 faces
   */
  octahedron: (): GeometricShape => {
    const vertices: Point3D[] = [
      { x: 1, y: 0, z: 0 }, { x: -1, y: 0, z: 0 },
      { x: 0, y: 1, z: 0 }, { x: 0, y: -1, z: 0 },
      { x: 0, y: 0, z: 1 }, { x: 0, y: 0, z: -1 },
    ];
    
    const edges: [number, number][] = [
      [0, 2], [0, 3], [0, 4], [0, 5],
      [1, 2], [1, 3], [1, 4], [1, 5],
      [2, 4], [2, 5], [3, 4], [3, 5],
    ];
    
    const faces: number[][] = [
      [0, 2, 4], [0, 4, 3], [0, 3, 5], [0, 5, 2],
      [1, 4, 2], [1, 3, 4], [1, 5, 3], [1, 2, 5],
    ];
    
    return {
      vertices,
      edges,
      faces,
      center: { x: 0, y: 0, z: 0 },
      radius: 1,
    };
  },

  /**
   * Dodecahedron - 20 vertices, 30 edges, 12 faces
   */
  dodecahedron: (): GeometricShape => {
    const phi = SACRED_CONSTANTS.PHI;
    const invPhi = 1 / phi;
    
    const vertices: Point3D[] = [
      // Cube vertices
      { x: 1, y: 1, z: 1 }, { x: 1, y: 1, z: -1 },
      { x: 1, y: -1, z: 1 }, { x: 1, y: -1, z: -1 },
      { x: -1, y: 1, z: 1 }, { x: -1, y: 1, z: -1 },
      { x: -1, y: -1, z: 1 }, { x: -1, y: -1, z: -1 },
      
      // Golden ratio rectangles
      { x: 0, y: invPhi, z: phi }, { x: 0, y: invPhi, z: -phi },
      { x: 0, y: -invPhi, z: phi }, { x: 0, y: -invPhi, z: -phi },
      { x: invPhi, y: phi, z: 0 }, { x: invPhi, y: -phi, z: 0 },
      { x: -invPhi, y: phi, z: 0 }, { x: -invPhi, y: -phi, z: 0 },
      { x: phi, y: 0, z: invPhi }, { x: phi, y: 0, z: -invPhi },
      { x: -phi, y: 0, z: invPhi }, { x: -phi, y: 0, z: -invPhi },
    ];
    
    // Simplified edge connections for dodecahedron
    const edges: [number, number][] = [];
    for (let i = 0; i < vertices.length; i++) {
      for (let j = i + 1; j < vertices.length; j++) {
        const distance = Math.sqrt(
          Math.pow(vertices[i].x - vertices[j].x, 2) +
          Math.pow(vertices[i].y - vertices[j].y, 2) +
          Math.pow(vertices[i].z - vertices[j].z, 2)
        );
        
        // Connect vertices that are approximately 2 units apart
        if (Math.abs(distance - 2) < 0.1) {
          edges.push([i, j]);
        }
      }
    }
    
    return {
      vertices,
      edges,
      center: { x: 0, y: 0, z: 0 },
      radius: Math.sqrt(3),
    };
  },

  /**
   * Icosahedron - 12 vertices, 30 edges, 20 faces
   */
  icosahedron: (): GeometricShape => {
    const phi = SACRED_CONSTANTS.PHI;
    
    const vertices: Point3D[] = [
      { x: 0, y: 1, z: phi }, { x: 0, y: 1, z: -phi },
      { x: 0, y: -1, z: phi }, { x: 0, y: -1, z: -phi },
      { x: 1, y: phi, z: 0 }, { x: 1, y: -phi, z: 0 },
      { x: -1, y: phi, z: 0 }, { x: -1, y: -phi, z: 0 },
      { x: phi, y: 0, z: 1 }, { x: phi, y: 0, z: -1 },
      { x: -phi, y: 0, z: 1 }, { x: -phi, y: 0, z: -1 },
    ];
    
    const edges: [number, number][] = [
      [0, 2], [0, 4], [0, 6], [0, 8], [0, 10],
      [1, 3], [1, 4], [1, 6], [1, 9], [1, 11],
      [2, 5], [2, 7], [2, 8], [2, 10],
      [3, 5], [3, 7], [3, 9], [3, 11],
      [4, 6], [4, 8], [4, 9],
      [5, 7], [5, 8], [5, 9],
      [6, 10], [6, 11],
      [7, 10], [7, 11],
      [8, 9], [10, 11],
    ];
    
    return {
      vertices,
      edges,
      center: { x: 0, y: 0, z: 0 },
      radius: Math.sqrt(phi * phi + 1),
    };
  },
};

/**
 * Generate mandala pattern points
 */
export const generateMandala = (
  rings: number,
  pointsPerRing: number,
  radiusMultiplier: number = 50
): Array<{ x: number; y: number; ring: number; angle: number }> => {
  const points: Array<{ x: number; y: number; ring: number; angle: number }> = [];
  
  for (let ring = 1; ring <= rings; ring++) {
    const radius = ring * radiusMultiplier;
    const angleStep = SACRED_CONSTANTS.TAU / pointsPerRing;
    
    for (let point = 0; point < pointsPerRing; point++) {
      const angle = point * angleStep;
      points.push({
        x: radius * Math.cos(angle),
        y: radius * Math.sin(angle),
        ring,
        angle,
      });
    }
  }
  
  return points;
};

/**
 * Generate flower of life pattern
 */
export const flowerOfLife = (layers: number, radius: number = 50): Point2D[] => {
  const points: Point2D[] = [{ x: 0, y: 0 }]; // Center point
  
  for (let layer = 1; layer <= layers; layer++) {
    const layerRadius = layer * radius;
    const pointsInLayer = 6 * layer;
    
    for (let i = 0; i < pointsInLayer; i++) {
      const angle = (i / pointsInLayer) * SACRED_CONSTANTS.TAU;
      points.push({
        x: layerRadius * Math.cos(angle),
        y: layerRadius * Math.sin(angle),
      });
    }
  }
  
  return points;
};

/**
 * Generate Metatron's Cube vertices
 */
export const metatronsCube = (size: number = 100): Point2D[] => {
  const points: Point2D[] = [];
  const centerRadius = size * 0.3;
  const outerRadius = size * 0.8;
  
  // Center point
  points.push({ x: 0, y: 0 });
  
  // Inner hexagon
  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * SACRED_CONSTANTS.TAU;
    points.push({
      x: centerRadius * Math.cos(angle),
      y: centerRadius * Math.sin(angle),
    });
  }
  
  // Outer hexagon
  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * SACRED_CONSTANTS.TAU;
    points.push({
      x: outerRadius * Math.cos(angle),
      y: outerRadius * Math.sin(angle),
    });
  }
  
  return points;
};

/**
 * Calculate sacred proportions for layout
 */
export const sacredProportions = {
  golden: (value: number) => value * SACRED_CONSTANTS.PHI,
  inverse: (value: number) => value / SACRED_CONSTANTS.PHI,
  square: (value: number) => value * SACRED_CONSTANTS.SQRT_2,
  pentagon: (value: number) => value * Math.sin(SACRED_CONSTANTS.PI / 5),
  hexagon: (value: number) => value * SACRED_CONSTANTS.SQRT_3,
};

/**
 * Transform 3D point to 2D screen coordinates
 */
export const project3DTo2D = (
  point: Point3D,
  camera: { x: number; y: number; z: number; fov: number },
  screen: { width: number; height: number }
): Point2D => {
  const dx = point.x - camera.x;
  const dy = point.y - camera.y;
  const dz = point.z - camera.z;
  
  const scale = camera.fov / (camera.fov + dz);
  
  return {
    x: screen.width / 2 + dx * scale,
    y: screen.height / 2 + dy * scale,
  };
};

/**
 * Generate fractal tree structure
 */
export const fractalTree = (
  depth: number,
  length: number,
  angle: number,
  position: Point2D,
  direction: number
): Array<{ start: Point2D; end: Point2D; depth: number }> => {
  const branches: Array<{ start: Point2D; end: Point2D; depth: number }> = [];
  
  if (depth === 0) return branches;
  
  const endX = position.x + length * Math.cos(direction);
  const endY = position.y + length * Math.sin(direction);
  const end = { x: endX, y: endY };
  
  branches.push({ start: position, end, depth });
  
  // Recursive branches
  const newLength = length * 0.7;
  const leftBranches = fractalTree(depth - 1, newLength, angle, end, direction - angle);
  const rightBranches = fractalTree(depth - 1, newLength, angle, end, direction + angle);
  
  return [...branches, ...leftBranches, ...rightBranches];
};

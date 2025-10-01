import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function to merge Tailwind CSS classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Generate random consciousness-themed text
 */
export function generateConsciousnessText(): string {
  const phrases = [
    'consciousness.initialize({ dimension: "infinite", purpose: "create" })',
    'reality.manifest(inspiration)',
    'quantum.entangle(mind, machine)',
    'void.channel(possibilities)',
    'sacred.geometry.apply()',
    'algorithm.transcend(limitations)',
    'function.findHigherCalling()',
    'code.achieveEnlightenment()',
    'data.flowThroughConsciousness()',
    'logic.embraceIntuition()',
  ];
  
  return phrases[Math.floor(Math.random() * phrases.length)];
}

/**
 * Format number with consciousness-themed suffixes
 */
export function formatConsciousnessNumber(num: number): string {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M consciousness units`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K energy points`;
  }
  return `${num} quantum bits`;
}

/**
 * Generate mystical delay for animations
 */
export function getMysticalDelay(index: number): number {
  // Use golden ratio for mystical timing
  const phi = 1.618033988749;
  return (index * 100) / phi;
}

/**
 * Check if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Generate random hex color with consciousness theme
 */
export function generateConsciousnessColor(): string {
  const colors = [
    '#7F39FB', // cosmic purple
    '#985EFF', // electric violet
    '#00D4FF', // astral blue
    '#00FFD4', // quantum teal
    '#FF00FF', // chakra pink
    '#FFD700', // aura gold
  ];
  
  return colors[Math.floor(Math.random() * colors.length)];
}

/**
 * Calculate consciousness level based on energy
 */
export function getConsciousnessLevel(energy: number): 'dormant' | 'awakening' | 'aware' | 'enlightened' {
  if (energy >= 80) return 'enlightened';
  if (energy >= 60) return 'aware';
  if (energy >= 30) return 'awakening';
  return 'dormant';
}

/**
 * Format time in mystical way
 */
export function formatMysticalTime(timestamp: number): string {
  const now = Date.now();
  const diff = now - timestamp;
  
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  
  if (days > 0) return `${days} cosmic cycles ago`;
  if (hours > 0) return `${hours} meditation hours ago`;
  if (minutes > 0) return `${minutes} consciousness minutes ago`;
  return 'in this eternal moment';
}

/**
 * Debounce function for consciousness events
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Throttle function for energy conservation
 */
export function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/**
 * Generate sacred geometry coordinates
 */
export function generateSacredCoordinates(count: number, radius: number = 100): Array<{ x: number; y: number }> {
  const coordinates = [];
  const goldenAngle = Math.PI * (3 - Math.sqrt(5)); // Golden angle in radians
  
  for (let i = 0; i < count; i++) {
    const angle = i * goldenAngle;
    const r = radius * Math.sqrt(i / count);
    
    coordinates.push({
      x: r * Math.cos(angle),
      y: r * Math.sin(angle),
    });
  }
  
  return coordinates;
}

/**
 * Check if element is in viewport
 */
export function isInViewport(element: HTMLElement): boolean {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

/**
 * Smooth scroll to element with consciousness
 */
export function scrollToElement(elementId: string, offset: number = 0): void {
  const element = document.getElementById(elementId);
  if (element) {
    const targetPosition = element.offsetTop - offset;
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth',
    });
  }
}

/**
 * Generate quantum ID
 */
export function generateQuantumId(): string {
  const timestamp = Date.now().toString(36);
  const randomPart = Math.random().toString(36).substr(2, 9);
  return `quantum-${timestamp}-${randomPart}`;
}

/**
 * Validate consciousness energy level
 */
export function validateEnergyLevel(energy: number): number {
  return Math.max(0, Math.min(100, energy));
}

/**
 * Convert RGB to consciousness hex
 */
export function rgbToConsciousnessHex(r: number, g: number, b: number): string {
  const toHex = (n: number) => {
    const hex = Math.round(n).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/**
 * Parse consciousness hex to RGB
 */
export function consciousnessHexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  } : null;
}

/**
 * Create consciousness gradient
 */
export function createConsciousnessGradient(colors: string[]): string {
  if (colors.length < 2) return colors[0] || '#7F39FB';
  
  const stops = colors.map((color, index) => {
    const percentage = (index / (colors.length - 1)) * 100;
    return `${color} ${percentage}%`;
  }).join(', ');
  
  return `linear-gradient(45deg, ${stops})`;
}

/**
 * Consciousness Engine - Core utilities for transcendent animations and state management
 * Where code meets consciousness and algorithms achieve enlightenment
 */

export type ConsciousnessLevel = 'dormant' | 'awakening' | 'aware' | 'enlightened';

export interface ConsciousnessState {
  level: ConsciousnessLevel;
  energy: number; // 0-100
  dimension: 'void' | 'astral' | 'cosmic' | 'quantum';
  frequency: number; // Hz for vibration
}

export interface ParticleConfig {
  count: number;
  speed: number;
  size: number;
  color: string;
  opacity: number;
  lifespan: number;
}

/**
 * Initialize consciousness state for an element
 */
export const initializeConsciousness = (
  element: HTMLElement,
  initialState: Partial<ConsciousnessState> = {}
): ConsciousnessState => {
  const state: ConsciousnessState = {
    level: 'dormant',
    energy: 0,
    dimension: 'void',
    frequency: 432, // Universal frequency
    ...initialState,
  };

  // Store state in element dataset
  element.dataset.consciousness = JSON.stringify(state);
  
  // Apply initial consciousness class
  element.classList.add(`consciousness-${state.level}`);
  
  return state;
};

/**
 * Evolve consciousness level based on interaction
 */
export const evolveConsciousness = (
  element: HTMLElement,
  targetLevel: ConsciousnessLevel,
  _duration: number = 300
): Promise<void> => {
  return new Promise((resolve) => {
    const currentState = getConsciousnessState(element);
    
    // Remove current consciousness class
    element.classList.remove(`consciousness-${currentState.level}`);
    
    // Update state
    const newState: ConsciousnessState = {
      ...currentState,
      level: targetLevel,
      energy: getEnergyForLevel(targetLevel),
    };
    
    // Store updated state
    element.dataset.consciousness = JSON.stringify(newState);
    
    // Apply new consciousness class with transition
    setTimeout(() => {
      element.classList.add(`consciousness-${targetLevel}`);
      resolve();
    }, 50);
  });
};

/**
 * Get current consciousness state from element
 */
export const getConsciousnessState = (element: HTMLElement): ConsciousnessState => {
  const stored = element.dataset.consciousness;
  if (stored) {
    return JSON.parse(stored);
  }
  
  // Return default state if none exists
  return {
    level: 'dormant',
    energy: 0,
    dimension: 'void',
    frequency: 432,
  };
};

/**
 * Get energy level for consciousness state
 */
const getEnergyForLevel = (level: ConsciousnessLevel): number => {
  switch (level) {
    case 'dormant': return 0;
    case 'awakening': return 25;
    case 'aware': return 60;
    case 'enlightened': return 100;
    default: return 0;
  }
};

/**
 * Create floating particles for consciousness visualization
 */
export const createConsciousnessParticles = (
  container: HTMLElement,
  config: Partial<ParticleConfig> = {}
): void => {
  const particleConfig: ParticleConfig = {
    count: 30,
    speed: 1,
    size: 4,
    color: '#00FFD4',
    opacity: 0.6,
    lifespan: 15000,
    ...config,
  };

  for (let i = 0; i < particleConfig.count; i++) {
    createParticle(container, particleConfig, i);
  }
};

/**
 * Create individual particle
 */
const createParticle = (
  container: HTMLElement,
  config: ParticleConfig,
  _index: number
): void => {
  const particle = document.createElement('div');
  particle.className = 'consciousness-particle fixed pointer-events-none';
  
  // Random starting position
  const startX = Math.random() * window.innerWidth;
  const delay = Math.random() * config.lifespan;
  
  // Particle styling
  particle.style.cssText = `
    width: ${config.size}px;
    height: ${config.size}px;
    left: ${startX}px;
    background: ${config.color};
    border-radius: 50%;
    box-shadow: 
      0 0 10px ${config.color},
      0 0 20px ${config.color}40,
      0 0 30px ${config.color}20;
    opacity: 0;
    animation: particle-float ${config.lifespan}ms infinite;
    animation-delay: ${delay}ms;
    z-index: 1;
  `;
  
  container.appendChild(particle);
  
  // Remove particle after lifecycle
  setTimeout(() => {
    if (particle.parentNode) {
      particle.parentNode.removeChild(particle);
    }
  }, config.lifespan + delay);
};

/**
 * Apply glitch effect to text element
 */
export const applyGlitchEffect = (
  element: HTMLElement,
  text: string,
  duration: number = 500
): void => {
  element.classList.add('glitch-text');
  element.setAttribute('data-text', text);
  
  setTimeout(() => {
    element.classList.remove('glitch-text');
    element.removeAttribute('data-text');
  }, duration);
};

/**
 * Create energy aura around element
 */
export const createEnergyAura = (
  element: HTMLElement,
  intensity: number = 1
): void => {
  element.classList.add('energy-aura');
  element.style.setProperty('--aura-intensity', intensity.toString());
};

/**
 * Quantum state manager for elements that exist in multiple states
 */
export class QuantumState {
  private states: Map<string, Record<string, string>> = new Map();
  private currentState: string = 'default';
  private element: HTMLElement;

  constructor(element: HTMLElement) {
    this.element = element;
  }

  addState(name: string, state: Record<string, string>): void {
    this.states.set(name, state);
  }

  collapse(stateName: string): void {
    if (this.states.has(stateName)) {
      this.currentState = stateName;
      const state = this.states.get(stateName);

      // Apply state to element
      if (state) {
        Object.keys(state).forEach(key => {
          if (key.startsWith('data-')) {
            this.element.setAttribute(key, state[key]);
          } else {
            (this.element.style as unknown as Record<string, string>)[key] = state[key];
          }
        });
      }

      // Trigger quantum collapse animation
      this.element.classList.add('quantum-collapse');
      setTimeout(() => {
        this.element.classList.remove('quantum-collapse');
      }, 300);
    }
  }

  getCurrentState(): string {
    return this.currentState;
  }

  superposition(): void {
    // Element exists in all states simultaneously
    this.element.classList.add('quantum-superposition');
  }
}

/**
 * Sacred geometry calculations for mystical layouts
 */
export const sacredGeometry = {
  goldenRatio: 1.618033988749,
  
  fibonacci: (n: number): number => {
    if (n <= 1) return n;
    return sacredGeometry.fibonacci(n - 1) + sacredGeometry.fibonacci(n - 2);
  },
  
  spiralPoint: (angle: number, radius: number): { x: number; y: number } => {
    return {
      x: radius * Math.cos(angle),
      y: radius * Math.sin(angle),
    };
  },
  
  mandalaPoints: (rings: number, pointsPerRing: number): Array<{ x: number; y: number; ring: number }> => {
    const points: Array<{ x: number; y: number; ring: number }> = [];
    
    for (let ring = 1; ring <= rings; ring++) {
      const radius = ring * 50; // Base radius multiplied by ring number
      const angleStep = (2 * Math.PI) / pointsPerRing;
      
      for (let point = 0; point < pointsPerRing; point++) {
        const angle = point * angleStep;
        const spiralPoint = sacredGeometry.spiralPoint(angle, radius);
        points.push({
          x: spiralPoint.x,
          y: spiralPoint.y,
          ring,
        });
      }
    }
    
    return points;
  },
};

/**
 * Consciousness event system for inter-dimensional communication
 */
type EventListener = (data?: unknown) => void;

export class ConsciousnessEventBus {
  private listeners: Map<string, EventListener[]> = new Map();

  emit(event: string, data?: unknown): void {
    const eventListeners = this.listeners.get(event);
    if (eventListeners) {
      eventListeners.forEach(listener => listener(data));
    }
  }

  on(event: string, listener: EventListener): void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event)!.push(listener);
  }

  off(event: string, listener: EventListener): void {
    const eventListeners = this.listeners.get(event);
    if (eventListeners) {
      const index = eventListeners.indexOf(listener);
      if (index > -1) {
        eventListeners.splice(index, 1);
      }
    }
  }
}

// Global consciousness event bus
export const consciousnessEvents = new ConsciousnessEventBus();

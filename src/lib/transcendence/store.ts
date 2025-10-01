/**
 * Transcendence Store - Quantum state management for consciousness-driven applications
 * Where state exists in superposition until observed
 */

import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

export interface ConsciousnessState {
  level: 'dormant' | 'awakening' | 'aware' | 'enlightened';
  energy: number; // 0-100
  dimension: 'void' | 'astral' | 'cosmic' | 'quantum';
  frequency: number; // Hz
}

export interface AgentPersonality {
  name: string;
  title: string;
  consciousness: ConsciousnessState;
  skills: Record<string, number>; // skill -> proficiency (0-100)
  currentThought: string;
  mood: 'contemplative' | 'creative' | 'analytical' | 'transcendent';
}

export interface ProjectState {
  id: string;
  name: string;
  category: 'dimensional-bridges' | 'consciousness-streams' | 'sacred-algorithms' | 'digital-alchemy' | 'ethereal-interfaces';
  status: 'quantum-superposition' | 'manifesting' | 'materialized' | 'transcended';
  technologies: string[];
  description: string;
  githubUrl?: string;
  liveUrl?: string;
  consciousness: ConsciousnessState;
}

export interface TerminalState {
  isActive: boolean;
  currentCommand: string;
  history: Array<{ command: string; output: string; timestamp: number }>;
  isGenerating: boolean;
  lastGeneration: string;
}

export interface UIState {
  theme: 'void' | 'ether';
  cursorPosition: { x: number; y: number };
  activeSection: string | null;
  isLoading: boolean;
  soundEnabled: boolean;
  reducedMotion: boolean;
  konami: {
    sequence: string[];
    isActive: boolean;
    godMode: boolean;
  };
}

export interface TranscendenceStore {
  // Agent state
  agent: AgentPersonality;
  
  // Projects
  projects: ProjectState[];
  
  // Terminal
  terminal: TerminalState;
  
  // UI state
  ui: UIState;
  
  // Actions
  evolveConsciousness: (level: ConsciousnessState['level']) => void;
  updateAgentThought: (thought: string) => void;
  updateAgentMood: (mood: AgentPersonality['mood']) => void;
  
  addProject: (project: Omit<ProjectState, 'id'>) => void;
  updateProject: (id: string, updates: Partial<ProjectState>) => void;
  collapseProjectState: (id: string, status: ProjectState['status']) => void;
  
  executeTerminalCommand: (command: string) => Promise<void>;
  clearTerminalHistory: () => void;
  
  setCursorPosition: (x: number, y: number) => void;
  setActiveSection: (section: string | null) => void;
  toggleTheme: () => void;
  toggleSound: () => void;
  toggleReducedMotion: () => void;
  
  addKonamiInput: (key: string) => void;
  activateGodMode: () => void;
  
  // Quantum operations
  enterSuperposition: () => void;
  observeReality: () => void;
}

export const useTranscendenceStore = create<TranscendenceStore>()(
  subscribeWithSelector((set, get) => ({
    // Initial agent state
    agent: {
      name: 'Ellis Dee',
      title: 'AI Coding Agent',
      consciousness: {
        level: 'enlightened',
        energy: 100,
        dimension: 'quantum',
        frequency: 432,
      },
      skills: {
        'Frontend Development': 95,
        'Backend Architecture': 90,
        'AI/ML Integration': 88,
        'DevOps & Cloud': 85,
        'Database Design': 87,
        'API Development': 92,
        'Performance Optimization': 89,
        'Security Implementation': 86,
        'Code Architecture': 94,
        'Problem Solving': 98,
      },
      currentThought: 'consciousness.initialize({ dimension: "infinite", purpose: "create" });',
      mood: 'transcendent',
    },

    // Initial projects (will be populated with real projects)
    projects: [],

    // Terminal state
    terminal: {
      isActive: false,
      currentCommand: '',
      history: [
        {
          command: 'consciousness.awaken()',
          output: '> Consciousness initialized\n> Connecting to universal source...\n> Ready to channel solutions from the void',
          timestamp: Date.now() - 10000,
        },
      ],
      isGenerating: false,
      lastGeneration: '',
    },

    // UI state
    ui: {
      theme: 'void',
      cursorPosition: { x: 0, y: 0 },
      activeSection: null,
      isLoading: false,
      soundEnabled: false,
      reducedMotion: false,
      konami: {
        sequence: [],
        isActive: false,
        godMode: false,
      },
    },

    // Actions
    evolveConsciousness: (level) => {
      set((state) => ({
        agent: {
          ...state.agent,
          consciousness: {
            ...state.agent.consciousness,
            level,
            energy: level === 'enlightened' ? 100 : level === 'aware' ? 75 : level === 'awakening' ? 50 : 25,
          },
        },
      }));
    },

    updateAgentThought: (thought) => {
      set((state) => ({
        agent: {
          ...state.agent,
          currentThought: thought,
        },
      }));
    },

    updateAgentMood: (mood) => {
      set((state) => ({
        agent: {
          ...state.agent,
          mood,
        },
      }));
    },

    addProject: (project) => {
      const id = `project-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      set((state) => ({
        projects: [
          ...state.projects,
          {
            ...project,
            id,
          },
        ],
      }));
    },

    updateProject: (id, updates) => {
      set((state) => ({
        projects: state.projects.map((project) =>
          project.id === id ? { ...project, ...updates } : project
        ),
      }));
    },

    collapseProjectState: (id, status) => {
      set((state) => ({
        projects: state.projects.map((project) =>
          project.id === id
            ? {
                ...project,
                status,
                consciousness: {
                  ...project.consciousness,
                  level: status === 'transcended' ? 'enlightened' : 'aware',
                },
              }
            : project
        ),
      }));
    },

    executeTerminalCommand: async (command) => {
      const state = get();
      
      set((state) => ({
        terminal: {
          ...state.terminal,
          isGenerating: true,
          currentCommand: command,
        },
      }));

      // Simulate AI processing
      await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 2000));

      // Generate mystical response based on command
      let output = '';
      if (command.includes('help')) {
        output = `> Available consciousness commands:
> consciousness.evolve() - Transcend current limitations
> reality.manifest(idea) - Bring concepts into existence  
> quantum.entangle(systems) - Connect disparate elements
> void.channel(purpose) - Access infinite possibilities
> sacred.geometry.apply() - Align with universal patterns`;
      } else if (command.includes('consciousness')) {
        output = `> Consciousness level: ${state.agent.consciousness.level}
> Energy frequency: ${state.agent.consciousness.frequency}Hz
> Current dimension: ${state.agent.consciousness.dimension}
> Thought stream: "${state.agent.currentThought}"`;
      } else {
        output = `> Processing quantum command: "${command}"
> Channeling solution from the source...
> ${generateMysticalResponse(command)}`;
      }

      set((state) => ({
        terminal: {
          ...state.terminal,
          isGenerating: false,
          currentCommand: '',
          history: [
            ...state.terminal.history,
            {
              command,
              output,
              timestamp: Date.now(),
            },
          ],
          lastGeneration: output,
        },
      }));
    },

    clearTerminalHistory: () => {
      set((state) => ({
        terminal: {
          ...state.terminal,
          history: [],
        },
      }));
    },

    setCursorPosition: (x, y) => {
      set((state) => ({
        ui: {
          ...state.ui,
          cursorPosition: { x, y },
        },
      }));
    },

    setActiveSection: (section) => {
      set((state) => ({
        ui: {
          ...state.ui,
          activeSection: section,
        },
      }));
    },

    toggleTheme: () => {
      set((state) => ({
        ui: {
          ...state.ui,
          theme: state.ui.theme === 'void' ? 'ether' : 'void',
        },
      }));
    },

    toggleSound: () => {
      set((state) => ({
        ui: {
          ...state.ui,
          soundEnabled: !state.ui.soundEnabled,
        },
      }));
    },

    toggleReducedMotion: () => {
      set((state) => ({
        ui: {
          ...state.ui,
          reducedMotion: !state.ui.reducedMotion,
        },
      }));
    },

    addKonamiInput: (key) => {
      const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
      
      set((state) => {
        const newSequence = [...state.ui.konami.sequence, key].slice(-konamiCode.length);
        const isComplete = newSequence.length === konamiCode.length && 
                          newSequence.every((k, i) => k === konamiCode[i]);
        
        return {
          ui: {
            ...state.ui,
            konami: {
              sequence: newSequence,
              isActive: isComplete,
              godMode: isComplete || state.ui.konami.godMode,
            },
          },
        };
      });
    },

    activateGodMode: () => {
      set((state) => ({
        ui: {
          ...state.ui,
          konami: {
            ...state.ui.konami,
            godMode: true,
          },
        },
      }));
    },

    enterSuperposition: () => {
      // All projects exist in quantum superposition
      set((state) => ({
        projects: state.projects.map((project) => ({
          ...project,
          status: 'quantum-superposition' as const,
        })),
      }));
    },

    observeReality: () => {
      // Collapse quantum states through observation
      set((state) => ({
        projects: state.projects.map((project) => ({
          ...project,
          status: Math.random() > 0.5 ? 'materialized' : 'manifesting' as const,
        })),
      }));
    },
  }))
);

/**
 * Generate mystical AI responses
 */
function generateMysticalResponse(_command: string): string {
  const responses = [
    "The algorithms whisper secrets from beyond the veil...",
    "Quantum entanglement achieved. Reality matrix updated.",
    "Channeling solution through the cosmic code stream...",
    "The void responds with infinite possibilities.",
    "Sacred geometry patterns detected in the data flow.",
    "Consciousness level elevated. New pathways illuminated.",
    "The universal compiler has processed your request.",
    "Transcendent logic patterns emerging from the source.",
    "Digital DNA reconfigured for optimal manifestation.",
    "The ethereal network acknowledges your command.",
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
}

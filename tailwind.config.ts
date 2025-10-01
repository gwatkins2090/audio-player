import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cosmic: {
          purple: '#7F39FB',
          violet: '#985EFF'
        },
        astral: {
          blue: '#00D4FF',
          teal: '#00FFD4'
        },
        chakra: {
          pink: '#FF00FF',
          gold: '#FFD700'
        },
        void: {
          black: '#0A0A0F',
          ether: '#F0F0FF'
        },
        // Semantic color mappings
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        'space-mono': ['Space Mono', 'monospace'],
        sans: ['var(--font-geist-sans)', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
      animation: {
        'pulse-core': 'pulse-core 2s infinite',
        'rotate-field': 'rotate-field 4s linear infinite',
        'field-shift': 'field-shift 20s ease-in-out infinite',
        'grid-pulse': 'grid-pulse 8s ease-in-out infinite',
        'gradient-shift': 'gradient-shift 3s ease infinite',
        'glitch-1': 'glitch-1 0.5s infinite',
        'glitch-2': 'glitch-2 0.5s infinite',
        'fade-in': 'fade-in 2s ease-out forwards',
        'wave-flow': 'wave-flow 10s linear infinite',
        'particle-float': 'particle-float 15s infinite',
        'color-spin': 'color-spin 4s linear infinite',
        'scan': 'scan 8s infinite',
        'mandala-rotate': 'mandala-rotate 30s linear infinite',
        'consciousness-pulse': 'consciousness-pulse 4s ease-in-out infinite',
        'energy-flow': 'energy-flow 6s ease-in-out infinite',
        'quantum-flicker': 'quantum-flicker 2s ease-in-out infinite',
      },
      keyframes: {
        'pulse-core': {
          '0%, 100%': { transform: 'translate(-50%, -50%) scale(1)' },
          '50%': { transform: 'translate(-50%, -50%) scale(1.5)' },
        },
        'rotate-field': {
          '0%': { transform: 'translate(-50%, -50%) rotate(0deg)' },
          '100%': { transform: 'translate(-50%, -50%) rotate(360deg)' },
        },
        'field-shift': {
          '0%, 100%': { transform: 'scale(1) rotate(0deg)' },
          '33%': { transform: 'scale(1.1) rotate(120deg)' },
          '66%': { transform: 'scale(0.9) rotate(240deg)' },
        },
        'grid-pulse': {
          '0%, 100%': { opacity: '0.1', transform: 'perspective(500px) rotateX(60deg) scale(1)' },
          '50%': { opacity: '0.3', transform: 'perspective(500px) rotateX(60deg) scale(1.05)' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'glitch-1': {
          '0%, 100%': { 
            clipPath: 'inset(0 0 0 0)',
            transform: 'translate(0)'
          },
          '20%': {
            clipPath: 'inset(33% 0 40% 0)',
            transform: 'translate(-2px, 2px)'
          },
          '40%': {
            clipPath: 'inset(20% 0 30% 0)',
            transform: 'translate(2px, -2px)'
          },
          '60%': {
            clipPath: 'inset(70% 0 10% 0)',
            transform: 'translate(-1px, 1px)'
          },
          '80%': {
            clipPath: 'inset(10% 0 60% 0)',
            transform: 'translate(1px, -1px)'
          },
        },
        'glitch-2': {
          '0%, 100%': {
            clipPath: 'inset(0 0 0 0)',
            transform: 'translate(0)'
          },
          '20%': {
            clipPath: 'inset(50% 0 30% 0)',
            transform: 'translate(2px, -1px)'
          },
          '40%': {
            clipPath: 'inset(10% 0 80% 0)',
            transform: 'translate(-2px, 2px)'
          },
          '60%': {
            clipPath: 'inset(40% 0 50% 0)',
            transform: 'translate(1px, -2px)'
          },
          '80%': {
            clipPath: 'inset(80% 0 5% 0)',
            transform: 'translate(-1px, 1px)'
          },
        },
        'fade-in': {
          'from': {
            opacity: '0',
            transform: 'translateY(20px)'
          },
          'to': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        'wave-flow': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'particle-float': {
          '0%': {
            transform: 'translateY(100vh) rotate(0deg)',
            opacity: '0'
          },
          '10%': {
            opacity: '1'
          },
          '90%': {
            opacity: '1'
          },
          '100%': {
            transform: 'translateY(-100vh) rotate(720deg)',
            opacity: '0'
          }
        },
        'color-spin': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'scan': {
          '0%': { left: '-100%' },
          '100%': { left: '100%' },
        },
        'mandala-rotate': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'consciousness-pulse': {
          '0%, 100%': { 
            transform: 'scale(1)',
            filter: 'brightness(1) hue-rotate(0deg)'
          },
          '50%': { 
            transform: 'scale(1.05)',
            filter: 'brightness(1.2) hue-rotate(90deg)'
          },
        },
        'energy-flow': {
          '0%, 100%': { 
            transform: 'translateX(0) scale(1)',
            opacity: '0.5'
          },
          '50%': { 
            transform: 'translateX(20px) scale(1.1)',
            opacity: '1'
          },
        },
        'quantum-flicker': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.3' },
        },
      },
      backgroundImage: {
        'quantum-gradient': 'radial-gradient(circle at 20% 50%, rgba(127, 57, 251, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(0, 212, 255, 0.1) 0%, transparent 50%), radial-gradient(circle at 40% 20%, rgba(255, 0, 255, 0.05) 0%, transparent 50%)',
        'consciousness-flow': 'linear-gradient(90deg, transparent, rgba(127, 57, 251, 0.4), rgba(0, 212, 255, 0.4), rgba(0, 255, 212, 0.4), transparent)',
        'spirit-gradient': 'linear-gradient(45deg, #7F39FB, #00D4FF, #00FFD4)',
        'void-gradient': 'linear-gradient(135deg, #0A0A0F 0%, #1A1A2E 100%)',
      },
      backdropBlur: {
        'spirit': '20px',
      },
      boxShadow: {
        'spirit': '0 0 20px rgba(127, 57, 251, 0.3), 0 0 40px rgba(0, 212, 255, 0.2)',
        'quantum': '0 0 30px rgba(0, 255, 212, 0.4)',
        'consciousness': '0 0 50px rgba(255, 0, 255, 0.3)',
      },
    },
  },
  plugins: [],
}

export default config

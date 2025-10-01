# Changelog

All notable changes to this project will be documented in this file.

## [1.0.0] - 2025-09-30

### 🎉 Major Refactoring - Standalone Component Library

This release transforms the project from a portfolio site with a component showcase into a dedicated, standalone component library.

### Added
- **Main export file** (`src/components/index.ts`) for easy component imports
- **Library build configuration** (`tsconfig.lib.json`) for building distributable package
- **Comprehensive documentation**:
  - Updated README.md with installation and usage instructions
  - New USAGE.md with detailed integration guide
  - Component-specific documentation in subdirectories
- **NPM package configuration** in package.json for publishing
- **Build script** (`build:lib`) for creating distributable library
- **Optimized Next.config.ts** for component showcase and library usage

### Changed
- **Moved Storybook to root**: Component showcase now accessible at `/` instead of `/storybook`
- **Updated branding**: Changed from "Back To Sourcecode" portfolio to "Component Library"
- **Simplified layout**: Removed portfolio-specific styling and metadata
- **Package name**: Changed to `@your-org/component-library`
- **Project focus**: Now optimized for component development and reuse

### Removed
- **Portfolio pages**: Removed all portfolio-related routes and pages
  - `/about` - About page
  - `/projects` - Projects showcase
  - `/contact` - Contact page
  - `/dna` - Digital DNA section
  - `/gateway` - Gateway page
- **Portfolio components**:
  - `Header` component (portfolio navigation)
  - `SourceHero` component (portfolio hero)
  - Landing page components
- **Portfolio-specific metadata** from layout.tsx
- **Portfolio-specific styling** (quantum field, sacred grid backgrounds from layout)

### Maintained
All reusable components are preserved and enhanced:
- ✅ **Hero Components**: HeroBanner with full customization
- ✅ **Sacred Geometry**: Mandala and Flower of Life
- ✅ **Spirit UI**: QuantumButton, GlassMorphism, ConsciousnessText, SpiritCursor
- ✅ **3D Quantum**: QuantumScene, SacredGeometry3D, ConsciousnessMandala, RealityParticleSystem
- ✅ **Backgrounds**: AnimatedBackground
- ✅ **Interactive Playground**: Component customization tool
- ✅ **Utilities**: All helper functions and hooks

### Technical Details
- **Dependencies**: All component dependencies maintained
- **TypeScript**: Full type safety preserved
- **Tailwind CSS**: Custom theme and utilities intact
- **Framer Motion**: Animation library integrated
- **Three.js**: 3D visualization support maintained

### Migration Guide

If you were using the portfolio site:
1. The portfolio has been moved to a separate project
2. All reusable components remain available in this library
3. Import components using the new structure (see USAGE.md)

### Usage

**Development Mode**:
```bash
pnpm install
pnpm dev
```

**As a Library**:
```tsx
import { HeroBanner, Mandala, QuantumButton } from '@your-org/component-library';
```

See USAGE.md for detailed integration instructions.

---

## [0.1.0] - Previous Version

Initial portfolio site with component showcase at `/storybook`.


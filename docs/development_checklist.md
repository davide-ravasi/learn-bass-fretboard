# Bass Guitar Learning App - Development Checklist

## Project Overview

**Goal:** Build a React-based web application to learn bass guitar notes on the fretboard
**Timeline:** 10 weeks, 30 minutes/day
**Total Time:** ~35 hours
**Current Progress:** 80% (8/10 sessions complete)

---

## 📋 Session 1: Project Setup ✅

**Date:** **01\08\2025** | **Duration:** 30 min | **Status:** ✅ Complete

### Tasks:

- [x] Create Vite React TypeScript project
- [x] Install Tone.js dependency
- [x] Set up project directory structure
- [x] Clean up default files

### Files Created:

- [x] `bass-fretboard-app/` (project root)
- [x] `src/components/` (directory)
- [x] `src/hooks/` (directory)
- [x] `src/data/` (directory)
- [x] `src/types/` (directory)
- [x] `src/utils/` (directory)

---

## 📋 Session 2: Types & Data Structure ✅

**Date:** **01\08\2025** | **Duration:** 30 min | **Status:** ✅ Complete

### Tasks:

- [x] Create TypeScript interfaces
- [x] Build bass notes data structure
- [x] Test data generation

### Files Created/Modified:

- [x] `src/types/index.ts` - Note, PracticeSettings, GameState interfaces
- [x] `src/data/notes.ts` - Bass notes generation and utilities
- [x] `src/App.tsx` - Basic test implementation

### Functions Implemented:

- [x] `getNoteName()` - Calculate note names from fret positions
- [x] `generateBassNotes()` - Generate all 52 notes (4 strings × 13 frets)
- [x] `getRandomNote()` - Get random note for practice
- [x] `BASS_NOTES` - Complete notes array export

---

## 📋 Session 3: Basic Fretboard Component ✅

**Date:** **04\08\2025** | **Duration:** 30 min | **Status:** ✅ Complete

### Tasks:

- [x] Create Fretboard component
- [x] Set up CSS Grid layout (4 strings × 13 frets)
- [x] Add basic styling
- [x] Display fretboard visually

### Files Created:

- [x] `src/components/Fretboard.tsx` - Data-driven fretboard component
- [x] `src/components/Fretboard.css` - Grid layout and styling

### Implementation Steps:

1. ✅ Create grid layout for 4 strings × 13 frets
2. ✅ Add basic styling with hover effects
3. ✅ Display all 52 notes on fretboard
4. ✅ Responsive design with proper spacing

---

## 📋 Session 4: Interactive Fretboard ✅

**Date:** **05\08\2025** | **Duration:** 30 min | **Status:** ✅ Complete

### Tasks:

- [x] Make fretboard clickable
- [x] Add click event handlers
- [x] Visual feedback for clicks
- [x] Connect to note data

### Files Modified:

- [x] `src/components/Fretboard.tsx` - Added click handlers and state management
- [x] `src/components/Fretboard.css` - Added clicked state styling

### Implementation Steps:

1. ✅ Add onClick handlers to each fret position
2. ✅ Highlight clicked positions with green color
3. ✅ Map clicks to note data with proper state management
4. ✅ Add visual feedback with 1-second timeout

---

## 📋 Session 5: Game Logic & Scoring ✅

**Date:** **05/08/2025** | **Duration:** 30 min | **Status:** ✅ Complete

### Tasks:

- [x] Implement scoring system
- [x] Add correct/incorrect answer checking
- [x] Track statistics
- [x] Create game state management

### Files Created/Modified:

- [x] `src/hooks/useGameState.ts` - Game state management with scoring
- [x] `src/components/ScoreDisplay.tsx` - Score display with accuracy
- [x] `src/App.tsx` - Integrate game logic

### Implementation Steps:

1. ✅ Create game state hook with useGameState
2. ✅ Add score tracking (+10 points for correct)
3. ✅ Implement answer validation (string, fret, name)
4. ✅ Display current score and accuracy percentage

---

## 📋 Session 6: PWA Conversion ✅

**Date:** **12\08\2025** | **Duration:** 30 min | **Status:** ✅ Complete

### Tasks:

- [x] Install PWA dependencies
- [x] Configure Vite with PWA plugin
- [x] Create install prompt component
- [x] Add PWA meta tags
- [x] Style install interface
- [x] Set up service worker caching

### Files Created/Modified:

- [x] `vite.config.ts` - Added VitePWA plugin configuration
- [x] `src/components/InstallPrompt.tsx` - PWA install prompt component
- [x] `index.html` - Added PWA meta tags and manifest links
- [x] `src/App.css` - Styled install prompt interface
- [x] `public/icon.svg` - Basic PWA icon
- [x] `docs/pwa_conversion_guide.md` - Comprehensive PWA documentation
- [x] `docs/pwa_quick_reference.md` - Quick reference cheat sheet

### Implementation Steps:

1. ✅ Installed `vite-plugin-pwa` and `workbox-window`
2. ✅ Configured Vite with PWA plugin and manifest settings
3. ✅ Created InstallPrompt component with beforeinstallprompt handling
4. ✅ Added PWA meta tags for mobile and desktop installation
5. ✅ Styled install prompt with animations and responsive design
6. ✅ Set up automatic service worker generation and caching
7. ✅ Created comprehensive documentation and quick reference

### PWA Features Implemented:

- [x] **Installable**: Users can add to home screen
- [x] **Offline Capable**: Service worker caches app assets
- [x] **Mobile Optimized**: Touch-friendly interface
- [x] **App-like Experience**: Full-screen mode, native feel
- [x] **Auto-updates**: Service worker handles updates automatically
- [x] **Cross-platform**: Works on iOS, Android, and Desktop

### PWA Configuration:

- [x] **Display Mode**: `standalone` (hides browser UI)
- [x] **Orientation**: `portrait` (mobile optimized)
- [x] **Theme Color**: `#4caf50` (bass guitar green)
- [x] **Background Color**: `#ffffff` (clean white)
- [x] **Scope**: `/` (full app scope)
- [x] **Start URL**: `/` (app entry point)

---

## 📋 Session 7: Audio Integration ✅

**Date:** **12\08\2025** | **Duration:** 30 min | **Status:** ✅ Complete

### Tasks:

- [x] Integrate Tone.js for audio
- [x] Add note sound generation
- [x] Create audio controls
- [x] Handle browser audio permissions

### Files Created/Modified:

- [x] `src/App.tsx` - Added Tone.js integration and playNote function
- [x] `package.json` - Added Tone.js dependency

### Implementation Steps:

1. ✅ Set up Tone.js context with `Tone.start()`
2. ✅ Generate note frequencies from existing note data
3. ✅ Add audio playback on note clicks
4. ✅ Handle audio permissions and errors gracefully

### Audio Features Implemented:

- [x] **Note Playback**: Plays correct frequency when notes are clicked
- [x] **Audio Context Management**: Handles browser audio permissions
- [x] **Error Handling**: Graceful fallback if audio fails
- [x] **Integration**: Seamlessly works with existing game logic
- [x] **User Experience**: Audio feedback enhances learning

### Audio Configuration:

- [x] **Synth Type**: Basic synthesizer for clear note sounds
- [x] **Note Duration**: 8th note (`"8n"`) for quick feedback
- [x] **Frequency Mapping**: Uses existing note frequency data
- [x] **Browser Compatibility**: Works across all modern browsers

---

## 📋 Session 8: Code Improvements & Interface Enhancements

**Date:** **2026-05 / merge prep 2026-10** | **Status:** ✅ Layout shippato (debiti sotto)  
**Branch:** `feat/improve-interface-layout` (PR #5)

### Shipped on this branch
- [x] Horizontal fretboard (column-based neck, CodePen-inspired styling)
- [x] Fret inlays as column decorations (not brittle absolute dots)
- [x] Frets as `<button>` with focus-visible; ~44px min width on coarse pointers
- [x] **Intentional horizontal scroll** on small screens (`min-width: 680px` + `overflow-x: auto`) so frets stay usable — not a bug
- [x] Feedback moved into info panel area (branch work)

### Debito esplicito (post-merge — non blocca PR #5)
- [ ] Landscape packing: verify ScoreDisplay + controls on short viewports; compact if needed
- [ ] Note-label rotation only in landscape (optional polish)
- [ ] BEM naming pass across App / Fretboard / ScoreDisplay
- [ ] `touch-action: manipulation`; safe-area; `prefers-reduced-motion`
- [ ] Broader `aria-label`s when labels are visible

### Tasks:

- [ ] Create reusable feedback component
- [ ] Extract helper functions to separate files
- [ ] Improve code organization and reusability
- [ ] Enhance user interface components

### Files to Create/Modify:

- [ ] `src/components/Feedback.tsx` - Reusable feedback component
- [ ] `src/utils/helpers.ts` - Helper functions and utilities
- [ ] `src/utils/audioHelpers.ts` - Audio-specific helper functions
- [ ] `src/utils/gameHelpers.ts` - Game logic helper functions
- [ ] `src/App.tsx` - Refactor to use new components and helpers

### Implementation Steps:

1. Extract feedback logic to separate component
2. Move helper functions to utility files
3. Refactor App.tsx for better organization
4. Improve component reusability
5. Add proper TypeScript types for helpers

#### Next Steps (Agreed)

- [ ] Adopt BEM naming across UI components
  - [ ] Map current classes → BEM (`.fretboard`, `.fretboard__string`, `.fretboard__fret`, modifiers for clicked/highlighted/correct/incorrect/open/dot)
  - [ ] Update JSX classNames in `Fret.tsx`, `Fretboard.tsx`, `ScoreDisplay.tsx` to match
  - [ ] Keep indentation and formatting unchanged; avoid unrelated refactors
- [ ] Mobile landscape behavior
  - [ ] Horizontal fretboard in mobile landscape
  - [ ] Rotate only note labels in landscape (use `.note-label` span + media query)
  - [ ] Keep portrait and desktop unrotated
- [ ] Touch targets and spacing
  - [ ] Ensure min 44px touch size for frets in both orientations
  - [ ] Adjust `.note-label` spacing (`line-height`, padding or letter-spacing) if cramped
- [ ] Overflow and layout safety
  - [x] Horizontal scroll on neck is **intentional** (usable fret width); do not force `overflow-x: hidden` on fretboard
  - [ ] Verify ScoreDisplay remains visible and readable in all orientations (post-merge)

#### Nice-to-have (End of Session)

- [ ] Tablet-specific rules (iPad landscape may keep labels unrotated if cramped)
- [ ] Reduced motion support: disable animations with `@media (prefers-reduced-motion: reduce)`
- [ ] Safe areas for PWA (iOS notches): `padding: env(safe-area-inset-*)`
- [ ] 12th-fret double dot styling
- [ ] Document BEM naming patterns and include quick reference in `docs/`

### Code Improvements:

- [ ] **Component Separation**: Break down App.tsx into smaller components
- [ ] **Helper Functions**: Extract common logic to utility files
- [ ] **Type Safety**: Improve TypeScript interfaces and types
- [ ] **Code Reusability**: Make components more modular
- [ ] **Performance**: Optimize re-renders and state management

### Interface Improvements:

- [ ] **Responsive Fretboard Layout**: Implement flexbox-based vertical fretboard

  - [ ] Always vertical layout using flexbox (not rotation)
  - [ ] Desktop layout: Horizontal fretboard with side controls
  - [ ] Portrait mode (mobile): Vertical fretboard with top controls
  - [ ] Landscape mode (mobile): Auto-rotate notes, maintain vertical fretboard
  - [ ] Proper touch targets (44px minimum) for mobile
  - [ ] Media queries for desktop/tablet/mobile breakpoints
  - [ ] Test across different screen sizes and orientations

  - [ ] Mobile landscape: keep fretboard horizontal; rotate note labels only

- [ ] **BEM CSS Naming Convention**: Refactor all CSS to use standardized BEM methodology

  - [ ] Refactor Fretboard component CSS to BEM
  - [ ] Refactor App component CSS to BEM
  - [ ] Refactor ScoreDisplay component CSS to BEM
  - [ ] Update all component class names to follow BEM structure
  - [ ] Document BEM naming patterns in project
  - [ ] Create BEM reference guide for consistency

  **BEM Structure Examples:**

  - Block: `.fretboard`, `.score-display`, `.info-panel`
  - Element: `.fretboard__position`, `.score-display__accuracy`, `.info-panel__button`
  - Modifier: `.fretboard__position--clicked`, `.fretboard__position--highlighted`, `.score-display--mobile`

---

## 📋 Session 9: Practice Modes & Timing

**Date:** **\_\_\_\_** | **Duration:** 30 min | **Status:** ⏳ Pending

### Tasks:

- [ ] Add different difficulty levels
- [ ] Implement auto-advance mode
- [ ] Add timing controls
- [ ] Create practice settings

### Files to Create/Modify:

- [ ] `src/components/Controls.tsx` - Practice controls
- [ ] `src/hooks/useTimer.ts` - Timing functionality
- [ ] `src/components/NoteDisplay.tsx` - Note display

### Implementation Steps:

1. Add difficulty settings (easy/medium/hard)
2. Implement BPM controls
3. Add auto-advance functionality
4. Create practice mode toggles

---

## 📋 Session 10: Unit Testing & Test Setup

**Date:** **\_\_\_\_** | **Duration:** 30 min | **Status:** ⏳ Pending

### Tasks:

- [ ] Set up testing framework (Vitest/Jest)
- [ ] Write unit tests for core functions
- [ ] Test note generation functions
- [ ] Test game logic functions

### Files to Create/Modify:

- [ ] `src/data/notes.test.ts` - Tests for notes functions
- [ ] `src/hooks/useGameState.test.ts` - Tests for game state
- [ ] `src/utils/audioUtils.test.ts` - Tests for audio utilities
- [ ] `vitest.config.ts` - Test configuration

### Implementation Steps:

1. Install and configure Vitest
2. Write tests for `getNoteName()` function
3. Write tests for `generateBassNotes()` function
4. Write tests for `getRandomNote()` function
5. Add test coverage reporting

---

## 📋 Session 11: CI/CD Pipeline

**Date:** **\_\_\_\_** | **Duration:** 30 min | **Status:** ⏳ Pending

### Tasks:

- [ ] Set up GitHub Actions workflow
- [ ] Configure automated testing
- [ ] Add build and deploy pipeline
- [ ] Set up code quality checks

### Files to Create/Modify:

- [ ] `.github/workflows/ci.yml` - CI/CD pipeline
- [ ] `.eslintrc.js` - ESLint configuration
- [ ] `package.json` - Add test scripts

### Implementation Steps:

1. Create GitHub Actions workflow
2. Configure automated testing on push/PR
3. Add build verification
4. Set up deployment to GitHub Pages/Vercel

---

## 📋 Session 12: Polish & Enhanced Features

**Date:** **\_\_\_\_** | **Duration:** 30 min | **Status:** ⏳ Pending

### Tasks:

- [ ] Add progress tracking
- [ ] Improve UI/UX design
- [ ] Add accessibility features
- [ ] Final testing and bug fixes

### Files to Create/Modify:

- [ ] `src/components/ProgressTracker.tsx` - Progress display
- [ ] `src/utils/gameUtils.ts` - Game utilities
- [ ] `src/App.css` - Final styling

### Implementation Steps:

1. Add session statistics
2. Implement progress persistence
3. Add keyboard navigation
4. Final UI polish

### Future Audio Enhancements:

- [ ] **Bass-Specific Sound**: Customize synth for authentic bass tones
- [ ] **Volume Control**: User-adjustable audio levels
- [ ] **Sound Toggle**: On/off switch for audio
- [ ] **Metronome**: Timing practice with click tracks
- [ ] **Different Instruments**: Choose between bass, guitar, piano sounds
- [ ] **Audio Visualizer**: Visual representation of played notes

---

## 🎯 Weekly Goals Summary

### Week 1-2: Foundation ✅

- [x] Project setup
- [x] Data structure
- [x] Basic components

### Week 3-4: Core Functionality ✅

- [x] Basic fretboard component
- [x] Interactive fretboard
- [x] Game logic
- [x] Scoring system

### Week 5-6: Audio & Timing

- [ ] Audio integration
- [ ] Practice modes
- [ ] Timing controls

### Week 7-8: Audio & Timing

- [ ] Audio integration
- [ ] Practice modes
- [ ] Timing controls

### Week 9-10: Testing & Polish

- [ ] Unit testing
- [ ] CI/CD pipeline
- [ ] Final polish & features

---

## 📁 Final Project Structure

```
src/
├── components/
│   ├── Fretboard.tsx ✅
│   ├── Fretboard.css ✅
│   ├── NoteDisplay.tsx
│   ├── Controls.tsx
│   ├── AudioPlayer.tsx
│   ├── ScoreDisplay.tsx ✅
│   └── ProgressTracker.tsx
├── hooks/
│   ├── useAudio.ts
│   ├── useGameState.ts ✅
│   └── useTimer.ts
├── data/
│   ├── notes.ts ✅
│   ├── notes.test.ts
│   └── scales.ts
├── types/
│   └── index.ts ✅
├── utils/
│   ├── audioUtils.ts
│   ├── audioUtils.test.ts
│   └── gameUtils.ts
└── __tests__/
    └── hooks/
        └── useGameState.test.ts
.github/
└── workflows/
    └── ci.yml
```

---

## 🚀 Getting Started for Each Session

1. **Navigate to project:** `cd bass-fretboard-app`
2. **Start dev server:** `npm run dev`
3. **Open browser:** `http://localhost:5173`
4. **Work for 30 minutes**
5. **Commit changes:** `git add . && git commit -m "Session X complete"`
6. **Plan next session**

---

## 📝 Notes & Ideas

- Keep sessions focused on one feature
- Test frequently
- Don't over-engineer - "good enough" is perfect
- Use version control for each session
- Plan next session at the end of current one

### 🎨 Future CSS Improvements

- **Check CodePen inspiration:** [Guitar Fretboard by DreySkee](https://codepen.io/DreySkee/pen/bddpqM)
- **Adapt for bass guitar:** 4 strings instead of 6, adjust styling
- **Add realistic fretboard appearance:** Wood texture, proper fret markers
- **Enhance visual effects:** Better hover states, click animations
- **Improve responsiveness:** Better mobile/tablet experience
- **Add accessibility:** Better contrast, keyboard navigation

---

---

## 📊 Overall Project Progress

### **Current Progress: 60% Complete** ✅

**Sessions Completed:** 6 out of 10  
**Time Invested:** ~3 hours out of ~35 hours  
**Next Session:** Session 7 - Audio Integration

### **Progress Breakdown:**

- ✅ **Week 1-2:** Foundation (100% Complete)
- ✅ **Week 3-4:** Core Functionality (100% Complete)
- ✅ **Week 5-6:** Game Logic & PWA (100% Complete)
- ⏳ **Week 7-8:** Audio & Timing (0% Complete)
- ⏳ **Week 9-10:** Testing & Polish (0% Complete)

### **Milestone Tracking:**

- 🎯 **Milestone 1:** Project Setup ✅
- 🎯 **Milestone 2:** Data Structure ✅
- 🎯 **Milestone 3:** Basic Fretboard ✅
- 🎯 **Milestone 4:** Interactive Fretboard ✅
- 🎯 **Milestone 5:** Game Logic ✅
- 🎯 **Milestone 6:** PWA Conversion ✅
- 🎯 **Milestone 7:** Audio Integration 🎯
- 🎯 **Milestone 8:** Practice Modes
- 🎯 **Milestone 9:** Unit Testing
- 🎯 **Milestone 10:** Final Polish

---

**Remember:** 30 minutes/day is perfect for consistent progress! 🎸

# Bass Guitar Learning App - Project Plan

## Project Overview

A React-based web application to help learn bass guitar notes on the fretboard with visual aids and audio playback capabilities.

## Core Features

### Phase 1: Basic Functionality (Weeks 1-4)

- [ ] **Fretboard Visualization**

  - 4-string bass (E, A, D, G)
  - 12-fret display
  - Grid layout with CSS Grid/Flexbox
  - Visual note markers

- [ ] **Random Note Generation**

  - Generate random notes to practice
  - Display target note name
  - Track current note position

- [ ] **Answer Checking**

  - Click on fretboard to answer
  - Visual feedback (correct/incorrect)
  - Basic scoring system

- [ ] **Difficulty Toggle**
  - Show/hide visual aids
  - Adjustable difficulty levels

### Phase 2: Audio Features (Weeks 5-6)

- [ ] **Audio Playback**

  - Generate bass note sounds
  - Use Tone.js library for web audio
  - Pre-recorded samples option

- [ ] **Timing System**
  - Customizable BPM (60-200)
  - Auto-advance notes
  - Note duration settings
  - Start/stop/pause controls

### Phase 3: Enhanced Features (Weeks 7-8)

- [ ] **Practice Modes**

  - Manual mode (click to advance)
  - Auto mode (timed progression)
  - Loop mode (repeat same note)
  - Scale practice mode

- [ ] **Progress Tracking**

  - Session statistics
  - Accuracy percentage
  - Practice streak tracking

- [ ] **UI Polish**
  - Responsive design
  - Dark/light theme
  - Accessibility features

## Technical Stack

### Frontend

- **React** with TypeScript
- **CSS Grid/Flexbox** for layout
- **Tone.js** for audio generation
- **Local state management** (useState/useContext)

### Data Structure

```typescript
interface Note {
  name: string;
  string: number; // 1-4 (E, A, D, G)
  fret: number; // 0-12
  frequency: number;
}

interface PracticeSettings {
  bpm: number;
  autoAdvance: boolean;
  showVisualAids: boolean;
  difficulty: "easy" | "medium" | "hard";
}
```

## Development Timeline

### 30 Minutes/Day Approach

- **Total Duration**: 8 weeks (56 days)
- **Daily Sessions**: 30 minutes
- **Total Time**: ~28 hours

### Weekly Breakdown

- **Week 1-2**: Project setup + basic fretboard
- **Week 3-4**: Core functionality + scoring
- **Week 5-6**: Audio integration + timing
- **Week 7-8**: Polish + additional features

## Project Structure

```
src/
├── components/
│   ├── Fretboard.tsx
│   ├── NoteDisplay.tsx
│   ├── Controls.tsx
│   ├── AudioPlayer.tsx
│   └── ScoreDisplay.tsx
├── hooks/
│   ├── useAudio.ts
│   ├── useGameState.ts
│   └── useTimer.ts
├── data/
│   ├── notes.ts
│   └── scales.ts
├── types/
│   └── index.ts
└── utils/
    ├── audioUtils.ts
    └── gameUtils.ts
```

## Key Implementation Notes

### Audio Generation

- Use Tone.js for reliable web audio
- Generate frequencies for each note
- Consider pre-recorded samples for better quality
- Handle browser audio context restrictions

### Fretboard Layout

- CSS Grid for consistent positioning
- SVG for custom graphics (optional)
- Responsive design for mobile/tablet
- Clear visual hierarchy

### State Management

- Keep it simple with React hooks
- No need for complex state libraries initially
- Focus on local state for settings and game state

## Getting Started Checklist

1. **Project Setup**

   - Create React app with TypeScript
   - Install Tone.js
   - Set up basic project structure

2. **First Session Goals**

   - Basic fretboard component
   - Static note display
   - Simple styling

3. **Development Tips**
   - Use version control (Git)
   - Plan next session at end of each one
   - Focus on one feature per session
   - Keep "good enough" mindset

## Future Enhancements (Post-MVP)

- Multiple bass tunings
- Chord recognition
- Scale practice modes
- Backing track integration
- Social features (leaderboards)
- Mobile app version

## Resources

- [Tone.js Documentation](https://tonejs.github.io/)
- [Web Audio API Guide](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)

---

**Remember**: 30 minutes/day is perfect for consistent progress. Focus on small, achievable goals each session!

PROMPT
I want to build a bass guitar learning app with React. I have a detailed project plan document that outlines the features, timeline, and technical approach. The plan is designed for 30 minutes/day development over 8 weeks. Can you help me scaffold this project?

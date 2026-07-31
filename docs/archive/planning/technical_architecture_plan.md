# Technical Architecture Plan

> **Visione v2 (archivio).** Non implementare l’albero a 60 file day-1.  
> Curriculum: [../../planning/ALIGNED_PLAN.md](../../planning/ALIGNED_PLAN.md) §4–5. Estrai pattern solo quando arriva la feature.

**Date:** 26 Luglio 2026  
**Project:** Bass Guitar Learning App  
**Phase:** Reference architecture (non roadmap operativa)  
**Stack:** React + TypeScript + Vite + Tone.js + PWA

---

## 🎯 ARCHITECTURAL PRINCIPLES

### 1. Scalability from Day 1
- Structure code pensando a futuro backend
- Clean separation of concerns
- Easy to add features without refactoring tutto

### 2. Maintainability
- Self-documenting code
- Type-safe (TypeScript strict mode)
- Test coverage >80%
- Clear folder structure

### 3. Performance
- Fast load times (<2s FCP)
- Smooth interactions (60fps)
- Efficient data persistence
- Lazy loading where appropriate

### 4. User Experience
- Offline-first PWA
- Instant feedback
- No loading spinners (optimistic UI)
- Responsive & accessible

---

## 📁 PROJECT STRUCTURE (Target)

```
bass-fretboard-app/
├── public/
│   ├── manifest.json
│   ├── icon.svg
│   ├── apple-touch-icon.png
│   └── service-worker.js (auto-generated)
│
├── src/
│   ├── main.tsx                 # Entry point
│   ├── App.tsx                  # Root component (routing)
│   ├── index.css                # Global styles
│   ├── vite-env.d.ts
│   │
│   ├── pages/                   # Top-level pages
│   │   ├── HomePage.tsx         # Landing/welcome
│   │   ├── DashboardPage.tsx    # Stats & progress overview
│   │   ├── PracticePage.tsx     # Main practice interface
│   │   ├── ScalePage.tsx        # Scale learning
│   │   └── SettingsPage.tsx     # User settings
│   │
│   ├── features/                # Feature-based modules
│   │   │
│   │   ├── fretboard/           # Fretboard component module
│   │   │   ├── Fretboard.tsx
│   │   │   ├── Fret.tsx
│   │   │   ├── Fretboard.css
│   │   │   ├── FretboardLogic.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── practice/            # Practice modes
│   │   │   ├── PracticeMode.tsx
│   │   │   ├── StudyMode.tsx
│   │   │   ├── QuizMode.tsx
│   │   │   ├── FocusMode.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── scales/              # Scale learning module
│   │   │   ├── ScaleExplorer.tsx
│   │   │   ├── ScaleSelector.tsx
│   │   │   ├── ScalePractice.tsx
│   │   │   ├── ScaleProgress.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── progress/            # Progress tracking
│   │   │   ├── ProgressDashboard.tsx
│   │   │   ├── Heatmap.tsx
│   │   │   ├── StatsChart.tsx
│   │   │   ├── WeakNotesList.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── audio/               # Audio system
│   │   │   ├── AudioPlayer.tsx
│   │   │   ├── AudioSettings.tsx
│   │   │   └── index.ts
│   │   │
│   │   └── achievements/        # Achievement system
│   │       ├── AchievementList.tsx
│   │       ├── AchievementBadge.tsx
│   │       └── index.ts
│   │
│   ├── components/              # Shared/common components
│   │   ├── ui/                  # Base UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Slider.tsx
│   │   │   ├── Toggle.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── index.ts
│   │   │
│   │   └── feedback/
│   │       ├── FeedbackMessage.tsx
│   │       ├── Toast.tsx
│   │       └── index.ts
│   │
│   ├── hooks/                   # Custom React hooks
│   │   ├── useGameState.ts
│   │   ├── useProgress.ts
│   │   ├── useAudio.ts
│   │   ├── useScales.ts
│   │   ├── useLocalStorage.ts
│   │   ├── useTimer.ts
│   │   └── index.ts
│   │
│   ├── services/                # Business logic layer
│   │   ├── ProgressService.ts
│   │   ├── ScaleGenerator.ts
│   │   ├── AnalyticsService.ts
│   │   ├── StorageService.ts
│   │   ├── AudioService.ts
│   │   └── index.ts
│   │
│   ├── storage/                 # Data persistence layer
│   │   ├── adapters/
│   │   │   ├── StorageAdapter.ts      # Interface
│   │   │   ├── LocalStorageAdapter.ts
│   │   │   ├── IndexedDBAdapter.ts    # Future
│   │   │   └── CloudStorageAdapter.ts # Future
│   │   │
│   │   ├── models/              # Data models
│   │   │   ├── User.ts
│   │   │   ├── Session.ts
│   │   │   ├── NoteAttempt.ts
│   │   │   ├── Progress.ts
│   │   │   └── index.ts
│   │   │
│   │   └── migrations/          # Schema versioning
│   │       ├── migration_v1.ts
│   │       └── index.ts
│   │
│   ├── data/                    # Static data
│   │   ├── notes.ts             # Bass notes generation
│   │   ├── scales.ts            # Scale definitions
│   │   ├── achievements.ts      # Achievement configs
│   │   ├── presets.ts           # Practice presets
│   │   └── index.ts
│   │
│   ├── types/                   # TypeScript types
│   │   ├── index.ts             # Core types
│   │   ├── scales.ts
│   │   ├── progress.ts
│   │   ├── audio.ts
│   │   └── api.ts               # Future API types
│   │
│   ├── utils/                   # Utility functions
│   │   ├── helpers.ts
│   │   ├── noteHelpers.ts
│   │   ├── scaleHelpers.ts
│   │   ├── dateHelpers.ts
│   │   ├── validators.ts
│   │   └── index.ts
│   │
│   ├── config/                  # Configuration
│   │   ├── constants.ts
│   │   ├── theme.ts
│   │   ├── audio.config.ts
│   │   ├── features.config.ts   # Feature flags
│   │   └── index.ts
│   │
│   └── styles/                  # Global styles
│       ├── variables.css        # CSS custom properties
│       ├── reset.css
│       ├── typography.css
│       └── utilities.css
│
├── tests/                       # Test files
│   ├── unit/
│   │   ├── data/
│   │   │   └── notes.test.ts
│   │   ├── services/
│   │   │   ├── ProgressService.test.ts
│   │   │   └── ScaleGenerator.test.ts
│   │   └── hooks/
│   │       └── useGameState.test.ts
│   │
│   ├── integration/
│   │   └── practice-flow.test.ts
│   │
│   └── e2e/                     # Future
│       └── user-journey.test.ts
│
├── docs/                        # Documentation
│   ├── planning/                # This folder
│   ├── api/                     # Future API docs
│   └── user-guides/
│
├── .github/
│   └── workflows/
│       ├── ci.yml               # CI/CD pipeline
│       └── deploy.yml           # Deployment
│
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts
├── vitest.config.ts
└── README.md
```

---

## 🔧 CORE SYSTEMS

### 1. Storage Architecture

#### Interface Pattern (Adapter)

```typescript
// storage/adapters/StorageAdapter.ts
export interface StorageAdapter {
  // CRUD operations
  get<T>(key: string): Promise<T | null>;
  set<T>(key: string, value: T): Promise<void>;
  remove(key: string): Promise<void>;
  clear(): Promise<void>;
  
  // Batch operations
  getMultiple<T>(keys: string[]): Promise<Map<string, T>>;
  setMultiple<T>(items: Map<string, T>): Promise<void>;
  
  // Query (for future)
  query<T>(predicate: (value: T) => boolean): Promise<T[]>;
}

// storage/adapters/LocalStorageAdapter.ts
export class LocalStorageAdapter implements StorageAdapter {
  private readonly prefix: string = 'bass-app:';
  
  async get<T>(key: string): Promise<T | null> {
    const item = localStorage.getItem(this.prefix + key);
    return item ? JSON.parse(item) : null;
  }
  
  async set<T>(key: string, value: T): Promise<void> {
    localStorage.setItem(
      this.prefix + key,
      JSON.stringify(value)
    );
  }
  
  // ... altri metodi
}

// storage/adapters/IndexedDBAdapter.ts (Future)
export class IndexedDBAdapter implements StorageAdapter {
  private db: IDBDatabase;
  
  // Implementazione IndexedDB per dataset grandi
  // Supporta queries complesse
  // Migliore performance per molti dati
}

// storage/adapters/CloudStorageAdapter.ts (Future)
export class CloudStorageAdapter implements StorageAdapter {
  private apiClient: ApiClient;
  
  // Sync con backend (Firebase/Supabase)
  // Conflict resolution
  // Offline-first con sync queue
}
```

#### Storage Service (Facade)

```typescript
// services/StorageService.ts
export class StorageService {
  private adapter: StorageAdapter;
  
  constructor(adapter: StorageAdapter) {
    this.adapter = adapter;
  }
  
  // High-level methods
  async saveProgress(progress: Progress): Promise<void> {
    await this.adapter.set('progress', progress);
  }
  
  async loadProgress(): Promise<Progress | null> {
    return await this.adapter.get<Progress>('progress');
  }
  
  async saveSession(session: Session): Promise<void> {
    const sessions = await this.getSessions();
    sessions.push(session);
    
    // Keep only last 100 sessions
    if (sessions.length > 100) {
      sessions.shift();
    }
    
    await this.adapter.set('sessions', sessions);
  }
  
  // ... altri metodi
}

// Usage in app
const storage = new StorageService(
  new LocalStorageAdapter()
);

// Future: switch adapter senza cambiare codice
const storage = new StorageService(
  new CloudStorageAdapter(apiClient)
);
```

#### Migration System

```typescript
// storage/migrations/index.ts
interface Migration {
  version: number;
  description: string;
  up: (storage: StorageAdapter) => Promise<void>;
  down: (storage: StorageAdapter) => Promise<void>;
}

// storage/migrations/migration_v1.ts
export const migrationV1: Migration = {
  version: 1,
  description: 'Add mastery level to note progress',
  
  async up(storage) {
    const progress = await storage.get<Progress>('progress');
    if (!progress) return;
    
    // Add masteryLevel to each note
    progress.noteProgress.forEach(noteProgress => {
      if (!noteProgress.masteryLevel) {
        noteProgress.masteryLevel = calculateMasteryLevel(noteProgress);
      }
    });
    
    await storage.set('progress', progress);
  },
  
  async down(storage) {
    // Rollback logic
  }
};

// Migration runner
export class MigrationRunner {
  async migrate(
    storage: StorageAdapter,
    targetVersion: number
  ): Promise<void> {
    const currentVersion = await this.getCurrentVersion(storage);
    const migrations = this.getMigrations(currentVersion, targetVersion);
    
    for (const migration of migrations) {
      await migration.up(storage);
      await this.setVersion(storage, migration.version);
    }
  }
}
```

---

### 2. State Management

#### Option A: React Context + useReducer (Current)
```typescript
// Good for: Small-medium apps, simple state
// Already using: useState hooks

// Pros: No external deps, simple
// Cons: Can get messy with complex state
```

#### Option B: Zustand (Recommended for Scale)
```typescript
// Install: npm install zustand

// stores/progressStore.ts
import create from 'zustand';

interface ProgressStore {
  progress: Progress | null;
  sessions: Session[];
  
  // Actions
  loadProgress: () => Promise<void>;
  saveProgress: (progress: Progress) => Promise<void>;
  recordAttempt: (attempt: NoteAttempt) => void;
  
  // Computed
  getWeakNotes: () => NoteProgress[];
  getCurrentStreak: () => number;
}

export const useProgressStore = create<ProgressStore>((set, get) => ({
  progress: null,
  sessions: [],
  
  loadProgress: async () => {
    const progress = await storageService.loadProgress();
    set({ progress });
  },
  
  recordAttempt: (attempt) => {
    const { progress } = get();
    if (!progress) return;
    
    // Update progress
    const updated = updateProgressWithAttempt(progress, attempt);
    set({ progress: updated });
    
    // Persist
    storageService.saveProgress(updated);
  },
  
  getWeakNotes: () => {
    const { progress } = get();
    return progress?.noteProgress
      .filter(n => n.accuracy < 70)
      .sort((a, b) => a.accuracy - b.accuracy) || [];
  },
  
  // ...
}));

// Usage in components
const WeakNotesList = () => {
  const weakNotes = useProgressStore(state => state.getWeakNotes());
  const recordAttempt = useProgressStore(state => state.recordAttempt);
  
  return (
    <ul>
      {weakNotes.map(note => (
        <li key={note.noteKey}>{note.noteName} - {note.accuracy}%</li>
      ))}
    </ul>
  );
};
```

**Recommendation:** Start with current approach (Context), migrate to Zustand quando state diventa complesso (Sprint 2-3).

---

### 3. Service Layer Pattern

```typescript
// services/ProgressService.ts
export class ProgressService {
  private storage: StorageService;
  private analytics: AnalyticsService;
  
  constructor(storage: StorageService, analytics: AnalyticsService) {
    this.storage = storage;
    this.analytics = analytics;
  }
  
  async recordAttempt(
    user: User,
    attempt: NoteAttempt
  ): Promise<Progress> {
    // 1. Load current progress
    const progress = await this.storage.loadProgress();
    
    // 2. Update progress
    const updated = this.updateProgress(progress, attempt);
    
    // 3. Calculate new stats
    updated.stats = this.calculateStats(updated);
    
    // 4. Check achievements
    const newAchievements = this.checkAchievements(updated);
    updated.achievements.push(...newAchievements);
    
    // 5. Save
    await this.storage.saveProgress(updated);
    
    // 6. Track analytics
    this.analytics.trackAttempt(attempt);
    
    return updated;
  }
  
  private updateProgress(
    progress: Progress,
    attempt: NoteAttempt
  ): Progress {
    const noteKey = this.getNoteKey(attempt.targetNote);
    const noteProgress = progress.noteProgress.get(noteKey);
    
    if (!noteProgress) {
      // First time seeing this note
      progress.noteProgress.set(noteKey, {
        noteKey,
        ...attempt.targetNote,
        totalAttempts: 1,
        correctAttempts: attempt.isCorrect ? 1 : 0,
        accuracy: attempt.isCorrect ? 100 : 0,
        averageResponseTime: attempt.responseTime,
        fastestResponseTime: attempt.responseTime,
        masteryLevel: 0,
        firstPracticed: new Date(),
        lastPracticed: new Date(),
        consecutiveCorrect: attempt.isCorrect ? 1 : 0,
        consecutiveWrong: attempt.isCorrect ? 0 : 1,
      });
    } else {
      // Update existing
      noteProgress.totalAttempts++;
      if (attempt.isCorrect) noteProgress.correctAttempts++;
      
      noteProgress.accuracy = 
        (noteProgress.correctAttempts / noteProgress.totalAttempts) * 100;
      
      noteProgress.averageResponseTime = 
        (noteProgress.averageResponseTime + attempt.responseTime) / 2;
      
      if (attempt.responseTime < noteProgress.fastestResponseTime) {
        noteProgress.fastestResponseTime = attempt.responseTime;
      }
      
      noteProgress.lastPracticed = new Date();
      
      // Update streaks
      if (attempt.isCorrect) {
        noteProgress.consecutiveCorrect++;
        noteProgress.consecutiveWrong = 0;
      } else {
        noteProgress.consecutiveWrong++;
        noteProgress.consecutiveCorrect = 0;
      }
      
      // Update mastery level
      noteProgress.masteryLevel = this.calculateMasteryLevel(noteProgress);
    }
    
    return progress;
  }
  
  private calculateMasteryLevel(note: NoteProgress): 0 | 1 | 2 | 3 {
    // Algorithm:
    // Level 0 (New): < 5 attempts
    // Level 1 (Learning): 5+ attempts, <70% accuracy
    // Level 2 (Practiced): 70-90% accuracy, 10+ attempts
    // Level 3 (Mastered): >90% accuracy, 20+ attempts, avg time <2s
    
    if (note.totalAttempts < 5) return 0;
    if (note.accuracy < 70) return 1;
    if (note.accuracy < 90 || note.totalAttempts < 10) return 2;
    if (note.accuracy >= 90 && 
        note.totalAttempts >= 20 && 
        note.averageResponseTime < 2000) return 3;
    return 2;
  }
  
  private checkAchievements(progress: Progress): Achievement[] {
    const newAchievements: Achievement[] = [];
    
    // Check all achievement conditions
    if (this.hasCompletedStreak(progress, 7)) {
      newAchievements.push({
        id: 'week-warrior',
        name: 'Week Warrior',
        description: '7 days streak',
        unlockedAt: new Date()
      });
    }
    
    // ... more checks
    
    return newAchievements;
  }
}
```

---

### 4. Audio System Architecture

```typescript
// services/AudioService.ts
export class AudioService {
  private synth: Tone.Synth | null = null;
  private volume: number = 0.7;
  private isEnabled: boolean = true;
  
  async init(): Promise<void> {
    await Tone.start();
    this.synth = this.createBassSynth();
  }
  
  private createBassSynth(): Tone.Synth {
    return new Tone.Synth({
      oscillator: {
        type: 'sawtooth',
      },
      envelope: {
        attack: 0.005,
        decay: 0.3,
        sustain: 0.2,
        release: 1.2,
      },
      filterEnvelope: {
        attack: 0.01,
        decay: 0.2,
        sustain: 0.5,
        release: 0.8,
        baseFrequency: 200,
        octaves: 2.5,
      },
    }).toDestination();
  }
  
  async playNote(note: Note, duration: string = '8n'): Promise<void> {
    if (!this.isEnabled || !this.synth) return;
    
    this.synth.volume.value = Tone.gainToDb(this.volume);
    this.synth.triggerAttackRelease(note.frequency, duration);
  }
  
  async playScale(notes: Note[], bpm: number = 80): Promise<void> {
    if (!this.isEnabled || !this.synth) return;
    
    const interval = 60 / bpm; // seconds per beat
    
    for (let i = 0; i < notes.length; i++) {
      await this.playNote(notes[i]);
      await this.delay(interval * 1000);
    }
  }
  
  setVolume(volume: number): void {
    this.volume = Math.max(0, Math.min(1, volume));
  }
  
  setEnabled(enabled: boolean): void {
    this.isEnabled = enabled;
  }
  
  changePreset(preset: 'bass' | 'fat-bass' | 'synth-bass'): void {
    // Dispose current synth
    this.synth?.dispose();
    
    // Create new with different settings
    switch (preset) {
      case 'fat-bass':
        this.synth = this.createFatBass();
        break;
      case 'synth-bass':
        this.synth = this.createSynthBass();
        break;
      default:
        this.synth = this.createBassSynth();
    }
  }
  
  private createFatBass(): Tone.PolySynth {
    // Multiple oscillators, detuned
    return new Tone.PolySynth(Tone.Synth, {
      oscillator: {
        type: 'sawtooth',
        count: 3,
        spread: 20,
      },
      envelope: { /* ... */ },
    }).toDestination();
  }
  
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  dispose(): void {
    this.synth?.dispose();
  }
}

// hooks/useAudio.ts
export const useAudio = () => {
  const [audioService] = useState(() => new AudioService());
  const [isReady, setIsReady] = useState(false);
  
  useEffect(() => {
    audioService.init().then(() => setIsReady(true));
    
    return () => {
      audioService.dispose();
    };
  }, []);
  
  return {
    isReady,
    playNote: audioService.playNote.bind(audioService),
    playScale: audioService.playScale.bind(audioService),
    setVolume: audioService.setVolume.bind(audioService),
    setEnabled: audioService.setEnabled.bind(audioService),
    changePreset: audioService.changePreset.bind(audioService),
  };
};
```

---

### 5. Scale System Architecture

```typescript
// services/ScaleGenerator.ts
export class ScaleGenerator {
  private static noteNames = [
    'C', 'C#', 'D', 'D#', 'E', 'F', 
    'F#', 'G', 'G#', 'A', 'A#', 'B'
  ];
  
  /**
   * Generate all notes for a scale in a specific position
   */
  static generateScalePosition(
    scale: Scale,
    rootNote: string,
    position: number,
    bassNotes: Note[]
  ): ScalePosition {
    // 1. Calculate note names in scale
    const scaleNoteNames = this.getScaleNotes(scale, rootNote);
    
    // 2. Find starting fret for position
    const startFret = this.getPositionStartFret(position, rootNote);
    
    // 3. Filter bass notes that are in scale and position range
    const scaleNotes = bassNotes.filter(note => {
      return scaleNoteNames.includes(note.name) &&
             note.fret >= startFret &&
             note.fret <= startFret + 4; // 4-fret span per position
    });
    
    // 4. Add scale metadata (degree, interval, isRoot)
    const enrichedNotes: ScaleNote[] = scaleNotes.map(note => {
      const degree = this.getNoteDegree(note.name, scaleNoteNames);
      const interval = scale.formula.split(' ')[degree - 1];
      
      return {
        note,
        degree,
        interval,
        isRoot: note.name === rootNote,
        fingerSuggestion: this.suggestFinger(note.fret, startFret),
      };
    });
    
    return {
      scale,
      rootNote,
      position,
      startFret,
      notes: enrichedNotes,
      fingering: this.describeFingering(enrichedNotes),
      visualPattern: this.generatePattern(enrichedNotes),
    };
  }
  
  /**
   * Get all note names in a scale
   */
  private static getScaleNotes(scale: Scale, rootNote: string): string[] {
    const rootIndex = this.noteNames.indexOf(rootNote);
    const notes: string[] = [rootNote]; // Start with root
    
    let currentIndex = rootIndex;
    for (const interval of scale.intervals) {
      currentIndex = (currentIndex + interval) % 12;
      notes.push(this.noteNames[currentIndex]);
    }
    
    return notes;
  }
  
  /**
   * Calculate starting fret for CAGED position
   */
  private static getPositionStartFret(
    position: number,
    rootNote: string
  ): number {
    // CAGED system for bass (simplified)
    // Position 1: Open/low position
    // Position 2-5: Moving up neck
    
    const rootFret = this.findRootFret(rootNote);
    
    switch (position) {
      case 1: return Math.max(0, rootFret - 2);
      case 2: return rootFret + 2;
      case 3: return rootFret + 4;
      case 4: return rootFret + 7;
      case 5: return rootFret + 9;
      default: return 0;
    }
  }
  
  private static findRootFret(rootNote: string): number {
    // Find first occurrence on E string (string 1)
    const eOpenIndex = this.noteNames.indexOf('E');
    const rootIndex = this.noteNames.indexOf(rootNote);
    return (rootIndex - eOpenIndex + 12) % 12;
  }
  
  private static getNoteDegree(
    noteName: string,
    scaleNotes: string[]
  ): number {
    return scaleNotes.indexOf(noteName) + 1;
  }
  
  private static suggestFinger(
    fret: number,
    startFret: number
  ): number {
    // One finger per fret (4-fret span)
    const offset = fret - startFret;
    
    switch (offset) {
      case 0: return 1; // Index
      case 1: return 2; // Middle
      case 2: return 3; // Ring
      case 3: return 4; // Pinky
      default: return 1;
    }
  }
  
  private static describeFingering(notes: ScaleNote[]): string {
    // Generate fingering pattern description
    const fingers = notes.map(n => n.fingerSuggestion);
    const unique = [...new Set(fingers)];
    return `${unique.join('-')} pattern`;
  }
  
  private static generatePattern(notes: ScaleNote[]): string {
    // ASCII art pattern (optional)
    // or JSON structure for rendering
    return JSON.stringify(notes);
  }
  
  /**
   * Find all 5 positions for a scale
   */
  static findAllPositions(
    scale: Scale,
    rootNote: string,
    bassNotes: Note[]
  ): ScalePosition[] {
    return [1, 2, 3, 4, 5].map(position =>
      this.generateScalePosition(scale, rootNote, position, bassNotes)
    );
  }
  
  /**
   * Check if note is in scale
   */
  static isNoteInScale(
    note: Note,
    scale: Scale,
    rootNote: string
  ): boolean {
    const scaleNotes = this.getScaleNotes(scale, rootNote);
    return scaleNotes.includes(note.name);
  }
}
```

---

## 🧪 TESTING STRATEGY

### Unit Tests (>80% coverage target)

```typescript
// tests/unit/services/ScaleGenerator.test.ts
import { describe, it, expect } from 'vitest';
import { ScaleGenerator } from '@/services/ScaleGenerator';
import { SCALES } from '@/data/scales';
import { generateBassNotes } from '@/data/notes';

describe('ScaleGenerator', () => {
  const bassNotes = generateBassNotes();
  const minorPentatonic = SCALES['minor_pentatonic'];
  
  describe('generateScalePosition', () => {
    it('should generate correct notes for A Minor Pentatonic Position 1', () => {
      const position = ScaleGenerator.generateScalePosition(
        minorPentatonic,
        'A',
        1,
        bassNotes
      );
      
      expect(position.rootNote).toBe('A');
      expect(position.position).toBe(1);
      expect(position.notes.length).toBeGreaterThan(0);
      
      // Check all notes are in scale
      const expectedNotes = ['A', 'C', 'D', 'E', 'G'];
      position.notes.forEach(scaleNote => {
        expect(expectedNotes).toContain(scaleNote.note.name);
      });
    });
    
    it('should correctly identify root notes', () => {
      const position = ScaleGenerator.generateScalePosition(
        minorPentatonic,
        'A',
        1,
        bassNotes
      );
      
      const rootNotes = position.notes.filter(n => n.isRoot);
      expect(rootNotes.length).toBeGreaterThan(0);
      rootNotes.forEach(note => {
        expect(note.note.name).toBe('A');
      });
    });
    
    it('should assign correct degrees', () => {
      const position = ScaleGenerator.generateScalePosition(
        minorPentatonic,
        'A',
        1,
        bassNotes
      );
      
      const degrees = position.notes.map(n => n.degree);
      const uniqueDegrees = [...new Set(degrees)];
      
      // Minor pentatonic has 5 degrees
      expect(uniqueDegrees.sort()).toEqual([1, 2, 3, 4, 5]);
    });
  });
  
  describe('isNoteInScale', () => {
    it('should return true for notes in scale', () => {
      const noteA = bassNotes.find(n => n.name === 'A' && n.fret === 0)!;
      const result = ScaleGenerator.isNoteInScale(
        noteA,
        minorPentatonic,
        'A'
      );
      expect(result).toBe(true);
    });
    
    it('should return false for notes not in scale', () => {
      const noteB = bassNotes.find(n => n.name === 'B')!;
      const result = ScaleGenerator.isNoteInScale(
        noteB,
        minorPentatonic,
        'A'
      );
      expect(result).toBe(false);
    });
  });
});

// tests/unit/data/notes.test.ts
describe('generateBassNotes', () => {
  it('should generate 48 notes (4 strings × 12 frets)', () => {
    const notes = generateBassNotes();
    expect(notes).toHaveLength(48);
  });
  
  it('should have correct frequency for A440', () => {
    const notes = generateBassNotes();
    // Find A on G string (should be close to 110 Hz - A2)
    const aNote = notes.find(n => n.name === 'A' && n.string === 4);
    expect(aNote?.frequency).toBeCloseTo(110, 1);
  });
});

// tests/unit/services/ProgressService.test.ts
describe('ProgressService', () => {
  it('should calculate mastery level correctly', () => {
    // Test mastery level algorithm
  });
  
  it('should update streak on consecutive days', () => {
    // Test streak logic
  });
});
```

### Integration Tests

```typescript
// tests/integration/practice-flow.test.ts
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { PracticePage } from '@/pages/PracticePage';

describe('Practice Flow', () => {
  it('should complete full practice session', async () => {
    render(<PracticePage />);
    
    // Start practice
    const startButton = screen.getByText('Start Practice');
    fireEvent.click(startButton);
    
    // Answer question
    await waitFor(() => {
      expect(screen.getByText(/Find:/)).toBeInTheDocument();
    });
    
    // Click correct note
    const fretboard = screen.getByTestId('fretboard');
    const correctFret = screen.getByTestId('fret-E-string1-fret5');
    fireEvent.click(correctFret);
    
    // Check feedback
    await waitFor(() => {
      expect(screen.getByText(/Correct/)).toBeInTheDocument();
    });
    
    // Check progress updated
    // ...
  });
});
```

---

## 🚀 DEPLOYMENT STRATEGY

### Development
```bash
npm run dev
# → Vite dev server
# → Hot reload
# → Source maps
```

### Production Build
```bash
npm run build
# → TypeScript compile
# → Vite production build
# → PWA service worker generation
# → Asset optimization
```

### Hosting Options

**Option 1: Vercel (Recommended)**
```yaml
# vercel.json
{
  "framework": "vite",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```
- Auto-deploy on git push
- Preview deployments per PR
- Edge network (fast global)
- Free tier generous

**Option 2: Netlify**
```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

**Option 3: GitHub Pages**
```yaml
# .github/workflows/deploy.yml
name: Deploy
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

---

## 📊 PERFORMANCE TARGETS

### Load Performance
- First Contentful Paint (FCP): <1.5s
- Time to Interactive (TTI): <3s
- Lighthouse Score: >90

### Runtime Performance
- 60fps animations
- <100ms input latency
- <16ms frame render time

### Bundle Size
- Initial bundle: <200KB gzipped
- Lazy-loaded routes: <50KB each
- Total app: <500KB (excluding audio samples)

### Optimization Techniques
- Code splitting (React.lazy)
- Tree shaking (Vite automatic)
- Image optimization (modern formats)
- Service worker caching
- Lazy load non-critical components

---

## 🔒 SECURITY & PRIVACY

### Data Privacy
- All data stored locally (user owns data)
- No tracking without consent
- Export data anytime
- Clear data anytime

### Future (Backend)
- HTTPS only
- JWT authentication
- CORS properly configured
- Rate limiting
- Input validation
- SQL injection prevention (use ORM)

---

## 📈 MONITORING (Future)

### Analytics
```typescript
// services/AnalyticsService.ts
export class AnalyticsService {
  track(event: string, properties?: Record<string, any>): void {
    // Privacy-first analytics
    // No PII
    // Aggregate only
    
    if (process.env.NODE_ENV === 'production') {
      // Send to analytics service (Plausible, Fathom, etc.)
    }
  }
}

// Usage
analytics.track('practice_session_completed', {
  duration: 600, // seconds
  accuracy: 0.85,
  notesAttempted: 45,
});
```

### Error Tracking
```typescript
// Sentry or similar
import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: process.env.VITE_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  // Only in production
  enabled: process.env.NODE_ENV === 'production',
});
```

---

## 🎯 NEXT STEPS

1. **Code Refactoring** (Sprint 1)
   - Implement folder structure
   - Extract services
   - Setup storage layer
   - Add tests

2. **Feature Implementation** (Sprint 2-4)
   - Follow feature requirements doc
   - TDD approach where possible
   - Incremental commits

3. **Performance Optimization** (Continuous)
   - Monitor bundle size
   - Lighthouse audits
   - User testing feedback

4. **Documentation** (Continuous)
   - Code comments
   - API documentation
   - User guides

---

**This architecture is designed to scale from personal tool to commercial product without major rewrites.**

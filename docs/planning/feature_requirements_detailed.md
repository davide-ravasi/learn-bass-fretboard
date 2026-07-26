# Feature Requirements: Detailed Specification

**Data:** 26 Luglio 2026  
**Autore:** Cloud Agent Analysis + User Input  
**Status:** Planning Phase  
**Target:** Personal Tool → Commercial Product

---

## 🎯 FILOSOFIA DESIGN

### Principi Guida
1. **Learning Efficacy > Gamification**
   - L'app deve insegnare, non solo intrattenere
   - Feedback educativo, non solo "correct/wrong"
   - Studio serio con elementi di engagement

2. **Progressive Disclosure**
   - Principiante: features semplici, guidate
   - Intermedio: unlock graduale di complessità
   - Avanzato: customization totale

3. **Quality over Quantity**
   - 10 features ottime > 50 mediocri
   - Focus su ciò che serve davvero
   - No feature bloat

4. **Data-Driven Learning**
   - Traccia tutto per insights
   - Mostra progress in modo motivante
   - Identifica debolezze automaticamente

---

## 📋 FEATURE TIERS

### TIER 1: FOUNDATION (Must-Have per uso personale)

#### F1.1 - Persistenza Progress ⭐⭐⭐⭐⭐

**User Story:**
> "Come bassista che studia, voglio vedere i miei miglioramenti nel tempo così so su cosa concentrarmi."

**Functional Requirements:**

```typescript
// Data Model
interface UserProgress {
  // Identity
  userId: string;
  createdAt: Date;
  lastAccessed: Date;
  
  // Overall Stats
  totalSessions: number;
  totalPracticeTime: number; // minutes
  
  // Daily Tracking
  dailyStats: Map<string, DayStats>; // "2026-07-26" -> stats
  
  // Note-level granularity
  noteProgress: Map<string, NoteProgress>; // "E-string1-fret5" -> progress
  
  // Streaks
  currentStreak: number;
  longestStreak: number;
  lastPracticeDate: Date;
  
  // Achievements
  achievements: Achievement[];
  
  // Settings
  preferences: UserPreferences;
}

interface DayStats {
  date: string;
  sessionsCount: number;
  totalAttempts: number;
  correctAttempts: number;
  practiceTime: number; // minutes
  notesLearned: number; // new notes with >70% accuracy
}

interface NoteProgress {
  // Position identifier
  noteKey: string; // "E-string1-fret5"
  noteName: string; // "A"
  string: number;
  fret: number;
  
  // Stats
  totalAttempts: number;
  correctAttempts: number;
  accuracy: number; // 0-100%
  
  // Timing
  averageResponseTime: number; // ms
  fastestResponseTime: number;
  
  // Learning Stage
  masteryLevel: 0 | 1 | 2 | 3; // new, learning, practiced, mastered
  firstPracticed: Date;
  lastPracticed: Date;
  
  // Smart tracking
  consecutiveCorrect: number;
  consecutiveWrong: number;
}
```

**UI Requirements:**

1. **Dashboard principale**
   ```
   ┌─────────────────────────────────────┐
   │  🔥 Streak: 7 giorni                │
   │  ⏱️  Oggi: 15 min praticati         │
   │  🎯 Accuracy oggi: 87%              │
   │  📈 Questa settimana: +12%          │
   └─────────────────────────────────────┘
   
   ┌─────────────────────────────────────┐
   │  Heatmap Fretboard                  │
   │  [Visualizzazione colore-coded]     │
   │   🟢 Verde = mastered (>90%)        │
   │   🟡 Giallo = learning (70-90%)     │
   │   🔴 Rosso = weak (<70%)            │
   │   ⚪ Grigio = not practiced         │
   └─────────────────────────────────────┘
   
   ┌─────────────────────────────────────┐
   │  📊 Grafico Progress 7 giorni       │
   │  [Line chart accuracy nel tempo]    │
   └─────────────────────────────────────┘
   
   ┌─────────────────────────────────────┐
   │  ⚠️  Note Deboli (Raccomandazioni)  │
   │  • F# (corda D, tasto 4) - 45%     │
   │  • G (corda E, tasto 3) - 52%      │
   │  [Bottone: Practice These]          │
   └─────────────────────────────────────┘
   ```

2. **Post-Session Summary**
   ```
   ┌─────────────────────────────────────┐
   │  ✅ Sessione Completata!            │
   │                                     │
   │  Durata: 12 minuti                  │
   │  Tentativi: 45                      │
   │  Corrette: 38 (84%)                 │
   │                                     │
   │  🎯 Miglioramento: +3% vs ieri     │
   │  🏆 Achievement Unlocked:           │
   │     "10 Perfect Answers in a Row"   │
   │                                     │
   │  Note praticate oggi:               │
   │  • A (corda E) - 95% ✅             │
   │  • F# (corda D) - 60% ⚠️            │
   │                                     │
   │  [Continua] [Rivedi Note Sbagliate] │
   └─────────────────────────────────────┘
   ```

**Storage:**
- **V1:** localStorage (browser)
- **V2:** IndexedDB (per dataset grandi)
- **V3:** Cloud sync (Firebase/Supabase)

**Acceptance Criteria:**
- [ ] Progress salvato automaticamente ogni risposta
- [ ] Dashboard mostra stats real-time
- [ ] Heatmap aggiornata dopo ogni sessione
- [ ] Export dati possibile (JSON)
- [ ] Streak calcolato correttamente (conta giorni consecutivi)
- [ ] Mastery level calcolato: 0-3 basato su attempts + accuracy

---

#### F1.2 - Focus Mode (Pratica Mirata) ⭐⭐⭐⭐⭐

**User Story:**
> "Come principiante, voglio praticare solo i primi 5 tasti invece di tutti i 12, così non mi sento sopraffatto."

**Functional Requirements:**

```typescript
interface PracticeFilter {
  // Range Fret
  fretRange: {
    min: number; // 0-12
    max: number; // 0-12
  };
  
  // Strings specifiche
  strings: number[]; // [1,2,3,4] o subset
  
  // Note specifiche
  notes?: string[]; // ["E", "F", "G"] - solo naturali, o include sharps
  includeAccidentals: boolean; // include diesis/bemolle
  
  // Mode
  mode: 'all' | 'weak-only' | 'new-only' | 'mastered-review';
}

// Preset popolari
const PRESETS = {
  beginner: {
    name: "Beginner: First Position",
    fretRange: { min: 0, max: 5 },
    strings: [1, 2, 3, 4],
    includeAccidentals: false
  },
  intermediate: {
    name: "Intermediate: Full Neck",
    fretRange: { min: 0, max: 12 },
    strings: [1, 2, 3, 4],
    includeAccidentals: true
  },
  weakNotes: {
    name: "Practice Weak Notes",
    mode: 'weak-only' // automatico, usa progress data
  },
  singleString: {
    name: "E String Only",
    strings: [1],
    fretRange: { min: 0, max: 12 }
  }
};
```

**UI Requirements:**

```
┌─────────────────────────────────────┐
│  🎯 FOCUS MODE SETUP                │
│                                     │
│  Preset:                            │
│  ( ) Beginner (0-5 frets)           │
│  ( ) Intermediate (0-12 frets)      │
│  (•) Custom                         │
│                                     │
│  Fret Range: [0] ━━━━━━━━━ [12]   │
│              └─┬─┘                  │
│              0 - 5                  │
│                                     │
│  Strings:                           │
│  [✓] E (1st) [✓] A (2nd)           │
│  [✓] D (3rd) [✓] G (4th)           │
│                                     │
│  Notes:                             │
│  (•) All Notes                      │
│  ( ) Natural Notes Only (no #/♭)   │
│  ( ) Custom Selection               │
│                                     │
│  Smart Filters:                     │
│  [ ] Only Weak Notes (<70%)         │
│  [ ] Only Unpracticed Notes         │
│  [ ] Exclude Mastered (>90%)        │
│                                     │
│  [Start Practice]                   │
└─────────────────────────────────────┘
```

**Acceptance Criteria:**
- [ ] Filter applicato correttamente (solo note selezionate appaiono)
- [ ] Preset caricabili con 1 click
- [ ] Salva ultima configurazione usata
- [ ] "Weak notes" mode usa progress data (automatico)
- [ ] Visual feedback su quante note totali nel pool

---

#### F1.3 - Study Mode (Non-Quiz) ⭐⭐⭐⭐⭐

**User Story:**
> "Prima di testare voglio esplorare e imparare le note senza pressione di score."

**Functional Requirements:**

```typescript
interface StudyMode {
  type: 'explorer' | 'quiz';
  
  // Explorer mode settings
  showLabels: 'always' | 'on-hover' | 'on-click' | 'never';
  playAudioOnClick: boolean;
  showNoteInfo: boolean; // mostra frequency, octave, etc.
}
```

**UI Requirements:**

**Study Mode Interface:**
```
┌─────────────────────────────────────┐
│  📚 STUDY MODE                      │
│                                     │
│  [Toggle: Show Labels]              │
│  [Toggle: Audio on Click]           │
│                                     │
│  [Fretboard Interactive]            │
│  Click on any note to:              │
│  • See note name                    │
│  • Hear note sound                  │
│  • View info (frequency, octave)    │
│                                     │
│  No scoring, no timer.              │
│  Learn at your own pace.            │
│                                     │
│  [Switch to Quiz Mode]              │
└─────────────────────────────────────┘
```

**Note Info Panel (on click):**
```
┌─────────────────────────────────────┐
│  Note: F#                           │
│  String: D (3rd string)             │
│  Fret: 4                            │
│  Frequency: 185 Hz                  │
│  Octave: F#3                        │
│                                     │
│  ℹ️  This is 4 frets above the     │
│     open D string.                  │
│                                     │
│  [Play Audio] [Close]               │
└─────────────────────────────────────┘
```

**Acceptance Criteria:**
- [ ] Click su nota → mostra info senza scoring
- [ ] Audio suona quando cliccato
- [ ] Label toggle funziona (show/hide)
- [ ] No timer, no pressure UI
- [ ] Switch fluido tra Study/Quiz mode

---

#### F1.4 - Feedback Migliorato ⭐⭐⭐⭐

**User Story:**
> "Quando sbaglio, voglio capire PERCHÉ ho sbagliato, non solo vedere 'Try again'."

**Current State:**
```typescript
// Attuale (basic)
correct ? "Correct! 🎉" : "Try again! ❌"
```

**New State:**
```typescript
interface FeedbackMessage {
  isCorrect: boolean;
  targetNote: Note;
  userAnswer: Note | null;
  
  // Contextual info
  message: string;
  explanation?: string;
  hint?: string;
  visualAid?: FeedbackVisual;
}

interface FeedbackVisual {
  highlightCorrect: boolean; // evidenzia nota corretta
  highlightWrong: boolean;   // evidenzia dove hai cliccato
  showDistance?: number;     // "Eri 2 frets sopra"
}
```

**UI Requirements:**

**Correct Answer:**
```
┌─────────────────────────────────────┐
│  ✅ ESATTO!                         │
│                                     │
│  F# sulla corda D (tasto 4)         │
│                                     │
│  💡 Tip: F# è sempre 4 tasti        │
│     sopra la nota D.                │
│                                     │
│  Response time: 2.3s                │
│  [Next Note]                        │
└─────────────────────────────────────┘
```

**Wrong Answer (Educational):**
```
┌─────────────────────────────────────┐
│  ❌ Non Ancora                      │
│                                     │
│  Hai cliccato: G (corda D, tasto 5) │
│  Nota corretta: F# (tasto 4)        │
│                                     │
│  💡 Differenza: 1 semitono          │
│     (1 fret troppo alto)            │
│                                     │
│  Suggerimento: F# è 4 frets sopra   │
│  la corda vuota D.                  │
│                                     │
│  [Try Again] [Show Answer] [Skip]   │
└─────────────────────────────────────┘
```

**Visual Feedback su Fretboard:**
- Nota corretta: 🟢 evidenziata verde
- Nota cliccata (se sbagliata): 🔴 evidenziata rosso
- Freccia/linea tra le due se close

**Acceptance Criteria:**
- [ ] Feedback educativo (non solo correct/wrong)
- [ ] Mostra distanza se errore vicino (±1-2 frets)
- [ ] Hint contestuali (pattern recognition)
- [ ] Response time mostrato
- [ ] Visual highlight su fretboard (correct + wrong)
- [ ] Option "Show Answer" senza penalty

---

#### F1.5 - Audio Bass Realistico ⭐⭐⭐⭐

**User Story:**
> "Il suono attuale è troppo synth-y, voglio qualcosa che suoni più come un vero basso."

**Current Implementation:**
```typescript
// Attuale
new Tone.Synth({
  oscillator: { type: "sawtooth" },
  envelope: { attack: 0.1, decay: 0.2, sustain: 0.3, release: 0.8 }
})
```

**Improved Implementation:**
```typescript
// Bass-optimized synth
const bassSettings = {
  oscillator: {
    type: "sawtooth", // Ricco di armoniche
    // Alternative: "triangle" per più warmth
  },
  envelope: {
    attack: 0.005,   // Attack immediato (plettro/finger attack)
    decay: 0.3,      // Decay lento (corda vibra)
    sustain: 0.2,    // Sustain medio
    release: 1.2     // Release lungo (naturale decay)
  },
  filterEnvelope: {
    attack: 0.01,
    decay: 0.2,
    sustain: 0.5,
    release: 0.8,
    baseFrequency: 200,  // Low-pass per warmth
    octaves: 2.5,
    exponent: 2
  }
};

// Advanced: Multiple oscillators (detuned per thickness)
const fatBass = new Tone.PolySynth(Tone.Synth, {
  oscillator: {
    type: "sawtooth",
    count: 3,         // 3 oscillatori
    spread: 20        // Detuned leggermente
  },
  envelope: bassSettings.envelope,
  filterEnvelope: bassSettings.filterEnvelope
}).toDestination();
```

**Settings UI:**
```
┌─────────────────────────────────────┐
│  🔊 AUDIO SETTINGS                  │
│                                     │
│  Tone Style:                        │
│  (•) Bass (default)                 │
│  ( ) Fat Bass (thick sound)         │
│  ( ) Synth Bass (modern)            │
│  ( ) Acoustic-like                  │
│                                     │
│  Volume: [━━━━━━●───] 70%          │
│                                     │
│  [✓] Audio Enabled                  │
│  [ ] Auto-play on Show Answer       │
│                                     │
│  [Test Sound]                       │
└─────────────────────────────────────┘
```

**Acceptance Criteria:**
- [ ] Suono più "basso" (meno synth-y)
- [ ] Attack veloce, release lungo
- [ ] Volume control funzionante
- [ ] Toggle on/off audio
- [ ] Preset styles selezionabili
- [ ] Test sound button per preview

---

### TIER 2: SCALE LEARNING MODULE ⭐⭐⭐⭐⭐

#### F2.1 - Scale Data & Generator

**Scales da Implementare (Priorità):**

**Must-Have (Primi 10):**
1. Major Pentatonic
2. Minor Pentatonic ⭐ (più usata)
3. Major Scale (Ionian)
4. Natural Minor (Aeolian)
5. Blues Scale
6. Harmonic Minor
7. Dorian Mode
8. Mixolydian Mode
9. Phrygian Mode
10. Lydian Mode

**Nice-to-Have (Espansione):**
11. Melodic Minor
12. Whole Tone
13. Diminished
14. Altered Scale
15. Locrian Mode

**Data Model:**
```typescript
interface Scale {
  id: string;
  name: string;
  type: 'pentatonic' | 'diatonic' | 'mode' | 'blues' | 'exotic';
  intervals: number[]; // Semitoni tra gradi
  formula: string; // "R 2 3 4 5 6 7" o "R b3 4 5 b7"
  description: string;
  commonUsage: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  relatedScales?: string[]; // IDs di scale correlate
}

// Example
const MINOR_PENTATONIC: Scale = {
  id: 'minor_pentatonic',
  name: 'Minor Pentatonic',
  type: 'pentatonic',
  intervals: [3, 2, 2, 3, 2], // R → b3 → 4 → 5 → b7 → R
  formula: 'R b3 4 5 b7',
  description: 'Foundation of blues and rock bass lines',
  commonUsage: 'Blues, Rock, Metal, Funk',
  difficulty: 'beginner',
  relatedScales: ['blues_scale', 'natural_minor']
};
```

**Position System (CAGED-style per Bass):**
```typescript
interface ScalePosition {
  scale: Scale;
  rootNote: string;
  position: number; // 1-5 (le 5 box positions)
  startFret: number; // Fret dove inizia position
  
  notes: ScaleNote[];
  fingering: string; // "1-2-4" pattern description
  visualPattern: string; // ASCII o description
}

interface ScaleNote {
  note: Note; // Existing Note type
  degree: number; // 1-7 (or 1-5 for pentatonic)
  interval: string; // "R", "b3", "5", etc.
  isRoot: boolean;
  fingerSuggestion?: number; // 1=index, 2=middle, 4=pinky
}
```

**Generator Service:**
```typescript
class ScaleGenerator {
  // Genera scala in specifica posizione
  static generate(
    scale: Scale,
    rootNote: string,
    position: number
  ): ScalePosition {
    // Logic per mappare scala su fretboard
    // Considera position (CAGED-style)
    // Return ScalePosition completo
  }
  
  // Trova tutte le 5 posizioni
  static findAllPositions(
    scale: Scale,
    rootNote: string
  ): ScalePosition[] {
    return [1, 2, 3, 4, 5].map(pos => 
      this.generate(scale, rootNote, pos)
    );
  }
  
  // Check se nota appartiene a scala
  static isNoteInScale(
    note: Note,
    scale: Scale,
    rootNote: string
  ): boolean {
    // Validation per practice mode
  }
  
  // Get degree di nota nella scala
  static getNoteDegree(
    note: Note,
    scale: Scale,
    rootNote: string
  ): number | null {
    // Return 1-7 o null se non in scala
  }
}
```

---

#### F2.2 - Scale Explorer UI

**Main Interface:**
```
┌─────────────────────────────────────────────┐
│  🎼 SCALE EXPLORER                          │
│                                             │
│  Scale: [Minor Pentatonic ▼]               │
│  Root:  [A ▼]                               │
│  Position: [1] [2] [3] [4] [5]              │
│         Current: Box 1                      │
│                                             │
│  ┌───────────────────────────────────────┐ │
│  │  FRETBOARD (visualizzazione scale)    │ │
│  │                                       │ │
│  │  Note colorate per degree:            │ │
│  │  🔴 Root                              │ │
│  │  🔵 Altri degrees                     │ │
│  │  ⚫ Note non in scala (dimmed)        │ │
│  │                                       │ │
│  │  Hover su nota → mostra degree        │ │
│  │  Click → play note                    │ │
│  └───────────────────────────────────────┘ │
│                                             │
│  ℹ️ Scale Info:                            │
│  Name: A Minor Pentatonic                   │
│  Formula: A C D E G                         │
│  Intervals: R b3 4 5 b7                     │
│  Usage: Blues, Rock, Metal                  │
│                                             │
│  [Study This] [Practice Mode] [Next Scale]  │
└─────────────────────────────────────────────┘
```

**Scale Selector (Dropdown/Modal):**
```
┌─────────────────────────────────────┐
│  SELECT SCALE                       │
│                                     │
│  🎯 Recommended for You:            │
│  • Minor Pentatonic ⭐              │
│  • Major Pentatonic                 │
│  • Blues Scale                      │
│                                     │
│  📚 All Scales:                     │
│                                     │
│  Pentatonic:                        │
│  ☐ Major Pentatonic                │
│  ☑ Minor Pentatonic                │
│  ☐ Blues Scale                     │
│                                     │
│  Diatonic:                          │
│  ☐ Major (Ionian)                  │
│  ☐ Natural Minor (Aeolian)         │
│                                     │
│  Modes:                             │
│  ☐ Dorian                          │
│  ☐ Phrygian                        │
│  ☐ Lydian                          │
│  ☐ Mixolydian                      │
│  ☐ Locrian                         │
│                                     │
│  [Select]                           │
└─────────────────────────────────────┘
```

---

#### F2.3 - Scale Practice Modes

**Mode 1: EXPLORER (Passive Learning)**
```
User Action: None (just viewing)
Display: Scala evidenziata su fretboard
Interaction: Click note → hear sound + see degree
Goal: Memorizzazione visual pattern
```

**Mode 2: DEGREE FINDER (Active Quiz)**
```
Prompt: "Trova la 5th della scala A Minor Pentatonic, Position 1"
User Action: Click su fret corretto
Feedback: "Correct! E (corda E, fret 7) è la 5th"
Progress: Track accuracy per degree (confondo 3rd vs 5th?)
```

**Mode 3: NOTE FINDER IN SCALE**
```
Prompt: "Trova tutte le note C nella scala A Minor Pentatonic"
User Action: Click su tutte le posizioni di C
Feedback: Mostra se trovate tutte, o mancanti
Goal: Identificare stesso degree su corde diverse
```

**Mode 4: SCALE RUNNER (Timing)**
```
Setup: Metronome attivo (es: 80 BPM)
Display: Note evidenziate in sequenza (ascendente/discendente)
User Action: Segui sul vero basso (pratica fisica)
Goal: Timing + muscle memory
```

**Mode 5: PATTERN MEMORY**
```
Phase 1: Mostra pattern per 3 secondi
Phase 2: Fretboard blank
Phase 3: "Ricostruisci pattern da memoria"
User Action: Click su note che ricordi
Feedback: Confronto con pattern originale
Goal: Memory training
```

**UI Practice Mode Selector:**
```
┌─────────────────────────────────────┐
│  🎯 PRACTICE MODE                   │
│                                     │
│  Scale: A Minor Pentatonic, Box 1   │
│                                     │
│  Choose Practice Type:              │
│                                     │
│  [🔍 Explorer]                      │
│  Study the pattern freely           │
│                                     │
│  [🎯 Degree Finder]                 │
│  Find specific degrees (quiz)       │
│                                     │
│  [🎵 Note Finder]                   │
│  Find all occurrences of a note     │
│                                     │
│  [⏱️ Scale Runner]                  │
│  Play along with metronome          │
│                                     │
│  [🧠 Pattern Memory]                │
│  Memorize and reconstruct           │
│                                     │
└─────────────────────────────────────┘
```

---

#### F2.4 - Scale Progress Tracking

```typescript
interface ScaleProgress {
  scaleId: string;
  rootNote: string;
  position: number; // 1-5
  
  // Stats
  timesPlayed: number;
  totalPracticeTime: number; // minutes
  
  // Degree-level accuracy
  degreeAccuracy: Map<number, AccuracyStats>; // degree -> stats
  
  // Overall
  overallAccuracy: number; // 0-100%
  averageSpeed: number; // notes/minute (for runner mode)
  
  // Learning stage
  masteryLevel: 0 | 1 | 2 | 3;
  firstPracticed: Date;
  lastPracticed: Date;
  
  // Achievements
  achievements: string[]; // ["perfect_run", "speed_demon", etc.]
}

interface AccuracyStats {
  degree: number;
  attempts: number;
  correct: number;
  accuracy: number;
}
```

**Progress UI:**
```
┌─────────────────────────────────────┐
│  📊 SCALE PROGRESS                  │
│                                     │
│  A Minor Pentatonic, Position 1     │
│                                     │
│  Overall: 78% Mastered ████████░░   │
│  Practiced: 12 sessions (45 min)    │
│                                     │
│  Degree Accuracy:                   │
│  Root (A):  ████████████ 95%       │
│  b3rd (C):  ████████░░░░ 67% ⚠️    │
│  4th (D):   ██████████░░ 82%       │
│  5th (E):   ███████████░ 89%       │
│  b7th (G):  ██████░░░░░░ 58% ⚠️    │
│                                     │
│  💡 Recommendation:                 │
│  Practice finding the b3rd and      │
│  b7th more often.                   │
│                                     │
│  [Practice Weak Degrees]            │
│  [Move to Position 2]               │
└─────────────────────────────────────┘
```

**Acceptance Criteria:**
- [ ] Progress salvato per ogni scala/position
- [ ] Degree-level granularity (so quale confondo)
- [ ] Mastery level calcolato automaticamente
- [ ] Recommendations basate su weak points
- [ ] Export progress (per backup)

---

### TIER 3: ENGAGEMENT & RETENTION

#### F3.1 - Session Goals

**Pre-Session Setup:**
```
┌─────────────────────────────────────┐
│  🎯 SET YOUR GOAL                   │
│                                     │
│  What do you want to achieve?       │
│                                     │
│  ( ) Quick Practice (5 min)         │
│  ( ) Standard Session (15 min)      │
│  ( ) Deep Study (30 min)            │
│  (•) Custom Goal                    │
│                                     │
│  Custom Goal:                       │
│  [✓] Get 20 correct answers         │
│  [ ] Achieve 85% accuracy           │
│  [ ] Practice for 10 minutes        │
│  [ ] Master 3 new notes             │
│                                     │
│  [Start Session]                    │
└─────────────────────────────────────┘
```

**In-Session Progress:**
```
┌─────────────────────────────────────┐
│  Goal: 20 correct answers           │
│  Progress: ████████░░░░ 15/20       │
│  75% complete - Keep going! 💪      │
└─────────────────────────────────────┘
```

**Acceptance Criteria:**
- [ ] Goals selezionabili pre-session
- [ ] Progress real-time durante sessione
- [ ] Celebration quando raggiunto
- [ ] Stats post-session confronta vs goal

---

#### F3.2 - Achievement System

**Achievement Categories:**

**Milestones:**
- First Note (prima nota corretta)
- 10 Notes Streak
- 100 Total Correct
- Week Warrior (7 giorni streak)
- Month Master (30 giorni streak)

**Skill-Based:**
- Perfect Session (100% accuracy, min 10 attempts)
- Speed Demon (avg response time <1s)
- Fretboard Master (tutte le note >90% accuracy)
- Scale Conqueror (5 scale con mastery level 3)

**Progress:**
- Early Bird (pratica prima delle 8am)
- Night Owl (pratica dopo le 10pm)
- Consistent Learner (pratica 5 giorni consecutivi)

**UI:**
```
┌─────────────────────────────────────┐
│  🏆 ACHIEVEMENTS                    │
│                                     │
│  Unlocked: 12/50                    │
│                                     │
│  🎖️ Week Warrior                    │
│  ✅ Practiced 7 days in a row       │
│  Unlocked: 2026-07-20               │
│                                     │
│  🎯 Perfect Session                 │
│  ✅ 100% accuracy (10+ attempts)    │
│  Unlocked: 2026-07-18               │
│                                     │
│  Locked Achievements:               │
│                                     │
│  🔒 Month Master                    │
│  Practice 30 days in a row          │
│  Progress: 7/30 days                │
│                                     │
│  🔒 Fretboard Master                │
│  Master all 48 notes (>90%)         │
│  Progress: 18/48 notes              │
│                                     │
└─────────────────────────────────────┘
```

---

#### F3.3 - Review Mode (Spaced Repetition)

**Post-Session Prompt:**
```
┌─────────────────────────────────────┐
│  ✅ Session Complete!               │
│                                     │
│  You got 5 notes wrong:             │
│  • F# (corda D, tasto 4)            │
│  • G (corda E, tasto 3)             │
│  • C (corda A, tasto 3)             │
│  • A# (corda G, tasto 3)            │
│  • E (corda D, tasto 2)             │
│                                     │
│  💡 Want to review these now?       │
│  Quick review can help retention!   │
│                                     │
│  [Review Now] [Save for Later] [Skip]│
└─────────────────────────────────────┘
```

**Review Mode:**
- Loop solo su note sbagliate
- Continue finché non corrette 2 volte consecutive
- Stats separate (review accuracy)

**Spaced Repetition (Advanced):**
```typescript
// Future: Implement SRS algorithm
interface SRSCard {
  notePosition: string;
  lastReviewed: Date;
  nextReview: Date;
  interval: number; // giorni
  easeFactor: number; // 1.3 - 2.5
  reviewCount: number;
}

// Algorithm: SuperMemo SM-2 o Anki-style
```

---

### TIER 4: POLISH & SCALE

#### F4.1 - Dark Mode

**Implementation:**
```typescript
// Theme system
interface Theme {
  name: 'light' | 'dark';
  colors: {
    background: string;
    foreground: string;
    primary: string;
    secondary: string;
    accent: string;
    // Fretboard specific
    fretboardBg: string;
    fretDefault: string;
    fretHover: string;
    fretCorrect: string;
    fretIncorrect: string;
    // etc...
  };
}

// CSS variables approach
:root {
  --bg-primary: #ffffff;
  --text-primary: #333333;
  --accent: #4caf50;
}

[data-theme="dark"] {
  --bg-primary: #1a1a1a;
  --text-primary: #e0e0e0;
  --accent: #66bb6a;
}
```

**UI Toggle:**
```
Settings > Appearance > [ ] Dark Mode
```

---

#### F4.2 - Responsive Landscape Optimization

**Current Issue:** 
- Mobile landscape = suboptimal layout
- Basso dovrebbe essere orizzontale (matching real instrument)

**Solution:**
```css
/* Mobile Portrait: Vertical fretboard */
@media (max-width: 768px) and (orientation: portrait) {
  .fretboard {
    flex-direction: column;
    /* strings verticali */
  }
}

/* Mobile Landscape: Horizontal fretboard */
@media (max-width: 896px) and (orientation: landscape) {
  .fretboard {
    flex-direction: row;
    /* strings orizzontali, matching real bass */
    /* corde dall'alto al basso (E-A-D-G) */
  }
  
  .fret-position {
    min-width: 50px;
    min-height: 44px; /* touch target */
  }
}

/* Desktop: flexible */
@media (min-width: 1024px) {
  .fretboard {
    /* horizontal layout con spazio per stats laterali */
  }
}
```

---

#### F4.3 - Export/Import Data

**Features:**
- Export progress → JSON file
- Import da backup
- Cloud sync (V2)

**UI:**
```
Settings > Data Management

[Export My Data]
[Import from Backup]
[Clear All Data] ⚠️
```

---

## 📊 FEATURE IMPLEMENTATION PRIORITY

### Sprint 1 (Settimane 1-2): Foundation
1. ✅ Persistenza Progress (F1.1) - P0
2. ✅ Focus Mode (F1.2) - P0
3. ✅ Study Mode (F1.3) - P0
4. ✅ Feedback Migliorato (F1.4) - P1
5. ✅ Audio Bass (F1.5) - P1

### Sprint 2 (Settimane 3-4): Scale Module Core
1. ✅ Scale Data Model (F2.1) - P0
2. ✅ Scale Explorer UI (F2.2) - P0
3. ✅ Practice Modes (F2.3) - 2-3 modes - P0

### Sprint 3 (Settimane 5-6): Scale Completion + Engagement
1. ✅ Scale Progress Tracking (F2.4) - P0
2. ✅ Practice Modes completi (F2.3) - tutti 5 - P1
3. ✅ Session Goals (F3.1) - P1
4. ✅ Review Mode (F3.3) - P1

### Sprint 4 (Settimane 7-8): Polish
1. ✅ Achievement System (F3.2) - P1
2. ✅ Dark Mode (F4.1) - P2
3. ✅ Landscape Optimization (F4.2) - P1
4. ✅ Export/Import (F4.3) - P2

---

## ✅ DEFINITION OF DONE

Una feature è "Done" quando:
- [ ] Implementata secondo spec
- [ ] Unit test scritti (coverage >80%)
- [ ] Testata manualmente su mobile + desktop
- [ ] UI responsive
- [ ] Performance OK (no lag)
- [ ] Documentata (code comments + user docs)
- [ ] Accessible (keyboard nav, screen reader)
- [ ] Committed + pushed + PR creata

---

## 📝 NOTES

- Queste spec sono **living document**
- Aggiorna basandoti su feedback user testing
- Priorità possono cambiare
- Don't gold-plate: ship MVP, iterate

**Next Step:** Iniziare implementazione Sprint 1, feature by feature.

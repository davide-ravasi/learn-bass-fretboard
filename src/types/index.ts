export interface Note {
  name: string;
  string: number; // 1-4 (E, A, D, G)
  fret: number; // 0-12
  frequency: number;
}

export interface PracticeSettings {
  bpm: number;
  autoAdvance: boolean;
  showVisualAids: boolean;
  difficulty: "easy" | "medium" | "hard";
}

export interface GameState {
  currentNote: Note | null;
  score: number;
  totalAttempts: number;
  correctAttempts: number;
  isPlaying: boolean;
  settings: PracticeSettings;
}

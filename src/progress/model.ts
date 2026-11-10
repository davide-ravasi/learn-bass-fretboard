export const PROGRESS_VERSION = 1 as const;

export type NoteStat = {
  attempts: number;
  correct: number;
};

export type Progress = {
  version: typeof PROGRESS_VERSION;
  highScore: number;
  notes: Record<string, NoteStat>;
};

export type NotePosition = {
  string: number;
  fret: number;
};

export const emptyProgress = (): Progress => ({
  version: PROGRESS_VERSION,
  highScore: 0,
  notes: {},
});

export const noteKey = (note: NotePosition): string =>
  `${note.string}:${note.fret}`;

export const recordAttempt = (
  progress: Progress,
  note: NotePosition,
  isCorrect: boolean,
  sessionScore: number,
): Progress => {
  const key = noteKey(note);
  const previous = progress.notes[key] ?? { attempts: 0, correct: 0 };

  return {
    version: PROGRESS_VERSION,
    highScore: Math.max(progress.highScore, sessionScore),
    notes: {
      ...progress.notes,
      [key]: {
        attempts: previous.attempts + 1,
        correct: previous.correct + (isCorrect ? 1 : 0),
      },
    },
  };
};

export const statFor = (
  progress: Progress,
  note: NotePosition | null | undefined,
): NoteStat => {
  if (!note) return { attempts: 0, correct: 0 };
  return progress.notes[noteKey(note)] ?? { attempts: 0, correct: 0 };
};

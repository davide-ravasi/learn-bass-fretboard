import {
  PROGRESS_VERSION,
  emptyProgress,
  type NoteStat,
  type Progress,
} from "./model";

const STORAGE_KEY = "bass-fretboard.progress";

const isNoteStat = (value: unknown): value is NoteStat => {
  if (!value || typeof value !== "object") return false;
  const stat = value as Record<string, unknown>;
  return (
    Number.isInteger(stat.attempts) &&
    Number.isInteger(stat.correct) &&
    (stat.attempts as number) >= 0 &&
    (stat.correct as number) >= 0 &&
    (stat.correct as number) <= (stat.attempts as number)
  );
};

const isProgress = (value: unknown): value is Progress => {
  if (!value || typeof value !== "object") return false;
  const progress = value as Record<string, unknown>;
  if (progress.version !== PROGRESS_VERSION) return false;
  if (
    typeof progress.highScore !== "number" ||
    !Number.isFinite(progress.highScore) ||
    progress.highScore < 0
  ) {
    return false;
  }
  if (
    !progress.notes ||
    typeof progress.notes !== "object" ||
    Array.isArray(progress.notes)
  ) {
    return false;
  }

  return Object.values(progress.notes as Record<string, unknown>).every(
    isNoteStat,
  );
};

export const loadProgress = (
  storage: Pick<Storage, "getItem"> | undefined = globalThis.localStorage,
): Progress => {
  if (!storage) return emptyProgress();

  try {
    const raw = storage.getItem(STORAGE_KEY);
    if (!raw) return emptyProgress();
    const parsed: unknown = JSON.parse(raw);
    return isProgress(parsed) ? parsed : emptyProgress();
  } catch {
    return emptyProgress();
  }
};

export const saveProgress = (
  progress: Progress,
  storage: Pick<Storage, "setItem"> | undefined = globalThis.localStorage,
): void => {
  if (!storage) return;

  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // Quota or private mode: the session still runs, the next save can retry.
  }
};

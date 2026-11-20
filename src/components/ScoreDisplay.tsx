import { clsx } from "clsx";
import { statFor, type Progress } from "../progress/model";
import type { GameState, Note } from "../types";
import "./ScoreDisplay.css";

type AnswerResult = "correct" | "incorrect";

const EyeIcon = ({ hidden }: { hidden: boolean }) => (
  <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
    <path
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12z"
    />
    <circle
      cx="12"
      cy="12"
      r="3"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    />
    {hidden ? null : (
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        d="M4 20 20 4"
      />
    )}
  </svg>
);

export const ScoreDisplay = ({
  gameState,
  progress,
  clickedNote,
  result,
  areHiddenNotes,
  onToggleNotes,
  onContinue,
}: {
  gameState: GameState;
  progress: Progress;
  clickedNote: Note | undefined;
  result: AnswerResult | null;
  areHiddenNotes: boolean;
  onToggleNotes: () => void;
  onContinue: () => void;
}) => {
  const asked = gameState.currentNote;
  const here = statFor(progress, asked);
  const resultText =
    result === "correct" && asked
      ? `Giusto · ${asked.name} ${here.correct}/${here.attempts}`
      : result === "incorrect" && asked && clickedNote
        ? `${clickedNote.name} · cercavi ${asked.name} · ${here.correct}/${here.attempts}`
        : null;

  return (
    <div className="practice-strip">
      {resultText ? (
        <p
          className={clsx(
            "practice-strip__result",
            `practice-strip__result--${result}`,
          )}
          role="status"
        >
          {resultText}
        </p>
      ) : (
        <p className="practice-strip__question">
          <span
            className="practice-strip__find"
            aria-label={asked ? `Find ${asked.name}` : undefined}
          >
            {asked?.name}
          </span>
          <span className="practice-strip__dot" aria-hidden="true">
            ·
          </span>
          <span aria-label={`Score ${gameState.score}`}>{gameState.score}</span>
          <span className="practice-strip__dot" aria-hidden="true">
            ·
          </span>
          <span aria-label={`Best ${progress.highScore}`}>
            ★{progress.highScore}
          </span>
          <span className="practice-strip__dot" aria-hidden="true">
            ·
          </span>
          <span
            aria-label={`${gameState.correctAttempts} correct out of ${gameState.totalAttempts}`}
          >
            {gameState.correctAttempts}/{gameState.totalAttempts}
          </span>
        </p>
      )}
      {resultText ? (
        <button
          type="button"
          className="practice-strip__continue"
          onClick={onContinue}
        >
          Continua
        </button>
      ) : null}
      <button
        type="button"
        className="practice-strip__notes"
        aria-pressed={!areHiddenNotes}
        aria-label={areHiddenNotes ? "Show notes" : "Hide notes"}
        onClick={onToggleNotes}
      >
        <EyeIcon hidden={areHiddenNotes} />
      </button>
    </div>
  );
};

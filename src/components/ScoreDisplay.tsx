import { statFor, type Progress } from "../progress/model";
import type { GameState, Note } from "../types";
import "./ScoreDisplay.css";

type AnswerResult = "correct" | "incorrect";

type Cell = {
  label: string;
  value: string;
  emphasis?: boolean;
};

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

const cellsFor = (
  result: AnswerResult | null,
  asked: Note | null,
  clickedNote: Note | undefined,
  score: number,
  highScore: number,
  hereCorrect: number,
  hereAttempts: number,
): Cell[] => {
  const here = `${hereCorrect}/${hereAttempts}`;

  if (result === "incorrect" && asked && clickedNote) {
    return [
      { label: "Suonato", value: clickedNote.name },
      { label: "Cercavi", value: asked.name, emphasis: true },
      { label: "Su questa", value: here },
    ];
  }

  if (result === "correct" && asked) {
    return [
      { label: "Esito", value: "Giusto", emphasis: true },
      { label: "Nota", value: asked.name },
      { label: "Su questa", value: here },
    ];
  }

  return [
    { label: "Cerca", value: asked?.name ?? "", emphasis: true },
    { label: "Punti", value: String(score) },
    { label: "Record", value: String(highScore) },
  ];
};

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
  const cells = cellsFor(
    result,
    asked,
    clickedNote,
    gameState.score,
    progress.highScore,
    here.correct,
    here.attempts,
  );

  return (
    <div className="practice-strip">
      <div className="practice-strip__cells" role="status">
        {cells.map((cell) => (
          <div className="practice-strip__cell" key={cell.label}>
            <span className="practice-strip__label">{cell.label}</span>
            <span
              className={
                cell.emphasis
                  ? "practice-strip__value practice-strip__value--emphasis"
                  : "practice-strip__value"
              }
            >
              {cell.value}
            </span>
          </div>
        ))}
      </div>
      {result ? (
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

import { statFor, type Progress } from "../progress/model";
import type { GameState } from "../types";
import "./ScoreDisplay.css";

export const ScoreDisplay = ({
  gameState,
  progress,
}: {
  gameState: GameState;
  progress: Progress;
}) => {
  const here = statFor(progress, gameState.currentNote);

  return (
    <div className="score-display">
      <div className="stats">
        {gameState.currentNote && (
          <p className="target-note">Find: {gameState.currentNote.name}</p>
        )}
        <p>Score: {gameState.score}</p>
        <p>Best: {progress.highScore}</p>
        <p>
          Here: {here.correct}/{here.attempts}
        </p>
        <p>
          Corrects: {gameState.correctAttempts}/{gameState.totalAttempts}
        </p>
        <p>
          Accuracy:{" "}
          {gameState.totalAttempts > 0
            ? (
                (gameState.correctAttempts / gameState.totalAttempts) *
                100
              ).toFixed(2) + "%"
            : "0%"}
        </p>
      </div>
    </div>
  );
};

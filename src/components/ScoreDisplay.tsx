import type { GameState } from "../types";
import "./ScoreDisplay.css";

export const ScoreDisplay = ({ gameState }: { gameState: GameState }) => {
  return (
    <div className="score-display">
      <div className="stats">
        {gameState.currentNote && (
          <p className="target-note">Find: {gameState.currentNote.name}</p>
        )}
        <p>Score: {gameState.score}</p>
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

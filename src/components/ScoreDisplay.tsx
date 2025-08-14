import type { GameState } from "../types";
import "./ScoreDisplay.css";

export const ScoreDisplay = ({ gameState }: { gameState: GameState }) => {
  return (
    <div className="score-display">
      <h2>Score: {gameState.score}</h2>
      <div className="stats">
        <p>Total Attempts: {gameState.totalAttempts}</p>
        <p>Correct Attempts: {gameState.correctAttempts}</p>
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

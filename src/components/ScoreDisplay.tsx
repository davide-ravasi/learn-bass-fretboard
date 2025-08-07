import { useGameState } from "../hooks/useGameState";
import "./ScoreDisplay.css";

export const ScoreDisplay = () => {
  const { gameState } = useGameState();

  return (
    <div className="score-display">
      <h2>Score: {gameState.score}</h2>
      <div className="stats">
        <p>Total Attempts: {gameState.totalAttempts}</p>
        <p>Correct Attempts: {gameState.correctAttempts}</p>
        <p>
          Accuracy:{" "}
          {gameState.totalAttempts > 0
            ? (gameState.correctAttempts / gameState.totalAttempts) * 100 + "%"
            : "0%"}
        </p>
      </div>
      {gameState.currentNote && (
        <div className="current-note">
          <h3>Find this note on the fretboard</h3>
          <p>{gameState.currentNote.name}</p>
        </div>
      )}
    </div>
  );
};

import "./App.css";
import { Fretboard } from "./components/Fretboard";
import { ScoreDisplay } from "./components/ScoreDisplay";
import { InstallPrompt } from "./components/InstallPrompt";
import type { Note } from "./types";
import { useGameState } from "./hooks/useGameState";
import { useState, useEffect } from "react";

function App() {
  const [clickedNote, setClickedNote] = useState<Note>();
  const { startNewGame, gameState, checkAnswer, generateNewNote } =
    useGameState();
  const [feedback, setFeedback] = useState<{
    message: string;
    type: "correct" | "incorrect" | null;
  }>({ message: "", type: null });
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Detect iOS for PWA instructions
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(iOS);
  }, []);

  const handleNoteClick = (note: Note) => {
    if (!gameState.isPlaying) return;

    setClickedNote(note);
    const isCorrect = checkAnswer(note);

    if (isCorrect) {
      setFeedback({ message: "Correct! 🎉", type: "correct" });
    } else {
      setFeedback({ message: "Try again! ❌", type: "incorrect" });
    }

    setTimeout(() => {
      generateNewNote();
      setClickedNote(undefined);
      setFeedback({ message: "", type: null });
    }, 1500);
  };

  const handleNewGame = () => {
    startNewGame();
    generateNewNote();
  };

  return (
    <>
      <InstallPrompt />
      <div className="app">
        <h1>Bass Guitar Learning App</h1>

        {/* iOS PWA Instructions */}
        {isIOS && (
          <div className="ios-install-hint">
            <p>
              📱 <strong>Tip:</strong> Tap the Share button (□↑) then "Add to
              Home Screen" to install this app!
            </p>
          </div>
        )}

        {!gameState.isPlaying ? (
          <button onClick={handleNewGame} className="start-button">
            Start Practice
          </button>
        ) : (
          <>
            <ScoreDisplay gameState={gameState} />
            {feedback.message && (
              <div className={`feedback ${feedback.type}`}>
                {feedback.message}
              </div>
            )}
            <Fretboard
              handleNoteClick={handleNoteClick}
              clickedNote={clickedNote}
              gameState={gameState}
            />
          </>
        )}
      </div>
    </>
  );
}

export default App;

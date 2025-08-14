import "./App.css";
import { Fretboard } from "./components/Fretboard";
import { ScoreDisplay } from "./components/ScoreDisplay";
import { InstallPrompt } from "./components/InstallPrompt";
import type { Note } from "./types";
import { useGameState } from "./hooks/useGameState";
import { useState, useEffect } from "react";
import * as Tone from "tone";

function App() {
  const [clickedNote, setClickedNote] = useState<Note>();
  const [synth] = useState(() =>
    new Tone.Synth({
      oscillator: { type: "sawtooth" },
      envelope: { attack: 0.1, decay: 0.2, sustain: 0.3, release: 0.8 },
    }).toDestination()
  );

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

  const playNote = async (note: Note) => {
    const noteFrequency = note.frequency;
    await Tone.start();
    synth.triggerAttackRelease(noteFrequency, "8n");
  };

  const handleNoteClick = async (note: Note) => {
    if (!gameState.isPlaying) return;

    try {
      await playNote(note);
    } catch (error) {
      console.error("Error playing note:", error);
    }

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
            <Fretboard
              handleNoteClick={handleNoteClick}
              clickedNote={clickedNote}
              gameState={gameState}
            />
            <div className={`feedback ${feedback.type}`}>
              {feedback.message}
            </div>
            <ScoreDisplay gameState={gameState} />
          </>
        )}
      </div>
    </>
  );
}

export default App;

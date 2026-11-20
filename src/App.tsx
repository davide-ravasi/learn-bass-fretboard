import "./App.css";
import { Fretboard } from "./components/Fretboard";
import { ScoreDisplay } from "./components/ScoreDisplay";
import { InstallPrompt } from "./components/InstallPrompt";
import type { Note } from "./types";
import { useGameState } from "./hooks/useGameState";
import { useState, useEffect, useRef } from "react";
import * as Tone from "tone";

function App() {
  const [clickedNote, setClickedNote] = useState<Note>();
  const [areHiddenNotes, setAreHiddenNotes] = useState(true);
  const [synth] = useState(() =>
    new Tone.Synth({
      oscillator: { type: "sawtooth" },
      envelope: { attack: 0.1, decay: 0.2, sustain: 0.3, release: 0.8 },
    }).toDestination(),
  );

  const { startNewGame, gameState, progress, checkAnswer, generateNewNote } =
    useGameState();
  const [result, setResult] = useState<"correct" | "incorrect" | null>(null);
  const answerLock = useRef(false);
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
    if (
      !gameState.isPlaying ||
      result ||
      answerLock.current ||
      !gameState.currentNote
    ) {
      return;
    }

    answerLock.current = true;
    setClickedNote(note);
    setResult(checkAnswer(note) ? "correct" : "incorrect");

    try {
      await playNote(note);
    } catch (error) {
      console.error("Error playing note:", error);
    }
  };

  const handleContinue = () => {
    answerLock.current = false;
    generateNewNote();
    setClickedNote(undefined);
    setResult(null);
  };

  const handleNewGame = () => {
    answerLock.current = false;
    setClickedNote(undefined);
    setResult(null);
    startNewGame();
    generateNewNote();
  };

  const handleToggleNotes = () => {
    setAreHiddenNotes(!areHiddenNotes);
  };

  return (
    <>
      <InstallPrompt />
      <div className="app">
        {!gameState.isPlaying ? (
          <>
            <h1>Bass Guitar Learning App</h1>
            {isIOS && (
              <div className="ios-install-hint">
                <p>
                  📱 <strong>Tip:</strong> Tap the Share button (□↑) then "Add
                  to Home Screen" to install this app!
                </p>
              </div>
            )}
            <p className="best-score">Best: {progress.highScore}</p>
            <button onClick={handleNewGame} className="start-button">
              Start Practice
            </button>
          </>
        ) : (
          <div className="app-content">
            <div className="info-panel">
              <ScoreDisplay
                gameState={gameState}
                progress={progress}
                clickedNote={clickedNote}
                result={result}
                areHiddenNotes={areHiddenNotes}
                onToggleNotes={handleToggleNotes}
                onContinue={handleContinue}
              />
            </div>
            <Fretboard
              handleNoteClick={handleNoteClick}
              clickedNote={clickedNote}
              gameState={gameState}
              areHiddenNotes={areHiddenNotes}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default App;

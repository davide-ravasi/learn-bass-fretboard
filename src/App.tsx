import "./App.css";
import { Fretboard } from "./components/Fretboard";
import { ScoreDisplay } from "./components/ScoreDisplay";
import type { Note } from "./types";
import { useGameState } from "./hooks/useGameState";
import { useState } from "react";

function App() {
  const [clickedNote, setClickedNote] = useState<Note>();
  const { startNewGame, gameState, checkAnswer, generateNewNote } =
    useGameState();

  // { name: "G", string: 3, fret: 5, frequency: 87.31 }

  const handleNoteClick = (note: Note) => {
    setClickedNote(note);
    const isCorrect = checkAnswer(note);

    if (isCorrect) {
      console.log("Correct");
    } else {
      console.log("Incorrect");
    }

    setTimeout(() => {
      //startNewGame();
      generateNewNote();
      setClickedNote(undefined);
    }, 1000);
  };

  const handleNewGame = () => {
    startNewGame();
  };

  return (
    <>
      <div>
        <h1>Bass Fretboard App</h1>
        <p>Random Note: {gameState.currentNote?.name}</p>
        <p>String: {gameState.currentNote?.string}</p>
        <p>Fret: {gameState.currentNote?.fret}</p>
        <p>Frequency: {gameState.currentNote?.frequency.toFixed(2)} Hz</p>
        <button onClick={handleNewGame}>Generate New Note</button>
      </div>
      <ScoreDisplay gameState={gameState} />
      <Fretboard
        handleNoteClick={handleNoteClick}
        clickedNote={clickedNote}
        gameState={gameState}
      />
    </>
  );
}

export default App;

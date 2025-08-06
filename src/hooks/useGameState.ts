import { useState } from "react";
import { getRandomNote } from "../data/notes";
import { type Note, type GameState } from "../types";

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>({
    currentNote: null,
    score: 0,
    totalAttempts: 0,
    correctAttempts: 0,
    isPlaying: false,
    settings: {
      bpm: 120,
      autoAdvance: true,
      showVisualAids: true,
      difficulty: "medium",
    },
  });

  const startNewGame = () => {
    setGameState((prevState) => ({
      ...prevState,
      currentNote: getRandomNote(),
      score: 0,
      totalAttempts: 0,
      correctAttempts: 0,
      isPlaying: true,
    }));
  };

  const checkAnswer = (note: Note) => {
    const isCorrect =
      note.name === gameState.currentNote?.name &&
      note.fret === gameState.currentNote?.fret &&
      note.string === gameState.currentNote?.string;

    setGameState((prevState) => ({
      ...prevState,
      totalAttempts: prevState.totalAttempts + 1,
      correctAttempts: isCorrect
        ? prevState.correctAttempts + 1
        : prevState.correctAttempts,
      score: isCorrect ? prevState.score + 10 : prevState.score,
    }));

    return isCorrect;
  };

  const generateNewNote = () => {
    setGameState((prevState) => ({
      ...prevState,
      currentNote: getRandomNote(),
    }));
  };

  return {
    gameState,
    startNewGame,
    checkAnswer,
    generateNewNote,
  };
};

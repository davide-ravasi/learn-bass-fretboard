import { useState } from "react";
import { getRandomNote } from "../data/notes";
import { recordAttempt, type Progress } from "../progress/model";
import { loadProgress, saveProgress } from "../progress/storage";
import { type Note, type GameState } from "../types";

export const useGameState = () => {
  const [progress, setProgress] = useState<Progress>(() => loadProgress());
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

    const nextScore = isCorrect ? gameState.score + 10 : gameState.score;

    setGameState((prevState) => ({
      ...prevState,
      totalAttempts: prevState.totalAttempts + 1,
      correctAttempts: isCorrect
        ? prevState.correctAttempts + 1
        : prevState.correctAttempts,
      score: nextScore,
    }));

    if (gameState.currentNote) {
      const nextProgress = recordAttempt(
        progress,
        gameState.currentNote,
        isCorrect,
        nextScore,
      );
      setProgress(nextProgress);
      saveProgress(nextProgress);
    }

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
    progress,
    startNewGame,
    checkAnswer,
    generateNewNote,
  };
};

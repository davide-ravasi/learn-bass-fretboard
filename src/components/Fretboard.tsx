import "./Fretboard.css";
import { generateBassNotes } from "../data/notes";
import type { GameState, Note } from "../types";
import { Fret } from "./Fret";

// Helper function to determine if a fret should have a dot
const shouldHaveDot = (fret: number): boolean => {
  // Standard fretboard dots at frets 3, 5, 7, 9, 12
  // For your 11-fret range, we'll use 3, 5, 7
  return fret === 3 || fret === 5 || fret === 7;
};

const isOpenString = (fret: number): boolean => {
  return fret === 0;
};

const isClickedNote = (note: Note, clickedNote: Note | undefined) => {
  return (
    clickedNote?.name === note.name &&
    clickedNote?.fret === note.fret &&
    clickedNote?.string === note.string
  );
};

const isCurrentNote = (note: Note, gameState: GameState) => {
  return (
    gameState.currentNote &&
    gameState.currentNote.string === note.string &&
    gameState.currentNote.fret === note.fret
  );
};

export const Fretboard = ({
  clickedNote,
  handleNoteClick,
  gameState,
  areHiddenNotes,
}: {
  clickedNote: Note | undefined;
  handleNoteClick: (note: Note) => void;
  gameState: GameState;
  areHiddenNotes: boolean;
}) => {
  const notes = generateBassNotes();

  return (
    <div className="fretboard">
      {[1, 2, 3, 4].map((string) => (
        <div className="string" key={string}>
          {notes
            .filter((note) => note.string === string)
            .map((note) => (
              <Fret
                key={`${note.string}-${note.fret}`}
                note={note}
                clickedNote={clickedNote}
                gameState={gameState}
                handleNoteClick={handleNoteClick}
                shouldHaveDot={shouldHaveDot}
                isOpenString={isOpenString}
                isCurrentNote={isCurrentNote}
                isClickedNote={isClickedNote}
                areHiddenNotes={areHiddenNotes}
              />
            ))}
        </div>
      ))}
    </div>
  );
};

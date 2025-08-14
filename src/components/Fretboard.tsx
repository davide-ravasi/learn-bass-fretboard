import "./Fretboard.css";
import { generateBassNotes } from "../data/notes";
import type { GameState, Note } from "../types";
import { clsx } from "clsx";

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
      {notes.map((note) => {
        const fretboardClasses = clsx("fret-position", {
          clicked: isClickedNote(note, clickedNote),
          highlighted:
            gameState.currentNote &&
            gameState.currentNote.string === note.string,
          correct:
            isCurrentNote(note, gameState) && isClickedNote(note, clickedNote),
          incorrect:
            isClickedNote(note, clickedNote) && !isCurrentNote(note, gameState),
          "dot-position": shouldHaveDot(note.fret),
          "open-string": isOpenString(note.fret),
        });

        return (
          <div
            className={fretboardClasses}
            key={`${note.string}-${note.fret}`}
            data-string={note.string}
            data-fret={note.fret}
            onClick={() => handleNoteClick(note)}
          >
            {!areHiddenNotes && note.name}
          </div>
        );
      })}
    </div>
  );
};

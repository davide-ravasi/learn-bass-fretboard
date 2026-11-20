import { clsx } from "clsx";

import "./Fretboard.css";

import { type Note, type GameState } from "../types";

export const Fret = ({
  note,
  clickedNote,
  gameState,
  handleNoteClick,
  isOpenString,
  isCurrentNote,
  isClickedNote,
  areHiddenNotes,
}: {
  note: Note;
  clickedNote: Note | undefined;
  gameState: GameState;
  handleNoteClick: (note: Note) => void;
  isOpenString: (fret: number) => boolean;
  isCurrentNote: (note: Note, gameState: GameState) => boolean | null;
  isClickedNote: (note: Note, clickedNote: Note | undefined) => boolean;
  areHiddenNotes: boolean;
}) => {
  const isMistake =
    isClickedNote(note, clickedNote) && !isCurrentNote(note, gameState);
  const showName = !areHiddenNotes || Boolean(isMistake);
  const fretboardClasses = clsx("fret-position", {
    clicked: isClickedNote(note, clickedNote),
    highlighted:
      gameState.currentNote && gameState.currentNote.string === note.string,
    correct: isCurrentNote(note, gameState) && isClickedNote(note, clickedNote),
    incorrect: isMistake,
    "open-string": isOpenString(note.fret),
  });

  return (
    <button
      type="button"
      className={fretboardClasses}
      data-string={note.string}
      data-fret={note.fret}
      aria-label={
        areHiddenNotes
          ? `${showName ? `${note.name}, ` : ""}String ${note.string}, fret ${note.fret}`
          : undefined
      }
      onClick={() => handleNoteClick(note)}
    >
      <span className="note-label">{showName ? note.name : ""}</span>
    </button>
  );
};

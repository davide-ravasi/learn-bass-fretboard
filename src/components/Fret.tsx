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
  const fretboardClasses = clsx("fret-position", {
    clicked: isClickedNote(note, clickedNote),
    highlighted:
      gameState.currentNote && gameState.currentNote.string === note.string,
    correct: isCurrentNote(note, gameState) && isClickedNote(note, clickedNote),
    incorrect:
      isClickedNote(note, clickedNote) && !isCurrentNote(note, gameState),
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
      <div className="note-label">{!areHiddenNotes && note.name}</div>
    </div>
  );
};

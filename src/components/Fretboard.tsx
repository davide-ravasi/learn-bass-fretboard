import "./Fretboard.css";
import { generateBassNotes } from "../data/notes";
import type { GameState, Note } from "../types";
import { clsx } from "clsx";

export const Fretboard = ({
  clickedNote,
  handleNoteClick,
  gameState,
}: {
  clickedNote: Note | undefined;
  handleNoteClick: (note: Note) => void;
  gameState: GameState;
}) => {
  const notes = generateBassNotes();

  return (
    <div className="fretboard">
      {notes.map((note) => {
        const fretboardClasses = clsx("fret-position", {
          clicked:
            clickedNote?.name === note.name &&
            clickedNote?.fret === note.fret &&
            clickedNote?.string === note.string,
          highlighted:
            gameState.currentNote &&
            gameState.currentNote.string === note.string,
        });
        return (
          <div
            className={fretboardClasses}
            key={`${note.string}-${note.fret}`}
            data-string={note.string}
            data-fret={note.fret}
            onClick={() => handleNoteClick(note)}
          >
            {note.name}
          </div>
        );
      })}
    </div>
  );
};

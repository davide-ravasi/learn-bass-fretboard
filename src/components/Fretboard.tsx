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
      {notes.map((note, index) => {
        const fretboardClasses = clsx("fret-position", {
          clicked:
            clickedNote?.name === note.name &&
            clickedNote?.fret === note.fret &&
            clickedNote?.string === note.string,
          highlighted:
            gameState.currentNote &&
            gameState.currentNote.string === note.string,
          "open-string": index % 12 === 0,
          "dot-position":
            index === 3 ||
            index === 5 ||
            index === 7 ||
            index === 15 ||
            index === 17 ||
            index === 19 ||
            index === 27 ||
            index === 29 ||
            index === 31 ||
            index === 39 ||
            index === 41 ||
            index === 43,
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

import "./Fretboard.css";
import { generateBassNotes } from "../data/notes";
import type { GameState, Note } from "../types";

export const Fretboard = ({
  clickedNote,
  handleNoteClick,
  currentNote,
  gameState,
}: {
  clickedNote: Note | undefined;
  handleNoteClick: (note: Note) => void;
  currentNote: Note | null;
  gameState: GameState;
}) => {
  const notes = generateBassNotes();
  const { name, string, fret } = clickedNote || {};

  return (
    <div className="fretboard">
      {notes.map((note) => {
        //  console.log(note);
        return (
          <div
            className={`fret-position ${
              name === note.name && fret === note.fret && string === note.string
                ? "clicked"
                : ""
            } ${
              currentNote &&
              currentNote.name === note.name &&
              currentNote.fret === note.fret &&
              currentNote.string === note.string
                ? "correct"
                : ""
            } ${
              gameState.currentNote &&
              gameState.currentNote.string === note.string
                ? "highlighted"
                : ""
            }`}
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

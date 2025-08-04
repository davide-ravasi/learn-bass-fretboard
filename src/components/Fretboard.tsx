import "./Fretboard.css";
import { generateBassNotes } from "../data/notes";

export const Fretboard = () => {
  const notes = generateBassNotes();

  return (
    <div className="fretboard">
      {notes.map((note) => {
        console.log(note);
        return (
          <div
            className="fret-position"
            key={`${note.string}-${note.fret}`}
            data-string={note.string}
            data-fret={note.fret}
          >
            {note.name}
          </div>
        );
      })}
    </div>
  );
};

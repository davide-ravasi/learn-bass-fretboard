import "./Fretboard.css";
import { generateBassNotes } from "../data/notes";
import type { Note } from "../types";
import { useState } from "react";

export const Fretboard = () => {
  const notes = generateBassNotes();
  const [clickedNote, setClickedNote] = useState<Note>();
  const { name, string, fret } = clickedNote || {};

  const handleNoteClick = (note: Note) => {
    console.log(note);
    setClickedNote(note);

    setTimeout(() => {
      setClickedNote(undefined);
    }, 1000);
  };

  return (
    <div className="fretboard">
      {notes.map((note) => {
        console.log(note);
        return (
          <div
            className={`fret-position ${
              name === note.name && fret === note.fret && string === note.string
                ? "clicked"
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

import { clsx } from "clsx";

import "./Fretboard.css";
import { generateBassNotes } from "../data/notes";
import type { GameState, Note } from "../types";
import { Fret } from "./Fret";

/** Top → bottom on the neck (matches CodePen: G, D, A, E). */
const STRING_ORDER: readonly number[] = [4, 3, 2, 1];

const FRETS_WITH_INLAY = new Set([3, 5, 7, 9]);

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
  const frets = Array.from({ length: 13 }, (_, i) => i);

  const noteAt = (string: number, fret: number): Note | undefined =>
    notes.find((n) => n.string === string && n.fret === fret);

  return (
    <div className="fretboard__container">
      {/*
        Adaptive neck (Option C):
        - portrait/narrow: CSS stacks frets (nut→12 top→bottom)
        - landscape/wide: horizontal neck (nut→12 left→right)
        Same DOM; orientation via Fretboard.css media queries.
      */}
      <div className="fretboard fretboard--neck">
        <div className="fretboard-strings" aria-hidden="true">
          {STRING_ORDER.map((stringNum) => (
            <div
              key={stringNum}
              className={clsx(
                "fretboard-string",
                `fretboard-string--s${stringNum}`,
              )}
            />
          ))}
        </div>

        {frets.map((fret) => (
          <div
            key={fret}
            className={clsx(
              "fret-column",
              fret === 0 ? "fret-column--nut" : "fret-column--fretted",
            )}
          >
            {fret === 12 ? (
              <>
                <div
                  className="fret-column__inlay fret-column__inlay--octave-up"
                  aria-hidden="true"
                />
                <div
                  className="fret-column__inlay fret-column__inlay--octave-down"
                  aria-hidden="true"
                />
              </>
            ) : (
              FRETS_WITH_INLAY.has(fret) && (
                <div className="fret-column__inlay" aria-hidden="true" />
              )
            )}
            {STRING_ORDER.map((stringNum) => {
              const note = noteAt(stringNum, fret);
              if (!note) return null;
              return (
                <Fret
                  key={`${note.string}-${note.fret}`}
                  note={note}
                  clickedNote={clickedNote}
                  gameState={gameState}
                  handleNoteClick={handleNoteClick}
                  isOpenString={isOpenString}
                  isCurrentNote={isCurrentNote}
                  isClickedNote={isClickedNote}
                  areHiddenNotes={areHiddenNotes}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

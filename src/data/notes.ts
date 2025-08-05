import type { Note } from "../types";

// Bass guitar string tunings (E, A, D, G)
const STRING_TUNINGS = ["E", "A", "D", "G"];

// Note frequencies for each string (open notes)
const OPEN_FREQUENCIES = [41.2, 55.0, 73.42, 98.0]; // E2, A2, D3, G3

// get note name for a given open note and fret
// case usage
// getNoteName('E', 0) // E
const getNoteName = (openNote: string, fret: number) => {
  const noteNames = [
    "C",
    "C#",
    "D",
    "D#",
    "E",
    "F",
    "F#",
    "G",
    "G#",
    "A",
    "A#",
    "B",
  ];
  const openNoteIndex = noteNames.indexOf(openNote);
  const noteIndex = (openNoteIndex + fret) % 12;
  return noteNames[noteIndex];
};

// Generate all notes for a 4-string bass up to 12 frets
// case usage
// generateBassNotes() // [
//   { name: "E", string: 1, fret: 0, frequency: 41.2 },
//   { name: "F", string: 1, fret: 1, frequency: 43.65 },
//   { name: "F#", string: 1, fret: 2, frequency: 46.25 },
//   ...
// ]
export const generateBassNotes = (): Note[] => {
  const notes: Note[] = [];

  for (let string = 1; string <= 4; string++) {
    const openNote = STRING_TUNINGS[string - 1];
    const baseFreq = OPEN_FREQUENCIES[string - 1];

    for (let fret = 0; fret <= 12; fret++) {
      const noteName = getNoteName(openNote, fret);
      const frequency = baseFreq * Math.pow(2, fret / 12);

      notes.push({
        name: noteName,
        string,
        fret,
        frequency,
      });
    }
  }

  return notes;
};

// Export the complete notes array
export const BASS_NOTES = generateBassNotes();

// Helper function to get a random note
export const getRandomNote = (): Note => {
  const randomIndex = Math.floor(Math.random() * BASS_NOTES.length);
  return BASS_NOTES[randomIndex];
};

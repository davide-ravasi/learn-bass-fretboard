import "./App.css";
import { Fretboard } from "./components/Fretboard";
import { BASS_NOTES, getRandomNote } from "./data/notes";
import { ScoreDisplay } from "./components/ScoreDisplay";

function App() {
  // Get a random note for practice
  const randomNote = getRandomNote();
  console.log(randomNote); // { name: "G", string: 3, fret: 5, frequency: 87.31 }

  // Or get all notes
  console.log(BASS_NOTES.length); // 52

  return (
    <>
      <div>
        <h1>Bass Fretboard App</h1>
        <p>Random Note: {randomNote.name}</p>
        <p>String: {randomNote.string}</p>
        <p>Fret: {randomNote.fret}</p>
        <p>Frequency: {randomNote.frequency.toFixed(2)} Hz</p>
      </div>
      <ScoreDisplay />
      <Fretboard />
    </>
  );
}

export default App;

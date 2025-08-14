# Tone.js Complete Tutorial: From Basics to Advanced

## 🎵 What is Tone.js?

Tone.js is a Web Audio framework for creating interactive music in the browser. It provides:

- **Synthesizers** and **instruments**
- **Timing** and **scheduling**
- **Audio effects** and **processing**
- **MIDI** support
- **Cross-browser compatibility**

---

## 🚀 Getting Started

### 1. Installation

```bash
npm install tone
```

### 2. Basic Import

```typescript
import * as Tone from "tone";
```

### 3. Audio Context Setup

```typescript
// Always start audio context on user interaction
const startAudio = async () => {
  await Tone.start();
  console.log("Audio is ready!");
};

// Call this on button click or note click
button.addEventListener("click", startAudio);
```

---

## 🎹 Basic Sound Generation

### 1. Simple Synth

```typescript
// Create a basic synthesizer
const synth = new Tone.Synth().toDestination();

// Play a note
synth.triggerAttackRelease("C4", "4n"); // C4 = middle C, 4n = quarter note
```

### 2. Note Values

```typescript
// Note durations
"1n"; // Whole note
"2n"; // Half note
"4n"; // Quarter note
"8n"; // Eighth note
"16n"; // Sixteenth note

// Note names
"C4"; // C in octave 4 (middle C)
"E2"; // E in octave 2 (low E string on bass)
"A3"; // A in octave 3
"G4"; // G in octave 4
```

### 3. Frequency vs Note Names

```typescript
// Use note names (easier)
synth.triggerAttackRelease("E2", "4n");

// Or use frequencies directly
synth.triggerAttackRelease(82.41, "4n"); // E2 frequency
```

---

## 🎸 Bass Guitar Specific Sounds

### 1. Custom Bass Synth

```typescript
const bassSynth = new Tone.Synth({
  oscillator: {
    type: "sawtooth", // Bass-like sound
  },
  envelope: {
    attack: 0.1, // How fast sound starts
    decay: 0.2, // How fast it fades
    sustain: 0.3, // How loud it stays
    release: 0.8, // How fast it stops
  },
}).toDestination();

// Play bass note
bassSynth.triggerAttackRelease("E2", "8n");
```

### 2. Bass String Tuning

```typescript
const BASS_STRINGS = {
  E: "E2", // 82.41 Hz - Lowest string
  A: "A2", // 110.00 Hz
  D: "D3", // 146.83 Hz
  G: "G3", // 196.00 Hz - Highest string
};

// Play each string
Object.values(BASS_STRINGS).forEach((note) => {
  bassSynth.triggerAttackRelease(note, "4n");
});
```

---

## ⏱️ Timing and Scheduling

### 1. Transport (Global Clock)

```typescript
// Set tempo
Tone.Transport.bpm.value = 120;

// Start/stop transport
Tone.Transport.start();
Tone.Transport.stop();
Tone.Transport.pause();
```

### 2. Scheduled Events

```typescript
// Schedule a note to play later
Tone.Transport.schedule((time) => {
  bassSynth.triggerAttackRelease("E2", "4n", time);
}, "0:0:0"); // Play at measure 0, beat 0, subdivision 0

// Schedule multiple notes
Tone.Transport.scheduleRepeat((time) => {
  bassSynth.triggerAttackRelease("E2", "8n", time);
}, "4n"); // Every quarter note
```

### 3. Metronome

```typescript
const metronome = new Tone.Player({
  url: "/click.mp3", // You need this audio file
  volume: -10,
}).toDestination();

// Click every quarter note
Tone.Transport.scheduleRepeat((time) => {
  metronome.start(time);
}, "4n");
```

---

## 🎛️ Audio Effects and Processing

### 1. Basic Effects

```typescript
// Reverb
const reverb = new Tone.Reverb(2).toDestination();
bassSynth.connect(reverb);

// Delay
const delay = new Tone.FeedbackDelay("8n", 0.5).toDestination();
bassSynth.connect(delay);

// Distortion
const distortion = new Tone.Distortion(0.8).toDestination();
bassSynth.connect(distortion);
```

### 2. Filter

```typescript
const filter = new Tone.Filter({
  frequency: 1000,
  type: "lowpass",
}).toDestination();

bassSynth.connect(filter);

// Animate filter
filter.frequency.rampTo(5000, 2); // Ramp to 5kHz over 2 seconds
```

### 3. EQ

```typescript
const eq = new Tone.EQ3().toDestination();
bassSynth.connect(eq);

// Adjust bass, mid, treble
eq.low.value = -10; // Reduce bass
eq.mid.value = 5; // Boost mids
eq.high.value = -5; // Reduce treble
```

---

## 🎼 Scales and Chords

### 1. Scale Generation

```typescript
// Get major scale
const majorScale = Tone.Scale.get("C", "major");
// Returns: ["C", "D", "E", "F", "G", "A", "B"]

// Get minor scale
const minorScale = Tone.Scale.get("A", "minor");
// Returns: ["A", "B", "C", "D", "E", "F", "G"]

// Play scale
majorScale.forEach((note, index) => {
  Tone.Transport.schedule((time) => {
    bassSynth.triggerAttackRelease(note + "3", "8n", time);
  }, `0:0:${index * 0.5}`);
});
```

### 2. Chord Detection

```typescript
// Check if frequencies form a chord
const frequencies = [261.63, 329.63, 392.0]; // C, E, G
const chord = Tone.Chord.detect(frequencies);
console.log(chord); // ["major", "minor", "diminished", etc.]
```

### 3. Arpeggiator

```typescript
const arpeggiator = (chord: string[], duration: string) => {
  chord.forEach((note, index) => {
    Tone.Transport.schedule((time) => {
      bassSynth.triggerAttackRelease(note + "3", duration, time);
    }, `0:0:${index * 0.25}`);
  });
};

// Play C major arpeggio
arpeggiator(["C", "E", "G"], "8n");
```

---

## 🎯 Advanced Features

### 1. Audio Analysis

```typescript
// Analyze audio in real-time
const analyzer = new Tone.Analyser("waveform", 1024);
bassSynth.connect(analyzer);

// Get frequency data
const data = analyzer.getValue();
console.log(data); // Array of frequency values

// Use for visualization
function drawVisualization() {
  const data = analyzer.getValue();
  // Draw bars, circles, etc. based on data
  requestAnimationFrame(drawVisualization);
}
```

### 2. MIDI Support

```typescript
// Listen for MIDI input
Tone.Midi().then((midi) => {
  midi.addListener((note) => {
    if (note.type === "noteon") {
      bassSynth.triggerAttack(note.name, note.velocity);
    } else if (note.type === "noteoff") {
      bassSynth.triggerRelease();
    }
  });
});
```

### 3. Audio Recording

```typescript
// Record audio output
const recorder = new Tone.Recorder();
bassSynth.connect(recorder);

// Start recording
recorder.start();

// Stop and download
setTimeout(async () => {
  const recording = await recorder.stop();
  const url = URL.createObjectURL(recording);
  const a = document.createElement("a");
  a.href = url;
  a.download = "bass-recording.webm";
  a.click();
}, 5000);
```

---

## 🔧 Practical Examples for Your Bass App

### 1. Note Playback with Error Handling

```typescript
const playNote = async (note: Note) => {
  try {
    // Ensure audio context is running
    if (Tone.context.state !== "running") {
      await Tone.start();
    }

    // Play the note
    bassSynth.triggerAttackRelease(note.frequency, "8n");
  } catch (error) {
    console.error("Audio playback failed:", error);
    // Fallback: show visual feedback only
  }
};
```

### 2. Practice Mode with Metronome

```typescript
const startPractice = (bpm: number) => {
  // Set tempo
  Tone.Transport.bpm.value = bpm;

  // Start metronome
  Tone.Transport.scheduleRepeat((time) => {
    metronome.start(time);
  }, "4n");

  // Start transport
  Tone.Transport.start();
};

const stopPractice = () => {
  Tone.Transport.stop();
  Tone.Transport.cancel(); // Cancel all scheduled events
};
```

### 3. Scale Practice Mode

```typescript
const practiceScale = (rootNote: string, scaleType: "major" | "minor") => {
  const scale = Tone.Scale.get(rootNote, scaleType);

  scale.forEach((note, index) => {
    // Schedule each note with a delay
    Tone.Transport.schedule((time) => {
      bassSynth.triggerAttackRelease(note + "2", "4n", time);
    }, `0:0:${index * 2}`); // 2 beats apart
  });

  Tone.Transport.start();
};
```

---

## 🚨 Common Issues and Solutions

### 1. Audio Context Not Started

```typescript
// Problem: Audio won't play
// Solution: Always start on user interaction
button.addEventListener("click", async () => {
  await Tone.start();
  // Now audio will work
});
```

### 2. Multiple Synths Creating Noise

```typescript
// Problem: Creating new synth every time
// Solution: Reuse synth instance
const [synth] = useState(() => new Tone.Synth().toDestination());

// Use the same synth for all notes
synth.triggerAttackRelease(note, duration);
```

### 3. Memory Leaks

```typescript
// Problem: Synths not disposed
// Solution: Clean up when component unmounts
useEffect(() => {
  return () => {
    synth.dispose();
    reverb.dispose();
    // Dispose all audio objects
  };
}, []);
```

---

## 📚 Additional Resources

### Official Documentation

- [Tone.js Documentation](https://tonejs.github.io/)
- [API Reference](https://tonejs.github.io/docs/)
- [Examples](https://tonejs.github.io/examples/)

### Learning Resources

- [Web Audio API Basics](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
- [Music Theory for Programmers](https://www.hooktheory.com/theorytab)
- [Frequency Chart](https://pages.mtu.edu/~suits/notefreqs.html)

### Community

- [Tone.js GitHub](https://github.com/Tonejs/Tone.js)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/tone.js)
- [Discord Community](https://discord.gg/tonejs)

---

## 🎯 Next Steps

1. **Start Simple**: Begin with basic note playback
2. **Add Effects**: Gradually add reverb, delay, etc.
3. **Implement Timing**: Add metronome and practice modes
4. **Create Visualizations**: Use analyzer data for cool effects
5. **Advanced Features**: MIDI, recording, complex scheduling

Remember: **Start small and build up gradually!** Audio programming can be complex, so take your time with each concept. 🎵🎸

# 🎵 Sound Design Reference Guide for Tone.js

## 🎸 How to Find and Modify Sounds

### **1. Official Tone.js Sources (Limited but Useful)**

- **API Reference**: https://tonejs.github.io/docs/
- **Examples**: https://tonejs.github.io/examples/
- **GitHub**: https://github.com/Tonejs/Tone.js (check issues and discussions)

### **2. Better Resources for Sound Design**

- **Web Audio API MDN**: https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API
- **Audio Synthesis Tutorials**: https://www.soundonsound.com/techniques
- **Synthesizer Manuals**: Download manuals for popular synths (they explain parameters)

---

## 🎹 Synth Types and Their Characteristics

### **Basic Synth Types**

```typescript
// Different synth types for different sounds
new Tone.Synth(); // Basic, clean sound
new Tone.AMSynth(); // Amplitude modulation (warm, rich)
new Tone.FMSynth(); // Frequency modulation (electronic, metallic)
new Tone.MonoSynth(); // Monophonic (one note at a time)
new Tone.PolySynth(); // Polyphonic (multiple notes)
new Tone.PluckSynth(); // Plucked string sound
new Tone.MetalSynth(); // Metallic, harsh sounds
new Tone.NoiseSynth(); // Noise-based sounds
```

### **When to Use Each Type**

| Synth Type        | Best For            | Characteristic    |
| ----------------- | ------------------- | ----------------- |
| `Tone.Synth`      | General purpose     | Clean, simple     |
| `Tone.AMSynth`    | Bass, warm sounds   | Rich harmonics    |
| `Tone.FMSynth`    | Electronic, leads   | Complex timbres   |
| `Tone.PluckSynth` | Guitar, bass        | String-like decay |
| `Tone.MetalSynth` | Percussion, effects | Harsh, metallic   |

---

## 🎛️ Oscillator Types and Their Sounds

### **Oscillator Waveforms**

```typescript
const synth = new Tone.Synth({
  oscillator: {
    type: "sine", // Pure, soft tone
    // type: "square"  // Hollow, buzzy
    // type: "sawtooth" // Bright, harsh
    // type: "triangle" // Soft, mellow
    // type: "pulse"   // Variable width
  },
});
```

### **Waveform Characteristics Table**

| Waveform     | Frequency Content           | Sound Quality | Best For       |
| ------------ | --------------------------- | ------------- | -------------- |
| **Sine**     | Fundamental only            | Pure, soft    | Bass, sub-bass |
| **Triangle** | Fundamental + odd harmonics | Soft, mellow  | Bass, pads     |
| **Square**   | Fundamental + odd harmonics | Hollow, buzzy | Bass, leads    |
| **Sawtooth** | All harmonics               | Bright, harsh | Leads, brass   |
| **Pulse**    | Variable harmonics          | Nasal, thin   | Bass, leads    |

### **Real Instrument Mappings**

| Instrument          | Primary Waveform  | Secondary Waveform  |
| ------------------- | ----------------- | ------------------- |
| **Bass Guitar**     | Sawtooth + Square | Triangle for warmth |
| **Electric Guitar** | Sawtooth          | Square for body     |
| **Piano**           | Triangle          | Square for attack   |
| **Brass**           | Sawtooth          | Square for body     |
| **Strings**         | Triangle          | Sine for warmth     |

---

## 🎚️ Envelope Parameters (ADSR)

### **ADSR Explained**

```typescript
const synth = new Tone.Synth({
  envelope: {
    attack: 0.1, // How fast sound starts (0 = instant)
    decay: 0.2, // How fast it fades to sustain
    sustain: 0.3, // How loud it stays (0-1)
    release: 0.8, // How fast it stops
  },
});
```

### **ADSR Values for Different Instruments**

| Instrument          | Attack     | Decay    | Sustain | Release | Effect                      |
| ------------------- | ---------- | -------- | ------- | ------- | --------------------------- |
| **Bass Guitar**     | 0.01-0.1   | 0.1-0.3  | 0.4-0.7 | 0.3-0.8 | Punchy, sustained           |
| **Electric Guitar** | 0.05-0.2   | 0.2-0.5  | 0.5-0.8 | 0.5-1.0 | Sharp attack, long sustain  |
| **Piano**           | 0.01-0.05  | 0.1-0.2  | 0.6-0.9 | 0.8-1.5 | Quick attack, natural decay |
| **Strings**         | 0.1-0.5    | 0.3-0.8  | 0.7-0.9 | 1.0-2.0 | Slow attack, long sustain   |
| **Drums**           | 0.001-0.01 | 0.05-0.2 | 0.1-0.3 | 0.1-0.5 | Instant attack, quick decay |

### **ADSR Quick Reference**

| Parameter   | Range     | Effect                              |
| ----------- | --------- | ----------------------------------- |
| **Attack**  | 0.001-2.0 | 0 = instant, 2 = slow fade-in       |
| **Decay**   | 0.001-2.0 | 0 = no decay, 2 = slow fade         |
| **Sustain** | 0.0-1.0   | 0 = no sustain, 1 = full volume     |
| **Release** | 0.001-5.0 | 0 = instant stop, 5 = long fade-out |

---

## 🎛️ Filter Types and Settings

### **Filter Types**

```typescript
const filter = new Tone.Filter({
  frequency: 1000, // Cutoff frequency (Hz)
  type: "lowpass", // Filter type
  rolloff: -12, // Rolloff steepness
  Q: 1, // Resonance (0-10)
});
```

### **Filter Types and Their Effects**

| Filter Type   | Effect                       | Best For                      |
| ------------- | ---------------------------- | ----------------------------- |
| **lowpass**   | Cuts high frequencies        | Bass, warmth                  |
| **highpass**  | Cuts low frequencies         | Brightness, clarity           |
| **bandpass**  | Cuts high and low            | Mid-range focus               |
| **notch**     | Cuts specific frequency      | Removing unwanted frequencies |
| **lowshelf**  | Boosts/cuts low frequencies  | Bass control                  |
| **highshelf** | Boosts/cuts high frequencies | Treble control                |

### **Frequency Ranges for Different Instruments**

| Frequency Range  | Effect   | Instrument Use              |
| ---------------- | -------- | --------------------------- |
| **20-60 Hz**     | Sub-bass | Bass guitar fundamentals    |
| **60-250 Hz**    | Bass     | Bass guitar body            |
| **250-500 Hz**   | Low-mid  | Bass guitar warmth          |
| **500-2000 Hz**  | Mid      | Bass guitar definition      |
| **2000-4000 Hz** | High-mid | Bass guitar presence        |
| **4000+ Hz**     | High     | Bass guitar air, brightness |

---

## 🎵 Creating Specific Bass Sounds

### **1. Classic Bass Guitar**

```typescript
const classicBass = new Tone.Synth({
  oscillator: {
    type: "sawtooth", // Bright, cutting
  },
  envelope: {
    attack: 0.01, // Quick attack
    decay: 0.2, // Fast decay to sustain
    sustain: 0.6, // Good sustain
    release: 0.5, // Medium release
  },
}).chain(
  new Tone.Filter({
    frequency: 800, // Cut high frequencies
    type: "lowpass",
    Q: 2, // Slight resonance
  }),
  new Tone.Distortion(0.3), // Light distortion
  Tone.Destination
);
```

### **2. Funk Bass**

```typescript
const funkBass = new Tone.Synth({
  oscillator: {
    type: "square", // Hollow, punchy
  },
  envelope: {
    attack: 0.001, // Instant attack
    decay: 0.1, // Very fast decay
    sustain: 0.3, // Low sustain
    release: 0.2, // Quick release
  },
}).chain(
  new Tone.Filter({
    frequency: 1200, // Higher cutoff
    type: "lowpass",
    Q: 4, // More resonance
  }),
  new Tone.Distortion(0.5), // Medium distortion
  Tone.Destination
);
```

### **3. Jazz Bass**

```typescript
const jazzBass = new Tone.Synth({
  oscillator: {
    type: "triangle", // Soft, warm
  },
  envelope: {
    attack: 0.05, // Slight attack
    decay: 0.3, // Medium decay
    sustain: 0.8, // High sustain
    release: 1.0, // Long release
  },
}).chain(
  new Tone.Filter({
    frequency: 600, // Lower cutoff
    type: "lowpass",
    Q: 1, // Minimal resonance
  }),
  new Tone.Reverb(1.5), // Room reverb
  Tone.Destination
);
```

---

## 🔍 How to Experiment and Find Your Sound

### **1. Systematic Approach**

```typescript
// Test different oscillator types
const testOscillators = () => {
  const types = ["sine", "triangle", "square", "sawtooth"];
  types.forEach((type, index) => {
    setTimeout(() => {
      const testSynth = new Tone.Synth({
        oscillator: { type },
      }).toDestination();
      testSynth.triggerAttackRelease("E2", "2n");
    }, index * 2000);
  });
};
```

### **2. Parameter Sweeping**

```typescript
// Sweep through filter frequencies
const sweepFilter = () => {
  const filter = new Tone.Filter(20, "lowpass").toDestination();
  const synth = new Tone.Synth().connect(filter);

  // Sweep from 20Hz to 2000Hz over 3 seconds
  filter.frequency.rampTo(2000, 3);
  synth.triggerAttackRelease("E2", "4n");
};
```

### **3. A/B Testing**

```typescript
// Compare two sounds
const compareSounds = () => {
  const soundA = new Tone.Synth({
    oscillator: { type: "sawtooth" },
  }).toDestination();
  const soundB = new Tone.Synth({
    oscillator: { type: "square" },
  }).toDestination();

  // Play A, then B
  soundA.triggerAttackRelease("E2", "2n");
  setTimeout(() => {
    soundB.triggerAttackRelease("E2", "2n");
  }, 2000);
};
```

---

## 📚 External Resources for Sound Design

### **1. Synthesizer Manuals (Free Downloads)**

- **Arturia**: https://www.arturia.com/support/downloads
- **Native Instruments**: https://www.native-instruments.com/en/support/downloads/
- **Korg**: https://www.korg.com/us/support/downloads/

### **2. Online Sound Design Tools**

- **Web Audio API Playground**: https://webaudioapi.com/
- **Tone.js Sandbox**: https://tonejs.github.io/examples/
- **Synthesizer VST**: https://www.vst4free.com/

### **3. Music Production Forums**

- **Gearslutz**: https://www.gearslutz.com/board/
- **Reddit r/synthesizers**: https://www.reddit.com/r/synthesizers/
- **Reddit r/edmproduction**: https://www.reddit.com/r/edmproduction/

### **4. YouTube Channels**

- **Syntorial**: Synthesizer tutorials
- **Sonic Academy**: Sound design courses
- **ADSR Sounds**: Tutorials and presets

---

## 🎯 Practical Exercise: Build Your Bass Library

### **Step 1: Create Basic Variations**

```typescript
const bassLibrary = {
  classic: createClassicBass(),
  funk: createFunkBass(),
  jazz: createJazzBass(),
  electronic: createElectronicBass(),
  acoustic: createAcousticBass(),
};

function createClassicBass() {
  return new Tone.Synth({
    oscillator: { type: "sawtooth" },
    envelope: { attack: 0.01, decay: 0.2, sustain: 0.6, release: 0.5 },
  }).chain(
    new Tone.Filter(800, "lowpass"),
    new Tone.Distortion(0.3),
    Tone.Destination
  );
}
```

### **Step 2: Test Each Sound**

```typescript
const testBassLibrary = () => {
  Object.entries(bassLibrary).forEach(([name, synth], index) => {
    setTimeout(() => {
      console.log(`Testing: ${name}`);
      synth.triggerAttackRelease("E2", "2n");
    }, index * 3000);
  });
};
```

### **Step 3: Save Your Favorites**

```typescript
// Save your favorite settings
const favoriteBass = {
  name: "My Custom Bass",
  settings: {
    oscillator: { type: "sawtooth" },
    envelope: { attack: 0.01, decay: 0.15, sustain: 0.7, release: 0.4 },
    filter: { frequency: 900, type: "lowpass", Q: 2 },
    effects: { distortion: 0.4, reverb: 0.3 },
  },
};
```

---

## 🚀 Quick Tips for Better Sound Design

### **1. Start Simple**

- Begin with basic synth, add complexity gradually
- One parameter change at a time
- Listen carefully to each change

### **2. Use Your Ears**

- Trust your ears over theory
- A/B test everything
- Take breaks to refresh your hearing

### **3. Reference Real Instruments**

- Listen to real bass guitars
- Try to match their characteristics
- Use frequency analyzers to see what's happening

### **4. Save Everything**

- Document your discoveries
- Create presets for different styles
- Build a personal sound library

---

## 🎵 Next Steps

1. **Experiment** with the examples above
2. **Create** your own bass sound library
3. **Test** different combinations
4. **Document** what works for you
5. **Share** your discoveries with the community

Remember: **Sound design is both art and science. Trust your ears, experiment freely, and have fun!** 🎸🎵

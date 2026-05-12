# Bass Fretboard App — Improvement Suggestions

Collected during Claude Code session on 2026-03-05.

---

## Quick Wins (< 30 min each)

- [ ] **`React.memo` on Fret** — Wrap `Fret.tsx` in `React.memo` to stop 51 unnecessary re-renders per click
- [ ] **No-repeat random note** — Prevent the same note from being picked twice in a row in `getRandomNote()`
- [ ] **`localStorage` for high score** — Persist best score and stats between sessions
- [ ] **`touch-action: manipulation`** — Add to fret CSS to fix mobile double-tap zoom
- [ ] **`aria-label` on frets** — Add `aria-label={`String ${string}, Fret ${fret}, Note ${name}`}` for accessibility
- [ ] **Extract `useAudio` hook** — Move Tone.js setup and `playNote()` out of App.tsx into its own hook

---

## Musical Pedagogy

- [ ] **Weighted note selection** — Track miss counts per note and weight randomization toward weaker notes
- [ ] **Practice by fretboard region** — Let users focus on frets 0–4, 5–9, or 10–12 separately (map to difficulty setting)
- [ ] **Show same note on multiple strings** — After a correct answer, briefly highlight where that same note exists on other strings

---

## Gamification & Engagement

- [ ] **Streak system** — Track consecutive correct answers with score multiplier (3 in a row = 1.5x, 5 = 2x)
- [ ] **Timed challenge mode** — "How many notes can you find in 60 seconds?" with countdown and final summary
- [ ] **Visual progress map** — Small 4×13 grid that fills with color as each note is mastered (persist with localStorage)
- [ ] **Daily challenge** — Fixed seed based on date so everyone gets the same sequence each day

---

## Audio Improvements

- [ ] **"Hear it" hint button** — Play the target note's frequency as an audio hint (builds ear training)
- [ ] **Play wrong note too** — When user clicks wrong fret, play that note so they hear the difference
- [ ] **Better bass synth** — Switch to `Tone.MonoSynth` with a low-pass filter for more realistic bass tone

---

## Code & Architecture

- [ ] **`useReducer` for game state** — Replace multiple `setState` calls with actions like `CORRECT_ANSWER`, `WRONG_ANSWER`, `NEW_GAME`
- [ ] **Decouple feedback from note generation** — Separate the 1.5s feedback display from the auto-advance to next note
- [ ] **BEM CSS naming** — Refactor flat class names (`.clicked`, `.highlighted`) to BEM convention

---

## Accessibility

- [ ] **Keyboard support** — Map keyboard keys to frets so users can practice without a mouse
- [ ] **Color-blind safe feedback** — Add icons (✓/✗) or patterns alongside green/red so feedback doesn't rely solely on color

---

## Mobile UX

- [ ] **Haptic feedback** — `navigator.vibrate(50)` on correct, `navigator.vibrate([50, 50, 50])` on wrong (no-op on desktop)
- [ ] **Landscape orientation lock** — Consider suggesting orientation lock via PWA manifest for practice screen

---

## Testing Strategy (Vitest)

- [ ] **`notes.ts` unit tests** — Verify all 52 notes generate correctly, frequencies are accurate, `getRandomNote()` returns valid notes
- [ ] **`useGameState` hook tests** — Test with `@testing-library/react-hooks`: score increments, state resets, answer checking
- [ ] **`Fret` rendering tests** — Verify correct CSS classes (`.correct`, `.incorrect`, `.highlighted`) applied based on props
- [ ] **Mock Tone.js** — Don't integration-test audio; just verify `playNote` is called with the right frequency

---

## Existing Roadmap Items (from project docs)

- [ ] Mobile landscape note label rotation
- [ ] Difficulty level implementation (easy/medium/hard)
- [ ] Auto-advance mode with timing
- [ ] Practice modes (manual, auto, loop, scales)
- [ ] CI/CD pipeline (GitHub Actions)
- [ ] Progress tracking & persistence
- [ ] Multiple bass tunings
- [ ] Chord recognition
- [ ] Scale practice modes
- [ ] Dark/light theme toggle

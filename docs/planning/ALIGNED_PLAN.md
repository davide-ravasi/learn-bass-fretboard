# Piano allineato — Bass Fretboard App

**Last Updated:** 28 Luglio 2026  
**Status:** Source of truth (sostituisce i piani “commercial 8 settimane” come guida operativa)  
**Branch di origine:** `cursor/planning-and-analysis-2c87`

---

## 1. Tre obiettivi (in questo ordine)

| # | Obiettivo | Cosa significa in pratica |
|---|-----------|---------------------------|
| 1 | **Imparare costruendo** | Pattern React/TS, architettura, trade-off, testing — trasferibili a lavoro/lead e a `track-em-all` |
| 2 | **Usarla per studiare il basso** | Persistenza, focus per regione, scale (pentatoniche) — se non serve a te, non è “fatta” |
| 3 | **Condividere se è buona** | Qualità portfolio/beta: mobile, a11y base, zero bug imbarazzanti, README chiaro — **non** freemium/ARR day-1 |

**Non-goal (per ora):** paywall, Stripe, analytics commerciali, 950 scale, “feature parity totale” con Fretonomy.

I documenti lunghi storici sono in **`docs/archive/`**; se contraddicono questo file, vince **questo file**.

---

## 2. Stato reale oggi

Funziona:
- Quiz note su fretboard 4×13
- Score / accuracy in sessione
- Audio Tone.js al click
- PWA base (install / offline assets)

Manca (blocker per uso serio + share):
- Persistenza progress tra sessioni
- Pratica mirata (range tasti / corde / note deboli)
- Feedback educativo (non solo correct/wrong)
- Scale (almeno Major / Minor Pentatonic)
- Lock anti-click multipli durante feedback; settings tipizzati ma non cablati
- Lint verde (`InstallPrompt` `any`); test automatici assenti

Verdict onesto: MVP giocabile, non ancora tool da studio quotidiano né da linkare a un collega senza disclaimer.

---

## 3. Principi di esecuzione

1. **Una feature utente + un concetto architetturale** per pezzo di lavoro (vedi §5).
2. **Quality bar da share** prima di “scope commerciale”: mobile ok, feedback chiaro, dati non spariscono, build+lint verdi.
3. **Architettura quanto basta per imparare e non rifare tutto** — adapter/service sì quando c’è I/O reale; no folder theater a 60 file vuoti.
4. **Zustand / backend / cloud sync** solo quando lo state o i dati lo giustificano (oggi: no).
5. **Ore realistiche:** pezzi da 1–3 sessioni; niente sprint da 15 feature in 2 settimane part-time.

---

## 4. Backlog operativo (sequenza)

### Fase A — Tool serio per te (prima di scale)

| ID | Feature | Done when | Concetto da imparare |
|----|---------|-----------|----------------------|
| A1 | **Progress persistence** | High score + per-note attempts/accuracy sopravvivono al refresh | Boundary storage: model puro vs adapter `localStorage`; versioning schema semplice |
| A2 | **Click lock + feedback decouple** | Durante 1.5s non si accumulano tentativi; feedback ≠ auto-advance confusi | `useReducer` per game flow; side effects fuori dal reducer |
| A3 | **Focus / region practice** | Filtro frets 0–4 / 5–9 / 10–12 (+ opz. corde) | Pool derivato da settings; pure functions testabili |
| A4 | **Study mode** | Click → nome + audio, senza quiz | Modalità come stato esplicito (enum), non boolean sparsi |
| A5 | **`useAudio` extraction** | Synth lifecycle fuori da `App.tsx`; volume on/off | Hook con I/O; cleanup; constraint browser autoplay |
| A6 | **Vitest su nucleo** | Test `notes.ts` + reducer/progress helpers | Cosa unit-testare vs mock Tone |

**Gate A:** usi l’app ≥5 giorni di fila senza tornare a Fretonomy solo per le note.  
Se fallisce → itera A, non partire con le scale.

### Fase B — Scale (motivo per cui apriresti l’app)

| ID | Feature | Done when | Concetto da imparare |
|----|---------|-----------|----------------------|
| B1 | **Scale data + generator** | Major / Minor Pentatonic, root + 2–3 box/pattern (non “CAGED chitarra” dogmatico) | Domain model puro; generator deterministico + test |
| B2 | **Scale explorer UI** | Vedi pattern sul fretboard, cambi root/pattern | Presentational fretboard riusata; props vs feature module |
| B3 | **Un practice mode scale** | Es. “trova il grado / la nota nella scala” | Stesso game loop del quiz note, parametri diversi |
| B4 | **Scale progress** | Accuracy per scala/pattern in localStorage | Stesso storage layer di A1, nuovo aggregate |

**Gate B:** studi A minor / G major pentatonic **con questa app** almeno una settimana.

### Fase C — Barra da condividere

| ID | Feature | Done when |
|----|---------|-----------|
| C1 | Mobile landscape / touch targets decenti | Usabile su telefono senza zoom fight |
| C2 | a11y base | `aria-label` coerenti, focus visible, feedback non solo colore |
| C3 | Audio “abbastanza basso” | MonoSynth/filter o preset accettabile per te |
| C4 | README + screenshot + “how to practice” | Un estraneo capisce in 2 minuti |
| C5 | Lint + build verdi; smoke test manuale PWA | Nessuna vergogna al primo open |

**Gate C (share):** la conforteresti a un bassista amico senza scusarti. Solo allora: link, beta piccola, feedback.

### Dopo (solo se Gate C passa)

Idee utili dai docs archivio (non prima):
- Heatmap fretboard
- Weak-notes practice
- Altri mode scale / metronome runner
- Dark mode
- Export JSON progress
- (Molto dopo) sync cloud / account — parallelismo con `track-em-all`, non prerequisito

Esplicitamente **rimandato:** freemium, $ARR, 25 feature, IndexedDB “perché sì”, achievement spam, parity 950 scale.

---

## 5. Curriculum architetturale (intenzionale)

Ogni fase A/B insegna qualcosa di riusabile. Non fare il pezzo “in silenzio”: se sei confuso, usa le skill in `.cursor/skills/`.

| Concetto | Dove lo tocchi | Trasferimento |
|----------|----------------|---------------|
| Presentational vs container | `Fret` / `Fretboard` vs `App` / hooks | Colloqui FE, design componenti |
| State machine / `useReducer` | Game flow, mode switching | Lead: modellare UI come stati espliciti |
| Pure domain vs I/O | `notes` / scale generator vs storage / Tone | Full-stack mentale; testabilità |
| Adapter stretto | `localStorage` dietro interfaccia minima | Stesso pattern di persistenza in `track-em-all` |
| Performance consapevole | memo solo con misura; evita `generateBassNotes()` a ogni render | Giudizio, non cargo-cult |
| PWA trade-off | cache vs freshness | Prodotti offline-first |
| Testing pyramid piccola | pure functions first, mock audio | Qualità senza overkill |

**Stack decision (ferma finché Gate B non passa):** React 19 + TS + Vite + Tone + hooks. Niente Zustand finché non hai state cross-route/feature davvero condiviso.

---

## 6. Documentazione

| Doc | Ruolo |
|-----|--------|
| **Questo file** | Piano operativo (source of truth) |
| [`docs/README.md`](../README.md) | Indice docs |
| [`docs/archive/`](../archive/README.md) | Tutto lo storico (planning 26/07, checklist, PWA×3, Tone tutorials, CSS analysis) |
| [`docs/reference/`](../reference/README.md) | Puntatori brevi a codice + scrapbook in archive |

Dai dump in `archive/planning/`: competitor = ispirazione heatmap/range; feature reqs = catalogo; architecture plan = visione a pezzi; roadmap = solo idea go/no-go. **Non** riprendere ARR/freemium/60-file day-1 come impegno.

---

## 7. Definizione di “buona da condividere”

- [ ] Persistenza che non perde il lavoro
- [ ] Almeno note practice mirata **oppure** scale explorer utilizzabile
- [ ] Mobile usabile
- [ ] Audio non irritante
- [ ] Build + lint OK
- [ ] README con scopo + come iniziare
- [ ] Tu la useresti in una sessione di studio vera

Monetizzazione / marketing: **fuori scope** finché la checklist sopra non è solida.

---

## 8. Prossima sessione codice (suggerita)

1. **A1** — progress in `localStorage` (model + adapter minimo + wire al game loop)  
2. Hook di apprendimento opzionale: `@learn-core-idea-first` su “domain puro vs adapter”  
3. Non toccare scale finché A1–A3 non sono verdi

---

**Remember:** imparare e shippare non sono in conflitto se ogni pezzo ha una feature utente *e* un concetto. Condividere è un **gate di qualità**, non un deadline da pitch deck.

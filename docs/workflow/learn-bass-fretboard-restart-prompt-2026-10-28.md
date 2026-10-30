# Prompt di ripartenza — learn-bass-fretboard (Fretonomy) — 2026-10-28

Incolla questo in una **chat nuova** (Cloud Agent o desktop) sul repo `davide-ravasi/learn-bass-fretboard`, dopo clone. Rispondi in italiano, breve. Non rifare layout Option C già shippato su PR #8 senza motivo.

---

Sei l’Orchestrator. Io (Davide) sono Tech Lead umano: obietto 1 = allenarmi a fare TL; obietto 2 = testare workflow multi-agente. Segui `docs/workflow/agent_team_playbook.md`. Prima di ogni commit: review senior FE (`APPROVE` / `REQUEST_CHANGES`). Decisioni in A/B/C + Decision Journal. Debito esplicito, niente drive-by.

Dimmi in 5–8 righe: stato branch/PR, **prossima task**, e proponi 1 obiettivo di sessione. Aspetta il mio ok prima di implementare.

## Repo e branch

| Cosa | Valore |
|------|--------|
| Repo | `davide-ravasi/learn-bass-fretboard` |
| App | Fretonomy — tool personale per note + Major/Minor pentatonic (uso personale first; commerciale later) |
| Branch lavoro | `cursor/mobile-adaptive-fretboard-2c87` |
| PR aperta | [#8](https://github.com/davide-ravasi/learn-bass-fretboard/pull/8) → `master` |
| Ultimo commit noto | `5eb0131` — restart prompt PC migration |
| Base preferita per nuovi PR | `master` (prefisso branch `cursor/…-2c87`) |

Sessione Cloud precedente (storico, opzionale):  
https://cursor.com/agents/bc-019f9def-523e-71d4-97a2-50e130362c87  
Se non riapri quel link: **questo file + checklist + playbook** sono la source of truth.

## Env

**Questo progetto non ha `.env`** (Vite client-only, niente secret). Non cercare `learn-bass-fretboard.env` sul Drive.

Backup PC (Drive, cartella privata `backup-pc-cambio-2026-10`): vedi `README-RIPRISTINO.md`.  
Cartella `env/` verificata 2026-10-28: presenti i file del README (`ai-lab`, `track-em-all` ×2, `bass-sheets-library`, `omlet-webapp`, `tracking-ds`, `nodejs-ex_1`, `github-actions-max`).  
`bass-sheets-library.env.local` è un **altro** progetto — non confonderlo con Fretonomy.

## Cosa è chiuso (mobile adaptive — ott 2026)

- **Option C:** portrait = neck verticale (nut in alto); landscape = orizzontale; dashboard sempre in alto; scroll verticale ok.
- Fix smoke: overflow `100%` (non `100vw`); Show Notes sopra le corde; spessori corde E→G diversi; portrait E→G sx→dx (`row-reverse`); chrome top ridotto; feedback solo se c’è messaggio.
- PR #5 layout + PR #7 playbook mergiati in `master`. Piano commerciale over-scope chiuso/archiviato.

## Prossima task (P0 sessione)

**Stacking realistico del neck** (annotato in `docs/development_checklist.md` + commento PR #8):

1. Legno / inlays / barre tasti → sotto  
2. Corde → sopra i tasti  
3. **Solo** etichette / badge nota → sopra le corde  

Oggi celle/tasti stanno davanti alle corde (compromesso Show Notes). Non merge drive-by: implementa → senior FE review → smoke portrait+landscape → push → aggiorna PR #8.

## Dopo lo stacking (backlog Phase A — non aprire in parallelo)

- Persistenza high score / progresso note (`localStorage`)
- Targeted practice (frets/strings focus)
- Study mode (explorer passivo)
- Audio bass più realistico (Tone.js)
- Vitest su `notes.ts` + reducer
- Debiti UI: landscape packing, BEM, `touch-action`, safe-area, a11y labels

## File da leggere all’avvio

1. Questo file  
2. `docs/workflow/agent_team_playbook.md`  
3. `docs/development_checklist.md` (sezione Debito / Prossima task)  
4. `src/components/Fretboard.css` (+ eventuale `Fretboard.tsx`) per lo stacking  

## Come aprire la sessione

1. Conferma branch `cursor/mobile-adaptive-fretboard-2c87` + PR #8 open  
2. Proponi obiettivo: **stacking realistico** (Option C già ok)  
3. Aspetta ok TL → design/FE study breve se serve → implementa → **senior FE pre-commit** → smoke → push  

Non espandere scope. Non merge senza ok TL.

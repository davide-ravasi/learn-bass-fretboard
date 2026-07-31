# Docs archive

**Moved:** 28 Luglio 2026  
**Why:** These files were stale, contradictory, overlapping, or written as session dumps. They confused “ideas” with “current plan”.

**Current plan:** [../planning/ALIGNED_PLAN.md](../planning/ALIGNED_PLAN.md)

---

## What’s here

### Planning dumps (26 Luglio 2026)

| File | Keep for |
|------|----------|
| [planning/session_summary.md](./planning/session_summary.md) | Diary of the planning chat |
| [planning/competitor_analysis_fretonomy.md](./planning/competitor_analysis_fretonomy.md) | Fretonomy notes (heatmap, range) — ignore ARR/pricing as scope drivers |
| [planning/feature_requirements_detailed.md](./planning/feature_requirements_detailed.md) | Long feature catalog — pick only items already on ALIGNED_PLAN A–C |
| [planning/technical_architecture_plan.md](./planning/technical_architecture_plan.md) | “Big tree” architecture vision — implement piecemeal when a feature needs it |
| [planning/roadmap_strategic.md](./planning/roadmap_strategic.md) | 8-week day-by-day (too aggressive); reuse go/no-go idea only |

### Historical project docs

| File | Why archived |
|------|----------------|
| [development_checklist.md](./development_checklist.md) | Session diary; progress % conflicting (60% vs 80%) and outdated |
| [bass_guitar_learning_app_plan.md](./bass_guitar_learning_app_plan.md) | Original unchecked plan; superseded by ALIGNED_PLAN |
| [css_improvements_analysis.md](./css_improvements_analysis.md) | Snapshot of old “basic grid” CSS; fretboard CSS has moved on |

### PWA (3 overlapping docs → archive)

| File | Note |
|------|------|
| [pwa_quick_reference.md](./pwa_quick_reference.md) | Shortest of the three — preferred if you need a cheat sheet |
| [pwa_conversion_guide.md](./pwa_conversion_guide.md) | Long how-we-did-it writeup |
| [pwa_session_summary.md](./pwa_session_summary.md) | Session celebration summary |

Canonical PWA config in code: `vite.config.ts`, `public/manifest.json`, `index.html`.

### Tone.js study notes

| File | Note |
|------|------|
| [tonejs_tutorial.md](./tonejs_tutorial.md) | Generic tutorial scrapbook |
| [sound_design_reference.md](./sound_design_reference.md) | Synth/preset notes |

Useful when doing ALIGNED_PLAN **A5** (audio hook) / **C3** (bass-like tone). Not a product roadmap.

---

## Rules for agents

1. Do not treat archive docs as the current backlog.
2. Do not reintroduce ARR / freemium / 60-file day-1 architecture as commitments.
3. If something in archive is still valuable, copy the *decision* into `ALIGNED_PLAN.md` or a short note under `docs/reference/`, don’t resurrect the whole file as “active”.

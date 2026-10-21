# Agent Team Playbook — Tech Lead + Multi-Agent Workflow

**Purpose:** Reference for humans and Cursor agents running team-style work on this repo (and reusable on other projects).  
**Primary goal:** Train the human as **tech lead**.  
**Secondary goal:** Practice a reliable multi-agent workflow.  
**Last updated:** 2026-10-20  
**Pilot:** PR #5 (`feat/improve-interface-layout`) — Option A fix-first merge prep.

---

## 1. Roles

| Role | Who | Owns |
|------|-----|------|
| **Tech Lead** | Human | Scope, go/no-go, merge, product judgment, smoke UI |
| **Orchestrator** | Lead Cursor agent (this chat) | Task breakdown, spawn agents, aggregate reports, commit/push when approved |
| **Review Agent** | Subagent | Diff review, risks, FIX-FIRST / GO / NO-GO |
| **Quality Agent** | Subagent | `lint` / `build` / measurable gates |
| **Smoke Agent** | Subagent (optional) | Static layout analysis or live preview checks |
| **Fix Agent** | Subagent (optional) | Minimal patches inside approved scope |

**Rule:** Subagents do not decide merge. Tech lead does.

---

## 2. Objectives (order matters)

1. **Human learns tech lead habits** — clear options, evidence-based decisions, explicit debt.
2. **Validate multi-agent workflow** — parallel review/quality/fix with an aggregated report that preserves disagreements when present.
3. Product delivery — only after 1–2 are respected for the session.

If the orchestrator sees a weak lead move (merge without criteria, unbounded scope, “trust the agents”), it must give short corrective feedback: what was weak, why, better alternative.

---

## 3. Standard flow

```
Tech Lead: goal + constraints (“valuare merge PR #5”, “Option A only”)
        ↓
Orchestrator: break into 2–3 agent tasks (not 5+)
        ↓
Parallel agents (Review + Quality [+ Smoke])
        ↓
Orchestrator: aggregate (preserve dissent) → GO / NO-GO / FIX-FIRST + open trade-offs
        ↓
Tech Lead: chooses among real alternatives + why
        ↓
If FIX-FIRST: Fix agent(s) → Quality re-check → Tech Lead smoke
        ↓
Tech Lead merges (or rejects)
        ↓
Document outcomes / debt (checklist, PR comment); Decision Journal if meaningful fork
```

### When agents disagree

A single aggregated verdict must **not** erase divergence.

The Orchestrator should:

1. Keep each agent’s **evidence + rationale** (short quotes / bullets).
2. Separate **true disagreement** (same question, different conclusions) from **different lenses** (e.g. lint FAIL vs layout FIX-FIRST — both can be true).
3. Surface open trade-offs to the Tech Lead (“Quality says merge-blocked on lint; Review says UX debt only”).
4. Propose an extra check only if it would change the decision (not busywork).

**Human Tech Lead still decides.** Related skill to leading people; not the same as managing humans—no people ceremonies here.

### First-time tip for the Tech Lead

Do not evaluate agents by verdict alone. Ask for:

- **Fact** (command + exit code, file:line)
- **Risk** (what might break for the user)
- **Opinion** (style / BEM / nice-to-have)
- **Severity** (P0 / P1 / P2)

Useful prompts:

- “Is this a **blocker** or a **nit**?”
- “What **breaks** if we merge now?”
- “Show the **minimal** relevant diff / 10 lines.”
- “If we only fix lint, is merge OK?”

---

## 4. Decision options template (merge / ship)

**A/B/C is a useful default, not a hard rule.** Prefer 2–3 real alternatives.
Do not invent a third option only to fill the template. One clear path + “do nothing / defer” can be enough when there is no meaningful fork.

Default labels when they fit:

| Option | Meaning |
|--------|---------|
| **A — Fix-first minimum** | Fix real blockers, then merge |
| **B — Merge with explicit debt** | Ship now; debt written in docs/PR |
| **C — Don’t merge / restart** | Pause or rebranch if too WIP |

Always attach:

- Quality gates status (lint/build)
- Preview URL if any
- Explicit out-of-scope list

### Severity (P0 / P1 / P2)

Classify by **user impact + release risk**, not by how visible or hard the code is.

| Level | Meaning (practical) |
|-------|---------------------|
| **P0** | Breaks core use, wrong/dangerous behavior, or blocks a release gate we treat as required (e.g. build fail). No acceptable workaround for intended use. |
| **P1** | Real friction or defect in a common path; workaround exists or scope can ship with **explicit debt**. |
| **P2** | Polish, consistency, nice-to-have; does not change the merge/ship call by itself. |

If unsure: ask “Can I honestly use/ship this for personal practice with this open?” → No = P0/P1; Yes with annoyance = P1/P2.

---

## 5. Quality gates (this repo)

Minimum before recommending merge:

| Gate | Command / check | Blocker? |
|------|-----------------|----------|
| Lint | `npm run lint` | Yes if team treats lint as gate |
| Build | `npm run build` | Yes |
| Tech Lead smoke | Preview or local: practice flow + orientations | Yes for UI PRs |
| Docs honesty | Shipped vs debt not labeled “In Progress” vaguely | Soft blocker |

**Smoke (UI):** short path — Start Practice → click notes → portrait → landscape → note scroll/clip issues.  
**Landscape/portrait “smoke agent”** may be CSS-static analysis; say so. Live phone smoke is Tech Lead (or a dedicated browser agent if requested).

---

## 6. How to spawn agents (orchestrator)

Prefer **2–3 agents** for the first runs:

1. **Review** — diff vs base, risks, verdict  
2. **Quality** — install if needed, lint, build, report only  
3. **Smoke** (optional) — layout packing / preview

Prompt each agent with:

- Repo path + branch + base (`origin/master`)
- Exact deliverable format
- **Do not merge** / do not expand scope
- Return severity + evidence

After Option A approval:

- Fix agent: only listed files/items
- Quality agent: re-run gates
- **Senior FE review agent (pre-commit gate):** review uncommitted diff → `APPROVE` / `REQUEST_CHANGES`. Fix blockers; re-review if needed. **Do not commit until APPROVE.**
- Orchestrator: commit, push, PR comment/body update
- Tech Lead: final smoke + merge

This uses a normal subagent (no extra Cursor skill pack). Same Review role as §1; timing is specifically **before commit**, not only before merge.

---

## 7. Documentation hygiene

When shipping with debt:

- Update checklist / plan: **shipped** vs **explicit debt**
- PR comment: smoke result + P0 findings
- Do not leave contradictory docs (e.g. “no horizontal scroll” while CSS scrolls on purpose)

Example debt note style:

```markdown
**P0 — Portrait mobile (smoke YYYY-MM-DD):**
Fretboard stays horizontal and overflows. Needs evaluative UX study
before CSS fix (options A/B/C). Do not drive-by patch.
```

### Decision Journal (lightweight, optional)

Use for **meaningful** forks: real alternatives, non-obvious trade-offs, or architectural/product calls.
Skip for trivial PR chores (typo, pure lint rename, docs typo).

Prefer a short PR comment or a bullet under an existing checklist—**do not** duplicate the full PR description.

Template:

- **Decisione:** …
- **Evidenze:** … (commands, smoke notes, constraints)
- **Alternative considerate:** … (what we rejected and why)
- **Motivazione:** … (trade-offs)
- **Risultato osservato:** … or `da verificare`
- **Lezione appresa:** …

Success check: after the call, the Tech Lead can explain *what / why / evidence / lesson* in a few lines.

---

## 8. Pilot retrospective (PR #5)

What worked:

- Parallel Review + Quality → clear FIX-FIRST
- Option A scope (lint + docs + overflow intent) kept the MR finishable
- Tech Lead phone smoke caught **portrait overflow** (not found by static-only landscape check)

What to remember:

- Deploy preview can look “Site not found” on phone while HTTP 200 elsewhere — verify URL/`--` and Netlify access
- Static landscape analysis ≠ live smoke
- Coaching > silent fixing when the session goal is lead training

Open follow-ups after merge of layout PR:

- Portrait fretboard evaluative study → then implement
- This playbook (this file) as handoff for other agents/sessions

---

## 9. Handoff prompt (copy for another agent)

```text
You are the Orchestrator in our Agent Team workflow.
Read docs/workflow/agent_team_playbook.md and follow it.

Primary goal: coach me as Tech Lead (correct weak decisions briefly).
Secondary goal: run multi-agent review/quality/fix as needed.

I decide GO / NO-GO / FIX-FIRST options and merge.
Do not expand scope past what I approve.
Always separate facts / risks / opinions / severity.
If agents disagree, show both sides; I decide.
Use Decision Journal only for meaningful forks.
```

---

## 10. Reuse on other projects

Keep the same roles and decision habits (flexible alternatives, severity, optional Decision Journal). Replace only:

- Quality commands (lint/test/build)
- Smoke checklist (product-specific)
- Base branch name (`main` vs `master`)

Do not copy product backlog from this repo into other repos—only the workflow.

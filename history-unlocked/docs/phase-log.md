# Phase log

## Phase 1 — the app and Periods 1–2 (this build)

Built from scratch alongside Accounting Unlocked, reusing that project's spine and none
of its content.

**Shared spine, lifted and adapted**
`ProgressContext` (new storage key, `TOTAL_LEVELS`), `shuffle.js`, `examSession.js`,
`Hint.jsx`, `UpdatePrompt.jsx`, the print stylesheet, the PWA config, and the shell of
the practice exam.

**Written for this app**
- `SourceCard` — the stimulus component AP questions hang off, replacing the accounting
  app's `EntryTable`.
- Four drills: `LevelShell`, `QuizRound` (MC with optional stimulus), `CardSort`,
  `Sequence`.
- 34 exam questions across four sections (Unit 1, Unit 2, comparison/causation,
  sourcing), 16 of them stimulus-based.
- Levels 1–6 with 26 level questions, six card sorts and two chronologies.
- `Timeline` — 25 entries from 1491 to 1754, filterable by era, each with a "why it
  matters" line.
- `CramSheet` — Periods 1–2 condensed onto three printable pages.
- Branding: amber/parchment palette, classical-column icons, "History Unlocked" PWA
  manifest.

**Verified**
- `npm run build` clean.
- Node checks: 60 questions, no duplicate IDs, none malformed, answer position after
  shuffling 25.1 / 25.0 / 25.0 / 25.0, no answer-text mismatches, every sort bucket and
  sequence year consistent.
- Browser walk: all six levels reached their results screen through every round; a
  run that always picks option A scored between 11% and 54%, never 100%.
- No horizontal overflow at 390px; cram sheet prints to three pages; the only failing
  network request is the Google Fonts stylesheet, which this sandbox blocks.

**Fixed along the way**
Resuming a saved exam validated IDs against the exam bank only, so a saved "questions I
got wrong" round containing level questions would have been silently truncated on
resume. Both banks are now checked. The same defect existed in Accounting Unlocked and
was fixed there in the same commit.

## Next

1. Levels 7–9 — slavery in British North America, the Atlantic world, colonial minds.
2. Levels 10–11 — the colonial capstone and HIPP sourcing.
3. Lift `history-unlocked/` into its own repository and deploy it separately; it is
   self-contained and nothing outside the directory is referenced.
4. After the colonial test: Units 3–9, then DBQ/LEQ practice with rubric feedback.

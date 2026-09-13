# Phase log

What was built, in order, and why. Useful mainly for the *why* — several decisions
would otherwise look arbitrary, and several were reversed after new information.

## Phase 0 — Initial release (May 2026) · `b7b4a00`
Five levels: the accounting equation, the five account types, debits and credits,
journal entries, reading a balance sheet. Plus a cheat sheet. Levels were gated —
each unlocked by finishing the previous one.

## Phase 1 — The accounting cycle (Sep 9) · `be1c722`, `aff1214`
Driven by an imminent first exam on journal entries and trial balances.

Added Levels 6–10 (receivables vs payables, compound entries, T-accounts and
footing, the trial balance, a full-cycle capstone) and Level 11 (principles, with
a matching exercise). Built the practice exam.

**Gating was removed.** The owner asked for quizzes to be optional, so every level
is now unlocked and each lesson has a "skip the practice" escape.

## Phase 2 — Hints everywhere (Sep 9) · `f478661`, `2635863`
Started as a request for a help button on one drill, then generalised: *"you should
be able to give the same logic to any of the drills — the point being to make it
helpful where he can learn and ask why."*

102 pieces of hint copy, written per item. The rule that makes them work: a hint
**explains the reasoning and stops one step short**; the post-answer feedback is
where the answer is stated outright. Two registers, kept separate.

## Phase 3 — Cross-check against the real course (Sep 9) · `67b7678`, `f8caf01`, `d9d517f`, `2c26615`, `9e06d2b`
The turning point. The owner shared the professor's Chapter 1–3 slides and assigned
problems from Google Drive. Reading them changed the project from *generic intro
accounting* to *this student's course*.

Found and fixed:
- **DEAD CLIC → DEALER** (her mnemonic)
- **Conservatism and full disclosure were inverted** relative to her four principles
- **Chapter 3 was entirely missing** → Levels 12–15 (accrual basics, deferrals,
  accruals, closing entries)
- **Chapter 1's statements were thin** → Levels 16–17
- **Interest calculation had been deliberately skipped** — and her assigned problem
  requires it. Decision reversed.
- **Dividends placement** differs between her slide and her worksheet; both are
  accepted, so the app now says so

Details in `course-alignment.md`.

## Phase 4 — PWA, offline, resumable exam (Sep 10) · `ff8d490`
Installable, works fully offline, updates *prompt* rather than force so nothing
swaps out mid-question.

While building it: **an in-progress exam was being lost entirely.** Only finished
progress was persisted, so closing the tab at question 40 of 79 wiped it. Fixed
independently of the PWA.

## Phase 5 — The fixed-answer bug (Sep 10) · `7555837`
**The student noticed every answer was A. He was right.** All 79 exam questions and
all 38 level questions had the answer at position A, and every dropdown listed the
correct account first.

It survived because the browser tests clicked "A" every time and scored 100% —
read as the tests passing rather than as the bug it was announcing. Options are now
permuted at runtime. Verified: 40,000 shuffles distribute 24.9/25.2/24.9/25.0.

## Phase 6 — Study tools (Sep 12) · `e9c80e8`, `c657cc7`
Ahead of the exam, ranked by what actually moves a score:

- **Weak-area drilling.** Attempts recorded only a score, so the app could not say
  what he kept missing. Now every question's outcome is stored and a drill serves
  only what he missed.
- **Printable cram sheet** (`/cram`, exactly 2 pages) and a **printable full-cycle
  problem** (`/worksheet`) in her Date/Account/Debit/Credit layout with an answer
  key — because the exam is pencil on paper and every drill until then was tap-based.
- **Level quizzes now feed the tracker too.** The first version only covered the
  exam page; the owner checked, and it didn't cover level quizzes. Fixed by lifting
  the level MC banks into shared data modules.

Flashcards were considered and deliberately deferred — the drills already do active
recall, and targeted miss-drilling is a better use of limited study time.

## Phase 7 — Every drill reports what was missed (Sep 12) · `a3df506`
The weak-area tracker only understood multiple choice. The hands-on drills — the
entry builders, footing, trial balance columns, the sorts, closing entries — had no
answer index, so nothing was recorded for them.

They now record through `recordTask(id, correct, label, level)`, which stores a
human-readable label and the level alongside the result. They cannot be re-served by
the exam drill (they are bespoke interactions living inside their levels), so instead
the home page lists them grouped by level with a Redo link. `needsWorkIds()` filters
tasks out so the exam drill never tries to serve one.

Also added the **Date column** to journal entry tables, matching the professor's
Date / Account Description / Debit / Credit worksheet layout.

## Phase 8 — Resuming a misses round (Sep 13) · `b7ef8ed`
A latent bug, found while building a sibling project on the same spine. Resuming a
saved exam validated question IDs against the exam bank only (`QUESTIONS`), so a saved
"questions I got wrong" round that contained level questions (`L6-q1` and friends)
would have been silently truncated on resume — or dropped entirely, if every ID in it
came from a level.

`loadExamSession` is now passed both banks, and `resume()` rebuilds its lookup from
`ALL_QUESTIONS`. Nothing else changed.

## Phase 9 — Two gaps on the cram sheet (Sep 13)
Checked the sheet against the actual content of Levels 12–15 rather than assuming.
Adjusting and closing entries were both well covered — the seven adjustment types with
their entries and computations, temporary vs permanent, the three closing entries, the
Income Summary variant, the post-closing trial balance. Two things taught in the levels
were missing:

- **Cash basis vs accrual basis** — the idea Level 12 opens with, and the reason
  adjusting entries exist at all. The deferral/accrual rule was on the sheet; the
  distinction underneath it was not.
- **The three trial balances as a sequence** — unadjusted, adjusted, post-closing. The
  sheet named the post-closing one inside the closing section but never laid out the
  order, which is how Levels 12 and 15 frame it.

Both added. The sheet still prints to two pages.

## Open items

- **Chapter 4 onward** — needs slides
- Timed exam mode — deliberately deferred; the owner did not want it
- Progress export/import, as insurance against cleared browser storage
- Flashcards — deferred; the drills already do active recall

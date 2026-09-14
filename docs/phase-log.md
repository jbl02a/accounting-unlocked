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

## Phase 10 — Visitor analytics (Sep 13)
Added `@vercel/analytics` to `App.jsx`. Reports page views and unique visitors to the
Vercel dashboard; nothing is shown in the app and nothing is stored in it.

Deliberately not built: an in-app analytics page. The app is static with per-device
`localStorage`, so such a page could only report the browser it was running in — which
would look like site analytics and be nothing of the kind.

Cookieless and no personal data, which matters because the users are children. Needs a
one-time toggle in the Vercel dashboard (Project → Analytics → Enable); the package
alone does not turn it on.

## Phase 11 — Start every page at the top (Sep 13)
Reported from the live site: tapping a lesson or the cram sheet from the bottom of the
home page landed at the bottom of the new page. A browser preserves the scroll offset
across a route change, which is right for a document and wrong for an app.

`ScrollToTop` handles navigation. The bigger half was in-page: a level runs
lesson → drill → results behind one URL, and the exam runs setup → question → results,
none of which change the path. `useScrollTop(deps)` is called in all 17 levels and the
exam, keyed to whatever state marks a new screen (`phase`, plus `index` or `step` where
those exist).

Two bugs in the scripted edit itself, both caught by driving the app rather than by the
build:
- The hook was inserted before `index` was declared in PracticeExam, so the exam page
  crashed with a temporal-dead-zone error. Every call is now placed after all of its
  dependencies.
- Level 11's React import is spelled differently, so the import insert missed it and the
  level threw "useScrollTop is not defined" — while the build stayed green.

## Phase 12 — Reinforcement bank and the focus test (Sep 14)
First real practice exam: **77%, 61/79**, and the by-topic bars separated cleanly.
Green: Closing & Statements 12/12, Journal 9/10, Receivables & Payables 8/9,
Classifying 7/8. Amber: Debits & Credits 7/9, Adjusting Entries 8/11. Red: Accounting
Principles 6/11, Trial Balance 4/9.

The existing "drill what I missed" button re-serves the 18 exact questions he got
wrong, which trains the questions rather than the ideas. What was missing was more
practice *on the same topics with different examples*.

`src/data/reinforceBank.js` adds 44 questions on exactly those four topics —
principles 12, trial balance 11, debits & credits 10, adjusting entries 11. They are
kept **out** of the 79-question exam on purpose: a 77% in September has to mean the
same thing in October, and it cannot if the denominator moves.

`src/lib/focus.js` reads the `misses` tracker, rolls it up per topic, and bands each
one (red under 60%, amber under 80%, untested below three answered). The exam screen
then offers a ~24-question focus test over the red and amber topics only, at most half
of it questions he actually missed and the rest material he has never been served.
Single-topic drills draw on both banks too, roughly doubling their length.

The binding constraint was *"I don't want a new update to lose his saved progress."*
Nothing about the persisted shape changed and every new ID is `x`-prefixed, so a
collision is impossible — but it was proved rather than argued: his exact save (14
levels, the 77% attempt, all 79 `misses` entries) was seeded into `localStorage`, the
new build loaded over it, and levels, best score, attempt history and the missed list
were asserted byte-identical on disk afterwards — including after taking a focus test.

### Follow-up: drills explain as you go (same day)
Asked whether the drill actually explains *why* an answer is right. It did not,
reliably: `mode` defaults to `'exam'` (feedback withheld until submit) and neither
`startMisses` nor `startFocus` set it, while the Exam/Practice toggle renders *below*
both drill cards — so the likely path was to tap "Drill these 18" at the top and get
no reasoning until the results screen.

Both drills now force practice mode, and the two cards and the toggle say so. All 161
drillable questions were confirmed to carry a substantive explanation (none missing,
none under 40 characters). Verified in a browser: every one of a 24-question focus
test explained itself in-flight, wrong answers and right ones alike; the graded exam
still reveals nothing mid-run; a resumed drill keeps instant feedback.

## Open items

- **Chapter 4 onward** — needs slides
- Timed exam mode — deliberately deferred; the owner did not want it
- Progress export/import, as insurance against cleared browser storage
- Flashcards — deferred; the drills already do active recall

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

### Follow-up: drill first, then the new examples (same day)
The focus test card was rendering *above* the misses drill, which recommends the
wrong order. Correcting a mistake with its explanation has to come before being
re-tested on fresh examples of the same idea — otherwise the focus test is just a
second cold test. Swapped, with "Start here" / "Then this" labels and a line on the
focus card pointing back at the drill. Both only appear while both cards are on
screen. The results screen already ordered its buttons this way.

### Follow-up: the student decides when a question is done (same day)
`needsWorkIds()` retired a question the moment `last === 'right'`, so one lucky guess
removed it from the drill permanently with no way back. Raised as: he should be able
to keep one he is still on the fence about.

Added `hold`, a flag the student sets, kept deliberately separate from whether the
answer was correct. After any right answer the feedback panel offers "📌 Not yet —
keep it on my list"; held questions stay on the active list and count as unfinished
in the focus test. Wrong answers get no control — they stay regardless. The control
also appears on the results review, which in exam mode is the only place he sees the
answers at all.

Questions he once missed and has since got right now form a **reviewed** pile on the
exam screen, re-drillable any time, so nothing is ever actually lost.

The trap: all three `misses` writers rebuilt the entry as a fresh object literal, so
`hold` would have been wiped by the next grading pass. They now spread the existing
entry — asserted directly by finishing a whole drill after setting a hold and
checking the flag is still there.

### Follow-up: regression audit (same day)
Asked whether the near-miss on `hold` warranted a wider audit. It did — testing the
instance is not testing the class. Four layers: static bank properties, dedupe,
persisted state, and every route. Three real findings, none of which the existing
suites would have caught:

1. **A two-question drill set "Best score so far" to 100%.** `recordExam` applied
   `Math.max` to every attempt regardless of size. Confirmed live before fixing:
   best went 77 → 100 off a 2-question reviewed drill. Attempts now carry a `kind`,
   and only the full 79-question run moves the best score. The banner reads "Best on
   the full exam" so the number says what it measures.
2. **Short drills evicted the graded exam from history.** One list capped at 10 —
   reachable in a single sitting now that there are four drill types. Exams and
   drills are now capped separately, and the history marks graded runs.
3. **Two prompts appear verbatim in both the exam bank and a level bank** (`r7` /
   `L6-q10`, `a10` / `L12-p5`). The misses drill is the only mode drawing on both,
   so it could serve the same question twice. Deduped on the assembled round rather
   than by retiring an ID — dropping one permanently would strand it on the "to work
   on" list forever, since a question only leaves that list by being answered.

`completeLevel` and `migrate` rebuild level entries as fresh object literals too.
No live bug (level entries have exactly the three fields they rebuild), but it is
the same latent shape as the `hold` near-miss — noted in rule 9.

The migration was verified by diffing `localStorage` field by field before and
after: one field added (`kind` on the legacy attempt), nothing changed, nothing
removed.

## Phase 13 — The TA's problem sets (Sep 14)
Four worksheets arrived from the course TA: Chapter 1 terminology, a T-account
practice problem (Boonville), a Chapter 2 comprehensive problem (Copperline Event
Productions) and a Chapter 3 problem covering deferrals, accruals and closing.

They were not hosted as PDFs — he already has those. They are worked in the browser
one step at a time at `/problems`, marked instantly, with the reason and the trap
called out. Wrong answers are diagnosed rather than merely marked: reversed debit and
credit, an entry that does not balance (quoting both totals), an account that does
not belong, or exactly which classification rows are wrong.

The material lands almost exactly on his four weak topics, which is why it was worth
building rather than filing: trial balance (his worst at 44%) is drilled twice over,
adjusting entries and principles once each.

Fourteen questions were also lifted from the TA's traps into the reinforcement bank,
so the focus test can re-serve the ideas without the whole problem. Topic drills grew
accordingly — principles 25, adjusting 27, trial 22, debits and credits 21.

Three findings from working the problems:
- **Copperline's Common Stock line is unused** and no key for it has been seen — the
  app states the fact and flags the ambiguity rather than asserting a trap.
- **Ridgeline's unearned revenue is $12,500, not the $15,000 straight-line gives.**
  The problem states what was performed, and performance governs.
- **The app already had a "Copperline Freight Co."** in the printable worksheet — a
  name clash with the TA's Copperline Event Productions, noted in course-alignment.

The data file is deliberately not trusted as its own source of truth: a node check
re-posts every journal entry into a ledger and compares the result against the stated
trial-balance totals, net income and closing figures.

### Follow-up: printable answer key (same day)
`/problems/key` prints all four problems worked in full — every entry, the reason and
the trap for each of the 49 steps. It is **generated from `problemSets.js`** rather
than retyped, so the paper key and the site can never disagree; change a figure in
one place and both follow. 7 pages under a denser `.key-page` print ruleset (10
before tightening).

Printing it surfaced a real bug in existing pages: the offline and update toasts had
no `no-print` class, so "Ready to use offline / Dismiss" was printing on the cram
sheet and the worksheet as well. Caught by grepping the extracted PDF text for
on-screen furniture — a page-count check would never have found it. Both toasts are
now `no-print`, verified across all three printable pages, and the cram sheet is
still exactly 2 pages.

### Correction, and its retraction: Copperline (same day)
Two mistakes in a row on the same line, both worth recording.

First, the app shipped asserting that Copperline never issues stock and that the
Common Stock line is a deliberate trap. That was over-confident: the handout does
leave it unused, but nothing established that as intentional.

Then, on a report that "the answer key opens with January 2 — Dr Cash $150,000 / Cr
Common Stock $150,000", a $150,000 opening entry was added and every downstream
figure recomputed. The key turned out to belong to a **different practice problem**
(Brightline), not Copperline. The entry was invented as far as this problem is
concerned, and has been removed. Cash is $345,400 again and both columns $1,451,400.

What the app now says is what can actually be supported: Common Stock has a printed
line, no transaction issues any, the columns foot without it, do not plug a figure —
and if the class key shows an amount there, the handout is missing a transaction, so
ask the TA. No Copperline key has been seen.

Two rules came out of it, both now in the docs and the verification script:
- Never add a transaction to a problem unless it appears in that problem's own
  handout or its own key. `ps-verify` asserts Copperline contains exactly the
  fourteen transactions the handout prints, and starts on January 5 where it starts.
- A trial balance that foots is not evidence that a problem is complete. Omitting a
  whole entry removes equal amounts from both columns, so internal consistency
  survives it. That was the reasoning error behind the first mistake.

The reinforcement question written during all this was rebuilt around Boonville's
Retained Earnings — a T-account that genuinely is printed and never used in a first
period — and is kept, because it is true independently of any of the above.

### BrightWave added — the Chapter 2 problem that has a key (same day)
The $150,000 stock issuance came from **BrightWave Consulting**, a second Chapter 2
worksheet, not Copperline. Both were supplied; only BrightWave has an answer key.
Copperline is back to what its own handout says.

BrightWave is now a fifth problem set, 18 steps, and every balance was checked line
by line against the TA's key: Cash $11,800, A/R $55,000, Equipment $67,000, Notes
Payable $20,000, both columns $467,000. `ps-verify` asserts the whole ledger against
the key's stated balances, so this is the one set that cannot drift from the course.

It also adds two things nothing else in the app covered:
- a **compound entry** — $45,000 of equipment for $15,000 cash plus a $30,000 note,
  one debit and two credits;
- a **printed account that stays empty** — the key states Utilities Expense is $0,
  "no transaction affects this account in this version".

That second one is the evidence the Copperline question was missing: the TA prints
accounts that might be used, not only the ones that were, and an unused line is left
blank. Copperline's Common Stock still has no key of its own, so the app states the
fact and flags the ambiguity rather than asserting a trap.

## Phase 14 — Legibility, as a rule rather than a preference (Sep 15–16)
Raised while working on the sibling supply chain app, and applied to both:
*"make sure we implement formatting rules for minimum brightness so the light text
gray isn't too light — enough contrast to really be legible."*

Worth recording because it took **two passes**, and the second one is the
interesting one.

**Pass one put a floor under the color.** Measured against `#161629`, the lightest
surface the dark chrome paints, Tailwind's `slate-500` reads **3.74:1** and
`slate-600` reads **2.35:1** — both below WCAG AA. Between them they carried 113
labels, counters, step markers and secondary links, and `slate-400` carried another
245. Every gray became one token, `dim`, and `scripts/check-contrast.mjs` now
computes the ratio for every `text-*` class in `src/` and **fails the build below
AA**, so a too-dim shade cannot ship quietly. It runs as part of `npm run build`,
which means it runs on Vercel too.

Reading computed styles in a real browser caught two things the static check cannot
see:
- **The active Problems tab was white on `emerald-600`, 3.77:1.** Now `emerald-700`.
  A ratio failure can live in a background as easily as in a text color.
- **The print toolbar on `/problems/key` overflowed a 390px screen by 62px** (the
  worksheet by 2px), which let the whole page scroll sideways. The toolbar wraps
  below 640px now, and the printable tables scroll inside their own section the way
  the cram sheet already did.

**Pass two was the one that mattered**, and it took the owner saying the pages were
*still* hard to read after everything already passed AA. The ratio was never the
whole problem: **`text-dim` was doing two different jobs.** Uppercase labels, pill
badges and counters can recede. Table cells, key-term definitions, T-account amounts
and the explanation of why an answer was wrong are the *content*, and they were being
painted in the chrome tier.

A static contrast check is structurally incapable of catching that, because every
color involved was already compliant. `text-dim` is now chrome only and brighter
with it (`#b2bfd0`, 9.5:1); 210 prose blocks moved up to `slate-300`; and the
after-answer explanation went from 12px dim to 14px `slate-200` — it had been the
smallest, faintest text in the app despite being the one sentence that teaches him
anything.

### The dropdowns
Reported in the same round: the select popups were gray-on-gray. A real bug with a
specific cause — a native option list is drawn **by the browser using the control's
own background**, and four controls carried `bg-black/40`, which composited against
the page into mush. Tailwind never touches the popup. The controls are opaque now
and `index.css` paints `select option` explicitly, which took option text from
illegible to **13.5:1** — including the Level 4, 13 and 14 drills, whose selects were
already opaque but whose popups had never been styled.

### Practice before exam
Asked in the same message: should practice mode come before exam mode? Yes — he
should learn with the answer and the reason in front of him before rehearsing
without them. Practice is now listed first **and is the default**, with exam mode one
tap away and copy saying to move there once practice is going well.

This deliberately does not touch scoring: `kind` comes from the scope, not the mode,
so a full 79-question run still records as a graded exam whichever mode it runs in,
and short drills still cannot move the best score.

## Open items

- **Chapter 4 onward** — needs slides
- Timed exam mode — deliberately deferred; the owner did not want it
- Progress export/import, as insurance against cleared browser storage
- Flashcards — deferred; the drills already do active recall

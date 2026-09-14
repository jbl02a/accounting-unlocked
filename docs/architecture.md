# Architecture

Static React SPA. No backend, no API calls, no login. Every piece of state lives in
the browser's `localStorage`, which is what makes the whole thing work offline.

```
src/
  App.jsx                    routes; every level is an explicit <Route>
  main.jsx                   entry
  index.css                  Tailwind + print styles (.cram-page, @media print)
  context/ProgressContext    ALL persisted state
  components/
    Hint.jsx                 useHints() + HintToggle / HintBar / HintPanel / hintTally
    EntryTable.jsx           renders a journal entry the way a textbook prints one
    LevelCard.jsx            LEVEL_META — titles, icons, colours, phase numbers
    Navbar.jsx               UpdatePrompt.jsx
  lib/
    shuffle.js               option permutation; the fixed-answer fix
    examSession.js           resumable in-progress exam
    focus.js                 per-topic accuracy bands + the focus-test builder
    useScrollTop.js          returns a page to the top when its phase changes
  data/
    examQuestions.js         79 exam questions + SECTIONS
    reinforceBank.js         44 extra questions for the four hardest topics
    levelBanks.js            raw MC arrays lifted out of level components
    levelQuestions.js        normalises those into exam shape with namespaced IDs
  pages/
    Home CheatSheet CramSheet Worksheet PracticeExam
    levels/Level1..Level17
```

## State model

One `localStorage` key, `accounting-unlocked-progress`:

```js
{
  levels: { 1..17: { unlocked: true, completed: bool, score: number|null } },
  exam:   { attempts: [ {score, correct, total, label, date} ], best: number|null },
  misses: { [questionId]: { wrong, right, last: 'wrong'|'right', at } },
}
```

- `unlocked` is always `true` — kept in the shape only so old saves migrate cleanly.
- `score: null` means "lesson read, practice skipped."
- `completeLevel` keeps the **best** score, so a worse retake never erases a good run.
- `misses` is the weak-area tracker, and it is append-only: entries are updated,
  never removed. A question needs work while its most recent answer was wrong **or**
  while the student has set `hold` on it.
- `hold` is the student's own verdict, deliberately independent of the grader's.
  Being right once is weak evidence of understanding, so after a correct answer he
  can tap "keep it on my list" and the question stays active until he says he has
  it. Every write must spread the existing entry or the flag is lost on the next
  answer.
- Questions with `wrong > 0`, `last === 'right'` and no hold form the **reviewed**
  pile — "used to trip you up, since fixed" — re-drillable at any time, so a question
  retired by a lucky guess is never actually gone.
- `migrate()` folds any older shape into the current one. **Extend it whenever you
  add a field.**

`misses` holds two kinds of entry. Multiple-choice questions (exam and level alike)
are keyed by question ID and can be **re-served** by the exam drill. Hands-on drill
items carry `task: true` plus a `label` and `level`; they cannot be re-served, so
they are surfaced as a review list on the home page instead. `needsWorkIds()` returns
only the re-servable kind; `tasksToReview()` returns the other.

A second key, `accounting-unlocked-exam-session`, holds an in-progress attempt
(question IDs, answers, position, mode, and the option permutation). It is cleared
on submit or quit and expires after two weeks.

## The two question banks

Exam questions and level questions share one shape so a single drill can serve
both:

```js
{ id, section, kind: 'text'|'entry', prompt, options, correctIndex, explanation, hint? }
```

`kind: 'entry'` means each option is an array of journal lines rendered by
`EntryTable` rather than a string.

Level banks were moved out of their components into `data/levelBanks.js` because
the misses drill needs to import them, and importing a component from a data
module is circular. `data/levelQuestions.js` normalises them — namespacing IDs as
`L{level}-{key}{n}`, mapping Level 11's `text` field onto `prompt`, and inferring
`kind`.

## The focus test

`lib/focus.js` answers one question: *which topics is this student actually weak
at?* It rolls `misses` up by section — every question in that section from both
banks, its running `right`/`wrong` — and bands the result: **red** under 60%,
**amber** under 80%, green above, `untested` below three answered questions so a
single unlucky answer cannot brand a topic.

That is deliberately different from the by-topic bars on the results screen, which
describe *one sitting*. The bands describe everything the student has ever answered,
so they survive across attempts and shift as he improves.

`buildFocusTest(sectionIds, misses)` then assembles a short test from the red and
amber sections only:

- about 24 questions total — 6 each across four weak topics, up to 10 when only one
  or two are weak
- **at most half** the slots in a section go to questions he has already seen and
  missed; the rest is material he has never been served, which is what the
  reinforcement bank is for
- already-correct questions come back oldest-first, so a re-test reaches for what
  has had the longest to fade
- the result is shuffled across sections so it doesn't read as four blocks

The full exam and the Quick 15 stay inside `examQuestions.js`. Single-topic drills
and the focus test use `ALL_EXAM_QUESTIONS` (both banks), which is why a topic drill
is now roughly twice the length of that topic's share of the exam.

The exam screen presents the two in a deliberate order: the misses drill first
("Start here"), the focus test below it ("Then this"). Fixing the questions he
already got wrong, with the reason attached, comes before testing the same ideas on
unseen examples — the focus test's job is to show the fix stuck. The step labels and
the cross-reference only render while both cards are on screen; once the drill list
empties, the focus test stands alone with no stale instruction pointing at it.

Both the focus test and the "questions I got wrong" drill force
`mode = 'practice'`, so the verdict, the correct option and the explanation appear
the moment an answer is picked. The Exam/Practice toggle governs the full exam, the
Quick 15 and the topic drills only — it deliberately does not apply to the two
drills, because a drill exists to correct a misunderstanding and the reason has to
arrive at the question that exposed it. `mode` is part of the saved session, so a
resumed drill keeps instant feedback.

`ALL_EXAM_QUESTIONS` is also what `loadExamSession` validates against — a focus test
interrupted halfway would otherwise be discarded on reload, because its `x`-prefixed
IDs are not in the exam bank.

## Conventions worth keeping

- **Questions are authored with `correctIndex: 0`** for readability and shuffled at
  runtime. Never render raw `q.options`.
- **Every drill reshuffles on "Try Again"** so a retake isn't a memory test.
- **Hints are opt-in and never score-affecting.** Each drill reports how many were
  used as encouragement, not penalty.
- **Levels are self-contained components.** There is deliberate structural
  repetition between them — they diverge in interaction model (drag, dropdown,
  numeric entry, matching, multi-step), and forcing a shared abstraction would
  cost more than it saves. Shared pieces are only the genuinely common ones: hints,
  entry tables, shuffling.
- Amounts are plain numbers; `money()` in `EntryTable.jsx` formats them.

## PWA

`vite-plugin-pwa` with `registerType: 'prompt'`. A new build downloads in the
background and waits; `UpdatePrompt.jsx` shows a banner offering Refresh now or
Later, so nothing swaps out mid-question. An installed app re-checks hourly.
`vercel.json` sets no-cache headers on `sw.js` and the manifest — without them a
deploy is never detected in production.

## Print

`/cram` and `/worksheet` render light-on-white on screen because their purpose is
paper. `@media print` in `index.css` hides the nav and toolbars. Verify pagination
by rendering to PDF (see `testing.md`) — the cram sheet is meant to stay at 2 pages.

## Analytics

`@vercel/analytics` is mounted once in `App.jsx`. It no-ops off Vercel, so dev and
`npm run preview` are unaffected, and it tracks client-side route changes as page views
without extra wiring.

Numbers live in the Vercel dashboard (Project → Analytics), not in the app. Counting
visitors requires a server, and this app has none; a page inside a static SPA can only
read its own device's `localStorage`, so an "analytics page" here would report one
browser and imply it was reporting a site.

Web Analytics has to be enabled once per project in the Vercel dashboard — the package
alone does not turn it on.

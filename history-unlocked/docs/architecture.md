# Architecture

Static React SPA. No backend, no login, no network calls at runtime. Everything the
student does is in `localStorage` under `history-unlocked-progress`, with an
in-progress exam under `history-unlocked-exam-session`.

```
src/
  main.jsx                    mount + PWA registration
  App.jsx                     routes
  index.css                   Tailwind layers + the print stylesheet
  context/ProgressContext.jsx all persisted state
  lib/
    shuffle.js                option permutation
    examSession.js            save/load/expire an in-progress exam
  data/
    examQuestions.js          exam bank, grouped into SECTIONS
    levelQuestions.js         every level's MC bank (see below)
  components/
    Navbar.jsx  LevelCard.jsx  SourceCard.jsx  Hint.jsx  UpdatePrompt.jsx
    drills/
      LevelShell.jsx          lesson → rounds → results spine
      QuizRound.jsx           MC with optional stimulus
      CardSort.jsx            items into buckets
      Sequence.jsx            chronological ordering
  pages/
    Home.jsx  PracticeExam.jsx  Timeline.jsx  CramSheet.jsx
    levels/Level1..6.jsx      content only
```

## State

`ProgressContext` holds one object:

- `levels[n]` — `{ completed, score }` per level.
- `exam` — `{ best, attempts[] }`.
- `misses` — the weak-area tracker, keyed by question or task ID. Two kinds of entry
  live here: multiple-choice questions, which the exam can re-serve, and `task: true`
  entries from card sorts and sequences, which can only be reported back on the home
  page because there is no way to re-serve half a sort.
- `migrate()` folds whatever is on disk into the current shape. Any new field needs a
  line there, or a returning student reads `undefined`.

`needsWorkIds()` returns re-servable MC IDs only. `tasksToReview()` returns the
`task: true` entries, which is what the home page's "go back over these" panel shows.

## Why level banks live in `data/`

`PracticeExam` re-serves missed level questions. If the banks lived in the level
components, the exam page would have to import a page component to reach them, which
is circular. `src/data/levelQuestions.js` exports `L1_QUIZ`…`L6_QUIZ` for the levels
and a flattened, tagged `LEVEL_QUESTIONS` for the exam.

## Option shuffling

Every question is authored with `correctIndex: 0` so the bank is readable.
`shuffleOptions(q)` returns a copy with a fresh permutation and the correct index
moved with it. **Anything that renders `q.options` must render a shuffled copy.**

The exam stores the permutation it used (`optionOrders`) alongside the saved answers,
so a resumed attempt shows the same layout the answers were chosen against.

## The lesson/drill spine

`LevelShell` takes `rounds` — an array of functions `done => <Drill onDone={done} />`.
It runs them in order, sums `{ correct, total }`, records the level score and shows the
result. A level file is therefore almost entirely content, which is the point.

## PWA

`vite-plugin-pwa` with `registerType: 'prompt'`. `UpdatePrompt` shows a bar when a new
service worker is waiting; the page is never swapped out mid-question. `vercel.json`
sets no-cache headers on `sw.js` so deploys are actually detected.

## Relationship to Accounting Unlocked

This directory is a sibling app living in the accounting repo for now. What
transferred: `ProgressContext`, `shuffle.js`, `examSession.js`, `Hint.jsx`,
`UpdatePrompt.jsx`, the print stylesheet, the PWA config and the shell of the practice
exam. What did not: every question, every lesson, and `EntryTable` (replaced by
`SourceCard`, since AP questions hang off sources rather than journal entries).

To lift it into its own repo: copy the `history-unlocked/` directory to the root of a
new repo — it is already self-contained, with its own `package.json`, `vercel.json`,
`.gitignore` and icons. Nothing outside the directory is referenced.

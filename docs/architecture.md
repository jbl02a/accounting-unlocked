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
  data/
    examQuestions.js         79 exam questions + SECTIONS
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
- `misses` is the weak-area tracker. A question needs work until it is answered
  correctly on its *most recent* outing — one right answer retires it.
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

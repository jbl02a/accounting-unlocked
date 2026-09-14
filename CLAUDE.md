# Accounting Unlocked

An interactive course that teaches introductory financial accounting, built for one
student: a college freshman taking his first financial accounting class. It is a
static React SPA with no backend, no login, and all state in the browser.

**Read `docs/` before making content changes.** `docs/course-alignment.md` in
particular records decisions that look arbitrary but are not — they match the
student's actual textbook and his professor's worksheets.

## Commands

```bash
npm install
npm run dev                  # vite dev server
npm run build                # production build + service worker
npm run preview -- --port N  # serve dist/ (needed for browser testing)
```

## Stack

React 18 · Vite 6 · Tailwind 3 · react-router-dom 6 · vite-plugin-pwa · deployed on Vercel from `main`.

## Non-obvious rules

These are the things most likely to be broken by accident.

1. **Never let the correct answer sit at a fixed position.** Every question is
   authored with `correctIndex: 0` for readability, and `src/lib/shuffle.js`
   permutes options at runtime. If you render `q.options` without passing the
   question through `shuffleOptions`, option A becomes the answer every time.
   This shipped as a real bug once and the student noticed.
2. **Question IDs are load-bearing.** They key the weak-area tracker in
   `ProgressContext.misses`. Exam IDs are short (`j6`, `t2`); level IDs are
   namespaced (`L6-q1`). Renaming an ID silently orphans a student's history.
3. **Level question banks live in `src/data/levelBanks.js`, not in the level
   components.** They were moved so the misses drill can re-serve them without
   importing a component (circular dependency).
4. **The exam persists its option permutation.** `src/lib/examSession.js` stores
   `optionOrders` so a resumed attempt redisplays the exact layout its saved
   answers were chosen against. Change how options shuffle and you must keep
   resume in step or answers will be misgraded.
5. **Progress is migrated, never assumed.** `ProgressContext.migrate()` folds
   whatever is on disk into the current shape. Add a field there when you add one
   to state, or returning students hit undefined.
6. **PWA updates are prompted, never forced** (`registerType: 'prompt'`), so a
   release can't swap the page out mid-question. `vercel.json` sets no-cache
   headers on `sw.js`; without them deploys aren't detected in production.
7. **Hints guide, they don't answer.** Every drill has optional per-item hints
   that stop one reasoning step short. Feedback text after answering is where the
   answer gets stated outright. Keep those two registers separate.
8. **The practice exam is 79 questions and stays 79.** Scores are compared across
   attempts, so changing its size changes what a score means. Extra practice goes
   in `src/data/reinforceBank.js` (IDs prefixed `x`), which feeds the focus test
   and the single-topic drills but never `questionsFor('full')` or `'quick'`.
   Adding questions there is safe precisely *because* the IDs are new — they
   cannot collide with anything already in a student's `misses` map.
9. **`misses` entries carry fields the grader does not own.** `hold` is set by the
   student ("I got that right but I'm not sure"), and `task`/`label`/`level` are set
   by hands-on drills. Every write in `ProgressContext` must **spread the existing
   entry** before overwriting `wrong`/`right`/`last`/`at`, or answering a question
   again silently discards them. Nothing is ever deleted from `misses`: a question
   answered correctly moves to the reviewed pile, it does not disappear.
10. **Only the full exam moves the best score.** `recordExam` takes a `kind`
    (`'exam'` for the 79-question run, `'drill'` for everything else). A drill has a
    much smaller denominator, so 100% on two questions is not a better result than
    77% on seventy-nine. Attempt history keeps the two kinds capped separately so a
    run of short drills can never evict a graded exam. `scopeKind` is part of the
    saved session — drop it from `loadExamSession` and a resumed exam is demoted to
    a drill.

## Analytics

`<Analytics />` from `@vercel/analytics/react` is mounted in `App.jsx`. It reports page
views and unique visitors to the **Vercel dashboard** — not into the app. Two things to
keep true:

- **It must stay invisible to the student.** No counters, no badges, nothing in the UI.
  This is a study tool for one person, and turning it into a monitored experience would
  change what it is.
- **Cookieless, no personal data.** Vercel counts visitors with a daily-rotating hash.
  That matters here because the users are children — do not swap in an analytics
  product that sets identifiers or profiles users.

There is deliberately **no in-app analytics page**. The app is static with per-device
`localStorage`, so a page inside it could only ever report the device it is running on —
which would look like site analytics and be nothing of the kind.

## Verifying changes

`npm run build` catches syntax only. Anything behavioural is verified by driving
the built app in a real browser — that is how the fixed-answer bug, the toast
swallowing taps, and several arithmetic slips were caught. See
`docs/testing.md` for the pattern and the Playwright invocation that works in
this container.

**Every number in a lesson must tie.** Trial balances balance, net income
reconciles, adjustments recompute. Check them in `node` before writing them into
a component.

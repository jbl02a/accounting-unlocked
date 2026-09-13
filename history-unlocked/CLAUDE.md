# History Unlocked

An interactive AP U.S. History course, built for one student: a high-school student
sitting the AP exam in May, with a test on the colonies first. Static React SPA, no
backend, no login, all state in the browser.

It is a sibling of Accounting Unlocked, not a copy of it. The spine transferred —
progress tracking, option shuffling, resumable exams, hint components, the PWA
plumbing — and all the content is new.

**Read `docs/` before making content changes.** `docs/course-alignment.md` records
which parts of the AP framework are covered and which are deliberately deferred.

## Commands

```bash
npm install
npm run dev                  # vite dev server
npm run build                # production build + service worker
npm run preview -- --port N  # serve dist/ (needed for browser testing)
```

## Stack

React 18 · Vite 6 · Tailwind 3 · react-router-dom 6 · vite-plugin-pwa.

## Non-obvious rules

These are the things most likely to be broken by accident.

1. **Never let the correct answer sit at a fixed position.** Every question is
   authored with `correctIndex: 0` for readability, and `src/lib/shuffle.js`
   permutes options at runtime. If you render `q.options` without passing the
   question through `shuffleOptions`, option A becomes the answer every time. That
   bug shipped in the accounting app and the student noticed.
2. **Question and task IDs are load-bearing.** They key the weak-area tracker in
   `ProgressContext.misses`. Exam IDs are namespaced by unit (`u1-3`, `c-2`, `s-1`);
   level IDs by level (`L4-q2` for a question, `L1-sort-s1` for a sorted card,
   `L4-seq` for an ordering task). Renaming an ID
   silently orphans the student's history.
3. **Level question banks live in `src/data/levelQuestions.js`, not in the level
   components.** The practice exam re-serves missed level questions, and importing a
   page component to get at them would be circular.
4. **The exam persists its option permutation.** `src/lib/examSession.js` stores
   `optionOrders` so a resumed attempt redisplays the exact layout its saved answers
   were chosen against. Change how options shuffle and resume must stay in step, or
   answers are misgraded. Resume validates IDs against *both* banks — a saved "what I
   got wrong" round can contain level questions.
5. **Progress is migrated, never assumed.** `ProgressContext.migrate()` folds
   whatever is on disk into the current shape. Add a field there when you add one to
   state, or a returning student hits undefined.
6. **`TOTAL_LEVELS` means levels that exist**, not the roadmap. `LEVEL_META` in
   `src/components/LevelCard.jsx` holds all 11 planned levels; bump `TOTAL_LEVELS`
   when one is actually built, or the navbar counts lessons nobody can open.
7. **PWA updates are prompted, never forced** (`registerType: 'prompt'`), so a
   release can't swap the page out mid-question. `vercel.json` sets no-cache headers
   on `sw.js`; without them deploys aren't detected in production.
8. **Hints guide, they don't answer.** Every drill takes optional per-item hints that
   stop one reasoning step short. The `why`/`explanation` text shown after answering
   is where the answer gets stated outright. Keep those two registers separate.
9. **Sources are adapted, and say so.** Stimulus excerpts are drawn from public-domain
   documents and lightly modernised; the attribution line carries "(adapted)" when the
   wording has been touched. Never invent a quotation or attach real words to the
   wrong author.

## Content rules that are about history, not code

- **Every claim has to survive a reader who knows the period.** Dates, numbers and
  causal claims get checked before they go in a component.
- **Explain difference by interest, not by national character.** "The French were
  nicer" earns nothing; "the fur trade required Native allies while English land
  hunger required Native displacement" earns the point.
- **Never flatten Native peoples into one group**, and never present them as passive.
- **Slavery hardened; it did not begin in 1619.** The law is built between roughly
  1640 and 1705.

## Verifying changes

`npm run build` catches syntax only. Anything behavioural is verified by driving the
built app in a real browser, and question banks are checked in `node`. See
`docs/testing.md` for the pattern and the Playwright invocation that works in this
container.

# Adding content

## A new question

Questions live in `src/data/examQuestions.js` (exam) or `src/data/levelQuestions.js`
(levels). The shape:

```js
{
  id: 'L4-q6',                 // unique across BOTH banks, and permanent
  skill: 'Causation',          // shown to the student; use an AP skill name
  stimulus: VA_1662,           // optional — a SourceCard prop object
  prompt: '…',
  options: ['the correct one', 'wrong', 'wrong', 'wrong'],
  correctIndex: 0,             // ALWAYS 0 — shuffling happens at runtime
  hint: '…',                   // stops one step short of the answer
  explanation: '…',            // states the answer outright, and why
}
```

Optional fields that make a question teach rather than merely test:

```js
{
  hints: ['what is being asked', 'the rule that decides it', 'the trap in the room'],
  optionWhy: ['why this is right', 'why this is tempting and wrong', '…', '…'],
  trap: 'the specific reason students miss this one',
  difficulty: 3,  // 1 = foundations, 2 = class test, 3 = reader's cut
}
```

`difficulty` is **required in practice** — an untagged question is treated as a 2. Tier
it by how the question behaves, not by how obscure the fact is:

- **1** — one concept, distractors clearly wrong. Recall or a single definition.
- **2** — analysis with plausible distractors: causation, comparison, reading a source.
- **3** — several options true and only one responsive; weaken/strengthen; evidence
  reach; LEAST/EXCEPT. Tier 3 questions should carry the full kit (three hints,
  `optionWhy` for every option, and a `trap`).

Aim for at least two tier-3 questions in a level bank, or the hardest tier has to widen
its pool and will say so on screen.

`hints` replaces the single `hint` string (which still works, as a one-step hint). The
three step labels are fixed in `Hint.jsx` — author in that order, because the whole
point is that the same procedure works every time.

`optionWhy` is **index-aligned with `options`** and is permuted along with them by
`shuffleOptions`. Write it in authored order, correct answer first.

Exam questions also carry `section` (one of `SECTIONS`). Level questions get `section`,
`icon`, `label` and `level` added automatically by `levelQuestions.js`.

Write four plausible options. A distractor nobody would pick teaches nothing; the good
ones are the errors students actually make — reversed causation, the right fact
attached to the wrong region, the oversimplified version.

### Writing a hard question

The target is the real failure mode: three options that are **true**, one that is
**responsive**. Patterns worth reusing:

- **True but unresponsive.** Every option is a fact about the period; only one answers
  the prompt. (`h-1`)
- **Weaken / strengthen.** Options that share the argument's topic but point the wrong
  way — an option about money usually props up an argument about money. (`h-2`, `h-6`)
- **Evidence reach.** Given a source, which claim does it actually support? Distractors
  overreach, compare with nothing to compare to, or claim something was the only
  option. (`h-3`)
- **Reversed pairs.** Real associations written backwards. Familiarity makes them feel
  right. (`h-4`, `h-7`)
- **LEAST / EXCEPT.** A biased source is excellent evidence — for the bias. (`h-5`)
- **Right body, wrong year.** Things the *Second* Continental Congress did, offered as
  the First. (`h-8`)

Then write the `trap` as the sentence you would say to a student who just got it
wrong — not a restatement of the answer, but the reason the wrong one appealed.

## A new stimulus

```js
const VA_1662 = {
  kind: 'excerpt',   // excerpt | secondary | image | map | data
  text: '…',         // \n splits paragraphs
  attribution: 'Virginia colonial statute, 1662 (adapted)',
}
```

Public-domain sources only. Add "(adapted)" when wording has been modernised. Never
invent a quotation.

## A new level

1. Add or confirm its entry in `LEVEL_META` (`src/components/LevelCard.jsx`).
2. Put its MC bank in `src/data/levelQuestions.js`, exported as `L<N>_QUIZ`, and add it
   to `BY_LEVEL` and `LEVEL_META` at the bottom of that file.
3. Write `src/pages/levels/Level<N>.jsx`: the sort/sequence data, a `meta` object, a
   `lesson` element, and a `LevelShell` with its `rounds`.
4. Route it in `src/App.jsx`, add it to `BUILT` and a phase in `src/pages/Home.jsx`.
5. Bump `TOTAL_LEVELS` in `src/context/ProgressContext.jsx`.
6. Build, then drive it in a browser (see `testing.md`).

## Drill props

```jsx
<CardSort items={ITEMS} buckets={BUCKETS} level={4} taskPrefix="L4-sort"
          title="…" instruction="…" onDone={done} />
```
`items`: `{ id, label, correct: <bucket id>, hint, why }`. Task IDs become
`${taskPrefix}-${item.id}` — permanent, like question IDs.

```jsx
<Sequence events={EVENTS} level={4} taskId="L4-seq" title="…" instruction="…" hint="…" onDone={done} />
```
`events`: `{ id, year, label, why }`. Order is computed from `year`; don't pre-sort,
and keep years unique.

```jsx
<QuizRound questions={L4_QUIZ} title="…" onDone={done} />
```

Every drill calls back with `{ correct, total }`, which `LevelShell` sums.

## Hints vs explanations

A hint points at the reasoning step — *"ask what each empire wanted out of the land"*.
An explanation states the answer and why it is the answer. Keeping those registers
separate is what makes hints usable without giving the game away.

## Tailwind

Only literal class names are scanned. `` `bg-${accent}-500` `` silently produces no
CSS. Write the classes out.

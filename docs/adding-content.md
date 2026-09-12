# Adding content

The most likely next task is **"Chapter 4 slides are available, add them."** This is
the playbook.

## When new slides arrive

1. **Read them before writing anything.** They live in the owner's Google Drive
   under `Griffin's Classes/Accounting` — slide decks plus assigned in-class
   problems. The problems matter more than the slides: they show the exact format,
   wording and difficulty he is graded on.
2. **Cross-check before extending.** Every time this has been done it has turned up
   something already in the app that contradicts the course. Check specifically:
   - terminology (account names, which mnemonic, which grouping)
   - anything the app teaches that the course hasn't reached yet
   - worksheet layout and ordering conventions
   Record anything found in `course-alignment.md`.
3. **Write parallel problems, not copies.** Same structure and wording style as her
   assigned problem, different company and figures.
4. **Prove the arithmetic in `node` first.** See `testing.md`.

## Adding a level

1. `src/pages/levels/LevelN.jsx` — copy the closest existing level for its
   interaction model rather than starting blank:
   - multiple choice → Level 6
   - multi-step with numeric entry → Level 13 or 15
   - build-an-entry with dropdowns → Level 4 / 14
   - sorting into categories → Level 2 / 17
   - a capstone with several rounds → Level 10
2. Structure: `phase === 'learn'` lesson → practice → results. Include the
   **"Skip the practice — mark this lesson read"** button; practice is optional by
   design.
3. Wire it up in four places:
   - `src/App.jsx` — a `<Route>`
   - `src/components/LevelCard.jsx` — `LEVEL_META` entry with title, icon, colour, phase
   - `src/pages/Home.jsx` — add the number to a phase's `levels` array
   - `src/context/ProgressContext.jsx` — bump `TOTAL_LEVELS`
4. Add per-item **hints** (`useHints` + `HintBar` or `HintToggle`). They explain the
   reasoning and stop one step short of the answer; the post-answer feedback is
   where the answer is stated.
5. If the level has multiple-choice questions, put the bank in
   `src/data/levelBanks.js`, normalise it in `levelQuestions.js`, and call
   `recordQuizResult(q.id, correct)` when each answer is given — that is what feeds
   the weak-area drill.

## Adding exam questions

Append to `src/data/examQuestions.js`:

```js
{
  id: 'x1',                    // unique across BOTH banks; short for exam questions
  section: 'adjusting',        // must exist in SECTIONS
  kind: 'text',                // or 'entry' for journal-entry options
  prompt: '…',
  options: ['correct answer first', 'distractor', 'distractor', 'distractor'],
  correctIndex: 0,             // author at 0; runtime shuffles
  explanation: '…',            // say WHY, and name the trap in the distractors
}
```

A new topic needs an entry in `SECTIONS` (id, label, icon, blurb) — it then appears
automatically as a drillable topic on the exam screen.

Then sanity-check:

```bash
node -e "import('./src/data/examQuestions.js').then(m=>{
  const ids=m.QUESTIONS.map(q=>q.id);
  console.log('total',m.QUESTIONS.length,'dupes',ids.length!==new Set(ids).size,
    'bad',m.QUESTIONS.filter(q=>!q.options[q.correctIndex]).length);
})"
```

## Writing explanations

The ones that work name the *reason* and the *consequence*, not just the rule. The
student pushed back on "dividends are not an expense" precisely because it asserted
a rule without a reason. The rewrite explains that an expense is a cost incurred to
generate revenue, that a dividend buys the business nothing, that both entries
balance so a trial balance can't catch it, and that what actually breaks is net
income. Aim for that.

Name the trap explicitly where a distractor is a common mistake.

## Also update when content changes

- `docs/curriculum.md` — the level table and the chapter coverage table
- `src/pages/CheatSheet.jsx` — reference entries
- `src/pages/CramSheet.jsx` — only if it is genuinely exam-critical; this page
  earns its value by being short, and it must stay at 2 printed pages

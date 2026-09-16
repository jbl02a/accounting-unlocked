# Documentation

Written so a session with no memory of this project can pick it up and add the
next chapter without re-deriving decisions or re-discovering traps.

| Document | What it covers |
|---|---|
| [`course-alignment.md`](course-alignment.md) | The student's actual textbook and professor, and every place the app was changed to match them. **Read before writing content.** |
| [`curriculum.md`](curriculum.md) | The 17 levels, what each teaches, and how they map to the course chapters. |
| [`architecture.md`](architecture.md) | How the code is laid out, the shared modules, and the state model. |
| [`adding-content.md`](adding-content.md) | Step-by-step playbook for adding a level, exam questions, or a new chapter. |
| [`testing.md`](testing.md) | How changes are verified, and the bugs that got through when they weren't. |
| [`phase-log.md`](phase-log.md) | What was built, in order, and why. |

## Scope of these docs

Everything here is about **this** app — the accounting course. A sibling project,
History Unlocked, was prototyped in this repository for a few days and now lives in its
own (`jbl02a/history-unlocked`). The two share no code: the pieces that transferred
(`shuffle.js`, `examSession.js`, `Hint.jsx`, `ProgressContext`, the print stylesheet)
were copied, not imported, and have since diverged. Nothing in this repository depends
on it, and nothing here needs to be kept in step with it.

## The project in one paragraph

A single student — a college freshman — was about to take his first financial
accounting exam. The app started as five levels covering the accounting equation
through reading a balance sheet, then grew to 17 levels plus a 79-question
practice exam after his professor's Chapter 1–3 slides and assigned problems were
read and cross-checked against it. It is deliberately aligned to *his* course:
the corporate form, his professor's mnemonic, her grouping of the principles, her
worksheet layout. Generic accounting content would be less useful to him.

## Current state

- **17 levels** across 5 phases, all unlocked and playable in any order
- **79 exam questions** across 8 drillable topics, plus **58** reinforcement
  questions on the four hardest topics and **38** multiple-choice questions inside
  the levels — all feeding one weak-area tracker
- A **focus test** that reads that tracker and serves only the topics the student
  is scoring under 80% on, mostly with examples he has not seen
- **5 of the TA's problem sets**, 67 steps, worked in the browser at `/problems`
  and re-derived in `node` rather than trusted as their own source of truth
- **Printable** cram sheet, full-cycle practice problem, and an answer key
  generated from the problem data so paper and site cannot disagree
- An enforced **contrast floor** — `npm run contrast` fails the build on any text
  color below WCAG AA
- **Installable PWA**, works fully offline, prompts before applying updates
- Covers **Chapters 1–3**. Chapter 4 onward is not yet written.

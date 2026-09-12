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
- **79 exam questions** across 8 drillable topics, plus **38** multiple-choice
  questions inside the levels — all feeding one weak-area tracker
- **Printable** cram sheet and full-cycle practice problem with answer key
- **Installable PWA**, works fully offline, prompts before applying updates
- Covers **Chapters 1–3**. Chapter 4 onward is not yet written.

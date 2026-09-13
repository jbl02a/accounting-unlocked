# Docs

Background for anyone — human or a fresh Claude session — picking this project up.

| File | Read it when |
|---|---|
| `course-alignment.md` | **Read first.** What the course covers, what it defers, and the history decisions that look arbitrary but are not. |
| `curriculum.md` | The level-by-level plan, including levels not yet built. |
| `architecture.md` | How the app is put together, and what state lives where. |
| `adding-content.md` | Writing a new level, drill or question without breaking the trackers. |
| `testing.md` | How changes are verified, and the bugs that got through before. |
| `phase-log.md` | What was built when, and what is next. |
| `forking.md` | Moving this directory into its own repository and deploying it. |

## One-paragraph orientation

Static React SPA. Every level is a lesson you can skip followed by one or more
drills; every drill reports results into `ProgressContext`, which keeps a `misses`
map keyed by question or task ID. The practice exam can re-serve anything in that map,
so IDs are effectively a database schema. The app is a sibling of Accounting Unlocked
(prototyped in the same repo; see `forking.md`) and shares its spine but none of its content.

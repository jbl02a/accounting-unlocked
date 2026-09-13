# Phase log

## Phase 1 — the app and Periods 1–2 (this build)

Built from scratch alongside Accounting Unlocked, reusing that project's spine and none
of its content.

**Shared spine, lifted and adapted**
`ProgressContext` (new storage key, `TOTAL_LEVELS`), `shuffle.js`, `examSession.js`,
`Hint.jsx`, `UpdatePrompt.jsx`, the print stylesheet, the PWA config, and the shell of
the practice exam.

**Written for this app**
- `SourceCard` — the stimulus component AP questions hang off, replacing the accounting
  app's `EntryTable`.
- Four drills: `LevelShell`, `QuizRound` (MC with optional stimulus), `CardSort`,
  `Sequence`.
- 34 exam questions across four sections (Unit 1, Unit 2, comparison/causation,
  sourcing), 16 of them stimulus-based.
- Levels 1–6 with 26 level questions, six card sorts and two chronologies.
- `Timeline` — 25 entries from 1491 to 1754, filterable by era, each with a "why it
  matters" line.
- `CramSheet` — Periods 1–2 condensed onto three printable pages.
- Branding: amber/parchment palette, classical-column icons, "History Unlocked" PWA
  manifest.

**Verified**
- `npm run build` clean.
- Node checks: 60 questions, no duplicate IDs, none malformed, answer position after
  shuffling 25.1 / 25.0 / 25.0 / 25.0, no answer-text mismatches, every sort bucket and
  sequence year consistent.
- Browser walk: all six levels reached their results screen through every round; a
  run that always picks option A scored between 11% and 54%, never 100%.
- No horizontal overflow at 390px; cram sheet prints to three pages; the only failing
  network request is the Google Fonts stylesheet, which this sandbox blocks.

**Fixed along the way**
Resuming a saved exam validated IDs against the exam bank only, so a saved "questions I
got wrong" round containing level questions would have been silently truncated on
resume. Both banks are now checked. The same defect existed in Accounting Unlocked and
was fixed there in the same commit.

## Phase 2 — Empire and war, for the next test

Built immediately after Phase 1, out of curriculum order, because the next class test
is on the French and Indian War, the Seven Years' War and salutary neglect.

- **Level 7 · The Atlantic World** — mercantilism, the Navigation Acts, the triangular
  trades, the Dominion of New England, salutary neglect. The card sort deliberately has
  real entries in both the "helped" and "hurt" columns.
- **Level 8 · The French & Indian War** — the two names for one war, the Ohio valley,
  the Albany Plan, Native nations acting on their own interests, the Treaty of Paris,
  Pontiac's War, the Proclamation Line, and the debt that ends neglect.
- **10 new exam questions** in a new section, *Empire & War · 1650–1763*, including a
  debt table and the Proclamation of 1763 as stimuli.
- Timeline extended to 1765 with a fourth era filter; cram sheet gained sections on the
  imperial system and the war, plus the extra dates, terms and traps.
- The roadmap renumbered: slavery, colonial minds, the capstone and sourcing moved to
  levels 9–12. Nothing was shipped at those numbers, so no student history was orphaned.
- `scripts/fork-to-own-repo.sh` and `docs/forking.md` added, since repository creation
  is blocked for the integration in use.

**Fixed along the way:** the cram sheet overflowed horizontally at 390px once the new
tables went in — each section now scrolls its own table on screen, with tighter padding
on narrow viewports. Print rules were tightened too, bringing the sheet from six pages
back to four.

**Verified:** 84 questions across both banks, no duplicate IDs, none malformed, answer
position after shuffling 25.0 / 25.0 / 25.1 / 25.0; all eight levels driven through
every round in a browser with an always-A run scoring 22–54%; no console errors beyond
the sandbox's blocked Google Fonts request; no horizontal overflow at 390px.

## Phase 3 — The road to independence

Her test turned out to run through 1776 and the Stamp Act, so this went in next. She
had not met the phrase "imperial crisis", so it is not used as a label anywhere: the
levels describe what it was instead.

- **Level 9 · No Taxation Without Representation (1763–1770)** — Sugar through the
  Boston Massacre, organised around the cycle that runs twice: tax → petition → boycott
  → merchant pressure → repeal conceding nothing. The card sort puts Britain's
  constitutional case beside the colonists', because both were serious arguments.
- **Level 10 · From Protest to Independence (1770–1776)** — committees of
  correspondence, Tea Act, Coercive Acts, First Continental Congress, Lexington,
  the Olive Branch Petition, Dunmore's Proclamation, Common Sense, the Declaration.
- **12 new exam questions** in a new section, *Road to Independence · 1763–1776*, with
  Dickinson, the Declaration and Resolves and the Declaration of Independence as
  stimuli. A described (not reproduced) Revere engraving carries the propaganda
  question in Level 9.
- Timeline extended to 1776 with a fifth era filter; cram sheet gained an act-by-act
  table and a two-column summary of the constitutional argument.
- Roadmap renumbered again: slavery, colonial minds, capstone and sourcing are now
  levels 11–14. Nothing had shipped at those numbers.

**Verified:** 111 questions across both banks, no duplicate IDs, none malformed, answer
position after shuffling 25.0 / 25.0 / 24.9 / 25.1; all ten levels driven through every
round in a browser with always-A runs scoring 11–46%; no console errors; no horizontal
overflow at 390px on any page; cram sheet prints to five pages.

**Caught in review:** a lesson heading claimed the tax-protest-repeal cycle "repeated
three times" while the text beneath it described two. Fixed.

## Next

1. Levels 11–12 — slavery in British North America, colonial minds.
2. Levels 13–14 — the colonial capstone and HIPP sourcing.
3. The war itself (1776–1783) and the Articles of Confederation.
4. Lift `history-unlocked/` into its own repository and deploy it — see
   `docs/forking.md`; the only blocked step is creating the empty repo.
5. Then Units 4–9, and DBQ/LEQ practice with rubric feedback.

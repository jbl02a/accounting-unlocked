# Course alignment

Read this before changing content. The decisions below look arbitrary and are not.

## Who this is for

A high-school student taking AP U.S. History, sitting the national exam in May. The
build order follows her class tests rather than a proportional sweep of all nine
units: Periods 1 and 2 first, then the French and Indian War, salutary neglect and the
road to independence through 1776, which is what her next test covers.

## Difficulty is deliberate

Her teacher reads and scores AP essays and has said plainly that his aim is the May
exam and readiness for college, so his own tests are harder than students expect —
they feel prepared and then do badly. That is the design target for this app, and the
reason for three specific features:

- **Questions are written so several options are true.** The skill being tested is
  responsiveness to the prompt, not recall. See the "Writing a hard question" section
  of `adding-content.md` for the patterns.
- **Hard mode** (`hard: true`, its own exam scope) collects the most demanding
  questions in one place.
- **Staged hints** replace the single nudge. Three fixed steps — what is being asked,
  the rule that decides it, the trap in the room — so the same procedure becomes
  automatic. They never state the answer.
- **Every option is explained after answering**, not just the right one, plus a `trap`
  note naming why students pick the wrong one. Learning why a tempting answer is
  tempting is the thing that transfers to the next question.

## What the AP exam actually rewards

The course is built around this, not around recall:

- **Stimulus-based multiple choice.** Nearly every MCQ hangs off a source. The
  question tests reasoning *about* the source — context, causation, comparison,
  continuity — not whether you can find a phrase in it. Questions here follow that
  pattern deliberately, because recognising what is being asked is half the skill.
- **The reasoning skills are named.** Causation, comparison, continuity and change,
  contextualization, developments and processes, analyzing sources. Every question
  carries its skill in a `skill` field, and it is shown to the student, so the
  category becomes familiar before the exam.
- **Sourcing (HIPP)** — historical situation, intended audience, purpose, point of
  view — is where DBQ points are won and lost. It gets its own level (11) and its own
  exam section rather than being folded into content questions.

## Period coverage

| Period | Years | Status |
|---|---|---|
| 1 | 1491–1607 | Built — Levels 1–3 |
| 2 | 1607–1754 | Built — Levels 4–7; Levels 9–10 planned |
| 3 | 1754–1800 | Built to 1776 — Levels 8–10; the war itself and the 1780s not yet built |
| 4–9 | 1800–present | Not started |

Levels 9–12 (slavery, colonial minds, a capstone, and the sourcing skill) are specified
in `curriculum.md` and appear on the home page as a roadmap.

## Content decisions that are deliberate

- **Slavery "hardened", it did not begin in 1619.** The first Africans landed at Point
  Comfort into a colony whose law had not yet defined slavery; some early arrivals
  gained freedom and property. The legal institution is built between roughly 1640 and
  1705 (Virginia 1662 on hereditary status, the 1705 slave codes). The app says this
  explicitly in Level 4 because the compressed version is a common student error.
- **1619 is taught as two things in one year** — the House of Burgesses and the first
  Africans — because the juxtaposition is worth an essay sentence.
- **Difference between empires is explained by interest, never character.** Furs
  required Native allies; land required Native displacement. "The French were nicer"
  is treated as a wrong answer everywhere in the app.
- **Native peoples are never a single group and never passive.** Level 1 is built
  entirely around environmental diversity, and Level 2 asks directly about agency
  after contact.
- **Horses are post-contact.** The mounted Plains hunter appears because the Spanish
  brought horses. This is flagged as a trap in Level 1 and again in Level 2.
- **Slavery existed in all thirteen colonies.** Level 6 makes the point about scale and
  role rather than presence, because "the North had no slavery" is the single most
  common regional error.
- **Four colonial regions, not two.** New England and the Chesapeake dominate most
  revision; the Middle Colonies and Lower South are where strong comparison answers
  come from, so they get a level of their own.
- **"French and Indian War" means the war against the French *and* their Native
  allies** — not a war between the French and Native nations. Level 8 says this
  explicitly, because the name misleads almost everyone once.
- **The war did not cause the Revolution by itself.** It produced the debt and removed
  the French threat; Parliament's decisions turned that into a crisis. The app always
  asks for the chain, never the leap.
- **The colonial objection to taxation was constitutional, not financial.** Colonists
  paid far less tax than Britons. Any answer resting on "the taxes were too high" is
  treated as wrong.
- **Mercantilism is argued both ways.** Level 7's card sort has genuine entries in both
  columns, because "it helped and it hurt, and here is the weighing" is the answer that
  earns complexity.
- **"The imperial crisis" is not used as a label to memorise.** The student had not met
  the phrase, and it explains nothing on its own. The levels describe what it was: a
  twelve-year argument over who had the right to tax and govern the colonies.
- **Independence was not the goal until very late.** 1774 is a petition; even after
  Lexington, Congress petitioned the King. The app treats reading 1776 backwards into
  the 1760s as the signature error of this unit.
- **Colonists did not want seats in Parliament.** They wanted their own assemblies
  recognised as the only bodies that could tax them.
- **The Revolution was never unanimous.** Loyalists at perhaps 15–20%, many neutrals,
  most Native nations with Britain, and enslaved people with whoever offered freedom.
- **"All men are created equal" is taught with both halves**: who it excluded, and how
  quickly the excluded turned the sentence back on the republic.
- **The Great Awakening is religious, with political consequences.** Not a political
  movement. The distinction is worth a point.

## Sources

Stimulus excerpts are public-domain documents — Las Casas, the Requerimiento, the
Mayflower Compact, Winthrop, Bacon's Declaration, Virginia statutes, Penn's Frame of
Government, Edwards, Equiano, the Hutchinson trial record, the Navigation Acts, the
Albany Plan, Burke on salutary neglect, the Proclamation of 1763 — lightly modernised
for readability. Where wording has been touched, the attribution says "(adapted)".

Two stimuli are not quotations at all: a table of debt figures, and a summary of the
British ministry's case for taxing the colonies. Both are labelled as composed for this
course, because a paraphrase presented as a quotation is a fabrication however accurate
its content.

Rules: never invent a quotation, never attach real words to the wrong author, never
present a modern paraphrase as a verbatim quote. A source that cannot be attributed
honestly does not go in.

## Deliberately deferred

- **DBQ and LEQ writing practice with rubric scoring.** Planned after Period 2 content
  is complete; it needs a different interaction than the drills here.
- **Periods 3–9.** Being built in exam order of usefulness, not chronology, once the
  colonial test is past.
- **Timed exam mode.** Not requested, and easy to add later.

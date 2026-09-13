// Three difficulty tiers, chosen by the student and remembered between sessions.
//
// A tier changes two things at once, and both matter:
//   1. WHICH questions are served — every question carries `difficulty` 1–3.
//   2. WHAT SUPPORT is available — hints, and whether feedback comes after each
//      question or is held until the end.
//
// Holding feedback is the part that makes the top tier feel like a real test: you
// cannot course-correct question by question, so you find out at the end whether
// you actually knew it. That is precisely the surprise this course exists to
// remove before it happens in a classroom.
export const TIERS = [
  {
    id: 'core',
    level: 1,
    label: 'Foundations',
    icon: '🌱',
    blurb: 'Learn it before you are tested on it.',
    detail: 'Straightforward and mid-level questions, hints available, and the answer explained the moment you commit.',
    pools: [[1, 2], [1, 2, 3]],
    hints: true,
    instantFeedback: true,
  },
  {
    id: 'test',
    level: 2,
    label: 'Class test',
    icon: '📝',
    blurb: 'The level the tests are actually written at.',
    detail: 'No gimmes — analysis and comparison questions with plausible wrong answers. Hints still available.',
    pools: [[2, 3], [1, 2, 3]],
    hints: true,
    instantFeedback: true,
  },
  {
    id: 'ap',
    level: 3,
    label: "Reader's cut",
    icon: '🔥',
    blurb: 'Hints off. Feedback held to the end.',
    detail: 'The hardest questions in the bank — three true options and one that answers what was asked. You find out how you did when you are finished, not before.',
    // Widens to tier 2 before it gives up, so the hardest setting on a small level
    // bank still skips the gimmes rather than falling straight back to everything.
    pools: [[3], [3, 2], [1, 2, 3]],
    hints: false,
    instantFeedback: false,
  },
]

export const DEFAULT_TIER = 'test'

export function tierById(id) {
  return TIERS.find(t => t.id === id) || TIERS.find(t => t.id === DEFAULT_TIER)
}

// Filter a bank to a tier. Level banks are small — a level may hold only one or two
// questions at the hardest tier — so each tier declares successively wider pools and
// we take the first that yields enough to practise with. Widening is graded on
// purpose: the hardest setting reaches down to mid-level questions before it gives
// up and serves everything, so it never silently hands back the easy ones.
export const MIN_SERVED = 3

export function tierSelection(questions, tierId) {
  const tier = tierById(tierId)
  const target = Math.min(MIN_SERVED, questions.length)
  for (let i = 0; i < tier.pools.length; i++) {
    const picked = questions.filter(q => tier.pools[i].includes(q.difficulty || 2))
    if (picked.length >= target) {
      return { questions: picked, relaxed: i > 0, poolUsed: tier.pools[i] }
    }
  }
  return { questions, relaxed: true, poolUsed: [1, 2, 3] }
}

export function selectByTier(questions, tierId) {
  return tierSelection(questions, tierId).questions
}

// True when the filter had to widen, so the UI can say so rather than quietly
// serving easier questions than the student asked for.
export function tierWasRelaxed(questions, tierId) {
  return tierSelection(questions, tierId).relaxed
}

// What the widening actually did, for an honest one-line note in the UI.
export function relaxNote(questions, tierId) {
  const { relaxed, poolUsed } = tierSelection(questions, tierId)
  if (!relaxed) return null
  if (poolUsed.length === 3) return 'this level is small, so every question is in play'
  return 'not enough at this level yet, so mid-level questions are mixed in'
}

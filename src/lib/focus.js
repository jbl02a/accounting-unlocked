// Working out which topics a student is actually weak at, and building a short
// test aimed only at those.
//
// The signal is ProgressContext.misses — every question the student has ever
// answered, with a running right/wrong count. Rolling that up by section gives
// the same red/amber/green picture the results screen shows, except it survives
// across attempts instead of describing one sitting.
import { QUESTIONS, SECTIONS, shuffle } from '../data/examQuestions.js'
import { REINFORCE } from '../data/reinforceBank.js'

// The focus test and the topic drills draw on both banks. The 79-question
// practice exam deliberately does not — see the header of reinforceBank.js.
export const ALL_EXAM_QUESTIONS = [...QUESTIONS, ...REINFORCE]

// Below this many answered questions a section's percentage is noise, not a signal.
const MIN_ANSWERED = 3
const RED = 60
const AMBER = 80

export function questionsForTopic(sectionId) {
  return ALL_EXAM_QUESTIONS.filter(q => q.section === sectionId)
}

// One row per exam section: how many of its questions have been answered, how
// many went right, and which band that puts it in.
export function sectionStats(misses = {}) {
  return SECTIONS.map(sec => {
    const qs = questionsForTopic(sec.id)
    let right = 0
    let wrong = 0
    for (const q of qs) {
      const entry = misses[q.id]
      if (!entry) continue
      right += entry.right || 0
      wrong += entry.wrong || 0
    }
    const answered = right + wrong
    const pct = answered ? Math.round((right / answered) * 100) : null
    const band =
      answered < MIN_ANSWERED ? 'untested'
        : pct < RED ? 'red'
        : pct < AMBER ? 'amber'
        : 'green'
    return { ...sec, right, wrong, answered, pct, band, pool: qs.length }
  })
}

// The red and amber sections, worst first — the ones a focus test should cover.
export function weakSections(misses = {}) {
  return sectionStats(misses)
    .filter(s => s.band === 'red' || s.band === 'amber')
    .sort((a, b) => a.pct - b.pct)
}

// Which questions to serve for one section. A focus test is meant to be mostly
// material the student has not seen — "not all the exact same examples" — with
// enough of what he actually got wrong to know whether it has stuck.
export function pickForSection(sectionId, misses = {}, count) {
  const pool = questionsForTopic(sectionId)
  const stateOf = q => {
    const entry = misses[q.id]
    if (!entry) return 'fresh'
    // A held question counts as unfinished business even though the last answer
    // was right — that is the whole point of the student holding it.
    return entry.last === 'wrong' || entry.hold ? 'wrong' : 'known'
  }
  const wrong = shuffle(pool.filter(q => stateOf(q) === 'wrong'))
  const fresh = shuffle(pool.filter(q => stateOf(q) === 'fresh'))
  // Anything already answered correctly comes back oldest-first, so a re-test
  // reaches for what has had the longest to fade.
  const known = shuffle(pool.filter(q => stateOf(q) === 'known'))
    .sort((a, b) => String(misses[a.id]?.at || '').localeCompare(String(misses[b.id]?.at || '')))

  // At most half the slots go to questions he has already seen and missed;
  // the rest is new material.
  const missQuota = Math.min(wrong.length, Math.floor(count / 2))
  const picked = wrong.slice(0, missQuota)
  for (const q of [...fresh, ...wrong.slice(missQuota), ...known]) {
    if (picked.length >= count) break
    picked.push(q)
  }
  return picked
}

export const FOCUS_TARGET = 24
const MIN_PER_SECTION = 5
const MAX_PER_SECTION = 10

export function focusSize(sectionCount) {
  if (sectionCount < 1) return 0
  return Math.min(MAX_PER_SECTION, Math.max(MIN_PER_SECTION, Math.ceil(FOCUS_TARGET / sectionCount)))
}

// A short test covering only the given sections, shuffled so it does not read
// as four blocks of one topic.
export function buildFocusTest(sectionIds, misses = {}) {
  const per = focusSize(sectionIds.length)
  const picked = sectionIds.flatMap(id => pickForSection(id, misses, per))
  return shuffle(picked)
}

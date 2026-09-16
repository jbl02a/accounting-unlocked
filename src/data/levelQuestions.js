import { L6_QUESTIONS, L10_JOURNAL, L10_ANALYSIS, L11_SCENARIOS, L12_PERIOD, L14_EFFECTS } from './levelBanks.js'

// The level quizzes are normalized into the same shape the practice exam uses, so a
// question missed inside a level can be re-served by the weak-area drill. IDs are
// namespaced by level so they can never collide with the exam bank.
const SOURCES = [
  { level: 6,  key: 'q', label: 'Receivables vs. Payables',   icon: '📥', bank: L6_QUESTIONS },
  { level: 10, key: 'j', label: 'Full Cycle — journalizing',  icon: '🏆', bank: L10_JOURNAL },
  { level: 10, key: 'a', label: 'Full Cycle — analysis',      icon: '🏆', bank: L10_ANALYSIS },
  { level: 11, key: 's', label: 'Assumptions & Principles',   icon: '📜', bank: L11_SCENARIOS },
  { level: 12, key: 'p', label: 'Accrual Accounting',         icon: '📘', bank: L12_PERIOD },
  { level: 14, key: 'e', label: 'Accruals — effects',         icon: '⏳', bank: L14_EFFECTS },
]

function normalize(src) {
  return src.bank.map((q, i) => ({
    ...q,
    id: `L${src.level}-${src.key}${i + 1}`,
    level: src.level,
    section: `level-${src.level}`,
    sectionLabel: `Level ${src.level} · ${src.label}`,
    icon: src.icon,
    // Level 11 calls its prompt `text`; everything else uses `prompt`.
    prompt: q.prompt || q.text,
    kind: q.kind || (Array.isArray(q.options?.[0]) ? 'entry' : 'text'),
  }))
}

export const L6_QUIZ = normalize(SOURCES[0])
export const L10_JOURNAL_QUIZ = normalize(SOURCES[1])
export const L10_ANALYSIS_QUIZ = normalize(SOURCES[2])
export const L11_SCENARIO_QUIZ = normalize(SOURCES[3])
export const L12_PERIOD_QUIZ = normalize(SOURCES[4])
export const L14_EFFECTS_QUIZ = normalize(SOURCES[5])

export const LEVEL_QUESTIONS = [
  ...L6_QUIZ, ...L10_JOURNAL_QUIZ, ...L10_ANALYSIS_QUIZ,
  ...L11_SCENARIO_QUIZ, ...L12_PERIOD_QUIZ, ...L14_EFFECTS_QUIZ,
]

export const LEVEL_SECTIONS = SOURCES.map(s => ({
  id: `level-${s.level}`,
  label: `Level ${s.level}`,
  icon: s.icon,
})).filter((s, i, arr) => arr.findIndex(x => x.id === s.id) === i)

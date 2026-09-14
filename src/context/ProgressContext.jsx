import { createContext, useContext, useState, useEffect } from 'react'

const ProgressContext = createContext(null)

export const TOTAL_LEVELS = 17
const STORAGE_KEY = 'accounting-unlocked-progress'

function buildDefault() {
  const levels = {}
  for (let i = 1; i <= TOTAL_LEVELS; i++) {
    // Every level is unlocked. Practice is encouraged, never required.
    levels[i] = { unlocked: true, completed: false, score: null }
  }
  return { levels, exam: { attempts: [], best: null }, misses: {} }
}

// Older saves only knew about levels 1-5 and had no exam record, so fold whatever
// is on disk into the current shape instead of throwing the student's work away.
function migrate(saved) {
  const base = buildDefault()
  if (!saved || typeof saved !== 'object') return base
  const levels = { ...base.levels }
  for (const [num, data] of Object.entries(saved.levels || {})) {
    if (!levels[num]) continue
    levels[num] = {
      unlocked: true,
      completed: Boolean(data?.completed),
      score: typeof data?.score === 'number' ? data.score : null,
    }
  }
  const attempts = Array.isArray(saved.exam?.attempts) ? saved.exam.attempts : []
  const best = typeof saved.exam?.best === 'number' ? saved.exam.best : null
  const misses = saved.misses && typeof saved.misses === 'object' ? saved.misses : {}
  return { levels, exam: { attempts, best }, misses }
}

export function ProgressProvider({ children }) {
  const [progress, setProgress] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return migrate(saved ? JSON.parse(saved) : null)
    } catch {
      return buildDefault()
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
    } catch {
      /* private browsing / storage disabled — progress just won't persist */
    }
  }, [progress])

  // score === null means "lesson read, practice skipped" — it never wipes out a real score.
  function completeLevel(levelNum, score = null) {
    setProgress(prev => {
      const current = prev.levels[levelNum] || { completed: false, score: null }
      const bestScore =
        score === null ? current.score
          : current.score === null ? score
          : Math.max(current.score, score)
      return {
        ...prev,
        levels: {
          ...prev.levels,
          [levelNum]: { unlocked: true, completed: true, score: bestScore },
        },
      }
    })
  }

  // `results` is [{ id, correct }] for every question in the attempt. Keeping the
  // per-question outcome is what makes a "drill only what I got wrong" mode possible;
  // a score alone cannot be turned back into a study list.
  function recordExam({ score, correct, total, label, results = [] }) {
    setProgress(prev => {
      const attempt = { score, correct, total, label, date: new Date().toISOString() }
      const attempts = [attempt, ...(prev.exam?.attempts || [])].slice(0, 10)
      const best = Math.max(score, prev.exam?.best ?? 0)
      const misses = { ...(prev.misses || {}) }
      const now = new Date().toISOString()
      for (const r of results) {
        if (!r || !r.id) continue
        const entry = misses[r.id] || { wrong: 0, right: 0 }
        // Spread the existing entry: `hold` is set by the student, not by grading,
        // and rebuilding the object from scratch would silently discard it.
        misses[r.id] = {
          ...entry,
          wrong: entry.wrong + (r.correct ? 0 : 1),
          right: entry.right + (r.correct ? 1 : 0),
          last: r.correct ? 'right' : 'wrong',
          at: now,
        }
      }
      return { ...prev, exam: { attempts, best }, misses }
    })
  }

  // Level quizzes call this per question as they are answered, so a question missed
  // inside a level is tracked exactly like one missed on the exam.
  function recordQuizResult(id, correct) {
    if (!id) return
    setProgress(prev => {
      const misses = { ...(prev.misses || {}) }
      const entry = misses[id] || { wrong: 0, right: 0 }
      misses[id] = {
        ...entry,
        wrong: entry.wrong + (correct ? 0 : 1),
        right: entry.right + (correct ? 1 : 0),
        last: correct ? 'right' : 'wrong',
        at: new Date().toISOString(),
      }
      return { ...prev, misses }
    })
  }

  // Drills that are not multiple choice — building an entry, footing an account,
  // placing a trial balance column — have no answer index, so they cannot be
  // re-served by the exam drill. They are still recorded, with a label and the
  // level they came from, so the student can be told what to go back to.
  function recordTask(id, correct, label, level) {
    if (!id) return
    setProgress(prev => {
      const misses = { ...(prev.misses || {}) }
      const entry = misses[id] || { wrong: 0, right: 0 }
      misses[id] = {
        ...entry,
        wrong: entry.wrong + (correct ? 0 : 1),
        right: entry.right + (correct ? 1 : 0),
        last: correct ? 'right' : 'wrong',
        at: new Date().toISOString(),
        task: true,
        label,
        level,
      }
      return { ...prev, misses }
    })
  }

  // Non-multiple-choice items still needing work, newest first, for the review list.
  function tasksToReview() {
    return Object.entries(progress.misses || {})
      .filter(([, m]) => m.task && m.last === 'wrong')
      .map(([id, m]) => ({ id, ...m }))
      .sort((a, b) => (a.level - b.level) || String(a.label).localeCompare(String(b.label)))
  }

  // `hold` is the student saying "I got that right but I am not confident yet."
  // It is deliberately independent of whether the answer was correct: being right
  // once is weak evidence of understanding, and he is a better judge of that than
  // the scoreboard is. Setting it puts the question back on the active list;
  // clearing it retires the question the way a correct answer normally would.
  function setHold(id, hold) {
    if (!id) return
    setProgress(prev => {
      const misses = { ...(prev.misses || {}) }
      const entry = misses[id] || { wrong: 0, right: 0, last: 'right', at: new Date().toISOString() }
      misses[id] = { ...entry, hold: Boolean(hold) }
      return { ...prev, misses }
    })
  }

  function isHeld(id) {
    return Boolean(progress.misses?.[id]?.hold)
  }

  // A question needs work while its most recent answer was wrong, OR while the
  // student has asked to keep it. Getting it right retires it only if he has not.
  function needsWorkIds() {
    return Object.entries(progress.misses || {})
      .filter(([, m]) => !m.task && (m.last === 'wrong' || m.hold))
      .map(([id]) => id)
  }

  // Questions that used to trip him up and are now answered right, with no hold —
  // the "you fixed these" pile. Nothing is ever deleted, so a question retired by
  // a lucky guess can always be drilled again from here.
  function reviewedIds() {
    return Object.entries(progress.misses || {})
      .filter(([, m]) => !m.task && !m.hold && m.last === 'right' && (m.wrong || 0) > 0)
      .map(([id]) => id)
  }

  function clearMisses() {
    setProgress(prev => ({ ...prev, misses: {} }))
  }

  function resetProgress() {
    setProgress(buildDefault())
  }

  const totalCompleted = Object.values(progress.levels).filter(l => l.completed).length

  return (
    <ProgressContext.Provider
      value={{ progress, completeLevel, recordExam, recordQuizResult, recordTask, tasksToReview, needsWorkIds, reviewedIds, setHold, isHeld, clearMisses, resetProgress, totalCompleted, totalLevels: TOTAL_LEVELS }}
    >
      {children}
    </ProgressContext.Provider>
  )
}

export function useProgress() {
  const ctx = useContext(ProgressContext)
  if (!ctx) throw new Error('useProgress must be used within ProgressProvider')
  return ctx
}

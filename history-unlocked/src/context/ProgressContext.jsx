import { createContext, useContext, useState, useEffect } from 'react'

const ProgressContext = createContext(null)

// Levels that actually exist. LEVEL_META in components/LevelCard.jsx carries the
// full 11-level roadmap; bump this as the remaining levels are built, or the navbar
// counts lessons nobody can open yet.
export const TOTAL_LEVELS = 6
const STORAGE_KEY = 'history-unlocked-progress'

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
        misses[r.id] = {
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

  // A question counts as needing work until it is answered correctly on its most
  // recent outing, so getting it right once retires it from the drill.
  function needsWorkIds() {
    return Object.entries(progress.misses || {})
      .filter(([, m]) => m.last === 'wrong' && !m.task)
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
      value={{ progress, completeLevel, recordExam, recordQuizResult, recordTask, tasksToReview, needsWorkIds, clearMisses, resetProgress, totalCompleted, totalLevels: TOTAL_LEVELS }}
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

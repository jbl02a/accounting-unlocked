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
  return { levels, exam: { attempts: [], best: null } }
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
  return { levels, exam: { attempts, best } }
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

  function recordExam({ score, correct, total, label }) {
    setProgress(prev => {
      const attempt = { score, correct, total, label, date: new Date().toISOString() }
      const attempts = [attempt, ...(prev.exam?.attempts || [])].slice(0, 10)
      const best = Math.max(score, prev.exam?.best ?? 0)
      return { ...prev, exam: { attempts, best } }
    })
  }

  function resetProgress() {
    setProgress(buildDefault())
  }

  const totalCompleted = Object.values(progress.levels).filter(l => l.completed).length

  return (
    <ProgressContext.Provider
      value={{ progress, completeLevel, recordExam, resetProgress, totalCompleted, totalLevels: TOTAL_LEVELS }}
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

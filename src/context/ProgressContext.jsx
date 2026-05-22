import { createContext, useContext, useState, useEffect } from 'react'

const ProgressContext = createContext(null)

const DEFAULT_PROGRESS = {
  levels: {
    1: { unlocked: true, completed: false, score: null },
    2: { unlocked: false, completed: false, score: null },
    3: { unlocked: false, completed: false, score: null },
    4: { unlocked: false, completed: false, score: null },
    5: { unlocked: false, completed: false, score: null },
  }
}

export function ProgressProvider({ children }) {
  const [progress, setProgress] = useState(() => {
    try {
      const saved = localStorage.getItem('accounting-unlocked-progress')
      return saved ? JSON.parse(saved) : DEFAULT_PROGRESS
    } catch {
      return DEFAULT_PROGRESS
    }
  })

  useEffect(() => {
    localStorage.setItem('accounting-unlocked-progress', JSON.stringify(progress))
  }, [progress])

  function completeLevel(levelNum, score = null) {
    setProgress(prev => {
      const next = { ...prev, levels: { ...prev.levels } }
      next.levels[levelNum] = { ...next.levels[levelNum], completed: true, score }
      if (levelNum < 5) {
        next.levels[levelNum + 1] = { ...next.levels[levelNum + 1], unlocked: true }
      }
      return next
    })
  }

  function resetProgress() {
    setProgress(DEFAULT_PROGRESS)
  }

  const totalCompleted = Object.values(progress.levels).filter(l => l.completed).length

  return (
    <ProgressContext.Provider value={{ progress, completeLevel, resetProgress, totalCompleted }}>
      {children}
    </ProgressContext.Provider>
  )
}

export function useProgress() {
  const ctx = useContext(ProgressContext)
  if (!ctx) throw new Error('useProgress must be used within ProgressProvider')
  return ctx
}

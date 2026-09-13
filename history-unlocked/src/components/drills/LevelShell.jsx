import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useProgress } from '../../context/ProgressContext'

// Every level has the same spine: a lesson you can skip, one or more drills, a
// result. This holds that spine so each level file is almost entirely content.
export default function LevelShell({ level, meta, lesson, rounds, nextLevel }) {
  const navigate = useNavigate()
  const { completeLevel } = useProgress()
  const [phase, setPhase] = useState('learn')
  const [roundIndex, setRoundIndex] = useState(0)
  const [scores, setScores] = useState([])

  const totalCorrect = scores.reduce((s, r) => s + r.correct, 0)
  const totalQuestions = scores.reduce((s, r) => s + r.total, 0)
  const pct = totalQuestions ? Math.round((totalCorrect / totalQuestions) * 100) : 0

  function finishRound(result) {
    const next = [...scores, result]
    setScores(next)
    if (roundIndex + 1 >= rounds.length) {
      const c = next.reduce((s, r) => s + r.correct, 0)
      const t = next.reduce((s, r) => s + r.total, 0)
      completeLevel(level, Math.round((c / t) * 100))
      setPhase('done')
    } else {
      setRoundIndex(i => i + 1)
    }
  }

  function restart() {
    setScores([]); setRoundIndex(0); setPhase('play')
  }

  if (phase === 'learn') {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <div className="flex items-baseline gap-2">
            <span className="text-sm text-amber-400 font-semibold">Level {level}</span>
            <span className="text-xs text-amber-500/60 font-mono">{meta.era}</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white mb-2">{meta.title}</h1>
          <p className="text-slate-400">{meta.intro}</p>
        </div>
        {lesson}
        <button onClick={() => setPhase('play')}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold text-lg hover:opacity-90 transition-opacity">
          {meta.cta || `Practice — ${rounds.length} round${rounds.length === 1 ? '' : 's'}`} →
        </button>
        <button onClick={() => { completeLevel(level); navigate('/') }}
          className="w-full mt-3 py-2.5 rounded-xl text-sm text-slate-400 hover:text-white hover:bg-white/5 transition-colors">
          Skip the practice — mark this lesson read
        </button>
      </div>
    )
  }

  if (phase === 'done') {
    return (
      <div className="max-w-xl mx-auto text-center">
        <div className="text-5xl mb-4">{pct === 100 ? '🎉' : pct >= 70 ? '📈' : '📚'}</div>
        <h2 className="text-3xl font-extrabold text-white mb-2">{meta.title}</h2>
        <p className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400 mb-2">{pct}%</p>
        <p className="text-slate-400 text-sm mb-6">{totalCorrect} of {totalQuestions} across {rounds.length} round{rounds.length === 1 ? '' : 's'}</p>
        <p className="text-slate-400 mb-8">
          {pct === 100 ? meta.praise || 'Every one. This period is solid.'
            : pct >= 70 ? 'Good grasp — check the ones you missed on the home page and come back to them.'
            : 'Worth another pass. Re-read the lesson, then run it again.'}
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <button onClick={restart} className="flex-1 py-3 rounded-xl bg-white/10 text-white font-semibold hover:bg-white/20">Try Again</button>
          <button onClick={() => setPhase('learn')} className="flex-1 py-3 rounded-xl bg-white/10 text-white font-semibold hover:bg-white/20">Review Lesson</button>
          <button onClick={() => navigate(nextLevel ? `/level/${nextLevel}` : '/exam')}
            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold hover:opacity-90">
            {nextLevel ? `Level ${nextLevel} →` : 'Practice Exam →'}
          </button>
        </div>
      </div>
    )
  }

  return rounds[roundIndex](finishRound)
}

import { Link } from 'react-router-dom'
import { useProgress } from '../context/ProgressContext'
import LevelCard, { LEVEL_META } from '../components/LevelCard'

const MOTIVATIONAL = [
  "Every CFO started exactly where you are. Let's go.",
  "Accounting isn't about numbers — it's about stories. Ready to read them?",
  "Ten levels. One transformation. You've got this.",
  "The language of business is waiting for you.",
]

const PHASES = [
  {
    id: 1,
    label: 'Phase 1 — Foundations',
    blurb: 'The equation, the five account types, debits and credits, your first journal entries.',
    levels: [1, 2, 3, 4, 5],
  },
  {
    id: 2,
    label: 'Phase 2 — The Accounting Cycle',
    blurb: 'Receivables and payables, multi-line entries, the ledger, and the trial balance from start to finish.',
    levels: [6, 7, 8, 9, 10],
  },
]

export default function Home() {
  const { progress, totalCompleted, totalLevels } = useProgress()
  const quote = MOTIVATIONAL[totalCompleted % MOTIVATIONAL.length]
  const best = progress.exam?.best

  return (
    <div>
      {/* Hero */}
      <div className="text-center mb-10 pt-4">
        <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-4 py-1.5 text-sm text-indigo-300 font-medium mb-6">
          <span>✨</span>
          <span>Go in any order — nothing is locked</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 leading-tight">
          Accounting,{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
            finally
          </span>{' '}
          clicks.
        </h1>
        <p className="text-slate-400 text-lg max-w-xl mx-auto mb-4">
          Ten bite-sized levels that take you from the accounting equation all the way to a finished trial balance. Read the lessons, and practice as much or as little as you want.
        </p>
        <p className="text-slate-500 text-sm italic">&ldquo;{quote}&rdquo;</p>
      </div>

      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-slate-400 mb-2">
          <span>Overall Progress</span>
          <span className="font-semibold text-white">{totalCompleted} / {totalLevels} levels complete</span>
        </div>
        <div className="h-2.5 rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-700"
            style={{ width: `${(totalCompleted / totalLevels) * 100}%` }}
          />
        </div>
        {totalCompleted === totalLevels && (
          <p className="text-center text-green-400 font-semibold mt-3 text-sm">
            🎉 All ten levels done. Go prove it on the practice exam.
          </p>
        )}
      </div>

      {/* Practice exam CTA */}
      <Link to="/exam" className="block mb-10 group">
        <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-600/20 via-purple-600/20 to-fuchsia-600/20 p-5 hover:border-indigo-400 transition-colors">
          <div className="flex items-center gap-4">
            <span className="text-4xl">📝</span>
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="font-bold text-white text-lg">Practice Exam</h2>
                {best !== null && best !== undefined && (
                  <span className="text-xs font-bold text-green-300 bg-green-500/10 border border-green-500/20 px-2 py-0.5 rounded-full">best {best}%</span>
                )}
              </div>
              <p className="text-sm text-slate-400">
                Transactions in plain English — categorize them, journalize them, place them on a trial balance. Multiple choice, scored, with a full explanation for every question.
              </p>
            </div>
            <span className="text-indigo-400 font-bold text-lg group-hover:translate-x-1 transition-transform">→</span>
          </div>
        </div>
      </Link>

      {/* Levels by phase */}
      {PHASES.map(phase => {
        const donePhase = phase.levels.filter(n => progress.levels[n]?.completed).length
        return (
          <div key={phase.id} className="mb-10">
            <div className="flex items-baseline justify-between gap-4 mb-1">
              <h2 className="text-lg font-bold text-white">{phase.label}</h2>
              <span className="text-xs text-slate-500 shrink-0">{donePhase}/{phase.levels.length} done</span>
            </div>
            <p className="text-sm text-slate-500 mb-4">{phase.blurb}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {phase.levels.map(num => (
                <LevelCard key={num} levelNum={num} levelData={progress.levels[num] || { completed: false, score: null }} />
              ))}
            </div>
          </div>
        )
      })}

      {/* Footer tip */}
      <div className="mt-10 text-center text-sm text-slate-600">
        {Object.keys(LEVEL_META).length} levels · progress saves automatically in this browser · no account needed.
      </div>
    </div>
  )
}

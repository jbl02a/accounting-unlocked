import { Link } from 'react-router-dom'
import { useProgress } from '../context/ProgressContext'
import LevelCard, { LEVEL_META } from '../components/LevelCard'

const MOTIVATIONAL = [
  "Every CFO started exactly where you are. Let's go.",
  "Accounting isn't about numbers — it's about stories. Ready to read them?",
  "Every level builds on the last. One transformation. You've got this.",
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
  {
    id: 3,
    label: 'Phase 3 — The Why Behind the Rules',
    blurb: 'The principles and assumptions an exam asks you to name: revenue recognition, matching, historical cost and the rest.',
    levels: [11],
  },
  {
    id: 4,
    label: 'Phase 4 — Adjusting & Closing (Chapter 3)',
    blurb: 'The end-of-period work: deferrals, accruals, closing entries and the post-closing trial balance.',
    levels: [12, 13, 14, 15],
  },
  {
    id: 5,
    label: 'Phase 5 — The Financial Statements (Chapter 1)',
    blurb: 'What the cycle produces: the four statements, how they link, and reading a classified balance sheet.',
    levels: [16, 17],
  },
]

export default function Home() {
  const { progress, totalCompleted, totalLevels, tasksToReview } = useProgress()
  const quote = MOTIVATIONAL[totalCompleted % MOTIVATIONAL.length]
  const best = progress.exam?.best
  const reviewTasks = tasksToReview()
  const reviewTotal = reviewTasks.length
  const reviewByLevel = [...new Set(reviewTasks.map(t => t.level))]
    .sort((a, b) => a - b)
    .map(level => ({ level, items: reviewTasks.filter(t => t.level === level) }))

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
          {totalLevels} bite-sized levels that take you from the accounting equation to a finished trial balance — and the principles behind all of it. Read the lessons, and practice as much or as little as you want.
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
            🎉 Every level done. Go prove it on the practice exam.
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

      {/* The TA's problems, worked step by step */}
      <Link to="/problems" className="block mb-10 group">
        <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-emerald-600/20 via-teal-600/20 to-cyan-600/20 p-5 hover:border-emerald-400 transition-colors">
          <div className="flex items-center gap-4">
            <span className="text-4xl">🗂️</span>
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="font-bold text-white text-lg">Problem Sets</h2>
                <span className="text-xs font-bold text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">from your TA</span>
              </div>
              <p className="text-sm text-slate-400">
                Four whole problems the way the exam asks them — journalize, post, foot the trial balance,
                close the books. Marked step by step, with the reason and the trap called out each time.
              </p>
            </div>
            <span className="text-emerald-400 font-bold text-lg group-hover:translate-x-1 transition-transform">→</span>
          </div>
        </div>
      </Link>

      {/* What he got wrong on the hands-on drills */}
      {reviewByLevel.length > 0 && (
        <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 p-5 mb-10">
          <div className="flex items-start gap-3 mb-3">
            <span className="text-2xl">🔁</span>
            <div className="flex-1">
              <h2 className="font-bold text-white">Go back over these</h2>
              <p className="text-sm text-slate-300">
                {reviewTotal} hands-on item{reviewTotal === 1 ? '' : 's'} you got wrong last time — entries, balances, columns and sorts.
                These live inside their level, so they are not in the exam drill. Get one right and it drops off.
              </p>
            </div>
          </div>
          <div className="space-y-3">
            {reviewByLevel.map(group => (
              <div key={group.level} className="rounded-xl bg-black/20 p-3">
                <div className="flex items-center justify-between gap-3 mb-1.5">
                  <p className="text-sm font-semibold text-white">
                    {LEVEL_META[group.level]?.icon} Level {group.level} — {LEVEL_META[group.level]?.title}
                  </p>
                  <Link to={`/level/${group.level}`} className="shrink-0 text-xs font-semibold text-rose-300 hover:text-white">
                    Redo →
                  </Link>
                </div>
                <ul className="space-y-0.5">
                  {group.items.slice(0, 6).map(t => (
                    <li key={t.id} className="text-xs text-slate-400 flex gap-2">
                      <span className="text-rose-400/70 shrink-0">✗</span>
                      <span>{t.label}{t.wrong > 1 && <span className="text-rose-300"> · missed {t.wrong}×</span>}</span>
                    </li>
                  ))}
                  {group.items.length > 6 && (
                    <li className="text-xs text-slate-500">+ {group.items.length - 6} more in this level</li>
                  )}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Printable study aids */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        <Link to="/cram" className="group block">
          <div className="h-full rounded-2xl border border-white/10 bg-white/5 p-5 hover:border-emerald-400 transition-colors">
            <div className="flex items-start gap-3">
              <span className="text-3xl">🖨️</span>
              <div>
                <h2 className="font-bold text-white">Exam-Day Cram Sheet</h2>
                <p className="text-sm text-slate-400 mt-0.5">
                  Everything that gets tested, condensed onto two printable pages. DEALER, normal balances, the adjusting and closing entries, every formula.
                </p>
              </div>
            </div>
          </div>
        </Link>
        <Link to="/worksheet" className="group block">
          <div className="h-full rounded-2xl border border-white/10 bg-white/5 p-5 hover:border-emerald-400 transition-colors">
            <div className="flex items-start gap-3">
              <span className="text-3xl">✏️</span>
              <div>
                <h2 className="font-bold text-white">Printable Practice Problem</h2>
                <p className="text-sm text-slate-400 mt-0.5">
                  A full-cycle problem in the same worksheet layout as class — journalize, post, trial balance, adjust. Answer key included.
                </p>
              </div>
            </div>
          </div>
        </Link>
      </div>

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

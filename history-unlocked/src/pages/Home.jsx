import { Link } from 'react-router-dom'
import { useProgress } from '../context/ProgressContext'
import LevelCard, { LEVEL_META } from '../components/LevelCard'

const BUILT = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const PHASES = [
  {
    id: 1,
    label: 'Unit 1 — Contact & Conquest · 1491–1607',
    blurb: 'Native North America before Europeans, what the Atlantic crossing exchanged, and why three empires colonized in three different ways.',
    levels: [1, 2, 3],
  },
  {
    id: 2,
    label: 'Unit 2 — The English Colonies · 1607–1754',
    blurb: 'Four regions with four economies, four labour systems and four societies. This is where most colonial-era exam questions live.',
    levels: [4, 5, 6],
  },
  {
    id: 3,
    label: 'Unit 3 opener — Empire & War · 1650–1763',
    blurb: 'How Britain ran its empire, how little it bothered to enforce that, and how winning the French and Indian War ended the arrangement and set up the Revolution.',
    levels: [7, 8],
  },
  {
    id: 4,
    label: 'Unit 3 — The Road to Independence · 1763–1776',
    blurb: 'Twelve years of argument over who had the right to tax and govern the colonies — and how a quarrel about rights inside the empire turned into a war to leave it.',
    levels: [9, 10],
  },
]

const QUOTES = [
  'The AP exam rewards argument, not recall. Start by knowing the story cold.',
  'Every period question is really a question about cause, comparison or change.',
  'You are not memorising dates. You are learning to explain why things happened.',
]

export default function Home() {
  const { progress, totalCompleted, tasksToReview } = useProgress()
  const built = BUILT.length
  const done = BUILT.filter(n => progress.levels[n]?.completed).length
  const quote = QUOTES[done % QUOTES.length]
  const best = progress.exam?.best
  const reviewTasks = tasksToReview()
  const reviewByLevel = [...new Set(reviewTasks.map(t => t.level))]
    .sort((a, b) => a - b)
    .map(level => ({ level, items: reviewTasks.filter(t => t.level === level) }))

  return (
    <div>
      <div className="text-center mb-10 pt-4">
        <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-4 py-1.5 text-sm text-amber-300 font-medium mb-6">
          <span>🏛️</span><span>AP U.S. History · built for the exam in May</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 leading-tight">
          History that{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">actually connects</span>.
        </h1>
        <p className="text-slate-400 text-lg max-w-xl mx-auto mb-4">
          Periods, people and evidence — drilled until they stick, in the stimulus-based format the AP exam actually uses.
        </p>
        <p className="text-slate-500 text-sm italic">&ldquo;{quote}&rdquo;</p>
      </div>

      <div className="mb-8">
        <div className="flex justify-between text-sm text-slate-400 mb-2">
          <span>Colonial era progress</span>
          <span className="font-semibold text-white">{done} / {built} levels complete</span>
        </div>
        <div className="h-2.5 rounded-full bg-white/10 overflow-hidden">
          <div className="h-full rounded-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-700" style={{ width: `${(done / built) * 100}%` }} />
        </div>
      </div>

      {reviewByLevel.length > 0 && (
        <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 p-5 mb-10">
          <div className="flex items-start gap-3 mb-3">
            <span className="text-2xl">🔁</span>
            <div>
              <h2 className="font-bold text-white">Go back over these</h2>
              <p className="text-sm text-slate-300">
                {reviewTasks.length} item{reviewTasks.length === 1 ? '' : 's'} you got wrong last time. Get one right and it drops off.
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
                  <Link to={`/level/${group.level}`} className="shrink-0 text-xs font-semibold text-rose-300 hover:text-white">Redo →</Link>
                </div>
                <ul className="space-y-0.5">
                  {group.items.slice(0, 5).map(t => (
                    <li key={t.id} className="text-xs text-slate-400 flex gap-2">
                      <span className="text-rose-400/70 shrink-0">✗</span>
                      <span>{t.label}{t.wrong > 1 && <span className="text-rose-300"> · missed {t.wrong}×</span>}</span>
                    </li>
                  ))}
                  {group.items.length > 5 && <li className="text-xs text-slate-500">+ {group.items.length - 5} more</li>}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      <Link to="/exam" className="block mb-6 group">
        <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-amber-600/20 via-orange-600/20 to-red-600/20 p-5 hover:border-amber-400 transition-colors">
          <div className="flex items-center gap-4">
            <span className="text-4xl">📝</span>
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="font-bold text-white text-lg">Practice Questions</h2>
                {best !== null && best !== undefined && (
                  <span className="text-xs font-bold text-green-300 bg-green-500/10 border border-green-500/20 px-2 py-0.5 rounded-full">best {best}%</span>
                )}
              </div>
              <p className="text-sm text-slate-400">
                Stimulus-based questions in the AP format — read the source, then reason about it. Drill a unit, only what you got
                wrong, or <span className="text-amber-300 font-semibold">Hard mode</span>: the questions where three options are
                true and one answers what was asked.
              </p>
            </div>
            <span className="text-amber-400 font-bold text-lg group-hover:translate-x-1 transition-transform">→</span>
          </div>
        </div>
      </Link>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        <Link to="/timeline" className="group block">
          <div className="h-full rounded-2xl border border-white/10 bg-white/5 p-5 hover:border-amber-400 transition-colors">
            <div className="flex items-start gap-3">
              <span className="text-3xl">🧵</span>
              <div>
                <h2 className="font-bold text-white">Colonial Timeline</h2>
                <p className="text-sm text-slate-400 mt-0.5">Every date worth knowing from 1491 to 1754, with why it mattered.</p>
              </div>
            </div>
          </div>
        </Link>
        <Link to="/cram" className="group block">
          <div className="h-full rounded-2xl border border-white/10 bg-white/5 p-5 hover:border-amber-400 transition-colors">
            <div className="flex items-start gap-3">
              <span className="text-3xl">🖨️</span>
              <div>
                <h2 className="font-bold text-white">Cram Sheet</h2>
                <p className="text-sm text-slate-400 mt-0.5">The colonial era condensed onto printable pages — regions, labour, causes.</p>
              </div>
            </div>
          </div>
        </Link>
      </div>

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

      <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center">
        <p className="text-sm text-slate-400">
          <span className="text-white font-semibold">Still to come:</span> slavery in British North America, colonial minds, a
          capstone, and the document-sourcing skill — then the war itself and Units 4–9 through to the exam.
        </p>
      </div>

      <div className="mt-8 text-center text-sm text-slate-600">Progress saves automatically in this browser. No account needed.</div>
    </div>
  )
}

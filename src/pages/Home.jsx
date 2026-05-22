import { useProgress } from '../context/ProgressContext'
import LevelCard from '../components/LevelCard'

const MOTIVATIONAL = [
  "Every CFO started exactly where you are. Let's go.",
  "Accounting isn't about numbers — it's about stories. Ready to read them?",
  "Five levels. One transformation. You've got this.",
  "The language of business is waiting for you.",
]

export default function Home() {
  const { progress, totalCompleted } = useProgress()
  const quote = MOTIVATIONAL[totalCompleted % MOTIVATIONAL.length]

  return (
    <div>
      {/* Hero */}
      <div className="text-center mb-12 pt-4">
        <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-4 py-1.5 text-sm text-indigo-300 font-medium mb-6">
          <span>✨</span>
          <span>No experience needed</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 leading-tight">
          Accounting,{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
            finally
          </span>{' '}
          clicks.
        </h1>
        <p className="text-slate-400 text-lg max-w-xl mx-auto mb-4">
          Five bite-sized levels that turn accounting from scary to sensible. Interactive, visual, and actually kind of fun.
        </p>
        <p className="text-slate-500 text-sm italic">"{quote}"</p>
      </div>

      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-slate-400 mb-2">
          <span>Overall Progress</span>
          <span className="font-semibold text-white">{totalCompleted} / 5 levels complete</span>
        </div>
        <div className="h-2.5 rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-700"
            style={{ width: `${(totalCompleted / 5) * 100}%` }}
          />
        </div>
        {totalCompleted === 5 && (
          <p className="text-center text-green-400 font-semibold mt-3 text-sm">
            🎉 You've completed all levels! You're officially accounting-literate.
          </p>
        )}
      </div>

      {/* Level cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {Object.entries(progress.levels).map(([num, data]) => (
          <LevelCard key={num} levelNum={Number(num)} levelData={data} />
        ))}
      </div>

      {/* Footer tip */}
      <div className="mt-10 text-center text-sm text-slate-600">
        Progress is saved automatically in your browser. No account needed.
      </div>
    </div>
  )
}

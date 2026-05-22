import { Link } from 'react-router-dom'

const LEVEL_META = {
  1: { title: 'The Accounting Equation', icon: '⚖️', color: 'from-indigo-600 to-purple-600', desc: 'A = L + E — the foundation of everything' },
  2: { title: 'The Big 5 Account Types', icon: '🗂️', color: 'from-cyan-600 to-blue-600', desc: 'Assets, Liabilities, Equity, Revenue, Expenses' },
  3: { title: 'Debits & Credits', icon: '↔️', color: 'from-emerald-600 to-teal-600', desc: 'Left side, right side — the T-account rules' },
  4: { title: 'Journal Entries', icon: '📓', color: 'from-orange-600 to-amber-600', desc: 'Record transactions like a pro accountant' },
  5: { title: 'Reading a Balance Sheet', icon: '📋', color: 'from-rose-600 to-pink-600', desc: 'Spot errors in a real financial statement' },
}

export default function LevelCard({ levelNum, levelData }) {
  const meta = LEVEL_META[levelNum]
  const { unlocked, completed, score } = levelData

  if (!unlocked) {
    return (
      <div className="relative rounded-2xl border border-white/10 bg-white/5 p-6 opacity-50 cursor-not-allowed select-none">
        <div className="flex items-start justify-between mb-3">
          <span className="text-3xl grayscale">{meta.icon}</span>
          <span className="text-2xl">🔒</span>
        </div>
        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Level {levelNum}</div>
        <h3 className="font-bold text-lg text-slate-400 mb-1">{meta.title}</h3>
        <p className="text-sm text-slate-500">{meta.desc}</p>
        <p className="text-xs text-slate-600 mt-3">Complete the previous level to unlock</p>
      </div>
    )
  }

  return (
    <Link to={`/level/${levelNum}`} className="group block">
      <div className={`relative rounded-2xl border border-white/10 bg-gradient-to-br ${meta.color} p-0.5 transition-transform hover:-translate-y-1 hover:shadow-xl hover:shadow-black/40`}>
        <div className="rounded-2xl bg-[#0f0f1a] p-6 h-full">
          <div className="flex items-start justify-between mb-3">
            <span className="text-3xl">{meta.icon}</span>
            {completed ? (
              <div className="flex items-center gap-1">
                <span className="text-green-400 text-xl">✅</span>
                {score !== null && (
                  <span className="text-xs font-bold text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full">
                    {score}%
                  </span>
                )}
              </div>
            ) : (
              <span className="text-xs font-semibold text-indigo-400 bg-indigo-400/10 px-2 py-1 rounded-full">
                Ready
              </span>
            )}
          </div>
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Level {levelNum}</div>
          <h3 className="font-bold text-lg text-white mb-1 group-hover:text-indigo-300 transition-colors">{meta.title}</h3>
          <p className="text-sm text-slate-400">{meta.desc}</p>
          <div className={`mt-4 text-xs font-semibold text-transparent bg-clip-text bg-gradient-to-r ${meta.color}`}>
            {completed ? '↩ Play again' : '→ Start level'}
          </div>
        </div>
      </div>
    </Link>
  )
}

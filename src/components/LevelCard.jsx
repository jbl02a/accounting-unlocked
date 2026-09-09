import { Link } from 'react-router-dom'

export const LEVEL_META = {
  1: { title: 'The Accounting Equation', icon: '⚖️', color: 'from-indigo-600 to-purple-600', desc: 'A = L + E — the foundation of everything', phase: 1 },
  2: { title: 'The Big 5 Account Types', icon: '🗂️', color: 'from-cyan-600 to-blue-600', desc: 'Assets, Liabilities, Equity, Revenue, Expenses', phase: 1 },
  3: { title: 'Debits & Credits', icon: '↔️', color: 'from-emerald-600 to-teal-600', desc: 'Left side, right side — the T-account rules', phase: 1 },
  4: { title: 'Journal Entries', icon: '📓', color: 'from-orange-600 to-amber-600', desc: 'Record transactions like a pro accountant', phase: 1 },
  5: { title: 'Reading a Balance Sheet', icon: '📋', color: 'from-rose-600 to-pink-600', desc: 'Spot errors in a real financial statement', phase: 1 },
  6: { title: 'Receivables vs. Payables', icon: '📥', color: 'from-sky-600 to-cyan-600', desc: 'Who owes whom — and the entry when they pay', phase: 2 },
  7: { title: 'Compound Journal Entries', icon: '🧾', color: 'from-violet-600 to-purple-600', desc: 'Three, four, five lines that still balance', phase: 2 },
  8: { title: 'T-Accounts & Ledger Balances', icon: '📗', color: 'from-lime-600 to-green-600', desc: 'Post the entries, foot each account', phase: 2 },
  9: { title: 'The Trial Balance', icon: '🧮', color: 'from-amber-600 to-yellow-600', desc: 'Right column, right order, and it must balance', phase: 2 },
  10: { title: 'Full Cycle Challenge', icon: '🏆', color: 'from-fuchsia-600 to-rose-600', desc: 'Transactions → journal → ledger → trial balance', phase: 2 },
  11: { title: 'Accounting Principles', icon: '📜', color: 'from-teal-600 to-emerald-600', desc: 'The big ideas behind every rule — match them to examples', phase: 3 },
}

export default function LevelCard({ levelNum, levelData }) {
  const meta = LEVEL_META[levelNum]
  const { completed, score } = levelData

  return (
    <Link to={`/level/${levelNum}`} className="group block">
      <div className={`relative rounded-2xl border border-white/10 bg-gradient-to-br ${meta.color} p-0.5 transition-transform hover:-translate-y-1 hover:shadow-xl hover:shadow-black/40`}>
        <div className="rounded-2xl bg-[#0f0f1a] p-6 h-full">
          <div className="flex items-start justify-between mb-3">
            <span className="text-3xl">{meta.icon}</span>
            {completed ? (
              <div className="flex items-center gap-1">
                <span className="text-green-400 text-xl">✅</span>
                {score !== null && score !== undefined && (
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

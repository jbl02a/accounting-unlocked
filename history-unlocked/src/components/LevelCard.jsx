import { Link } from 'react-router-dom'

export const LEVEL_META = {
  1:  { title: 'Before Contact', icon: '🌽', color: 'from-emerald-700 to-teal-700', desc: 'Native North America — diversity, environment, adaptation', phase: 1, era: '1491' },
  2:  { title: 'Contact & the Columbian Exchange', icon: '⛵', color: 'from-sky-700 to-blue-700', desc: 'What crossed the Atlantic, and what it did', phase: 1, era: '1492–1607' },
  3:  { title: 'Three Empires', icon: '🏴', color: 'from-violet-700 to-purple-700', desc: 'Spain, France and England colonized differently — and why', phase: 1, era: '1500s–1600s' },
  4:  { title: 'The Chesapeake', icon: '🚬', color: 'from-amber-700 to-orange-700', desc: 'Jamestown, tobacco, servitude and Bacon’s Rebellion', phase: 2, era: '1607–1700' },
  5:  { title: 'New England', icon: '⛪', color: 'from-indigo-700 to-blue-800', desc: 'Puritans, covenant, town meeting and dissent', phase: 2, era: '1620–1700' },
  6:  { title: 'Middle Colonies & Lower South', icon: '🌾', color: 'from-lime-700 to-green-700', desc: 'Pennsylvania, New York, the Carolinas and Georgia', phase: 2, era: '1650–1750' },
  7:  { title: 'The Atlantic World', icon: '🧭', color: 'from-cyan-700 to-sky-800', desc: 'Mercantilism, the Navigation Acts and salutary neglect', phase: 3, era: '1650–1754' },
  8:  { title: 'The French & Indian War', icon: '⚔️', color: 'from-red-800 to-rose-900', desc: 'The Seven Years\u2019 War, 1763, and the end of neglect', phase: 3, era: '1754–1763' },
  9:  { title: 'No Taxation Without Representation', icon: '📜', color: 'from-sky-700 to-cyan-800', desc: 'Stamp Act, Townshend, Boston — the argument over who may tax', phase: 3, era: '1763–1770' },
  10: { title: 'From Protest to Independence', icon: '🔔', color: 'from-rose-700 to-red-800', desc: 'Tea, the Coercive Acts, Lexington and 1776', phase: 3, era: '1770–1776' },
  11: { title: 'Slavery in British North America', icon: '⛓️', color: 'from-stone-600 to-neutral-700', desc: 'How chattel slavery hardened, and how people resisted', phase: 4, era: '1619–1750' },
  12: { title: 'Colonial Minds', icon: '🕯️', color: 'from-amber-700 to-yellow-800', desc: 'Great Awakening, Enlightenment and self-government', phase: 4, era: '1700–1754' },
  13: { title: 'Colonial Capstone', icon: '🏛️', color: 'from-fuchsia-700 to-rose-700', desc: 'Compare the regions, then argue a thesis', phase: 5, era: '1491–1776' },
  14: { title: 'Sourcing a Document', icon: '🔍', color: 'from-teal-700 to-emerald-800', desc: 'HIPP — the skill every DBQ point depends on', phase: 5, era: 'Skill' },
}

export default function LevelCard({ levelNum, levelData }) {
  const meta = LEVEL_META[levelNum]
  const { completed, score } = levelData

  return (
    <Link to={`/level/${levelNum}`} className="group block">
      <div className={`relative rounded-2xl border border-white/10 bg-gradient-to-br ${meta.color} p-0.5 transition-transform hover:-translate-y-1 hover:shadow-xl hover:shadow-black/40`}>
        <div className="rounded-2xl bg-[#14100c] p-6 h-full">
          <div className="flex items-start justify-between mb-3">
            <span className="text-3xl">{meta.icon}</span>
            {completed ? (
              <div className="flex items-center gap-1">
                <span className="text-green-400 text-xl">✅</span>
                {score !== null && score !== undefined && (
                  <span className="text-xs font-bold text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full">{score}%</span>
                )}
              </div>
            ) : (
              <span className="text-xs font-semibold text-amber-400 bg-amber-400/10 px-2 py-1 rounded-full">Ready</span>
            )}
          </div>
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Level {levelNum}</span>
            <span className="text-[10px] text-amber-500/70 font-mono">{meta.era}</span>
          </div>
          <h3 className="font-bold text-lg text-white mb-1 group-hover:text-amber-300 transition-colors">{meta.title}</h3>
          <p className="text-sm text-slate-400">{meta.desc}</p>
          <div className={`mt-4 text-xs font-semibold text-transparent bg-clip-text bg-gradient-to-r ${meta.color}`}>
            {completed ? '↩ Play again' : '→ Start level'}
          </div>
        </div>
      </div>
    </Link>
  )
}

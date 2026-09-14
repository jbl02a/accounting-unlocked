import { Link, useLocation } from 'react-router-dom'
import { useProgress } from '../context/ProgressContext'

export default function Navbar() {
  const location = useLocation()
  const { totalCompleted, totalLevels, resetProgress } = useProgress()

  const linkClass = path =>
    `text-sm px-3 py-1.5 rounded-lg transition-colors font-medium ${
      location.pathname === path ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:text-white hover:bg-white/10'
    }`

  return (
    <nav className="border-b border-white/10 bg-black/30 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between gap-2">
        <Link to="/" className="flex items-center gap-2 font-bold text-lg text-white hover:text-indigo-300 transition-colors">
          <span className="text-2xl">📊</span>
          <span className="hidden xs:inline sm:inline">Accounting <span className="text-indigo-400">Unlocked</span></span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden md:flex items-center gap-1 text-sm text-slate-400">
            <span className="text-indigo-400 font-semibold">{totalCompleted}</span>
            <span>/{totalLevels} levels done</span>
          </div>

          <Link to="/exam" className={linkClass('/exam')}>Practice Exam</Link>
          <Link
            to="/problems"
            className={`text-sm px-3 py-1.5 rounded-lg transition-colors font-medium ${
              location.pathname.startsWith('/problems')
                ? 'bg-emerald-600 text-white'
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            Problems
          </Link>
          <Link to="/cram" className={`hidden sm:inline-block ${linkClass('/cram')}`}>Cram Sheet</Link>
          <Link to="/cheatsheet" className={`hidden lg:inline-block ${linkClass('/cheatsheet')}`}>Cheat Sheet</Link>

          <button
            onClick={() => {
              if (window.confirm('Reset all progress? This cannot be undone.')) resetProgress()
            }}
            className="text-xs text-slate-500 hover:text-red-400 transition-colors"
            title="Reset progress"
          >
            Reset
          </button>
        </div>
      </div>
    </nav>
  )
}

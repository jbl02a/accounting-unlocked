import { useState } from 'react'

// Shared opt-in hint machinery used by every drill in the course.
// A hint is written to explain the REASONING and stop one step short of the
// answer, so asking for one is still learning. Hints never affect scoring.
export function useHints() {
  const [open, setOpen] = useState([])
  const [used, setUsed] = useState([])

  function toggle(id) {
    setOpen(prev => (prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]))
    setUsed(prev => (prev.includes(id) ? prev : [...prev, id]))
  }
  function reset() { setOpen([]); setUsed([]) }

  return { isOpen: id => open.includes(id), toggle, used, usedCount: used.length, reset }
}

// Small round "?" for tight rows (a table of accounts, a list of cards).
export function HintToggle({ open, onClick, label = 'this item', className = '' }) {
  return (
    <button
      onClick={onClick}
      aria-label={`Hint for ${label}`}
      title="Stuck on this one? Get a nudge."
      className={`w-7 h-7 shrink-0 rounded-full text-xs font-bold border transition-colors ${
        open
          ? 'border-sky-400 bg-sky-900/40 text-sky-200'
          : 'border-slate-600 bg-slate-800 text-dim hover:border-sky-400 hover:text-sky-300'
      } ${className}`}
    >
      ?
    </button>
  )
}

export function HintPanel({ children, className = '' }) {
  return (
    <div className={`rounded-lg bg-sky-500/10 border border-sky-500/30 p-3 ${className}`}>
      <p className="text-[10px] font-bold uppercase tracking-wider text-sky-300 mb-1">Hint</p>
      <p className="text-xs text-slate-300 leading-relaxed">{children}</p>
    </div>
  )
}

// Full-width "Stuck? Get a hint" control for one-question-at-a-time drills.
export function HintBar({ open, onToggle, text, className = '' }) {
  return (
    <div className={className}>
      {!open ? (
        <button
          onClick={onToggle}
          className="flex items-center gap-2 text-xs text-dim hover:text-sky-300 transition-colors"
        >
          <span className="w-5 h-5 rounded-full border border-slate-600 flex items-center justify-center text-[10px] font-bold">?</span>
          Stuck? Get a hint
        </button>
      ) : (
        <div>
          <HintPanel>{text}</HintPanel>
          <button onClick={onToggle} className="mt-1 text-[10px] text-dim hover:text-white">hide hint</button>
        </div>
      )}
    </div>
  )
}

// Standard line for a results panel, so hint use reads as encouragement.
export function hintTally(count) {
  if (!count) return null
  return `You used ${count} hint${count === 1 ? '' : 's'} — that is exactly what they are there for. Try this round again later without them to see what stuck.`
}

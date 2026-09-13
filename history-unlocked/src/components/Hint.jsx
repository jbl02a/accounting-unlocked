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
          : 'border-slate-600 bg-slate-800 text-slate-400 hover:border-sky-400 hover:text-sky-300'
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
          className="flex items-center gap-2 text-xs text-slate-500 hover:text-sky-300 transition-colors"
        >
          <span className="w-5 h-5 rounded-full border border-slate-600 flex items-center justify-center text-[10px] font-bold">?</span>
          Stuck? Get a hint
        </button>
      ) : (
        <div>
          <HintPanel>{text}</HintPanel>
          <button onClick={onToggle} className="mt-1 text-[10px] text-slate-600 hover:text-slate-400">hide hint</button>
        </div>
      )}
    </div>
  )
}

// ── Staged hints ──────────────────────────────────────────────────────────
// A single nudge tells a student what to think about once. A staged hint teaches
// the procedure: work out what is being asked, recall the rule that settles it,
// then name the trap. The labels are fixed on purpose — the same three moves come
// up on every hard question, and the point is for them to become automatic.
export const HINT_STEPS = [
  { n: 1, label: 'What is the question actually asking?' },
  { n: 2, label: 'The rule that decides it' },
  { n: 3, label: 'The trap in the room' },
]

export function useStagedHints() {
  const [steps, setSteps] = useState({})
  function revealed(id) { return steps[id] || 0 }
  function reveal(id) { setSteps(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 })) }
  function close(id) { setSteps(prev => ({ ...prev, [id]: 0 })) }
  const totalRevealed = Object.values(steps).reduce((a, b) => a + b, 0)
  const questionsHinted = Object.values(steps).filter(Boolean).length
  return { revealed, reveal, close, totalRevealed, questionsHinted }
}

// Progressive "work it out with me" panel. `hints` is an array of up to three
// strings; a legacy single-string hint is accepted and behaves as one step.
export function StagedHint({ id, hints, shown, onReveal, onClose, className = '' }) {
  const list = Array.isArray(hints) ? hints : hints ? [hints] : []
  if (list.length === 0) return null
  const remaining = list.length - shown

  if (shown === 0) {
    return (
      <div className={className}>
        <button
          onClick={onReveal}
          className="flex items-center gap-2 text-xs text-slate-500 hover:text-sky-300 transition-colors"
        >
          <span className="w-5 h-5 rounded-full border border-slate-600 flex items-center justify-center text-[10px] font-bold">?</span>
          Stuck? Work it out step by step
        </button>
      </div>
    )
  }

  return (
    <div className={className}>
      <div className="rounded-xl bg-sky-500/10 border border-sky-500/30 p-4 space-y-3">
        {list.slice(0, shown).map((text, i) => (
          <div key={i}>
            <p className="text-[10px] font-bold uppercase tracking-wider text-sky-300 mb-1">
              Step {HINT_STEPS[i]?.n || i + 1} · {HINT_STEPS[i]?.label || 'Think it through'}
            </p>
            <p className="text-xs text-slate-300 leading-relaxed">{text}</p>
          </div>
        ))}
        <div className="flex items-center gap-4 pt-1">
          {remaining > 0 ? (
            <button onClick={onReveal} className="text-xs font-semibold text-sky-300 hover:text-white transition-colors">
              Still stuck — next step ({remaining} left) →
            </button>
          ) : (
            <span className="text-[11px] text-slate-500">That is every step. The answer is yours to make.</span>
          )}
          <button onClick={onClose} className="text-[10px] text-slate-600 hover:text-slate-400">hide</button>
        </div>
      </div>
    </div>
  )
}

// Shown after answering: why each option is right or wrong. This is the part that
// addresses the real failure mode — three options that are true, one that answers
// the question.
export function OptionAutopsy({ q, chosen, className = '' }) {
  if (!Array.isArray(q.optionWhy)) return null
  return (
    <div className={`rounded-xl border border-white/10 bg-black/20 p-4 ${className}`}>
      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-3">Every option, and why</p>
      <div className="space-y-2.5">
        {q.options.map((opt, i) => {
          const right = i === q.correctIndex
          const picked = i === chosen
          return (
            <div key={i} className={`rounded-lg p-2.5 border ${
              right ? 'border-green-600/50 bg-green-900/15' : picked ? 'border-red-600/50 bg-red-900/15' : 'border-white/5'}`}>
              <div className="flex items-start gap-2">
                <span className={`text-[11px] font-bold mt-0.5 ${right ? 'text-green-400' : 'text-slate-500'}`}>{'ABCD'[i]}</span>
                <div className="flex-1">
                  <p className={`text-xs mb-1 ${right ? 'text-white font-semibold' : 'text-slate-400'}`}>{opt}</p>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {right && <span className="text-green-400 font-semibold">Correct — </span>}
                    {picked && !right && <span className="text-red-400 font-semibold">You picked this — </span>}
                    {q.optionWhy[i]}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// Standard line for a results panel, so hint use reads as encouragement.
export function hintTally(count) {
  if (!count) return null
  return `You used ${count} hint${count === 1 ? '' : 's'} — that is exactly what they are there for. Try this round again later without them to see what stuck.`
}

// Same idea, counted in steps rather than questions.
export function stepTally(steps, questions) {
  if (!steps) return 'No hints used.'
  return `${steps} hint step${steps === 1 ? '' : 's'} across ${questions} question${questions === 1 ? '' : 's'}. ` +
    'Steps are the point — but the ones you needed three steps for are the ones to run again cold.'
}

import { useState } from 'react'
import { useProgress } from '../../context/ProgressContext'
import { useHints, HintBar } from '../Hint'
import { shuffled } from '../../lib/shuffle'

// Chronological ordering — directly descended from the trial-balance ordering step
// in the accounting app. The interaction transferred even though nothing else did.
export default function Sequence({ events, level, title, instruction, taskId, hint, onDone }) {
  const { recordTask } = useProgress()
  const [pool] = useState(() => shuffled(events))
  const [ordered, setOrdered] = useState([])
  const [checked, setChecked] = useState(false)
  const hints = useHints()

  const remaining = pool.filter(e => !ordered.includes(e.id))
  const correctOrder = [...events].sort((a, b) => a.year - b.year)
  const rightCount = ordered.filter((id, i) => correctOrder[i]?.id === id).length

  function check() {
    setChecked(true)
    recordTask(taskId, rightCount === events.length, title, level)
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-5">
        <h1 className="text-xl font-extrabold text-white">{title}</h1>
        <p className="text-sm text-slate-400 mt-1">{instruction}</p>
      </div>

      {!checked && hint && <HintBar open={hints.isOpen(taskId)} onToggle={() => hints.toggle(taskId)} text={hint} className="mb-4" />}

      <div className="rounded-xl border border-white/10 bg-black/20 p-4 mb-4">
        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">Earliest first</p>
        {ordered.length === 0 && <p className="text-sm text-slate-600 italic py-2">Empty — tap an event below to start.</p>}
        <div className="space-y-1.5">
          {ordered.map((id, i) => {
            const ev = events.find(e => e.id === id)
            const right = checked && correctOrder[i]?.id === id
            const wrong = checked && correctOrder[i]?.id !== id
            return (
              <div key={id} className={`flex items-center gap-3 rounded-lg px-3 py-2 border ${
                right ? 'border-green-600 bg-green-900/20' : wrong ? 'border-red-600 bg-red-900/20' : 'border-white/10 bg-white/5'}`}>
                <span className="text-xs font-bold text-slate-500 w-4">{i + 1}</span>
                <span className="text-sm text-white flex-1">{ev.label}</span>
                {checked && <span className={`text-xs font-mono ${right ? 'text-green-400' : 'text-amber-300'}`}>{ev.year}</span>}
              </div>
            )
          })}
        </div>
      </div>

      {!checked && (
        <>
          <div className="flex flex-wrap gap-2 mb-4">
            {remaining.map(e => (
              <button key={e.id} onClick={() => setOrdered(o => [...o, e.id])}
                className="rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-sm text-white hover:border-amber-400 hover:bg-slate-700 transition-colors">
                {e.label}
              </button>
            ))}
          </div>
          {ordered.length > 0 && (
            <button onClick={() => setOrdered(o => o.slice(0, -1))} className="text-xs text-slate-500 hover:text-white mb-4">← Undo last</button>
          )}
        </>
      )}

      {checked && (
        <div className={`rounded-xl p-4 mb-5 ${rightCount === events.length ? 'bg-green-900/30 border border-green-700' : 'bg-amber-900/30 border border-amber-700'}`}>
          <p className="font-bold text-white mb-2">{rightCount} of {events.length} in the right position</p>
          <ol className="text-xs text-slate-300 space-y-0.5 list-decimal list-inside">
            {correctOrder.map(e => <li key={e.id}><span className="font-mono text-amber-300">{e.year}</span> — {e.label}{e.why && <span className="text-slate-500"> · {e.why}</span>}</li>)}
          </ol>
        </div>
      )}

      {!checked ? (
        <button onClick={check} disabled={ordered.length !== events.length}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold disabled:opacity-40 hover:opacity-90">
          {ordered.length === events.length ? 'Check My Order' : `Place all ${events.length} (${ordered.length} placed)`}
        </button>
      ) : (
        <button onClick={() => onDone({ correct: rightCount, total: events.length })}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold hover:opacity-90">
          Continue →
        </button>
      )}
    </div>
  )
}

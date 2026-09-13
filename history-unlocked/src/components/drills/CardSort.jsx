import { useState } from 'react'
import { useProgress } from '../../context/ProgressContext'
import { useHints, HintToggle, HintPanel, hintTally } from '../Hint'
import { shuffled } from '../../lib/shuffle'

// Sort items into categories — regions, empires, colonies, eras. The workhorse
// drill for a history course, where a great deal of knowledge amounts to "which
// bucket does this belong in, and why".
export default function CardSort({ items, buckets, level, title, instruction, taskPrefix, onDone }) {
  const { recordTask } = useProgress()
  const [cards] = useState(() => shuffled(items))
  const [placed, setPlaced] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const hints = useHints()

  const correct = cards.filter(c => placed[c.id] === c.correct).length
  const allPlaced = cards.every(c => placed[c.id])

  function submit() {
    setSubmitted(true)
    cards.forEach(c => recordTask(`${taskPrefix}-${c.id}`, placed[c.id] === c.correct, `${title} — ${c.label.slice(0, 54)}`, level))
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-5">
        <h1 className="text-xl font-extrabold text-white">{title}</h1>
        <p className="text-sm text-slate-400 mt-1">{instruction}</p>
      </div>

      <div className="rounded-xl border border-white/10 overflow-hidden mb-5">
        {cards.map((c, i) => {
          const pick = placed[c.id]
          const wrong = submitted && pick !== c.correct
          const rightBucket = buckets.find(b => b.id === c.correct)
          return (
            <div key={c.id} className={`px-3 py-2.5 ${i ? 'border-t border-white/5' : ''} ${wrong ? 'bg-red-900/20' : submitted ? 'bg-green-900/10' : ''}`}>
              <div className="flex items-start gap-2 mb-2">
                <p className="text-sm text-white flex-1">{c.label}</p>
                {!submitted && c.hint && <HintToggle open={hints.isOpen(c.id)} onClick={() => hints.toggle(c.id)} label={c.label} />}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {buckets.map(b => {
                  const isAnswer = submitted && c.correct === b.id
                  return (
                    <button key={b.id} onClick={() => !submitted && setPlaced(p => ({ ...p, [c.id]: b.id }))} disabled={submitted}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-colors ${
                        isAnswer ? 'border-green-500 bg-green-900/40 text-green-300'
                          : pick === b.id ? 'border-amber-500 bg-amber-900/30 text-white'
                          : 'border-slate-600 bg-slate-800 text-slate-400 hover:border-amber-400'}`}>
                      {b.label}
                    </button>
                  )
                })}
              </div>
              {!submitted && hints.isOpen(c.id) && <HintPanel className="mt-2">{c.hint}</HintPanel>}
              {wrong && <p className="text-xs text-amber-300 mt-2"><span className="font-semibold">{rightBucket?.label}</span> — {c.why}</p>}
            </div>
          )
        })}
      </div>

      {submitted && (
        <div className={`rounded-xl p-4 mb-5 ${correct === cards.length ? 'bg-green-900/30 border border-green-700' : 'bg-amber-900/30 border border-amber-700'}`}>
          <p className="font-bold text-white">{correct} of {cards.length} correct</p>
          {hints.usedCount > 0 && <p className="text-xs text-slate-400 mt-1">{hintTally(hints.usedCount)}</p>}
        </div>
      )}

      {!submitted ? (
        <button onClick={submit} disabled={!allPlaced}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold disabled:opacity-40 hover:opacity-90">
          {allPlaced ? 'Check My Answers' : `Place all ${cards.length} (${Object.keys(placed).length} placed)`}
        </button>
      ) : (
        <button onClick={() => onDone({ correct, total: cards.length })}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold hover:opacity-90">
          Continue →
        </button>
      )}
    </div>
  )
}

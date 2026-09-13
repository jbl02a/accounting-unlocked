import { useState } from 'react'
import { useProgress } from '../../context/ProgressContext'
import { useStagedHints, StagedHint, OptionAutopsy } from '../Hint'
import { shuffleOptions } from '../../lib/shuffle'
import SourceCard from '../SourceCard'

// Multiple choice with an optional stimulus — the AP format. Options are permuted
// at runtime so the answer never sits at a fixed position.
export default function QuizRound({ questions, title = 'Answer the question', onDone }) {
  const { recordQuizResult } = useProgress()
  const [qs] = useState(() => questions.map(q => shuffleOptions(q)))
  const [index, setIndex] = useState(0)
  const [chosen, setChosen] = useState(null)
  const [results, setResults] = useState([])
  const hints = useStagedHints()
  const q = qs[index]

  function pick(i) {
    if (chosen !== null) return
    setChosen(i)
    const right = i === q.correctIndex
    setResults(prev => [...prev, right])
    recordQuizResult(q.id, right)
  }

  function next() {
    const finalResults = [...results]
    if (index + 1 >= qs.length) {
      onDone({
        correct: finalResults.filter(Boolean).length,
        total: qs.length,
        hintSteps: hints.totalRevealed,
        hintQuestions: hints.questionsHinted,
      })
    } else {
      setIndex(i => i + 1); setChosen(null)
    }
  }

  return (
    <div className="max-w-xl mx-auto">
      <div className="flex items-center justify-between mb-5">
        <div>
          <div className="text-sm text-amber-400 font-semibold">Question {index + 1} of {qs.length}</div>
          <h1 className="text-xl font-extrabold text-white">{title}</h1>
        </div>
        <div className="flex gap-1">
          {qs.map((_, i) => (
            <div key={i} className={`w-2.5 h-2.5 rounded-full ${
              i < results.length ? (results[i] ? 'bg-green-500' : 'bg-red-500') : i === index ? 'bg-amber-500' : 'bg-slate-700'}`} />
          ))}
        </div>
      </div>

      {q.stimulus && <div className="mb-4"><SourceCard {...q.stimulus} /></div>}

      <div className="rounded-xl bg-white/5 border border-white/10 p-5 mb-5">
        {q.skill && <p className="text-[10px] font-bold uppercase tracking-wider text-amber-500/70 mb-2">{q.skill}</p>}
        <p className="font-semibold text-white">{q.prompt}</p>
      </div>

      {chosen === null && (q.hints || q.hint) && (
        <StagedHint id={q.id} hints={q.hints || q.hint} shown={hints.revealed(q.id)}
          onReveal={() => hints.reveal(q.id)} onClose={() => hints.close(q.id)} className="mb-5" />
      )}

      <div className="space-y-3 mb-5">
        {q.options.map((opt, i) => {
          const isAnswer = chosen !== null && i === q.correctIndex
          const isWrong = chosen === i && i !== q.correctIndex
          return (
            <button key={i} onClick={() => pick(i)} disabled={chosen !== null}
              className={`w-full text-left rounded-xl border p-3 flex items-start gap-3 transition-colors ${
                isAnswer ? 'border-green-500 bg-green-900/30'
                  : isWrong ? 'border-red-500 bg-red-900/30'
                  : chosen !== null ? 'border-white/10 bg-white/5 opacity-60'
                  : 'border-white/10 bg-white/5 hover:border-amber-400 hover:bg-white/10'}`}>
              <span className="text-xs font-bold text-slate-500 mt-0.5">{'ABCD'[i]}</span>
              <span className="text-sm text-white flex-1">{opt}</span>
              {isAnswer && <span className="text-green-400">✓</span>}
              {isWrong && <span className="text-red-400">✗</span>}
            </button>
          )
        })}
      </div>

      {chosen !== null && (
        <>
          <div className={`rounded-xl p-5 mb-4 ${chosen === q.correctIndex ? 'bg-green-900/30 border border-green-700' : 'bg-amber-900/30 border border-amber-700'}`}>
            <p className="font-bold text-white mb-2">{chosen === q.correctIndex ? '✅ Correct' : '📖 Not quite'}</p>
            <p className="text-sm text-slate-300">{q.explanation}</p>
          </div>

          {q.trap && (
            <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 mb-4">
              <p className="text-[10px] font-bold uppercase tracking-wider text-amber-300 mb-1">Why people miss this one</p>
              <p className="text-sm text-slate-300">{q.trap}</p>
            </div>
          )}

          <OptionAutopsy q={q} chosen={chosen} className="mb-5" />
          <button onClick={next} className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold hover:opacity-90">
            {index + 1 < qs.length ? 'Next Question →' : 'See Results →'}
          </button>
        </>
      )}
    </div>
  )
}

import { useState } from 'react'
import { useProgress } from '../../context/ProgressContext'
import { useStagedHints, StagedHint, OptionAutopsy } from '../Hint'
import { shuffleOptions } from '../../lib/shuffle'
import { tierById, selectByTier, relaxNote } from '../../lib/difficulty'
import SourceCard from '../SourceCard'

// Multiple choice with an optional stimulus — the AP format. Options are permuted
// at runtime so the answer never sits at a fixed position.
//
// The chosen difficulty tier decides three things: which questions are served,
// whether hints are offered, and whether the answer is shown straight away or the
// whole round is graded at the end. Deferred feedback is what makes the top tier
// bite — you cannot tell how you are doing until it is over.
export default function QuizRound({ questions, title = 'Answer the question', onDone }) {
  const { recordQuizResult, difficulty } = useProgress()
  const tier = tierById(difficulty)
  const [note] = useState(() => relaxNote(questions, difficulty))
  const [qs] = useState(() => selectByTier(questions, difficulty).map(q => shuffleOptions(q)))
  const [index, setIndex] = useState(0)
  const [chosen, setChosen] = useState(null)
  const [answers, setAnswers] = useState({})
  const [results, setResults] = useState([])
  const [reviewing, setReviewing] = useState(false)
  const hints = useStagedHints()
  const q = qs[index]

  function pick(i) {
    if (chosen !== null) return
    setChosen(i)
    const right = i === q.correctIndex
    setResults(prev => [...prev, right])
    setAnswers(prev => ({ ...prev, [q.id]: i }))
    recordQuizResult(q.id, right)
  }

  function next() {
    if (index + 1 >= qs.length) {
      // Held feedback: show the whole round before handing back a score.
      if (!tier.instantFeedback) { setReviewing(true); return }
      finish()
    } else {
      setIndex(i => i + 1); setChosen(null)
    }
  }

  function finish() {
    onDone({
      correct: results.filter(Boolean).length,
      total: qs.length,
      hintSteps: hints.totalRevealed,
      hintQuestions: hints.questionsHinted,
    })
  }

  // ── Held-feedback review, shown only at the top tier ───────────────────
  if (reviewing) {
    const correct = results.filter(Boolean).length
    return (
      <div className="max-w-xl mx-auto">
        <div className="mb-5">
          <p className="text-xs font-bold uppercase tracking-wider text-amber-500/80 mb-1">{tier.icon} {tier.label} · round complete</p>
          <h1 className="text-2xl font-extrabold text-white">{correct} of {qs.length}</h1>
          <p className="text-sm text-slate-400 mt-1">
            Every question, with the reasoning. The ones you got right by luck are worth as much of your attention as the ones you missed.
          </p>
        </div>

        <div className="space-y-4 mb-6">
          {qs.map((item, i) => {
            const picked = answers[item.id]
            const right = picked === item.correctIndex
            return (
              <div key={item.id} className={`rounded-xl border p-4 ${right ? 'border-green-700/50 bg-green-900/10' : 'border-red-700/50 bg-red-900/10'}`}>
                <div className="flex items-start gap-2 mb-2">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded ${right ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
                    {right ? '✓' : '✗'} {i + 1}
                  </span>
                  <p className="text-sm font-semibold text-white flex-1">{item.prompt}</p>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed mb-2">{item.explanation}</p>
                {!right && item.trap && (
                  <p className="text-xs text-amber-200/90 leading-relaxed mb-2">
                    <span className="font-semibold text-amber-300">Why people miss it: </span>{item.trap}
                  </p>
                )}
                <OptionAutopsy q={item} chosen={picked} />
              </div>
            )
          })}
        </div>

        <button onClick={finish} className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold hover:opacity-90">
          Done →
        </button>
      </div>
    )
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
              !tier.instantFeedback
                ? (i < results.length ? 'bg-slate-400' : i === index ? 'bg-amber-500' : 'bg-slate-700')
                : i < results.length ? (results[i] ? 'bg-green-500' : 'bg-red-500') : i === index ? 'bg-amber-500' : 'bg-slate-700'}`} />
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2 mb-4 text-[11px]">
        <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-400">
          {tier.icon} {tier.label}
        </span>
        {!tier.instantFeedback && <span className="text-slate-500">Answers held until the end</span>}
        {note && <span className="text-slate-500">· {note}</span>}
      </div>

      {q.stimulus && <div className="mb-4"><SourceCard {...q.stimulus} /></div>}

      <div className="rounded-xl bg-white/5 border border-white/10 p-5 mb-5">
        {q.skill && <p className="text-[10px] font-bold uppercase tracking-wider text-amber-500/70 mb-2">{q.skill}</p>}
        <p className="font-semibold text-white">{q.prompt}</p>
      </div>

      {chosen === null && tier.hints && (q.hints || q.hint) && (
        <StagedHint id={q.id} hints={q.hints || q.hint} shown={hints.revealed(q.id)}
          onReveal={() => hints.reveal(q.id)} onClose={() => hints.close(q.id)} className="mb-5" />
      )}

      <div className="space-y-3 mb-5">
        {q.options.map((opt, i) => {
          const reveal = chosen !== null && tier.instantFeedback
          const isAnswer = reveal && i === q.correctIndex
          const isWrong = reveal && chosen === i && i !== q.correctIndex
          const locked = chosen !== null
          return (
            <button key={i} onClick={() => pick(i)} disabled={locked}
              className={`w-full text-left rounded-xl border p-3 flex items-start gap-3 transition-colors ${
                isAnswer ? 'border-green-500 bg-green-900/30'
                  : isWrong ? 'border-red-500 bg-red-900/30'
                  : locked && chosen === i ? 'border-amber-500 bg-amber-900/30'
                  : locked ? 'border-white/10 bg-white/5 opacity-60'
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
          {tier.instantFeedback ? (
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
            </>
          ) : (
            <div className="rounded-xl border border-white/10 bg-white/5 p-4 mb-5">
              <p className="text-sm text-slate-400">
                Answer locked in. You will see how you did — and why — at the end of the round.
              </p>
            </div>
          )}
          <button onClick={next} className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold hover:opacity-90">
            {index + 1 < qs.length ? 'Next Question →' : tier.instantFeedback ? 'See Results →' : 'Submit the round →'}
          </button>
        </>
      )}
    </div>
  )
}

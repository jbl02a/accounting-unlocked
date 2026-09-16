import { useState } from 'react'
import { useScrollTop } from '../../lib/useScrollTop'
import { useNavigate } from 'react-router-dom'
import { useProgress } from '../../context/ProgressContext'
import { L12_PERIOD_QUIZ as PERIOD_QS } from '../../data/levelQuestions'
import EntryTable from '../../components/EntryTable'
import { useHints, HintBar, hintTally } from '../../components/Hint'
import { shuffleOptions } from '../../lib/shuffle'

const BASIS_ROWS = [
  { q: 'When is REVENUE recorded?', cash: 'When the cash is received.', accrual: 'When it is EARNED — the goods are delivered or the service is performed.' },
  { q: 'When is an EXPENSE recorded?', cash: 'When the cash is paid.', accrual: 'When it is INCURRED — the cost is used up to help earn revenue.' },
  { q: 'Allowed under GAAP?', cash: 'No. It violates revenue recognition and matching.', accrual: 'Yes — GAAP requires it.' },
  { q: 'Why?', cash: 'Simple, and net income is easy to manipulate by timing payments.', accrual: 'Links income measurement to selling, the principal activity of the business.' },
  { q: 'Needs adjusting entries?', cash: 'No.', accrual: 'Yes — that is exactly what they are for.' },
]

const TYPES = [
  {
    id: 'def-exp', family: 'Deferral', label: 'Deferred Expense (Prepaid)',
    timing: 'Cash paid FIRST, expense recorded later',
    plain: 'You pay in advance and get an ASSET. It becomes an expense as it is used up.',
    entry: [{ account: 'Insurance Expense', dr: 600 }, { account: 'Prepaid Insurance', cr: 600 }],
    shape: 'Debit an expense, credit an asset',
  },
  {
    id: 'def-rev', family: 'Deferral', label: 'Deferred Revenue (Unearned)',
    timing: 'Cash received FIRST, revenue recorded later',
    plain: 'They pay you up front, so you owe WORK — a LIABILITY. It becomes revenue as you earn it.',
    entry: [{ account: 'Unearned Revenue', dr: 2000 }, { account: 'Service Revenue', cr: 2000 }],
    shape: 'Debit a liability, credit a revenue',
  },
  {
    id: 'acc-rev', family: 'Accrual', label: 'Accrued Revenue',
    timing: 'Revenue recorded FIRST, cash comes later',
    plain: 'You did the work but have not billed or been paid yet.',
    entry: [{ account: 'Accounts Receivable', dr: 2000 }, { account: 'Service Revenue', cr: 2000 }],
    shape: 'Debit an asset, credit a revenue',
  },
  {
    id: 'acc-exp', family: 'Accrual', label: 'Accrued Expense',
    timing: 'Expense recorded FIRST, cash paid later',
    plain: 'You used something — wages, utilities, interest — but have not paid for it yet.',
    entry: [{ account: 'Salaries Expense', dr: 2000 }, { account: 'Salaries Payable', cr: 2000 }],
    shape: 'Debit an expense, credit a liability',
  },
]


const CLASSIFY = [
  { id: 'c1', text: 'On October 1, Cedar Ridge paid $7,200 for an 18-month insurance policy and debited Prepaid Insurance.', answer: 'def-exp',
    hint: 'Cash left on October 1 — before any coverage was used. Cash first means it is one of the two deferrals. Did the company pay, or get paid?' },
  { id: 'c2', text: 'A client paid Cedar Ridge $48,000 in advance for two years of consulting starting next month.', answer: 'def-rev',
    hint: 'Cash arrived before any work was done. Cash first means a deferral. Was it cash out (an expense waiting to happen) or cash in (revenue waiting to be earned)?' },
  { id: 'c3', text: 'Cedar Ridge completed $12,000 of work in December but has not yet sent the invoice.', answer: 'acc-rev',
    hint: 'The work is finished but no cash has moved and nothing has been recorded. Revenue first, cash later — which family is that?' },
  { id: 'c4', text: 'The December utility bill of $840 arrived and will be paid in January.', answer: 'acc-exp',
    hint: 'The electricity was already used in December; the payment happens later. Expense first, cash later.' },
  { id: 'c5', text: 'A physical count shows only $1,900 of the $7,600 of supplies purchased remains on hand.', answer: 'def-exp',
    hint: 'The supplies were bought and paid for earlier and recorded as an asset. Now part of that asset has been used up. Which family records cash first and the expense later?' },
  { id: 'c6', text: 'Cedar Ridge owes $3,600 of interest on a bank note that will not be paid until the note matures next year.', answer: 'acc-exp',
    hint: 'The company has had the use of the borrowed money all period, so the cost has been incurred — but no cash has moved yet.' },
]

export default function Level12() {
  const navigate = useNavigate()
  const { completeLevel, recordQuizResult, recordTask } = useProgress()
  const [phase, setPhase] = useState('learn')
  const [round, setRound] = useState(1)
  const [qIndex, setQIndex] = useState(0)
  const [chosen, setChosen] = useState(null)
  const [qResults, setQResults] = useState([])
  const [cIndex, setCIndex] = useState(0)
  const [cChosen, setCChosen] = useState(null)
  const [cResults, setCResults] = useState([])
  const [done, setDone] = useState(false)
  const [periodQs, setPeriodQs] = useState(() => PERIOD_QS.map(q => shuffleOptions(q)))
  useScrollTop([phase])
  const hints = useHints()

  const total = PERIOD_QS.length + CLASSIFY.length
  const earned = qResults.filter(Boolean).length + cResults.filter(Boolean).length

  function restart() {
    setRound(1); setQIndex(0); setChosen(null); setQResults([]); setPeriodQs(PERIOD_QS.map(q => shuffleOptions(q)))
    setCIndex(0); setCChosen(null); setCResults([]); setDone(false); hints.reset()
  }

  if (phase === 'learn') {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <div className="text-sm text-blue-400 font-semibold mb-1">Level 12</div>
          <h1 className="text-3xl font-extrabold text-white mb-2">Accrual Accounting &amp; Why We Adjust</h1>
          <p className="text-slate-300">Chapter 3 opens here. Everything about adjusting entries follows from one idea: cash almost never moves in the same period as the revenue or expense it belongs to.</p>
        </div>

        <div className="rounded-xl border border-white/10 overflow-hidden mb-6">
          <div className="grid grid-cols-[9rem_1fr_1fr] bg-slate-800 text-[10px] font-bold text-dim uppercase tracking-wider px-3 py-2 gap-2">
            <span></span><span>Cash Basis</span><span className="text-blue-300">Accrual Basis (GAAP)</span>
          </div>
          {BASIS_ROWS.map((r, i) => (
            <div key={i} className="grid grid-cols-[9rem_1fr_1fr] px-3 py-2 gap-2 text-xs border-t border-white/5">
              <span className="font-semibold text-blue-300">{r.q}</span>
              <span className="text-dim">{r.cash}</span>
              <span className="text-slate-200">{r.accrual}</span>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-blue-500/30 bg-blue-500/10 p-5 mb-6">
          <p className="text-xs font-bold uppercase tracking-wider text-blue-300 mb-2">What an adjusting entry is</p>
          <p className="text-white font-semibold mb-2">
            A journal entry made at the END of a period to record the completed portion of a partially completed transaction.
          </p>
          <p className="text-sm text-slate-300 mb-4">
            A 24-month insurance policy does not care that your fiscal year ends December 31. At period end you record however much of it belongs to THIS period — no more, no less.
          </p>
          <p className="text-xs font-bold uppercase tracking-wider text-blue-300 mb-2">The three rules</p>
          <div className="space-y-2">
            {[
              { rule: 'NEVER Cash', detail: 'If your adjusting entry touches Cash, it is wrong. Adjustments exist because the cash moved in a different period.' },
              { rule: 'End of period only', detail: 'They are made after the unadjusted trial balance and before the financial statements.' },
              { rule: 'One income statement account AND one balance sheet account', detail: 'Every adjustment moves an amount between the two statements. Never two of the same kind.' },
            ].map((r, i) => (
              <div key={i} className="flex gap-3 rounded-xl bg-black/20 p-3">
                <span className="shrink-0 w-6 h-6 rounded-full bg-white/10 text-white text-xs font-bold flex items-center justify-center">{i + 1}</span>
                <div>
                  <p className="font-bold text-sm text-white">{r.rule}</p>
                  <p className="text-xs text-slate-300">{r.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <h3 className="font-bold text-white mb-1">The four types — and the only question that sorts them</h3>
        <p className="text-sm text-slate-300 mb-4">
          Ask: <span className="text-white font-semibold">did the cash move first, or did the revenue/expense happen first?</span> Cash first = a DEFERRAL. Cash later = an ACCRUAL.
        </p>
        <div className="space-y-3 mb-6">
          {TYPES.map(t => (
            <div key={t.id} className={`rounded-xl border p-4 ${t.family === 'Deferral' ? 'border-amber-500/30 bg-amber-500/10' : 'border-emerald-500/30 bg-emerald-500/10'}`}>
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${t.family === 'Deferral' ? 'bg-amber-500/20 text-amber-300' : 'bg-emerald-500/20 text-emerald-300'}`}>{t.family}</span>
                <p className="font-bold text-white text-sm">{t.label}</p>
              </div>
              <p className="text-xs text-slate-300 mb-1">{t.timing}</p>
              <p className="text-sm text-slate-300 mb-3">{t.plain}</p>
              <EntryTable lines={t.entry} dense />
              <p className="text-xs text-slate-300 mt-2"><span className="text-white font-semibold">Shape:</span> {t.shape}</p>
            </div>
          ))}
        </div>

        <button onClick={() => setPhase('play')} className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-lg hover:opacity-90">
          Practice: {total} questions →
        </button>
        <button onClick={() => { completeLevel(12); navigate('/') }} className="w-full mt-3 py-2.5 rounded-xl text-sm text-dim hover:text-white hover:bg-white/5">
          Skip the practice — mark this lesson read
        </button>
      </div>
    )
  }

  if (done) {
    const pct = Math.round((earned / total) * 100)
    return (
      <div className="max-w-xl mx-auto text-center">
        <div className="text-5xl mb-4">{pct === 100 ? '🎉' : '📘'}</div>
        <h2 className="text-3xl font-extrabold text-white mb-2">Accrual Basics Complete</h2>
        <p className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 mb-2">{earned} / {total}</p>
        {hints.usedCount > 0 && <p className="text-xs text-slate-300 mb-3">{hintTally(hints.usedCount)}</p>}
        <p className="text-slate-300 mb-8">
          {pct === 100 ? 'You can sort any adjustment into its type. Now go make the entries.'
            : 'Re-read the four types — the sorting question is always "did cash move first?"'}
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <button onClick={restart} className="flex-1 py-3 rounded-xl bg-white/10 text-white font-semibold hover:bg-white/20">Try Again</button>
          <button onClick={() => setPhase('learn')} className="flex-1 py-3 rounded-xl bg-white/10 text-white font-semibold hover:bg-white/20">Review Lesson</button>
          <button onClick={() => navigate('/level/13')} className="flex-1 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold hover:opacity-90">Level 13 →</button>
        </div>
      </div>
    )
  }

  if (round === 1) {
    const q = periodQs[qIndex]
    return (
      <div className="max-w-xl mx-auto">
        <div className="flex items-center justify-between mb-5">
          <div>
            <div className="text-sm text-blue-400 font-semibold">Level 12 — Round 1, question {qIndex + 1} of {PERIOD_QS.length}</div>
            <h1 className="text-xl font-extrabold text-white">Which period does it belong to?</h1>
          </div>
          <div className="flex gap-1">
            {PERIOD_QS.map((_, i) => (
              <div key={i} className={`w-2.5 h-2.5 rounded-full ${i < qResults.length ? (qResults[i] ? 'bg-green-500' : 'bg-red-500') : i === qIndex ? 'bg-blue-500' : 'bg-slate-700'}`} />
            ))}
          </div>
        </div>
        <div className="rounded-xl bg-indigo-500/10 border border-indigo-500/20 p-5 mb-5">
          <p className="font-semibold text-white">{q.prompt}</p>
        </div>
        {chosen === null && <HintBar open={hints.isOpen(q.id)} onToggle={() => hints.toggle(q.id)} text={q.hint} className="mb-5" />}
        <div className="space-y-3 mb-5">
          {q.options.map((opt, i) => {
            const isAnswer = chosen !== null && i === q.correctIndex
            const isWrong = chosen === i && i !== q.correctIndex
            return (
              <button key={i} onClick={() => { if (chosen !== null) return; setChosen(i); setQResults(p => [...p, i === q.correctIndex]); recordQuizResult(q.id, i === q.correctIndex) }}
                disabled={chosen !== null}
                className={`w-full text-left rounded-xl border p-3 flex items-start gap-3 transition-colors ${
                  isAnswer ? 'border-green-500 bg-green-900/30' : isWrong ? 'border-red-500 bg-red-900/30'
                  : chosen !== null ? 'border-white/10 bg-white/5 opacity-60' : 'border-white/10 bg-white/5 hover:border-blue-400 hover:bg-white/10'}`}>
                <span className="text-xs font-bold text-dim mt-0.5">{'ABCD'[i]}</span>
                <span className="text-sm text-white flex-1">{opt}</span>
                {isAnswer && <span className="text-green-400">✓</span>}
                {isWrong && <span className="text-red-400">✗</span>}
              </button>
            )
          })}
        </div>
        {chosen !== null && (
          <>
            <div className={`rounded-xl p-5 mb-5 ${chosen === q.correctIndex ? 'bg-green-900/30 border border-green-700' : 'bg-amber-900/30 border border-amber-700'}`}>
              <p className="font-bold text-white mb-2">{chosen === q.correctIndex ? '✅ Correct' : '📖 Not quite'}</p>
              <p className="text-sm text-slate-300">{q.explanation}</p>
            </div>
            <button onClick={() => {
              if (qIndex + 1 >= PERIOD_QS.length) { setRound(2) } else { setQIndex(i => i + 1); setChosen(null) }
            }} className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold hover:opacity-90">
              {qIndex + 1 < PERIOD_QS.length ? 'Next Question →' : 'Round 2: Sort the adjustments →'}
            </button>
          </>
        )}
      </div>
    )
  }

  const c = CLASSIFY[cIndex]
  return (
    <div className="max-w-xl mx-auto">
      <div className="flex items-center justify-between mb-5">
        <div>
          <div className="text-sm text-blue-400 font-semibold">Level 12 — Round 2, scenario {cIndex + 1} of {CLASSIFY.length}</div>
          <h1 className="text-xl font-extrabold text-white">Which type of adjustment?</h1>
        </div>
        <div className="flex gap-1">
          {CLASSIFY.map((_, i) => (
            <div key={i} className={`w-2.5 h-2.5 rounded-full ${i < cResults.length ? (cResults[i] ? 'bg-green-500' : 'bg-red-500') : i === cIndex ? 'bg-blue-500' : 'bg-slate-700'}`} />
          ))}
        </div>
      </div>
      <div className="rounded-xl bg-indigo-500/10 border border-indigo-500/20 p-5 mb-5">
        <p className="font-semibold text-white">{c.text}</p>
      </div>
      {cChosen === null && <HintBar open={hints.isOpen(c.id)} onToggle={() => hints.toggle(c.id)} text={c.hint} className="mb-5" />}
      <div className="grid sm:grid-cols-2 gap-3 mb-5">
        {TYPES.map(t => {
          const isAnswer = cChosen !== null && t.id === c.answer
          const isWrong = cChosen === t.id && t.id !== c.answer
          return (
            <button key={t.id} onClick={() => { if (cChosen !== null) return; setCChosen(t.id); setCResults(p => [...p, t.id === c.answer]); recordTask(`L12-${c.id}`, t.id === c.answer, `Which kind of adjustment? — ${c.text.slice(0, 46)}…`, 12) }}
              disabled={cChosen !== null}
              className={`text-left rounded-xl border p-3 transition-colors ${
                isAnswer ? 'border-green-500 bg-green-900/30' : isWrong ? 'border-red-500 bg-red-900/30'
                : cChosen !== null ? 'border-white/10 bg-white/5 opacity-60' : 'border-white/10 bg-white/5 hover:border-blue-400 hover:bg-white/10'}`}>
              <p className="text-sm font-semibold text-white">{t.label}</p>
              <p className="text-[11px] text-slate-300 mt-0.5">{t.timing}</p>
            </button>
          )
        })}
      </div>
      {cChosen !== null && (
        <>
          <div className={`rounded-xl p-5 mb-5 ${cChosen === c.answer ? 'bg-green-900/30 border border-green-700' : 'bg-amber-900/30 border border-amber-700'}`}>
            <p className="font-bold text-white mb-2">{cChosen === c.answer ? '✅ Correct' : `📖 This is a ${TYPES.find(t => t.id === c.answer).label}`}</p>
            <p className="text-sm text-slate-300 mb-3">{TYPES.find(t => t.id === c.answer).plain}</p>
            <EntryTable lines={TYPES.find(t => t.id === c.answer).entry} dense />
            <p className="text-xs text-slate-300 mt-2">Shape: {TYPES.find(t => t.id === c.answer).shape} (amounts will differ).</p>
          </div>
          <button onClick={() => {
            if (cIndex + 1 >= CLASSIFY.length) {
              completeLevel(12, Math.round((earned / total) * 100)); setDone(true)
            } else { setCIndex(i => i + 1); setCChosen(null) }
          }} className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold hover:opacity-90">
            {cIndex + 1 < CLASSIFY.length ? 'Next Scenario →' : 'See My Results →'}
          </button>
        </>
      )}
    </div>
  )
}

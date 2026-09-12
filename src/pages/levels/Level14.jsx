import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useProgress } from '../../context/ProgressContext'
import { L14_EFFECTS_QUIZ as EFFECTS } from '../../data/levelQuestions'
import EntryTable, { money } from '../../components/EntryTable'
import { useHints, HintBar, hintTally } from '../../components/Hint'
import { shuffleOptions, shuffleFields } from '../../lib/shuffle'

// Summit Analytics — parallel in structure to the assigned accrual problems.
const ITEMS = [
  {
    id: 'wages',
    emoji: '👷',
    scenario: 'Summit Analytics owes its employees $6,200 for work performed during the last week of December 2025. These wages will not be paid until January 8, 2026.',
    hint: 'The work is already done, so the cost has been incurred — that settles which period it belongs to. Nothing has been paid, so the other side of the entry is an obligation. What kind of account records an obligation?',
    math: 'No computation needed — the problem gives you the amount directly. $6,200 of work was performed in December.',
    amount: 6200,
    debit: 'Salaries Expense',
    credit: 'Salaries Payable',
    debitOptions: ['Salaries Expense', 'Salaries Payable', 'Cash', 'Accounts Payable'],
    creditOptions: ['Salaries Payable', 'Salaries Expense', 'Cash', 'Accounts Receivable'],
    explanation: 'The employees worked in December, so the expense belongs to December regardless of when payday falls. Because no cash has moved, the credit creates a liability. (Some problems call this Wages Expense and Wages Payable — same accounts, different label.)',
  },
  {
    id: 'revenue',
    emoji: '📄',
    scenario: 'Summit performed $28,500 of consulting services for a client during December. The invoice has not yet been sent.',
    hint: 'The service is complete, so under revenue recognition it is earned now — an unsent invoice does not change that. The debit is the company’s right to collect the money later.',
    math: 'No computation needed — $28,500 of services were performed.',
    amount: 28500,
    debit: 'Accounts Receivable',
    credit: 'Service Revenue',
    debitOptions: ['Accounts Receivable', 'Service Revenue', 'Cash', 'Unearned Revenue'],
    creditOptions: ['Service Revenue', 'Accounts Receivable', 'Cash', 'Unearned Revenue'],
    explanation: 'This is accrued revenue: earned but neither billed nor collected. Not sending the invoice does not postpone the revenue — the performance obligation was satisfied in December.',
  },
  {
    id: 'utilities',
    emoji: '💡',
    scenario: 'Summit received its December utility bill for $740. It will be paid in January 2026.',
    hint: 'The electricity was already burned in December, so the cost belongs to December. The bill is unpaid, so the credit side is what the company now owes.',
    math: 'No computation needed — the bill is for $740 of December electricity.',
    amount: 740,
    debit: 'Utilities Expense',
    credit: 'Utilities Payable',
    debitOptions: ['Utilities Expense', 'Utilities Payable', 'Cash', 'Prepaid Utilities'],
    creditOptions: ['Utilities Payable', 'Utilities Expense', 'Cash', 'Accounts Receivable'],
    explanation: 'Receiving a bill is not what triggers the expense — using the electricity is. December usage means a December expense, with the unpaid amount sitting in a payable.',
  },
  {
    id: 'interest',
    emoji: '🏦',
    scenario: 'On March 1, 2025, Summit borrowed $150,000 from Regions Bank on a 5-year, 6% note payable. Interest and principal are due at maturity, so no interest has been paid.',
    hint: 'Use Interest = Principal × Rate × Time. Principal and rate are given. The one you have to work out is TIME: count the months from March 1 to December 31 and write that as a fraction of a year.',
    math: '$150,000 × 6% × 10/12 = $7,500. March through December is 10 months, so time = 10/12 of a year.',
    amount: 7500,
    debit: 'Interest Expense',
    credit: 'Interest Payable',
    debitOptions: ['Interest Expense', 'Interest Payable', 'Notes Payable', 'Cash'],
    creditOptions: ['Interest Payable', 'Interest Expense', 'Notes Payable', 'Cash'],
    explanation: 'Summit has had the use of the money for 10 months, so 10 months of interest has been incurred even though the note does not come due for years. Note the credit is Interest Payable, NOT Notes Payable — the $150,000 principal is unchanged; only the interest owed is new.',
  },
]


function parseAmount(raw) {
  const c = String(raw).replace(/[^0-9.]/g, '')
  return c === '' ? null : Number(c)
}

export default function Level14() {
  const navigate = useNavigate()
  const { completeLevel, recordQuizResult, recordTask } = useProgress()
  const [phase, setPhase] = useState('learn')
  const [round, setRound] = useState(1)
  const [index, setIndex] = useState(0)
  const [amount, setAmount] = useState('')
  const [debit, setDebit] = useState('')
  const [credit, setCredit] = useState('')
  const [checked, setChecked] = useState(false)
  const [entryResults, setEntryResults] = useState([])
  const [eIndex, setEIndex] = useState(0)
  const [eChosen, setEChosen] = useState(null)
  const [eResults, setEResults] = useState([])
  const [done, setDone] = useState(false)
  const [items, setItems] = useState(() => ITEMS.map(i => shuffleFields(i, ['debitOptions', 'creditOptions'])))
  const [effects, setEffects] = useState(() => EFFECTS.map(q => shuffleOptions(q)))
  const hints = useHints()

  const item = items[index]
  const amountRight = parseAmount(amount) === item.amount
  const debitRight = debit === item.debit
  const creditRight = credit === item.credit
  const entryRight = amountRight && debitRight && creditRight
  const total = ITEMS.length + EFFECTS.length
  const earned = entryResults.filter(Boolean).length + eResults.filter(Boolean).length

  function restart() {
    setRound(1); setIndex(0); setAmount(''); setDebit(''); setCredit(''); setChecked(false)
    setEntryResults([]); setEIndex(0); setEChosen(null); setEResults([]); setDone(false); hints.reset()
    setItems(ITEMS.map(i => shuffleFields(i, ['debitOptions', 'creditOptions'])))
    setEffects(EFFECTS.map(q => shuffleOptions(q)))
  }

  if (phase === 'learn') {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <div className="text-sm text-emerald-400 font-semibold mb-1">Level 14</div>
          <h1 className="text-3xl font-extrabold text-white mb-2">Accruals — Cash Comes Later</h1>
          <p className="text-slate-400">The revenue was earned or the expense was incurred, but no cash has moved and nothing has been recorded yet. These are the entries people forget.</p>
        </div>

        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5 mb-6">
          <p className="text-xs font-bold uppercase tracking-wider text-emerald-300 mb-2">The pattern</p>
          <p className="text-white font-semibold mb-3">Nothing has been recorded at all yet. The adjustment puts BOTH halves on the books for the first time.</p>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="rounded-xl bg-black/20 p-3">
              <p className="font-bold text-emerald-300 text-sm mb-1">Accrued REVENUE</p>
              <p className="text-xs text-slate-400 mb-2">Work done, not billed or collected.</p>
              <EntryTable lines={[{ account: 'Accounts Receivable', dr: 2000 }, { account: 'Service Revenue', cr: 2000 }]} dense />
              <p className="text-[11px] text-slate-400 mt-2">Debit an ASSET, credit a REVENUE.</p>
            </div>
            <div className="rounded-xl bg-black/20 p-3">
              <p className="font-bold text-emerald-300 text-sm mb-1">Accrued EXPENSE</p>
              <p className="text-xs text-slate-400 mb-2">Cost used, not yet paid.</p>
              <EntryTable lines={[{ account: 'Salaries Expense', dr: 2000 }, { account: 'Salaries Payable', cr: 2000 }]} dense />
              <p className="text-[11px] text-slate-400 mt-2">Debit an EXPENSE, credit a LIABILITY.</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-white/5 border border-white/10 p-5 mb-6">
          <h3 className="font-bold text-white mb-2">Accruing interest — the one that needs a calculation</h3>
          <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/30 p-4 mb-3 text-center">
            <p className="text-lg font-bold text-white font-mono">Interest = Principal × Rate × Time</p>
            <p className="text-xs text-slate-400 mt-1">Time is the fraction of a YEAR the money has been borrowed — count the months and put them over 12.</p>
          </div>
          <div className="rounded-lg bg-slate-900/60 border border-white/10 p-3 mb-3">
            <p className="text-sm text-slate-300 mb-2">Borrowed $150,000 at 6% on <span className="text-white font-semibold">March 1</span>. What has accrued by December 31?</p>
            <p className="text-xs text-slate-400 mb-1">March, April, May, June, July, August, September, October, November, December = <span className="text-white font-semibold">10 months</span>.</p>
            <p className="text-sm font-mono text-emerald-300">$150,000 × 0.06 × 10/12 = $7,500</p>
          </div>
          <div className="rounded-lg bg-amber-500/10 border border-amber-500/30 p-3">
            <p className="text-sm text-white font-semibold mb-1">Two things people get wrong</p>
            <p className="text-xs text-slate-300 mb-1">
              1. Using a full year. The rate is <span className="text-white">annual</span>; if the money was only borrowed for part of the year, only that part has accrued.
            </p>
            <p className="text-xs text-slate-300">
              2. Crediting Notes Payable. The principal has not changed — only the interest is newly owed, so it goes to <span className="text-white">Interest Payable</span>.
            </p>
          </div>
        </div>

        <button onClick={() => setPhase('play')} className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-lg hover:opacity-90">
          Prepare 4 entries, then 4 effects questions →
        </button>
        <button onClick={() => { completeLevel(14); navigate('/') }} className="w-full mt-3 py-2.5 rounded-xl text-sm text-slate-400 hover:text-white hover:bg-white/5">
          Skip the practice — mark this lesson read
        </button>
      </div>
    )
  }

  if (done) {
    const pct = Math.round((earned / total) * 100)
    return (
      <div className="max-w-xl mx-auto text-center">
        <div className="text-5xl mb-4">{pct === 100 ? '🎉' : '⏳'}</div>
        <h2 className="text-3xl font-extrabold text-white mb-2">Accruals Complete</h2>
        <p className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400 mb-2">{earned} / {total}</p>
        {hints.usedCount > 0 && <p className="text-xs text-slate-500 mb-3">{hintTally(hints.usedCount)}</p>}
        <p className="text-slate-400 mb-8">
          {pct === 100 ? 'Entries and effects both. You are ready for the closing process.'
            : 'The effects questions are pure exam bait — re-read them until the pattern is automatic.'}
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <button onClick={restart} className="flex-1 py-3 rounded-xl bg-white/10 text-white font-semibold hover:bg-white/20">Try Again</button>
          <button onClick={() => setPhase('learn')} className="flex-1 py-3 rounded-xl bg-white/10 text-white font-semibold hover:bg-white/20">Review Lesson</button>
          <button onClick={() => navigate('/level/15')} className="flex-1 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold hover:opacity-90">Level 15 →</button>
        </div>
      </div>
    )
  }

  const selCls = (ok, wrong) => ok ? 'border-green-500' : wrong ? 'border-red-500' : 'border-slate-600'

  if (round === 1) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-5">
          <div>
            <div className="text-sm text-emerald-400 font-semibold">Level 14 — Entry {index + 1} of {ITEMS.length}</div>
            <h1 className="text-xl font-extrabold text-white">Prepare the adjusting entry</h1>
          </div>
          <div className="flex gap-1">
            {ITEMS.map((_, i) => (
              <div key={i} className={`w-2.5 h-2.5 rounded-full ${i < entryResults.length ? (entryResults[i] ? 'bg-green-500' : 'bg-red-500') : i === index ? 'bg-emerald-500' : 'bg-slate-700'}`} />
            ))}
          </div>
        </div>

        <div className="rounded-xl bg-teal-500/10 border border-teal-500/20 p-5 mb-5">
          <div className="flex items-start gap-3">
            <span className="text-3xl">{item.emoji}</span>
            <div>
              <p className="font-semibold text-white mb-2">{item.scenario}</p>
              <p className="text-sm text-teal-300">Prepare the adjusting entry at December 31, 2025.</p>
            </div>
          </div>
        </div>

        {!checked && <HintBar open={hints.isOpen(item.id)} onToggle={() => hints.toggle(item.id)} text={item.hint} className="mb-4" />}

        <div className="rounded-xl border border-white/10 bg-slate-900/50 p-4 mb-4">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Amount</label>
          <div className="flex gap-2 mb-4">
            <span className="flex items-center px-3 rounded-lg bg-slate-800 border border-slate-600 text-slate-400 font-mono">$</span>
            <input inputMode="numeric" value={amount} onChange={e => !checked && setAmount(e.target.value)} disabled={checked} placeholder="0"
              className={`flex-1 rounded-lg border bg-slate-800 px-3 py-2 font-mono text-right text-white outline-none focus:ring-1 focus:ring-emerald-500 disabled:opacity-70 ${checked ? selCls(amountRight, !amountRight) : 'border-slate-600'}`} />
          </div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Debit</label>
          <select value={debit} onChange={e => !checked && setDebit(e.target.value)} disabled={checked}
            className={`w-full mb-3 rounded-lg border bg-slate-800 px-3 py-2 text-sm text-white outline-none focus:ring-1 focus:ring-emerald-500 disabled:opacity-70 ${checked ? selCls(debitRight, !debitRight) : 'border-slate-600'}`}>
            <option value="">Select the account to DEBIT…</option>
            {item.debitOptions.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Credit</label>
          <select value={credit} onChange={e => !checked && setCredit(e.target.value)} disabled={checked}
            className={`w-full rounded-lg border bg-slate-800 px-3 py-2 text-sm text-white outline-none focus:ring-1 focus:ring-emerald-500 disabled:opacity-70 ${checked ? selCls(creditRight, !creditRight) : 'border-slate-600'}`}>
            <option value="">Select the account to CREDIT…</option>
            {item.creditOptions.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
        </div>

        {checked && (
          <div className={`rounded-xl p-5 mb-5 ${entryRight ? 'bg-green-900/30 border border-green-700' : 'bg-amber-900/30 border border-amber-700'}`}>
            <p className="font-bold text-white mb-3">{entryRight ? '✅ Correct entry' : '📖 The correct entry is:'}</p>
            <EntryTable date="Dec 31" lines={[{ account: item.debit, dr: item.amount }, { account: item.credit, cr: item.amount }]} dense />
            <p className="text-sm text-emerald-200 font-mono mt-3">{item.math}</p>
            <p className="text-sm text-slate-300 mt-2">{item.explanation}</p>
          </div>
        )}

        {!checked ? (
          <button onClick={() => { setChecked(true); setEntryResults(p => [...p, entryRight]); recordTask(`L14-${item.id}`, entryRight, `Accrual entry — ${item.scenario.slice(0, 50)}…`, 14) }}
            disabled={parseAmount(amount) === null || !debit || !credit}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold disabled:opacity-40 hover:opacity-90">
            {parseAmount(amount) === null || !debit || !credit ? 'Enter an amount and both accounts' : 'Check My Entry'}
          </button>
        ) : (
          <button onClick={() => {
            if (index + 1 >= ITEMS.length) setRound(2)
            else { setIndex(i => i + 1); setAmount(''); setDebit(''); setCredit(''); setChecked(false) }
          }} className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold hover:opacity-90">
            {index + 1 < ITEMS.length ? 'Next Entry →' : 'Round 2: What if you forgot? →'}
          </button>
        )}
      </div>
    )
  }

  const e = effects[eIndex]
  return (
    <div className="max-w-xl mx-auto">
      <div className="flex items-center justify-between mb-5">
        <div>
          <div className="text-sm text-emerald-400 font-semibold">Level 14 — Round 2, question {eIndex + 1} of {EFFECTS.length}</div>
          <h1 className="text-xl font-extrabold text-white">The effect of a missing entry</h1>
        </div>
        <div className="flex gap-1">
          {EFFECTS.map((_, i) => (
            <div key={i} className={`w-2.5 h-2.5 rounded-full ${i < eResults.length ? (eResults[i] ? 'bg-green-500' : 'bg-red-500') : i === eIndex ? 'bg-emerald-500' : 'bg-slate-700'}`} />
          ))}
        </div>
      </div>
      <div className="rounded-xl bg-teal-500/10 border border-teal-500/20 p-5 mb-5">
        <p className="font-semibold text-white">{e.prompt}</p>
      </div>
      {eChosen === null && <HintBar open={hints.isOpen(e.id)} onToggle={() => hints.toggle(e.id)} text={e.hint} className="mb-5" />}
      <div className="space-y-3 mb-5">
        {e.options.map((opt, i) => {
          const isAnswer = eChosen !== null && i === e.correctIndex
          const isWrong = eChosen === i && i !== e.correctIndex
          return (
            <button key={i} onClick={() => { if (eChosen !== null) return; setEChosen(i); setEResults(p => [...p, i === e.correctIndex]); recordQuizResult(e.id, i === e.correctIndex) }}
              disabled={eChosen !== null}
              className={`w-full text-left rounded-xl border p-3 flex items-start gap-3 transition-colors ${
                isAnswer ? 'border-green-500 bg-green-900/30' : isWrong ? 'border-red-500 bg-red-900/30'
                : eChosen !== null ? 'border-white/10 bg-white/5 opacity-60' : 'border-white/10 bg-white/5 hover:border-emerald-400 hover:bg-white/10'}`}>
              <span className="text-xs font-bold text-slate-500 mt-0.5">{'ABCD'[i]}</span>
              <span className="text-sm text-white flex-1">{opt}</span>
              {isAnswer && <span className="text-green-400">✓</span>}
              {isWrong && <span className="text-red-400">✗</span>}
            </button>
          )
        })}
      </div>
      {eChosen !== null && (
        <>
          <div className={`rounded-xl p-5 mb-5 ${eChosen === e.correctIndex ? 'bg-green-900/30 border border-green-700' : 'bg-amber-900/30 border border-amber-700'}`}>
            <p className="font-bold text-white mb-2">{eChosen === e.correctIndex ? '✅ Correct' : '📖 Not quite'}</p>
            <p className="text-sm text-slate-300">{e.explanation}</p>
          </div>
          <button onClick={() => {
            if (eIndex + 1 >= EFFECTS.length) {
              completeLevel(14, Math.round((earned / total) * 100)); setDone(true)
            } else { setEIndex(i => i + 1); setEChosen(null) }
          }} className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold hover:opacity-90">
            {eIndex + 1 < EFFECTS.length ? 'Next Question →' : 'See My Results →'}
          </button>
        </>
      )}
    </div>
  )
}

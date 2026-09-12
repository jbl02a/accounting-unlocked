import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useProgress } from '../../context/ProgressContext'
import EntryTable, { money } from '../../components/EntryTable'
import { useHints, HintBar, hintTally } from '../../components/Hint'
import { shuffleFields } from '../../lib/shuffle'

// Cedar Ridge Consulting — parallel in structure to the assigned deferral problems.
const ITEMS = [
  {
    id: 'ins',
    emoji: '🛡️',
    scenario: 'On October 1, 2025, Cedar Ridge paid $7,200 for an 18-month insurance policy. Coverage began October 1, and the full amount was debited to Prepaid Insurance when paid.',
    ask: 'Prepare the adjusting entry at December 31, 2025.',
    hint: 'Two steps. First find the cost of ONE month ($7,200 spread over 18 months). Then count how many months of coverage have actually been used up by December 31 — October, November and December. Multiply.',
    math: '$7,200 ÷ 18 months = $400 per month. October, November and December = 3 months used. 3 × $400 = $1,200 expired.',
    amount: 1200,
    debit: 'Insurance Expense',
    credit: 'Prepaid Insurance',
    debitOptions: ['Insurance Expense', 'Prepaid Insurance', 'Cash', 'Unearned Revenue'],
    creditOptions: ['Prepaid Insurance', 'Insurance Expense', 'Cash', 'Accounts Payable'],
    explanation: 'Only the USED portion becomes an expense. The other $6,000 stays in Prepaid Insurance as an asset — it is coverage Cedar Ridge is still owed. Note Cash is not touched: the cash moved back on October 1.',
    followUp: { q: 'What is the balance left in Prepaid Insurance after this entry?', answer: 6000, hint: 'You started with $7,200 in the asset account and just moved part of it to expense. What is left?' },
  },
  {
    id: 'sup',
    emoji: '📦',
    scenario: 'Cedar Ridge began 2025 with $2,400 of supplies on hand and purchased $7,600 more during the year. A physical count on December 31 found $1,900 of supplies still on hand.',
    ask: 'Prepare the adjusting entry at December 31, 2025.',
    hint: 'Do not reach for one of the numbers in the problem — none of them is the answer. Add what the company started with to what it bought to get what was AVAILABLE, then subtract what is left on the shelf. The difference is what got used.',
    math: '$2,400 beginning + $7,600 purchased = $10,000 available. Less $1,900 still on hand = $8,100 used up.',
    amount: 8100,
    debit: 'Supplies Expense',
    credit: 'Supplies',
    debitOptions: ['Supplies Expense', 'Supplies', 'Cash', 'Accounts Payable'],
    creditOptions: ['Supplies', 'Supplies Expense', 'Cash', 'Prepaid Insurance'],
    explanation: 'The count tells you what is LEFT, not what was used. Beginning + purchased − ending = used. The $1,900 remaining stays in the Supplies asset account and carries into next year.',
    followUp: { q: 'What balance remains in the Supplies account after this entry?', answer: 1900, hint: 'The physical count already told you this one directly — it is what is still sitting on the shelf.' },
  },
  {
    id: 'unearned',
    emoji: '📅',
    scenario: 'On January 1, 2025, a client paid Cedar Ridge $48,000 in full for a 2-year consulting contract. The full amount was credited to Unearned Revenue. By December 31, one full year of service had been provided.',
    ask: 'Prepare the adjusting entry at December 31, 2025.',
    hint: 'The company has now delivered one of the two years it was paid for. What fraction of the $48,000 has been EARNED? Remember the account holding that money is a liability — to shrink a liability you debit it.',
    math: '$48,000 ÷ 2 years = $24,000 per year. One year has been delivered, so $24,000 has been earned.',
    amount: 24000,
    debit: 'Unearned Revenue',
    credit: 'Service Revenue',
    debitOptions: ['Unearned Revenue', 'Service Revenue', 'Cash', 'Accounts Receivable'],
    creditOptions: ['Service Revenue', 'Unearned Revenue', 'Cash', 'Accounts Receivable'],
    explanation: 'Cedar Ridge owed two years of work and has delivered one, so half the obligation is discharged. Debiting Unearned Revenue shrinks the liability; crediting Service Revenue records what was finally earned. The other $24,000 stays as a liability into 2026.',
    followUp: { q: 'What balance remains in Unearned Revenue after this entry?', answer: 24000, hint: 'One year of the two-year contract is still owed to the client. What is that worth?' },
  },
  {
    id: 'dep',
    emoji: '🏗️',
    scenario: 'Cedar Ridge bought equipment on January 1, 2025 for $54,000. It has a 6-year useful life and no salvage value. The company uses straight-line depreciation.',
    ask: 'Prepare the adjusting entry for depreciation at December 31, 2025.',
    hint: 'Straight-line just means spread the cost evenly across the years of useful life. Then be careful with the credit: depreciation never reduces the Equipment account directly — it goes to the contra account that sits against it.',
    math: '$54,000 ÷ 6 years = $9,000 of depreciation per year.',
    amount: 9000,
    debit: 'Depreciation Expense',
    credit: 'Accumulated Depreciation',
    debitOptions: ['Depreciation Expense', 'Accumulated Depreciation', 'Equipment', 'Cash'],
    creditOptions: ['Accumulated Depreciation', 'Equipment', 'Depreciation Expense', 'Cash'],
    explanation: 'The credit goes to Accumulated Depreciation — a CONTRA-ASSET — not to Equipment itself. Equipment stays on the books at its $54,000 historical cost forever; the contra account grows alongside it. That way a reader can see both the original cost and how much has been used up.',
    followUp: { q: 'What is the equipment’s BOOK VALUE at December 31, 2025?', answer: 45000, hint: 'Book value is the cost of the asset minus everything accumulated against it so far. This is the first year, so only one year of depreciation has piled up.' },
  },
]

function parseAmount(raw) {
  const c = String(raw).replace(/[^0-9.]/g, '')
  return c === '' ? null : Number(c)
}

export default function Level13() {
  const navigate = useNavigate()
  const { completeLevel, recordTask } = useProgress()
  const [phase, setPhase] = useState('learn')
  const [index, setIndex] = useState(0)
  const [amount, setAmount] = useState('')
  const [debit, setDebit] = useState('')
  const [credit, setCredit] = useState('')
  const [checked, setChecked] = useState(false)
  const [followUp, setFollowUp] = useState('')
  const [fuChecked, setFuChecked] = useState(false)
  const [results, setResults] = useState([])
  const [done, setDone] = useState(false)
  const [items, setItems] = useState(() => ITEMS.map(i => shuffleFields(i, ['debitOptions', 'creditOptions'])))
  const hints = useHints()

  const item = items[index]
  const amountRight = parseAmount(amount) === item.amount
  const debitRight = debit === item.debit
  const creditRight = credit === item.credit
  const entryRight = amountRight && debitRight && creditRight
  const fuRight = parseAmount(followUp) === item.followUp.answer

  const maxPoints = ITEMS.length * 2
  const earned = results.reduce((a, r) => a + r, 0)

  function checkEntry() {
    setChecked(true)
    recordTask(`L13-${item.id}`, entryRight, `Deferral entry — ${item.scenario.slice(0, 50)}…`, 13)
  }
  function next() {
    const score = (entryRight ? 1 : 0) + (fuRight ? 1 : 0)
    const nextResults = [...results, score]
    if (index + 1 >= ITEMS.length) {
      setResults(nextResults)
      completeLevel(13, Math.round((nextResults.reduce((a, r) => a + r, 0) / maxPoints) * 100))
      setDone(true)
    } else {
      setResults(nextResults)
      setIndex(i => i + 1); setAmount(''); setDebit(''); setCredit('')
      setChecked(false); setFollowUp(''); setFuChecked(false)
    }
  }
  function restart() {
    setIndex(0); setAmount(''); setDebit(''); setCredit(''); setChecked(false)
    setFollowUp(''); setFuChecked(false); setResults([]); setDone(false); hints.reset()
    setItems(ITEMS.map(i => shuffleFields(i, ['debitOptions', 'creditOptions'])))
  }

  if (phase === 'learn') {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <div className="text-sm text-amber-400 font-semibold mb-1">Level 13</div>
          <h1 className="text-3xl font-extrabold text-white mb-2">Deferrals — Cash Came First</h1>
          <p className="text-slate-400">Prepayments. The money moved in an earlier period, so at period end you record however much of it has now been used up or earned.</p>
        </div>

        <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-5 mb-6">
          <p className="text-xs font-bold uppercase tracking-wider text-amber-300 mb-2">The pattern</p>
          <p className="text-white font-semibold mb-3">Cash moves → it sits on the balance sheet → the adjustment releases the used-up part into the income statement.</p>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="rounded-xl bg-black/20 p-3">
              <p className="font-bold text-amber-300 text-sm mb-1">Deferred EXPENSE (Prepaid)</p>
              <p className="text-xs text-slate-400 mb-2">You paid in advance. It is an ASSET until used.</p>
              <p className="text-[11px] text-slate-500">Paid: Dr Prepaid Insurance / Cr Cash</p>
              <p className="text-[11px] text-white">Adjust: Dr Insurance Expense / Cr Prepaid Insurance</p>
            </div>
            <div className="rounded-xl bg-black/20 p-3">
              <p className="font-bold text-amber-300 text-sm mb-1">Deferred REVENUE (Unearned)</p>
              <p className="text-xs text-slate-400 mb-2">They paid in advance. It is a LIABILITY until earned.</p>
              <p className="text-[11px] text-slate-500">Received: Dr Cash / Cr Unearned Revenue</p>
              <p className="text-[11px] text-white">Adjust: Dr Unearned Revenue / Cr Service Revenue</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-white/5 border border-white/10 p-5 mb-6">
          <h3 className="font-bold text-white mb-3">The three computations that show up every time</h3>
          <div className="space-y-3">
            {[
              { t: 'Prepaid expiring over time', f: 'Total ÷ number of months = cost per month. × months USED so far.', ex: '$7,200 over 18 months = $400/mo. Used 3 months = $1,200.' },
              { t: 'Supplies used up', f: 'Beginning + Purchased − Still on hand = USED.', ex: '$2,400 + $7,600 − $1,900 = $8,100 used.' },
              { t: 'Straight-line depreciation', f: '(Cost − salvage) ÷ useful life = per year.', ex: '$54,000 ÷ 6 years = $9,000 per year.' },
            ].map((c, i) => (
              <div key={i} className="rounded-lg bg-slate-900/60 border border-white/10 p-3">
                <p className="text-sm font-semibold text-white">{c.t}</p>
                <p className="text-xs text-amber-300 font-mono my-1">{c.f}</p>
                <p className="text-xs text-slate-400">{c.ex}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-400 mt-3">
            The trap in all three: the number you want is usually <span className="text-white font-semibold">not printed in the problem</span>. You have to compute it.
          </p>
        </div>

        <div className="rounded-xl bg-white/5 border border-white/10 p-5 mb-6">
          <h3 className="font-bold text-white mb-2">Contra accounts &amp; book value</h3>
          <p className="text-sm text-slate-300 mb-3">
            A <span className="text-white font-semibold">contra account</span> carries a balance opposite to the account it relates to.
            <span className="text-white font-semibold"> Accumulated Depreciation</span> is a contra-asset: assets normally have debit balances, so it carries a CREDIT balance and subtracts from the asset.
          </p>
          <EntryTable lines={[{ account: 'Depreciation Expense', dr: 9000 }, { account: 'Accumulated Depreciation', cr: 9000 }]} dense />
          <div className="mt-3 rounded-lg bg-amber-500/10 border border-amber-500/30 p-3">
            <p className="text-sm text-white font-semibold mb-1">Why not just credit Equipment?</p>
            <p className="text-xs text-slate-300">
              Because the historical cost principle says the asset stays on the books at what you paid. The contra account keeps both facts visible: original cost, and how much has been used up.
              The difference is the <span className="text-white font-semibold">book value</span>: Cost − Accumulated Depreciation.
            </p>
          </div>
        </div>

        <button onClick={() => setPhase('play')} className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold text-lg hover:opacity-90">
          Prepare 4 adjusting entries →
        </button>
        <button onClick={() => { completeLevel(13); navigate('/') }} className="w-full mt-3 py-2.5 rounded-xl text-sm text-slate-400 hover:text-white hover:bg-white/5">
          Skip the practice — mark this lesson read
        </button>
      </div>
    )
  }

  if (done) {
    const pct = Math.round((earned / maxPoints) * 100)
    return (
      <div className="max-w-xl mx-auto text-center">
        <div className="text-5xl mb-4">{pct === 100 ? '🎉' : '🛡️'}</div>
        <h2 className="text-3xl font-extrabold text-white mb-2">Deferrals Complete</h2>
        <p className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400 mb-2">{pct}%</p>
        <p className="text-slate-400 text-sm mb-2">{earned} of {maxPoints} points — one for each entry, one for each follow-up balance.</p>
        {hints.usedCount > 0 && <p className="text-xs text-slate-500 mb-3">{hintTally(hints.usedCount)}</p>}
        <p className="text-slate-400 mb-8">
          {pct === 100 ? 'Every computation and every account correct. Deferrals are the harder half — well done.'
            : 'The computation is where most points are lost. Redo the three formulas in the lesson, then run it again.'}
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <button onClick={restart} className="flex-1 py-3 rounded-xl bg-white/10 text-white font-semibold hover:bg-white/20">Try Again</button>
          <button onClick={() => setPhase('learn')} className="flex-1 py-3 rounded-xl bg-white/10 text-white font-semibold hover:bg-white/20">Review Lesson</button>
          <button onClick={() => navigate('/level/14')} className="flex-1 py-3 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold hover:opacity-90">Level 14 →</button>
        </div>
      </div>
    )
  }

  const selCls = (ok, wrong) => ok ? 'border-green-500' : wrong ? 'border-red-500' : 'border-slate-600'

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-5">
        <div>
          <div className="text-sm text-amber-400 font-semibold">Level 13 — Item {index + 1} of {ITEMS.length}</div>
          <h1 className="text-xl font-extrabold text-white">Prepare the adjusting entry</h1>
        </div>
        <div className="flex gap-1">
          {ITEMS.map((_, i) => (
            <div key={i} className={`w-2.5 h-2.5 rounded-full ${i < results.length ? (results[i] === 2 ? 'bg-green-500' : results[i] === 1 ? 'bg-amber-500' : 'bg-red-500') : i === index ? 'bg-amber-500' : 'bg-slate-700'}`} />
          ))}
        </div>
      </div>

      <div className="rounded-xl bg-orange-500/10 border border-orange-500/20 p-5 mb-5">
        <div className="flex items-start gap-3">
          <span className="text-3xl">{item.emoji}</span>
          <div>
            <p className="font-semibold text-white mb-2">{item.scenario}</p>
            <p className="text-sm text-orange-300">{item.ask}</p>
          </div>
        </div>
      </div>

      {!checked && <HintBar open={hints.isOpen(item.id)} onToggle={() => hints.toggle(item.id)} text={item.hint} className="mb-4" />}

      <div className="rounded-xl border border-white/10 bg-slate-900/50 p-4 mb-4">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Amount of the adjustment</label>
        <div className="flex gap-2 mb-4">
          <span className="flex items-center px-3 rounded-lg bg-slate-800 border border-slate-600 text-slate-400 font-mono">$</span>
          <input inputMode="numeric" value={amount} onChange={e => !checked && setAmount(e.target.value)} disabled={checked}
            placeholder="compute it" className={`flex-1 rounded-lg border bg-slate-800 px-3 py-2 font-mono text-right text-white outline-none focus:ring-1 focus:ring-amber-500 disabled:opacity-70 ${checked ? selCls(amountRight, !amountRight) : 'border-slate-600'}`} />
        </div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Debit</label>
        <select value={debit} onChange={e => !checked && setDebit(e.target.value)} disabled={checked}
          className={`w-full mb-3 rounded-lg border bg-slate-800 px-3 py-2 text-sm text-white outline-none focus:ring-1 focus:ring-amber-500 disabled:opacity-70 ${checked ? selCls(debitRight, !debitRight) : 'border-slate-600'}`}>
          <option value="">Select the account to DEBIT…</option>
          {item.debitOptions.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Credit</label>
        <select value={credit} onChange={e => !checked && setCredit(e.target.value)} disabled={checked}
          className={`w-full rounded-lg border bg-slate-800 px-3 py-2 text-sm text-white outline-none focus:ring-1 focus:ring-amber-500 disabled:opacity-70 ${checked ? selCls(creditRight, !creditRight) : 'border-slate-600'}`}>
          <option value="">Select the account to CREDIT…</option>
          {item.creditOptions.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      </div>

      {checked && (
        <div className={`rounded-xl p-5 mb-5 ${entryRight ? 'bg-green-900/30 border border-green-700' : 'bg-amber-900/30 border border-amber-700'}`}>
          <p className="font-bold text-white mb-3">{entryRight ? '✅ Correct entry' : '📖 The correct entry is:'}</p>
          <EntryTable date="Dec 31" lines={[{ account: item.debit, dr: item.amount }, { account: item.credit, cr: item.amount }]} dense />
          <p className="text-sm text-amber-200 font-mono mt-3">{item.math}</p>
          <p className="text-sm text-slate-300 mt-2">{item.explanation}</p>

          <div className="mt-4 pt-4 border-t border-white/10">
            <p className="text-sm font-semibold text-white mb-2">{item.followUp.q}</p>
            {!fuChecked && <HintBar open={hints.isOpen(item.id + '-fu')} onToggle={() => hints.toggle(item.id + '-fu')} text={item.followUp.hint} className="mb-3" />}
            <div className="flex gap-2">
              <span className="flex items-center px-3 rounded-lg bg-slate-800 border border-slate-600 text-slate-400 font-mono">$</span>
              <input inputMode="numeric" value={followUp} onChange={e => !fuChecked && setFollowUp(e.target.value)} disabled={fuChecked}
                placeholder="0" className={`flex-1 rounded-lg border bg-slate-800 px-3 py-2 font-mono text-right text-white outline-none focus:ring-1 focus:ring-amber-500 disabled:opacity-70 ${fuChecked ? selCls(fuRight, !fuRight) : 'border-slate-600'}`} />
              {!fuChecked && (
                <button onClick={() => { setFuChecked(true); recordTask(`L13-${item.id}-balance`, fuRight, `Remaining balance after the ${item.id} adjustment`, 13) }} disabled={parseAmount(followUp) === null}
                  className="px-4 rounded-lg bg-white/10 text-white text-sm font-semibold hover:bg-white/20 disabled:opacity-40">Check</button>
              )}
            </div>
            {fuChecked && (
              <p className={`text-sm mt-2 ${fuRight ? 'text-green-300' : 'text-amber-300'}`}>
                {fuRight ? '✓ Correct — ' : `The answer is ${money(item.followUp.answer)}. `}
                {item.id === 'ins' && 'Of the original $7,200, three months are gone and fifteen remain.'}
                {item.id === 'sup' && 'The physical count is the ending balance — that is the whole point of counting.'}
                {item.id === 'unearned' && 'One year of the two-year contract is still owed to the client.'}
                {item.id === 'dep' && 'Book value = $54,000 cost − $9,000 accumulated depreciation.'}
              </p>
            )}
          </div>
        </div>
      )}

      {!checked ? (
        <button onClick={checkEntry} disabled={parseAmount(amount) === null || !debit || !credit}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90">
          {parseAmount(amount) === null || !debit || !credit ? 'Enter an amount and both accounts' : 'Check My Entry'}
        </button>
      ) : (
        <button onClick={next} disabled={!fuChecked}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold disabled:opacity-40 hover:opacity-90">
          {!fuChecked ? 'Answer the follow-up above' : index + 1 < ITEMS.length ? 'Next Item →' : 'See My Results →'}
        </button>
      )}
    </div>
  )
}

import { useState } from 'react'
import { useScrollTop } from '../../lib/useScrollTop'
import { useNavigate } from 'react-router-dom'
import { useProgress } from '../../context/ProgressContext'
import { money } from '../../components/EntryTable'
import { useHints, HintBar, hintTally } from '../../components/Hint'

// Beacon Tutoring's first month. These same nine accounts tie out to $19,700 on
// each side, which is exactly the trial balance the student builds in Level 9.
const ACCOUNTS = [
  {
    id: 'cash',
    name: 'Cash',
    type: 'Asset',
    normal: 'debit',
    debits: [{ label: 'Owner investment', amt: 12000 }, { label: 'Services for cash', amt: 4500 }, { label: 'Collected on account', amt: 1900 }],
    credits: [{ label: 'Paid rent', amt: 1100 }, { label: 'Paid on account', amt: 700 }, { label: 'Paid salaries', amt: 2300 }, { label: 'Paid dividends', amt: 600 }],
        hint: 'Do it in three steps and do not skip one: add the left column, add the right column, subtract the smaller from the bigger. The balance always lands on whichever side came out larger — do not guess it from the account type.',
    explanation: 'Cash is an asset, so its normal balance is a debit. Add the left side ($18,400), add the right side ($4,700), subtract, and put the $13,700 balance on the bigger side — the debit side.',
  },
  {
    id: 'ar',
    name: 'Accounts Receivable',
    type: 'Asset',
    normal: 'debit',
    debits: [{ label: 'Services on account', amt: 3000 }],
    credits: [{ label: 'Customer paid us', amt: 1900 }],
        hint: 'Only two numbers here. One is what customers were billed, the other is what they have paid so far. What is still outstanding?',
    explanation: 'Beacon billed $3,000 and has collected $1,900 of it, so customers still owe $1,100. A receivable is an asset — it keeps a debit balance until it is fully collected.',
  },
  {
    id: 'ap',
    name: 'Accounts Payable',
    type: 'Liability',
    normal: 'credit',
    debits: [{ label: 'Paid the vendor', amt: 700 }],
    credits: [{ label: 'Bought supplies on account', amt: 900 }],
        hint: 'Careful with the side on this one. The bigger number is on the RIGHT here, not the left — so which side does the leftover balance land on?',
    explanation: 'A payable grows with a credit and shrinks with a debit. Beacon owed $900 and paid $700, so $200 is still owed — a $200 credit balance. Notice it is the mirror image of the receivable above.',
  },
  {
    id: 'rev',
    name: 'Service Revenue',
    type: 'Revenue',
    normal: 'credit',
    debits: [],
    credits: [{ label: 'Cash job', amt: 4500 }, { label: 'Job on account', amt: 3000 }],
        hint: 'There is nothing at all on the debit side. When only one side has entries, there is nothing to subtract — the balance is simply their total, sitting on that side.',
    explanation: 'Revenue only ever goes up during the period, and it goes up with credits. $4,500 + $3,000 = $7,500 credit balance. It does not matter that only part of it was collected in cash.',
  },
  {
    id: 'div',
    name: 'Dividends',
    type: 'Equity (contra)',
    normal: 'debit',
    debits: [{ label: 'Cash paid to owner', amt: 600 }],
    credits: [],
        hint: 'The arithmetic is trivial — one entry, one side. The question actually worth thinking about is WHY an account in the equity family has its balance on this particular side.',
    explanation: 'Dividends reduce equity, and the way to reduce an equity account is with a DEBIT. That is why Dividends — alone among the equity accounts — carries a debit balance. It is not an expense; it never touches the income statement.',
  },
  {
    id: 'sal',
    name: 'Salaries Expense',
    type: 'Expense',
    normal: 'debit',
    debits: [{ label: 'Payroll', amt: 2300 }],
    credits: [],
        hint: 'One entry again. Confirm which side expenses live on and you already have the answer.',
    explanation: 'Expenses increase with debits and essentially never get credited during the period. A $2,300 debit balance.',
  },
]

const FULL_LEDGER = [
  { name: 'Cash', dr: 13700 },
  { name: 'Accounts Receivable', dr: 1100 },
  { name: 'Supplies', dr: 900 },
  { name: 'Accounts Payable', cr: 200 },
  { name: 'Common Stock', cr: 12000 },
  { name: 'Dividends', dr: 600 },
  { name: 'Service Revenue', cr: 7500 },
  { name: 'Rent Expense', dr: 1100 },
  { name: 'Salaries Expense', dr: 2300 },
]

const NORMAL_BALANCES = [
  { group: 'Assets', side: 'Debit', examples: 'Cash, Accounts Receivable, Supplies, Prepaid Rent, Equipment' },
  { group: 'Liabilities', side: 'Credit', examples: 'Accounts Payable, Notes Payable, Unearned Revenue, Salaries Payable' },
  { group: 'Common Stock / Retained Earnings', side: 'Credit', examples: 'The owner’s stake in the business' },
  { group: 'Dividends', side: 'Debit', examples: 'The one equity-family account with a DEBIT balance' },
  { group: 'Revenue', side: 'Credit', examples: 'Service Revenue, Sales Revenue, Interest Revenue' },
  { group: 'Expenses', side: 'Debit', examples: 'Rent, Salaries, Utilities, Supplies Expense, Interest Expense' },
]

function TAccount({ account, reveal }) {
  const drTotal = account.debits.reduce((s, d) => s + d.amt, 0)
  const crTotal = account.credits.reduce((s, c) => s + c.amt, 0)
  const rows = Math.max(account.debits.length, account.credits.length)
  return (
    <div className="rounded-xl border border-white/10 bg-slate-900/50 overflow-hidden">
      <div className="bg-slate-800 px-4 py-2 text-center">
        <span className="font-bold text-white">{account.name}</span>
        <span className="text-xs text-dim ml-2">({account.type})</span>
      </div>
      <div className="grid grid-cols-2 text-[10px] font-bold uppercase tracking-wider text-dim border-b border-white/10">
        <span className="px-4 py-1.5 border-r border-white/10">Debit</span>
        <span className="px-4 py-1.5 text-right">Credit</span>
      </div>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="grid grid-cols-2 text-sm">
          <div className="px-4 py-1.5 border-r border-white/10 min-h-[2rem]">
            {account.debits[i] && (
              <div className="flex justify-between gap-2">
                <span className="text-[10px] text-dim truncate">{account.debits[i].label}</span>
                <span className="font-mono text-white">{account.debits[i].amt.toLocaleString()}</span>
              </div>
            )}
          </div>
          <div className="px-4 py-1.5 min-h-[2rem]">
            {account.credits[i] && (
              <div className="flex justify-between gap-2">
                <span className="font-mono text-white">{account.credits[i].amt.toLocaleString()}</span>
                <span className="text-[10px] text-dim truncate text-right">{account.credits[i].label}</span>
              </div>
            )}
          </div>
        </div>
      ))}
      <div className="grid grid-cols-2 text-sm border-t border-white/20 bg-slate-800/60">
        <div className="px-4 py-1.5 border-r border-white/10 text-right font-mono text-slate-300">
          {reveal ? drTotal.toLocaleString() : '?'}
        </div>
        <div className="px-4 py-1.5 text-left font-mono text-slate-300">
          {reveal ? crTotal.toLocaleString() : '?'}
        </div>
      </div>
    </div>
  )
}

function parseAmount(raw) {
  const cleaned = String(raw).replace(/[^0-9.]/g, '')
  return cleaned === '' ? null : Number(cleaned)
}

export default function Level8() {
  const navigate = useNavigate()
  const { completeLevel, recordTask } = useProgress()
  const [phase, setPhase] = useState('learn')
  const [index, setIndex] = useState(0)
  const [amount, setAmount] = useState('')
  const [side, setSide] = useState('')
  const [checked, setChecked] = useState(false)
  const [results, setResults] = useState([])
  const [done, setDone] = useState(false)
  useScrollTop([phase, index])
  const hints = useHints()

  const acct = ACCOUNTS[index]
  const drTotal = acct.debits.reduce((s, d) => s + d.amt, 0)
  const crTotal = acct.credits.reduce((s, c) => s + c.amt, 0)
  const correctAmount = Math.abs(drTotal - crTotal)
  const correctSide = drTotal >= crTotal ? 'debit' : 'credit'
  const amountRight = parseAmount(amount) === correctAmount
  const sideRight = side === correctSide
  const bothRight = amountRight && sideRight

  function handleCheck() {
    setChecked(true)
    setResults(prev => [...prev, bothRight])
    recordTask(`L8-${acct.id}`, bothRight, `Foot the account — ${acct.name}`, 8)
  }

  function next() {
    if (index + 1 >= ACCOUNTS.length) {
      const correct = results.filter(Boolean).length
      completeLevel(8, Math.round((correct / ACCOUNTS.length) * 100))
      setDone(true)
    } else {
      setIndex(i => i + 1); setAmount(''); setSide(''); setChecked(false)
    }
  }

  function restart() {
    setIndex(0); setAmount(''); setSide(''); setChecked(false); setResults([]); setDone(false)
  }

  if (phase === 'learn') {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <div className="text-sm text-lime-400 font-semibold mb-1">Level 8</div>
          <h1 className="text-3xl font-extrabold text-white mb-2">T-Accounts &amp; Ledger Balances</h1>
          <p className="text-dim">Journal entries are a diary in date order. To build a trial balance you need each account gathered in one place and totaled — that is the ledger.</p>
        </div>

        <div className="rounded-2xl border border-lime-500/30 bg-lime-500/10 p-5 mb-6">
          <p className="text-xs font-bold uppercase tracking-wider text-lime-300 mb-2">Where you are in the cycle</p>
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <span className="rounded-lg bg-white/10 px-3 py-1.5 text-slate-300">1. Transaction happens</span>
            <span className="text-dim">→</span>
            <span className="rounded-lg bg-white/10 px-3 py-1.5 text-slate-300">2. Journal entry</span>
            <span className="text-dim">→</span>
            <span className="rounded-lg bg-lime-500/20 border border-lime-500/40 px-3 py-1.5 text-white font-semibold">3. Post to the ledger</span>
            <span className="text-dim">→</span>
            <span className="rounded-lg bg-white/10 px-3 py-1.5 text-slate-300">4. Trial balance</span>
          </div>
          <p className="text-sm text-slate-300 mt-3">
            <span className="text-white font-semibold">Posting</span> means copying each debit and credit out of the journal into its own T-account.
            <span className="text-white font-semibold"> Footing</span> means totaling each side and finding the account&rsquo;s balance. Those balances are literally the numbers you carry onto the trial balance.
          </p>
        </div>

        <div className="rounded-xl bg-white/5 border border-white/10 p-5 mb-6">
          <h3 className="font-bold text-white mb-3">How to foot an account — 3 steps</h3>
          <ol className="space-y-2 text-sm text-slate-300 mb-4">
            <li><span className="text-white font-semibold">1.</span> Add up the left (debit) column.</li>
            <li><span className="text-white font-semibold">2.</span> Add up the right (credit) column.</li>
            <li><span className="text-white font-semibold">3.</span> Subtract the smaller from the bigger. The balance belongs on <span className="text-white font-semibold">whichever side is bigger</span>.</li>
          </ol>
          <div className="rounded-lg bg-slate-900/60 border border-white/10 p-4">
            <p className="text-center font-bold text-white mb-2">Cash</p>
            <div className="grid grid-cols-2 text-sm font-mono">
              <div className="border-r border-white/20 pr-3 text-right space-y-0.5">
                <p className="text-white">12,000</p>
                <p className="text-white">4,500</p>
                <p className="text-white">1,900</p>
                <p className="border-t border-white/20 pt-0.5 text-lime-300">18,400</p>
              </div>
              <div className="pl-3 space-y-0.5">
                <p className="text-white">1,100</p>
                <p className="text-white">700</p>
                <p className="text-white">2,300</p>
                <p className="text-white">600</p>
                <p className="border-t border-white/20 pt-0.5 text-lime-300">4,700</p>
              </div>
            </div>
            <p className="text-center text-sm text-white mt-3">
              $18,400 − $4,700 = <span className="font-bold text-lime-300">$13,700 debit balance</span>
            </p>
            <p className="text-center text-xs text-dim mt-1">The debit side is bigger, so the balance is a debit — exactly what an asset should be.</p>
          </div>
        </div>

        <div className="rounded-xl bg-white/5 border border-white/10 p-5 mb-6">
          <h3 className="font-bold text-white mb-1">Normal balances — memorize this table</h3>
          <p className="text-xs text-dim mb-3">A &ldquo;normal balance&rdquo; is the side an account is supposed to land on. If yours lands on the other side, something is usually wrong.</p>
          <div className="divide-y divide-white/5">
            {NORMAL_BALANCES.map((row, i) => (
              <div key={i} className="py-2.5 flex items-start gap-3">
                <span className={`shrink-0 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded ${row.side === 'Debit' ? 'bg-indigo-500/20 text-indigo-300' : 'bg-emerald-500/20 text-emerald-300'}`}>
                  {row.side}
                </span>
                <div>
                  <p className="text-sm font-semibold text-white">{row.group}</p>
                  <p className="text-xs text-dim">{row.examples}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => setPhase('play')}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-lime-600 to-green-600 text-white font-bold text-lg hover:opacity-90 transition-opacity"
        >
          Foot 6 accounts →
        </button>
        <button
          onClick={() => { completeLevel(8); navigate('/') }}
          className="w-full mt-3 py-2.5 rounded-xl text-sm text-dim hover:text-white hover:bg-white/5 transition-colors"
        >
          Skip the practice — mark this lesson read
        </button>
      </div>
    )
  }

  if (done) {
    const correct = results.filter(Boolean).length
    const totalDr = FULL_LEDGER.reduce((s, a) => s + (a.dr || 0), 0)
    const totalCr = FULL_LEDGER.reduce((s, a) => s + (a.cr || 0), 0)
    return (
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-6">
          <div className="text-5xl mb-4">{correct === ACCOUNTS.length ? '🎉' : '📗'}</div>
          <h2 className="text-3xl font-extrabold text-white mb-2">Ledger Complete</h2>
          <p className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-green-400 mb-2">
            {correct} / {ACCOUNTS.length}
          </p>
          {hints.usedCount > 0 && <p className="text-xs text-dim">{hintTally(hints.usedCount)}</p>}
        </div>

        <div className="rounded-xl bg-white/5 border border-white/10 p-5 mb-6">
          <p className="font-bold text-white mb-1">Here is Beacon Tutoring&rsquo;s whole ledger</p>
          <p className="text-xs text-dim mb-3">Every account balance, on its normal side. Look what happens when you add the columns.</p>
          <div className="rounded-lg border border-white/10 overflow-hidden">
            <div className="grid grid-cols-[1fr_6rem_6rem] bg-slate-800 text-[10px] font-bold text-dim uppercase tracking-wider px-3 py-2">
              <span>Account</span><span className="text-right">Debit</span><span className="text-right">Credit</span>
            </div>
            {FULL_LEDGER.map(a => (
              <div key={a.name} className="grid grid-cols-[1fr_6rem_6rem] px-3 py-1.5 text-sm border-t border-white/5">
                <span className="text-white">{a.name}</span>
                <span className="text-right font-mono text-slate-200">{a.dr ? money(a.dr) : ''}</span>
                <span className="text-right font-mono text-slate-200">{a.cr ? money(a.cr) : ''}</span>
              </div>
            ))}
            <div className="grid grid-cols-[1fr_6rem_6rem] px-3 py-2 text-sm border-t-2 border-white/20 bg-slate-800/60 font-bold">
              <span className="text-slate-300">Totals</span>
              <span className="text-right font-mono text-green-400">{money(totalDr)}</span>
              <span className="text-right font-mono text-green-400">{money(totalCr)}</span>
            </div>
          </div>
          <p className="text-sm text-green-400 text-center mt-3">✓ {money(totalDr)} = {money(totalCr)}</p>
          <p className="text-xs text-dim text-center mt-1">That list, put in the right order, IS a trial balance. That is Level 9.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button onClick={restart} className="flex-1 py-3 rounded-xl bg-white/10 text-white font-semibold hover:bg-white/20">Try Again</button>
          <button onClick={() => setPhase('learn')} className="flex-1 py-3 rounded-xl bg-white/10 text-white font-semibold hover:bg-white/20">Review Lesson</button>
          <button onClick={() => navigate('/level/9')} className="flex-1 py-3 rounded-xl bg-gradient-to-r from-lime-600 to-green-600 text-white font-bold hover:opacity-90">Level 9 →</button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="text-sm text-lime-400 font-semibold">Level 8 — Account {index + 1} of {ACCOUNTS.length}</div>
          <h1 className="text-xl font-extrabold text-white">Find the balance</h1>
        </div>
        <div className="flex gap-1">
          {ACCOUNTS.map((_, i) => (
            <div key={i} className={`w-2.5 h-2.5 rounded-full ${
              i < results.length ? (results[i] ? 'bg-green-500' : 'bg-red-500') : i === index ? 'bg-lime-500' : 'bg-slate-700'
            }`} />
          ))}
        </div>
      </div>

      <p className="text-sm text-dim mb-3">
        Beacon Tutoring&rsquo;s entries have been posted for you. Foot the account and report its ending balance.
      </p>

      <div className="mb-5">
        <TAccount account={acct} reveal={checked} />
      </div>

      {!checked && (
        <HintBar open={hints.isOpen(acct.id)} onToggle={() => hints.toggle(acct.id)} text={acct.hint} className="mb-4" />
      )}

      <div className="rounded-xl border border-white/10 bg-white/5 p-4 mb-5">
        <label className="block text-xs font-bold uppercase tracking-wider text-dim mb-2">Ending balance</label>
        <div className="flex gap-2 mb-3">
          <span className="flex items-center px-3 rounded-lg bg-slate-800 border border-slate-600 text-dim font-mono">$</span>
          <input
            inputMode="numeric"
            value={amount}
            onChange={e => !checked && setAmount(e.target.value)}
            disabled={checked}
            placeholder="0"
            className={`flex-1 rounded-lg border px-3 py-2 font-mono text-white bg-slate-800 outline-none focus:ring-1 focus:ring-lime-500 disabled:opacity-70 ${
              checked ? (amountRight ? 'border-green-500' : 'border-red-500') : 'border-slate-600'
            }`}
          />
        </div>
        <label className="block text-xs font-bold uppercase tracking-wider text-dim mb-2">On which side?</label>
        <div className="grid grid-cols-2 gap-2">
          {['debit', 'credit'].map(s => {
            const selected = side === s
            const showRight = checked && s === correctSide
            const showWrong = checked && selected && s !== correctSide
            return (
              <button
                key={s}
                onClick={() => !checked && setSide(s)}
                disabled={checked}
                className={`py-2.5 rounded-lg border font-semibold capitalize transition-colors ${
                  showRight ? 'border-green-500 bg-green-900/30 text-green-300'
                    : showWrong ? 'border-red-500 bg-red-900/30 text-red-300'
                    : selected ? 'border-lime-500 bg-lime-900/30 text-white'
                    : 'border-slate-600 bg-slate-800 text-slate-300 hover:border-lime-400'
                }`}
              >
                {s} balance
              </button>
            )
          })}
        </div>
      </div>

      {checked && (
        <div className={`rounded-xl p-5 mb-5 ${bothRight ? 'bg-green-900/30 border border-green-700' : 'bg-amber-900/30 border border-amber-700'}`}>
          <p className="font-bold text-white mb-2">
            {bothRight ? '✅ Correct' : `📖 The answer is ${money(correctAmount)} on the ${correctSide} side`}
          </p>
          <p className="text-sm text-slate-300 mb-2">
            Debits {money(drTotal)} − Credits {money(crTotal)} = <span className="text-white font-semibold">{money(correctAmount)} {correctSide}</span>
          </p>
          <p className="text-sm text-slate-300">{acct.explanation}</p>
          {!bothRight && amountRight && !sideRight && (
            <p className="text-xs text-amber-300 mt-2">Your amount was right — the side is what got you. Check the normal-balance table in the lesson.</p>
          )}
        </div>
      )}

      {!checked ? (
        <button
          onClick={handleCheck}
          disabled={parseAmount(amount) === null || !side}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-lime-600 to-green-600 text-white font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90"
        >
          {parseAmount(amount) === null || !side ? 'Enter an amount and pick a side' : 'Check Balance'}
        </button>
      ) : (
        <button onClick={next} className="w-full py-3 rounded-xl bg-gradient-to-r from-lime-600 to-green-600 text-white font-bold hover:opacity-90">
          {index + 1 < ACCOUNTS.length ? 'Next Account →' : 'See the Full Ledger →'}
        </button>
      )}
    </div>
  )
}

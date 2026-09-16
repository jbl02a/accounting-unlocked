import { useState } from 'react'
import { useScrollTop } from '../../lib/useScrollTop'
import { useNavigate } from 'react-router-dom'
import { useProgress } from '../../context/ProgressContext'
import EntryTable, { money } from '../../components/EntryTable'
import { useHints, HintBar, hintTally } from '../../components/Hint'
import { shuffleFields } from '../../lib/shuffle'

// Each transaction lists the accounts the student may use (including distractors).
// "answer" holds the correct amount and side for every account that belongs in the entry.
const TRANSACTIONS = [
  {
    id: 1,
    emoji: '🏋️',
    date: 'Apr 2',
    description: 'Ridgeline Fitness buys gym equipment for $9,000. It pays $3,000 in cash and signs a note payable for the rest.',
    hint: 'One thing came in ($9,000 of equipment). Two things paid for it.',
        deeper: 'Start with the line you are certain about: the equipment is worth the full $9,000, so write that debit first. Now the credits have to add up to $9,000 as well — split them between the cash that actually left and the promise the gym signed.',
    accounts: ['Equipment', 'Cash', 'Notes Payable', 'Accounts Payable', 'Equipment Expense'],
    answer: { Equipment: { dr: 9000 }, Cash: { cr: 3000 }, 'Notes Payable': { cr: 6000 } },
    explanation: 'Equipment (asset) rises by the FULL $9,000 price — that is what the gym now owns. The credits split the payment: $3,000 of cash left, and a $6,000 promise to pay was created. $9,000 of debits = $9,000 of credits.',
  },
  {
    id: 2,
    emoji: '🤝',
    date: 'Apr 7',
    description: 'Ridgeline performs $5,000 of personal-training services for a corporate client. The client pays $2,000 in cash now and will pay the other $3,000 next month.',
    hint: 'Revenue is earned in full today. Two different assets came in.',
        deeper: 'The revenue line is the easy one: all $5,000 was earned today, so credit the whole amount. Now split the debit side by HOW it will be collected — part arrived as cash, part is still owed by the client.',
    accounts: ['Cash', 'Accounts Receivable', 'Service Revenue', 'Unearned Revenue', 'Accounts Payable'],
    answer: { Cash: { dr: 2000 }, 'Accounts Receivable': { dr: 3000 }, 'Service Revenue': { cr: 5000 } },
    explanation: 'All $5,000 was earned, so Service Revenue is credited for the full amount. The debits split by how it will be collected: $2,000 in Cash today, $3,000 sitting in Accounts Receivable until the client pays.',
  },
  {
    id: 3,
    emoji: '🧾',
    date: 'Apr 15',
    description: 'Ridgeline writes one check for $1,750 covering April rent of $1,400 and the utility bill of $350.',
    hint: 'One credit, two debits. Expenses are never lumped into a single account.',
        deeper: 'Only one check was written, so there is a single credit for the full amount. The debits are the individual costs — one line each, because the income statement has to show rent and utilities separately.',
    accounts: ['Rent Expense', 'Utilities Expense', 'Cash', 'Accounts Payable', 'Prepaid Rent'],
    answer: { 'Rent Expense': { dr: 1400 }, 'Utilities Expense': { dr: 350 }, Cash: { cr: 1750 } },
    explanation: 'Each expense gets its own account so the income statement shows where the money actually went. Cash is credited once for the total check: $1,400 + $350 = $1,750.',
  },
  {
    id: 4,
    emoji: '📦',
    date: 'Apr 18',
    description: 'Ridgeline purchases $2,000 of supplies. It pays $800 in cash and puts the remaining $1,200 on account.',
    hint: 'Supplies are an asset when purchased, not an expense.',
        deeper: 'The company now owns all $2,000 of supplies, so that is the debit regardless of how much was paid. Split the credits between the cash that left today and the amount still owing to the vendor.',
    accounts: ['Supplies', 'Cash', 'Accounts Payable', 'Supplies Expense', 'Accounts Receivable'],
    answer: { Supplies: { dr: 2000 }, Cash: { cr: 800 }, 'Accounts Payable': { cr: 1200 } },
    explanation: 'Supplies are debited for the full $2,000 — the gym owns all of them. The unpaid $1,200 becomes Accounts Payable, a liability. It becomes Supplies Expense only later, as the supplies get used up.',
  },
  {
    id: 5,
    emoji: '📈',
    date: 'Apr 21',
    description: 'The owner invests $15,000 cash plus a treadmill worth $5,000 into the business in exchange for common stock.',
    hint: 'Two assets in, one equity account up for the combined value.',
        deeper: 'Two separate things came into the business, so there are two debit lines at their individual values. The owner got one thing in return — stock — so that credit is the combined total of both.',
    accounts: ['Cash', 'Equipment', 'Common Stock', 'Dividends', 'Service Revenue'],
    answer: { Cash: { dr: 15000 }, Equipment: { dr: 5000 }, 'Common Stock': { cr: 20000 } },
    explanation: 'Both assets are debited at their value. Common Stock is credited for the total $20,000 the owner put in. Owner investments are equity — never revenue.',
  },
  {
    id: 6,
    emoji: '🏦',
    date: 'Apr 30',
    description: 'Ridgeline pays $4,000 on its bank note: $3,700 goes toward the principal and $300 is interest.',
    hint: 'Only the principal portion shrinks the debt. The interest is the cost of borrowing.',
        deeper: 'The credit is easy: $4,000 of cash left the bank account. The debits split that total into two very different things — the part that reduces what the gym owes, and the part that is purely the cost of having borrowed.',
    accounts: ['Notes Payable', 'Interest Expense', 'Cash', 'Interest Payable', 'Notes Receivable'],
    answer: { 'Notes Payable': { dr: 3700 }, 'Interest Expense': { dr: 300 }, Cash: { cr: 4000 } },
    explanation: 'Debiting Notes Payable $3,700 reduces the liability. The $300 of interest is a cost of doing business, so it is an expense (debit). Cash is credited for the whole $4,000 that left the bank account.',
  },
]

function parseAmount(raw) {
  const cleaned = String(raw).replace(/[^0-9.]/g, '')
  if (cleaned === '') return 0
  const n = Number(cleaned)
  return Number.isFinite(n) ? n : 0
}

export default function Level7() {
  const navigate = useNavigate()
  const { completeLevel, recordTask } = useProgress()
  const [phase, setPhase] = useState('learn')
  const [index, setIndex] = useState(0)
  const [entry, setEntry] = useState({})
  const [checked, setChecked] = useState(false)
  const [results, setResults] = useState([])
  const [done, setDone] = useState(false)
  const [transactions, setTransactions] = useState(() => TRANSACTIONS.map(t => shuffleFields(t, ['accounts'])))
  useScrollTop([phase, index])
  const hints = useHints()

  const tx = transactions[index]

  function setCell(account, side, value) {
    if (checked) return
    setEntry(prev => ({ ...prev, [account]: { ...prev[account], [side]: value } }))
  }

  const totalDr = tx.accounts.reduce((sum, a) => sum + parseAmount(entry[a]?.dr || ''), 0)
  const totalCr = tx.accounts.reduce((sum, a) => sum + parseAmount(entry[a]?.cr || ''), 0)
  const balanced = totalDr > 0 && totalDr === totalCr

  function cellStatus(account, side) {
    if (!checked) return 'neutral'
    const expected = tx.answer[account]?.[side] || 0
    const actual = parseAmount(entry[account]?.[side] || '')
    if (expected === 0 && actual === 0) return 'neutral'
    return expected === actual ? 'right' : 'wrong'
  }

  const isEntryCorrect = tx.accounts.every(a =>
    ['dr', 'cr'].every(side => (tx.answer[a]?.[side] || 0) === parseAmount(entry[a]?.[side] || ''))
  )

  function handleCheck() {
    setChecked(true)
    setResults(prev => [...prev, isEntryCorrect])
    recordTask(`L7-tx${tx.id}`, isEntryCorrect, `Compound entry — ${tx.date}: ${tx.description.slice(0, 46)}…`, 7)
  }

  function next() {
    if (index + 1 >= TRANSACTIONS.length) {
      const correct = results.filter(Boolean).length
      completeLevel(7, Math.round((correct / TRANSACTIONS.length) * 100))
      setDone(true)
    } else {
      setIndex(i => i + 1)
      setEntry({})
      setChecked(false)
    }
  }

  function restart() {
    setIndex(0); setEntry({}); setChecked(false); setResults([]); setDone(false); setTransactions(TRANSACTIONS.map(t => shuffleFields(t, ['accounts'])))
  }

  if (phase === 'learn') {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <div className="text-sm text-violet-400 font-semibold mb-1">Level 7</div>
          <h1 className="text-3xl font-extrabold text-white mb-2">Compound Journal Entries</h1>
          <p className="text-dim">Real transactions rarely fit on two lines. Here is how to record the ones with three, four, or more.</p>
        </div>

        <div className="rounded-2xl border border-violet-500/30 bg-violet-500/10 p-5 mb-6">
          <p className="text-xs font-bold uppercase tracking-wider text-violet-300 mb-2">The only rule that ever changes</p>
          <p className="text-white text-lg font-bold mb-2">A journal entry needs at least one debit and one credit — not exactly one of each.</p>
          <p className="text-sm text-slate-300">
            An entry with three, four, or ten line items is called a <span className="text-white font-semibold">compound entry</span>. It is
            still legal, still normal, and still has to satisfy the same test: <span className="text-white font-semibold">total debits = total credits</span>.
          </p>
        </div>

        <div className="rounded-xl bg-white/5 border border-white/10 p-5 mb-6">
          <h3 className="font-bold text-white mb-2">Worked example</h3>
          <p className="text-sm text-slate-300 mb-3">
            Buy a $9,000 machine: pay $3,000 cash and sign a note for the remaining $6,000.
          </p>
          <EntryTable
            lines={[
              { account: 'Equipment', dr: 9000 },
              { account: 'Cash', cr: 3000 },
              { account: 'Notes Payable', cr: 6000 },
            ]}
          />
          <div className="grid grid-cols-2 gap-3 mt-3">
            <div className="rounded-lg bg-slate-800/60 p-3 text-center">
              <p className="text-[10px] uppercase tracking-wider text-dim">Total Debits</p>
              <p className="font-mono font-bold text-white">{money(9000)}</p>
            </div>
            <div className="rounded-lg bg-slate-800/60 p-3 text-center">
              <p className="text-[10px] uppercase tracking-wider text-dim">Total Credits</p>
              <p className="font-mono font-bold text-white">{money(9000)}</p>
            </div>
          </div>
          <p className="text-xs text-green-400 text-center mt-2">✓ Balanced — three lines, one balanced entry.</p>
        </div>

        <div className="space-y-3 mb-6">
          {[
            { rule: 'All debits first, then all credits', detail: 'Every debit line is listed flush left at the top. Every credit line goes underneath, indented. Never alternate them.' },
            { rule: 'Find the big number first', detail: 'One side is usually a single amount — the full price of what you bought, or the full amount you earned. Write that line, then split the other side until it matches.' },
            { rule: 'Split the payment, not the purchase', detail: 'A $9,000 machine is a $9,000 asset even if you only paid $3,000 today. The purchase price never gets split by how you paid.' },
            { rule: 'Never combine unlike accounts', detail: 'Rent and utilities paid with one check are still two separate expense lines. The income statement has to show each one.' },
            { rule: 'Check before you move on', detail: 'Add the debit column, add the credit column. If they do not match, the entry is wrong — full stop.' },
          ].map((item, i) => (
            <div key={i} className="flex gap-3 rounded-xl bg-violet-500/10 border border-violet-500/20 p-4">
              <span className="text-violet-400 font-bold text-sm shrink-0">#{i + 1}</span>
              <div>
                <p className="font-semibold text-white text-sm">{item.rule}</p>
                <p className="text-dim text-xs mt-0.5">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => setPhase('play')}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white font-bold text-lg hover:opacity-90 transition-opacity"
        >
          Build 6 compound entries →
        </button>
        <button
          onClick={() => { completeLevel(7); navigate('/') }}
          className="w-full mt-3 py-2.5 rounded-xl text-sm text-dim hover:text-white hover:bg-white/5 transition-colors"
        >
          Skip the practice — mark this lesson read
        </button>
      </div>
    )
  }

  if (done) {
    const correct = results.filter(Boolean).length
    return (
      <div className="max-w-xl mx-auto text-center">
        <div className="text-5xl mb-4">{correct === TRANSACTIONS.length ? '🎉' : '🧾'}</div>
        <h2 className="text-3xl font-extrabold text-white mb-2">Compound Entries Complete</h2>
        <p className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-400 mb-2">
          {correct} / {TRANSACTIONS.length}
        </p>
        {hints.usedCount > 0 && <p className="text-xs text-dim mb-3">{hintTally(hints.usedCount)}</p>}
        <p className="text-dim mb-8">
          {correct === TRANSACTIONS.length ? 'Every entry balanced and every account correct. That is exam-ready work.'
            : correct >= 4 ? 'Solid. Re-read the ones you missed — the split is usually on the payment side.'
            : 'Work through the lesson example again, then retry. Find the full price first, then split.'}
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <button onClick={restart} className="flex-1 py-3 rounded-xl bg-white/10 text-white font-semibold hover:bg-white/20">Try Again</button>
          <button onClick={() => setPhase('learn')} className="flex-1 py-3 rounded-xl bg-white/10 text-white font-semibold hover:bg-white/20">Review Lesson</button>
          <button onClick={() => navigate('/level/8')} className="flex-1 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white font-bold hover:opacity-90">Level 8 →</button>
        </div>
      </div>
    )
  }

  const cellClass = status =>
    status === 'right' ? 'border-green-500 bg-green-900/20 text-green-200'
      : status === 'wrong' ? 'border-red-500 bg-red-900/20 text-red-200'
      : 'border-slate-600 bg-slate-800 text-white'

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="text-sm text-violet-400 font-semibold">Level 7 — Entry {index + 1} of {TRANSACTIONS.length}</div>
          <h1 className="text-xl font-extrabold text-white">Build the compound entry</h1>
        </div>
        <div className="flex gap-1">
          {TRANSACTIONS.map((_, i) => (
            <div key={i} className={`w-2.5 h-2.5 rounded-full ${
              i < results.length ? (results[i] ? 'bg-green-500' : 'bg-red-500') : i === index ? 'bg-violet-500' : 'bg-slate-700'
            }`} />
          ))}
        </div>
      </div>

      <div className="rounded-xl bg-purple-500/10 border border-purple-500/20 p-5 mb-5">
        <div className="flex items-start gap-3">
          <span className="text-3xl">{tx.emoji}</span>
          <div>
            <p className="text-xs font-semibold text-purple-300 mb-1">{tx.date}</p>
            <p className="font-semibold text-white mb-1">{tx.description}</p>
            <p className="text-xs text-purple-300/70 italic">{tx.hint}</p>
          </div>
        </div>
      </div>

      {!checked && (
        <HintBar open={hints.isOpen(tx.id)} onToggle={() => hints.toggle(tx.id)} text={tx.deeper} className="mb-4" />
      )}

      <p className="text-xs text-dim mb-2">
        Type an amount next to each account you need, in the Debit or Credit column. Leave the accounts you do not need blank — some are here as distractors.
      </p>

      <div className="rounded-xl border border-white/10 bg-slate-900/50 overflow-hidden mb-4">
        <div className="grid grid-cols-[1fr_7rem_7rem] bg-slate-800 text-[10px] font-bold text-dim uppercase tracking-wider px-3 py-2">
          <span>Account Description <span className="normal-case font-normal text-dim">· {tx.date}</span></span>
          <span className="text-center">Debit</span>
          <span className="text-center">Credit</span>
        </div>
        {tx.accounts.map(account => (
          <div key={account} className="grid grid-cols-[1fr_7rem_7rem] items-center gap-2 px-3 py-2 border-t border-white/5">
            <span className="text-sm text-white pr-2">{account}</span>
            <input
              inputMode="numeric"
              value={entry[account]?.dr || ''}
              onChange={e => setCell(account, 'dr', e.target.value)}
              disabled={checked}
              placeholder="—"
              className={`w-full rounded-lg border px-2 py-1.5 text-sm font-mono text-right outline-none focus:ring-1 focus:ring-violet-500 disabled:opacity-70 ${cellClass(cellStatus(account, 'dr'))}`}
            />
            <input
              inputMode="numeric"
              value={entry[account]?.cr || ''}
              onChange={e => setCell(account, 'cr', e.target.value)}
              disabled={checked}
              placeholder="—"
              className={`w-full rounded-lg border px-2 py-1.5 text-sm font-mono text-right outline-none focus:ring-1 focus:ring-violet-500 disabled:opacity-70 ${cellClass(cellStatus(account, 'cr'))}`}
            />
          </div>
        ))}
        <div className="grid grid-cols-[1fr_7rem_7rem] items-center gap-2 px-3 py-2 border-t-2 border-white/20 bg-slate-800/60">
          <span className="text-xs font-bold uppercase tracking-wider text-dim">Totals</span>
          <span className={`text-sm font-mono text-right pr-2 font-bold ${balanced ? 'text-green-400' : 'text-white'}`}>{money(totalDr)}</span>
          <span className={`text-sm font-mono text-right pr-2 font-bold ${balanced ? 'text-green-400' : 'text-white'}`}>{money(totalCr)}</span>
        </div>
      </div>

      {!checked && (
        <p className={`text-sm text-center mb-4 ${balanced ? 'text-green-400' : totalDr || totalCr ? 'text-amber-400' : 'text-dim'}`}>
          {balanced ? '✓ Debits equal credits — this entry balances.'
            : totalDr || totalCr ? `Out of balance by ${money(Math.abs(totalDr - totalCr))}. Keep going.`
            : 'Enter your amounts. The totals update as you type.'}
        </p>
      )}

      {checked && (
        <div className={`rounded-xl p-5 mb-5 ${isEntryCorrect ? 'bg-green-900/30 border border-green-700' : 'bg-amber-900/30 border border-amber-700'}`}>
          <p className="font-bold text-white mb-3">{isEntryCorrect ? '✅ Exactly right' : '📖 Here is the correct entry:'}</p>
          {!isEntryCorrect && (
            <div className="mb-3">
              <EntryTable
                date={tx.date}
                lines={[
                  ...Object.entries(tx.answer).filter(([, v]) => v.dr).map(([account, v]) => ({ account, dr: v.dr })),
                  ...Object.entries(tx.answer).filter(([, v]) => v.cr).map(([account, v]) => ({ account, cr: v.cr })),
                ]}
                dense
              />
            </div>
          )}
          <p className="text-sm text-slate-300">{tx.explanation}</p>
        </div>
      )}

      {!checked ? (
        <button
          onClick={handleCheck}
          disabled={!balanced}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
        >
          {balanced ? 'Check My Entry' : 'Your entry must balance first'}
        </button>
      ) : (
        <button onClick={next} className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white font-bold hover:opacity-90">
          {index + 1 < TRANSACTIONS.length ? 'Next Transaction →' : 'See Results →'}
        </button>
      )}
    </div>
  )
}

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useProgress } from '../../context/ProgressContext'
import { money } from '../../components/EntryTable'

// Bayside Landscaping — a complete, balanced trial balance ($65,500 each side).
// "order" is the position each account takes on a properly ordered trial balance.
const TB = [
  { name: 'Cash', amount: 14500, side: 'debit', group: 'Assets', order: 1 },
  { name: 'Accounts Receivable', amount: 6200, side: 'debit', group: 'Assets', order: 2 },
  { name: 'Supplies', amount: 1300, side: 'debit', group: 'Assets', order: 3 },
  { name: 'Prepaid Insurance', amount: 1800, side: 'debit', group: 'Assets', order: 4 },
  { name: 'Equipment', amount: 24000, side: 'debit', group: 'Assets', order: 5 },
  { name: 'Accumulated Depreciation — Equipment', amount: 4000, side: 'credit', group: 'Assets (contra)', order: 6 },
  { name: 'Accounts Payable', amount: 3700, side: 'credit', group: 'Liabilities', order: 7 },
  { name: 'Unearned Revenue', amount: 2500, side: 'credit', group: 'Liabilities', order: 8 },
  { name: 'Notes Payable', amount: 10000, side: 'credit', group: 'Liabilities', order: 9 },
  { name: 'Common Stock', amount: 15000, side: 'credit', group: 'Equity', order: 10 },
  { name: 'Retained Earnings', amount: 11400, side: 'credit', group: 'Equity', order: 11 },
  { name: 'Dividends', amount: 2000, side: 'debit', group: 'Equity (contra)', order: 12 },
  { name: 'Service Revenue', amount: 18900, side: 'credit', group: 'Revenue', order: 13 },
  { name: 'Salaries Expense', amount: 9600, side: 'debit', group: 'Expenses', order: 14 },
  { name: 'Rent Expense', amount: 3600, side: 'debit', group: 'Expenses', order: 15 },
  { name: 'Utilities Expense', amount: 1400, side: 'debit', group: 'Expenses', order: 16 },
  { name: 'Supplies Expense', amount: 1100, side: 'debit', group: 'Expenses', order: 17 },
]

const TOTAL = TB.filter(a => a.side === 'debit').reduce((s, a) => s + a.amount, 0)

const WHY = {
  Cash: 'An asset — assets carry debit balances.',
  'Accounts Receivable': 'An asset. Customers owe US, so it is a debit balance.',
  Supplies: 'An asset until the supplies are used up.',
  'Prepaid Insurance': 'Paying in advance buys an asset: future coverage you are owed.',
  Equipment: 'An asset — a debit balance.',
  'Accumulated Depreciation — Equipment': 'A CONTRA-asset. It sits with the assets but carries a CREDIT balance because it subtracts from Equipment.',
  'Accounts Payable': 'A liability — WE owe, so it is a credit balance.',
  'Unearned Revenue': 'A liability. Cash was collected but the work is still owed, so it is a credit.',
  'Notes Payable': 'A liability — a credit balance.',
  'Common Stock': 'Equity. Equity increases with credits.',
  'Retained Earnings': 'Equity — profits kept in the business. Credit balance.',
  Dividends: 'The exception! Dividends REDUCE equity, and you reduce equity with a DEBIT.',
  'Service Revenue': 'Revenue increases with credits, always.',
  'Salaries Expense': 'Expenses increase with debits, always.',
  'Rent Expense': 'Expenses increase with debits, always.',
  'Utilities Expense': 'Expenses increase with debits, always.',
  'Supplies Expense': 'Expenses increase with debits, always.',
}

const ORDER_QUIZ = ['Cash', 'Accounts Receivable', 'Accounts Payable', 'Common Stock', 'Retained Earnings', 'Dividends', 'Service Revenue', 'Rent Expense']
const ORDER_SCRAMBLED = ['Dividends', 'Service Revenue', 'Cash', 'Retained Earnings', 'Rent Expense', 'Accounts Payable', 'Common Stock', 'Accounts Receivable']

const GROUP_ORDER = ['Assets', 'Assets (contra)', 'Liabilities', 'Equity', 'Equity (contra)', 'Revenue', 'Expenses']

function parseAmount(raw) {
  const cleaned = String(raw).replace(/[^0-9.]/g, '')
  return cleaned === '' ? null : Number(cleaned)
}

function FinishedTB() {
  let lastGroup = null
  return (
    <div className="rounded-xl border border-white/10 overflow-hidden">
      <div className="bg-slate-800 px-4 py-3 text-center">
        <p className="font-bold text-white">Bayside Landscaping</p>
        <p className="text-sm text-slate-300">Trial Balance</p>
        <p className="text-xs text-slate-500">June 30, 2025</p>
      </div>
      <div className="grid grid-cols-[1fr_6.5rem_6.5rem] bg-slate-800/60 text-[10px] font-bold text-slate-400 uppercase tracking-wider px-4 py-1.5 border-t border-white/10">
        <span>Account</span><span className="text-right">Debit</span><span className="text-right">Credit</span>
      </div>
      {TB.map(a => {
        const header = a.group !== lastGroup ? a.group : null
        lastGroup = a.group
        return (
          <div key={a.name}>
            {header && (
              <div className="px-4 pt-2 pb-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-400/80 bg-white/[0.02]">{header}</div>
            )}
            <div className="grid grid-cols-[1fr_6.5rem_6.5rem] px-4 py-1 text-sm">
              <span className="text-white">{a.name}</span>
              <span className="text-right font-mono text-slate-200">{a.side === 'debit' ? money(a.amount) : ''}</span>
              <span className="text-right font-mono text-slate-200">{a.side === 'credit' ? money(a.amount) : ''}</span>
            </div>
          </div>
        )
      })}
      <div className="grid grid-cols-[1fr_6.5rem_6.5rem] px-4 py-2 text-sm border-t-2 border-white/20 bg-slate-800/60 font-bold">
        <span className="text-slate-300">Totals</span>
        <span className="text-right font-mono text-green-400">{money(TOTAL)}</span>
        <span className="text-right font-mono text-green-400">{money(TOTAL)}</span>
      </div>
    </div>
  )
}

export default function Level9() {
  const navigate = useNavigate()
  const { completeLevel } = useProgress()
  const [phase, setPhase] = useState('learn')
  const [step, setStep] = useState(1)

  // Step 1 — column placement
  const [placed, setPlaced] = useState({})
  const [checked1, setChecked1] = useState(false)

  // Step 2 — ordering
  const [ordered, setOrdered] = useState([])
  const [checked2, setChecked2] = useState(false)

  // Step 3 — totals
  const [drTotal, setDrTotal] = useState('')
  const [crTotal, setCrTotal] = useState('')
  const [checked3, setChecked3] = useState(false)

  const [done, setDone] = useState(false)

  const placementCorrect = TB.filter(a => placed[a.name] === a.side).length
  const orderCorrect = ORDER_QUIZ.filter((name, i) => ordered[i] === name).length
  const drRight = parseAmount(drTotal) === TOTAL
  const crRight = parseAmount(crTotal) === TOTAL
  const totalsCorrect = (drRight ? 1 : 0) + (crRight ? 1 : 0)

  const maxPoints = TB.length + ORDER_QUIZ.length + 2
  const earned = placementCorrect + orderCorrect + totalsCorrect

  function finish() {
    completeLevel(9, Math.round((earned / maxPoints) * 100))
    setDone(true)
  }

  function restart() {
    setStep(1); setPlaced({}); setChecked1(false); setOrdered([]); setChecked2(false)
    setDrTotal(''); setCrTotal(''); setChecked3(false); setDone(false)
  }

  if (phase === 'learn') {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <div className="text-sm text-amber-400 font-semibold mb-1">Level 9</div>
          <h1 className="text-3xl font-extrabold text-white mb-2">The Trial Balance</h1>
          <p className="text-slate-400">Every ledger balance, listed in one place, in one specific order, in the right column — and the two columns must match.</p>
        </div>

        <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-5 mb-6">
          <p className="text-xs font-bold uppercase tracking-wider text-amber-300 mb-3">The order. Learn it cold — graders take points for this.</p>
          <ol className="space-y-2">
            {[
              { n: 1, label: 'Assets', detail: 'Cash first, then the rest roughly in order of liquidity. Contra-assets like Accumulated Depreciation sit here too — with credit balances.', tone: 'text-indigo-300' },
              { n: 2, label: 'Liabilities', detail: 'Accounts Payable, Unearned Revenue, Notes Payable. All credit balances.', tone: 'text-red-300' },
              { n: 3, label: 'Equity', detail: 'Common Stock, then Retained Earnings (credits), then Dividends — which is a DEBIT.', tone: 'text-purple-300' },
              { n: 4, label: 'Revenue', detail: 'Service Revenue, Sales Revenue. Credits.', tone: 'text-green-300' },
              { n: 5, label: 'Expenses', detail: 'Salaries, Rent, Utilities, Supplies Expense. All debits, listed last.', tone: 'text-orange-300' },
            ].map(row => (
              <li key={row.n} className="flex gap-3 rounded-xl bg-black/20 p-3">
                <span className="shrink-0 w-6 h-6 rounded-full bg-white/10 text-white text-xs font-bold flex items-center justify-center">{row.n}</span>
                <div>
                  <p className={`font-bold text-sm ${row.tone}`}>{row.label}</p>
                  <p className="text-xs text-slate-400">{row.detail}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="text-sm text-slate-300 mt-4">
            The shortcut: <span className="text-white font-semibold">balance sheet accounts first (A, L, E), then income statement accounts (R, E)</span> — the same order as the accounting equation, with revenue and expenses tacked on the end.
          </p>
        </div>

        <div className="rounded-xl bg-white/5 border border-white/10 p-5 mb-6">
          <h3 className="font-bold text-white mb-2">Which column?</h3>
          <p className="text-sm text-slate-300 mb-3">
            Each account goes in the column of its <span className="text-white font-semibold">normal balance</span>. You never choose — the account type decides.
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="rounded-xl bg-indigo-500/10 border border-indigo-500/30 p-4">
              <p className="font-bold text-indigo-300 mb-2">Debit column</p>
              <ul className="text-sm text-slate-300 space-y-1">
                <li>• Assets</li>
                <li>• Expenses</li>
                <li>• <span className="text-white font-semibold">Dividends</span></li>
              </ul>
            </div>
            <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/30 p-4">
              <p className="font-bold text-emerald-300 mb-2">Credit column</p>
              <ul className="text-sm text-slate-300 space-y-1">
                <li>• Liabilities</li>
                <li>• Common Stock &amp; <span className="text-white font-semibold">Retained Earnings</span></li>
                <li>• Revenue</li>
                <li>• Contra-assets (Accumulated Depreciation)</li>
              </ul>
            </div>
          </div>
          <div className="mt-3 rounded-lg bg-purple-500/10 border border-purple-500/30 p-3">
            <p className="text-sm text-white font-semibold mb-1">The Dividends vs. Retained Earnings question</p>
            <p className="text-xs text-slate-300">
              Both live in the equity family, and they go in opposite columns. Retained Earnings is accumulated profit the company kept — equity, so a <span className="text-white">credit</span>.
              Dividends are profit handed back to owners — that <span className="text-white">reduces</span> equity, and you reduce equity with a <span className="text-white">debit</span>. Dividends is also not an expense: it never appears on the income statement.
            </p>
          </div>
        </div>

        <div className="rounded-xl bg-white/5 border border-white/10 p-5 mb-6">
          <h3 className="font-bold text-white mb-2">What it proves — and what it does not</h3>
          <div className="space-y-2 text-sm">
            <p className="text-green-300">✓ Proves total debits equal total credits.</p>
            <p className="text-red-300">✗ Does NOT prove the entries are right. A rent payment debited to Utilities Expense still balances perfectly — and is still wrong.</p>
            <p className="text-red-300">✗ Does NOT catch a transaction you forgot to record entirely.</p>
          </div>
          <div className="mt-4 rounded-lg bg-slate-900/60 border border-white/10 p-3">
            <p className="text-sm font-semibold text-white mb-2">Two tricks when it does not balance</p>
            <p className="text-xs text-slate-300 mb-1">
              <span className="text-amber-300 font-semibold">Difference divisible by 9?</span> Look for a transposition — $540 written as $450.
            </p>
            <p className="text-xs text-slate-300">
              <span className="text-amber-300 font-semibold">Difference divisible by 2?</span> An amount is probably in the wrong column. Half the difference is the amount to hunt for: if you are out by $600, look for a $300 posted on the wrong side.
            </p>
          </div>
        </div>

        <button
          onClick={() => setPhase('play')}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-600 to-yellow-600 text-white font-bold text-lg hover:opacity-90 transition-opacity"
        >
          Build a trial balance in 3 steps →
        </button>
        <button
          onClick={() => { completeLevel(9); navigate('/') }}
          className="w-full mt-3 py-2.5 rounded-xl text-sm text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
        >
          Skip the practice — mark this lesson read
        </button>
      </div>
    )
  }

  if (done) {
    const pct = Math.round((earned / maxPoints) * 100)
    return (
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-6">
          <div className="text-5xl mb-4">{pct === 100 ? '🎉' : '🧮'}</div>
          <h2 className="text-3xl font-extrabold text-white mb-2">Trial Balance Complete</h2>
          <p className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-400 mb-2">{pct}%</p>
          <p className="text-slate-400 text-sm">
            Columns {placementCorrect}/{TB.length} · Order {orderCorrect}/{ORDER_QUIZ.length} · Totals {totalsCorrect}/2
          </p>
        </div>

        <p className="text-sm text-slate-400 mb-3 text-center">Here is the finished statement. This is the format to reproduce on your exam.</p>
        <div className="mb-6"><FinishedTB /></div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button onClick={restart} className="flex-1 py-3 rounded-xl bg-white/10 text-white font-semibold hover:bg-white/20">Try Again</button>
          <button onClick={() => setPhase('learn')} className="flex-1 py-3 rounded-xl bg-white/10 text-white font-semibold hover:bg-white/20">Review Lesson</button>
          <button onClick={() => navigate('/level/10')} className="flex-1 py-3 rounded-xl bg-gradient-to-r from-amber-600 to-yellow-600 text-white font-bold hover:opacity-90">Level 10 →</button>
        </div>
      </div>
    )
  }

  const StepHeader = () => (
    <div className="flex items-center justify-between mb-6">
      <div>
        <div className="text-sm text-amber-400 font-semibold">Level 9 — Step {step} of 3</div>
        <h1 className="text-xl font-extrabold text-white">
          {step === 1 ? 'Put every account in the right column' : step === 2 ? 'Put the accounts in the right order' : 'Total the columns'}
        </h1>
      </div>
      <div className="flex gap-1">
        {[1, 2, 3].map(s => (
          <div key={s} className={`w-2.5 h-2.5 rounded-full ${s < step ? 'bg-green-500' : s === step ? 'bg-amber-500' : 'bg-slate-700'}`} />
        ))}
      </div>
    </div>
  )

  if (step === 1) {
    const allPlaced = TB.every(a => placed[a.name])
    return (
      <div className="max-w-2xl mx-auto">
        <StepHeader />
        <p className="text-sm text-slate-400 mb-4">
          These are Bayside Landscaping&rsquo;s ledger balances on June 30. For each one, choose the column it belongs in on the trial balance.
        </p>
        <div className="rounded-xl border border-white/10 overflow-hidden mb-5">
          {TB.map((a, i) => {
            const pick = placed[a.name]
            const right = checked1 && pick === a.side
            const wrong = checked1 && pick !== a.side
            return (
              <div key={a.name} className={`px-3 py-2 border-t border-white/5 ${i === 0 ? 'border-t-0' : ''} ${wrong ? 'bg-red-900/20' : right ? 'bg-green-900/10' : ''}`}>
                <div className="flex items-center gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white truncate">{a.name}</p>
                    <p className="text-xs text-slate-500 font-mono">{money(a.amount)}</p>
                  </div>
                  {['debit', 'credit'].map(s => {
                    const selected = pick === s
                    const isAnswer = checked1 && a.side === s
                    return (
                      <button
                        key={s}
                        onClick={() => !checked1 && setPlaced(p => ({ ...p, [a.name]: s }))}
                        disabled={checked1}
                        className={`w-16 py-1.5 rounded-lg text-xs font-bold uppercase border transition-colors ${
                          isAnswer ? 'border-green-500 bg-green-900/40 text-green-300'
                            : selected ? 'border-amber-500 bg-amber-900/30 text-white'
                            : 'border-slate-600 bg-slate-800 text-slate-400 hover:border-amber-400'
                        }`}
                      >
                        {s === 'debit' ? 'DR' : 'CR'}
                      </button>
                    )
                  })}
                </div>
                {wrong && <p className="text-xs text-amber-300 mt-1">{WHY[a.name]}</p>}
              </div>
            )
          })}
        </div>

        {checked1 && (
          <div className={`rounded-xl p-4 mb-5 ${placementCorrect === TB.length ? 'bg-green-900/30 border border-green-700' : 'bg-amber-900/30 border border-amber-700'}`}>
            <p className="font-bold text-white">{placementCorrect} of {TB.length} in the right column</p>
            {placementCorrect < TB.length && <p className="text-sm text-slate-300 mt-1">The reason for each miss is shown in amber above. Dividends and Accumulated Depreciation are the two that catch almost everyone.</p>}
          </div>
        )}

        {!checked1 ? (
          <button
            onClick={() => setChecked1(true)}
            disabled={!allPlaced}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-600 to-yellow-600 text-white font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90"
          >
            {allPlaced ? 'Check My Columns' : 'Choose a column for every account'}
          </button>
        ) : (
          <button onClick={() => setStep(2)} className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-600 to-yellow-600 text-white font-bold hover:opacity-90">
            Step 2: Ordering →
          </button>
        )}
      </div>
    )
  }

  if (step === 2) {
    const remaining = ORDER_SCRAMBLED.filter(n => !ordered.includes(n))
    return (
      <div className="max-w-2xl mx-auto">
        <StepHeader />
        <p className="text-sm text-slate-400 mb-4">
          Tap the accounts in the order they belong on a trial balance — assets, then liabilities, then equity, then revenue, then expenses.
        </p>

        <div className="rounded-xl border border-white/10 bg-slate-900/50 p-4 mb-4">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">Your trial balance</p>
          {ordered.length === 0 && <p className="text-sm text-slate-600 italic py-2">Empty — tap an account below to start.</p>}
          <div className="space-y-1.5">
            {ordered.map((name, i) => {
              const right = checked2 && ORDER_QUIZ[i] === name
              const wrong = checked2 && ORDER_QUIZ[i] !== name
              return (
                <div key={name} className={`flex items-center gap-3 rounded-lg px-3 py-2 border ${
                  right ? 'border-green-600 bg-green-900/20' : wrong ? 'border-red-600 bg-red-900/20' : 'border-white/10 bg-white/5'
                }`}>
                  <span className="text-xs font-bold text-slate-500 w-4">{i + 1}</span>
                  <span className="text-sm text-white flex-1">{name}</span>
                  {checked2 && (right ? <span className="text-green-400 text-sm">✓</span> : <span className="text-xs text-amber-300">should be {ORDER_QUIZ[i]}</span>)}
                </div>
              )
            })}
          </div>
        </div>

        {!checked2 && (
          <>
            <div className="flex flex-wrap gap-2 mb-4">
              {remaining.map(name => (
                <button
                  key={name}
                  onClick={() => setOrdered(o => [...o, name])}
                  className="rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-sm text-white hover:border-amber-400 hover:bg-slate-700 transition-colors"
                >
                  {name}
                </button>
              ))}
            </div>
            {ordered.length > 0 && (
              <button onClick={() => setOrdered(o => o.slice(0, -1))} className="text-xs text-slate-500 hover:text-white mb-4">
                ← Undo last
              </button>
            )}
          </>
        )}

        {checked2 && (
          <div className={`rounded-xl p-4 mb-5 ${orderCorrect === ORDER_QUIZ.length ? 'bg-green-900/30 border border-green-700' : 'bg-amber-900/30 border border-amber-700'}`}>
            <p className="font-bold text-white mb-1">{orderCorrect} of {ORDER_QUIZ.length} in the right position</p>
            <p className="text-sm text-slate-300">
              Correct order: Cash and Accounts Receivable (assets) → Accounts Payable (liability) → Common Stock, Retained Earnings, then Dividends (equity) → Service Revenue → Rent Expense.
            </p>
          </div>
        )}

        {!checked2 ? (
          <button
            onClick={() => setChecked2(true)}
            disabled={ordered.length !== ORDER_QUIZ.length}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-600 to-yellow-600 text-white font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90"
          >
            {ordered.length === ORDER_QUIZ.length ? 'Check My Order' : `Place all ${ORDER_QUIZ.length} accounts (${ordered.length} placed)`}
          </button>
        ) : (
          <button onClick={() => setStep(3)} className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-600 to-yellow-600 text-white font-bold hover:opacity-90">
            Step 3: Totals →
          </button>
        )}
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <StepHeader />
      <p className="text-sm text-slate-400 mb-4">
        Here is the finished trial balance with every account in place. Add up each column and enter the totals.
      </p>

      <div className="mb-5 rounded-xl border border-white/10 overflow-hidden">
        <div className="grid grid-cols-[1fr_6.5rem_6.5rem] bg-slate-800 text-[10px] font-bold text-slate-400 uppercase tracking-wider px-4 py-2">
          <span>Account</span><span className="text-right">Debit</span><span className="text-right">Credit</span>
        </div>
        {TB.map(a => (
          <div key={a.name} className="grid grid-cols-[1fr_6.5rem_6.5rem] px-4 py-1 text-sm border-t border-white/5">
            <span className="text-white truncate pr-2">{a.name}</span>
            <span className="text-right font-mono text-slate-200">{a.side === 'debit' ? money(a.amount) : ''}</span>
            <span className="text-right font-mono text-slate-200">{a.side === 'credit' ? money(a.amount) : ''}</span>
          </div>
        ))}
        <div className="grid grid-cols-[1fr_6.5rem_6.5rem] gap-2 px-4 py-2 border-t-2 border-white/20 bg-slate-800/60 items-center">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Totals</span>
          <input
            inputMode="numeric" value={drTotal} onChange={e => !checked3 && setDrTotal(e.target.value)} disabled={checked3}
            placeholder="?"
            className={`rounded border px-1.5 py-1 text-sm font-mono text-right text-white bg-slate-800 outline-none focus:ring-1 focus:ring-amber-500 ${
              checked3 ? (drRight ? 'border-green-500' : 'border-red-500') : 'border-slate-600'}`}
          />
          <input
            inputMode="numeric" value={crTotal} onChange={e => !checked3 && setCrTotal(e.target.value)} disabled={checked3}
            placeholder="?"
            className={`rounded border px-1.5 py-1 text-sm font-mono text-right text-white bg-slate-800 outline-none focus:ring-1 focus:ring-amber-500 ${
              checked3 ? (crRight ? 'border-green-500' : 'border-red-500') : 'border-slate-600'}`}
          />
        </div>
      </div>

      {checked3 && (
        <div className={`rounded-xl p-5 mb-5 ${totalsCorrect === 2 ? 'bg-green-900/30 border border-green-700' : 'bg-amber-900/30 border border-amber-700'}`}>
          <p className="font-bold text-white mb-2">
            {totalsCorrect === 2 ? `✅ ${money(TOTAL)} = ${money(TOTAL)} — it balances.` : `📖 Both columns total ${money(TOTAL)}.`}
          </p>
          <p className="text-sm text-slate-300">
            Debits: 14,500 + 6,200 + 1,300 + 1,800 + 24,000 + 2,000 + 9,600 + 3,600 + 1,400 + 1,100 = <span className="text-white font-semibold">65,500</span>.
            Credits: 4,000 + 3,700 + 2,500 + 10,000 + 15,000 + 11,400 + 18,900 = <span className="text-white font-semibold">65,500</span>.
            Equal columns mean the ledger is arithmetically sound — now the financial statements can be built from it.
          </p>
        </div>
      )}

      {!checked3 ? (
        <button
          onClick={() => setChecked3(true)}
          disabled={parseAmount(drTotal) === null || parseAmount(crTotal) === null}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-600 to-yellow-600 text-white font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90"
        >
          Check Totals
        </button>
      ) : (
        <button onClick={finish} className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-600 to-yellow-600 text-white font-bold hover:opacity-90">
          See My Results →
        </button>
      )}
    </div>
  )
}

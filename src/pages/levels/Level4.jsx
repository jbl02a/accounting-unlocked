import { useState } from 'react'
import { useScrollTop } from '../../lib/useScrollTop'
import { useNavigate } from 'react-router-dom'
import { useProgress } from '../../context/ProgressContext'
import { useHints, HintBar, hintTally } from '../../components/Hint'
import { shuffleFields } from '../../lib/shuffle'

const TRANSACTIONS = [
  {
    id: 1,
    date: 'Mar 4',
    description: 'The company buys $500 of office supplies with cash.',
    emoji: '🖊️',
    hint: 'Think: what did we receive? What did we give up?',
    deeper: 'Only two accounts move here, and they are BOTH things the company owns. One went up (it now has supplies) and one went down (cash left). The account that went up takes the debit; the one that went down takes the credit.',
    debitAccount: 'Office Supplies',
    creditAccount: 'Cash',
    debitAmount: 500,
    creditAmount: 500,
    debitOptions: ['Office Supplies', 'Cash', 'Accounts Payable', 'Revenue'],
    creditOptions: ['Cash', 'Office Supplies', 'Bank Loan', 'Accounts Payable'],
    explanation: 'We received supplies (Asset ⬆️ → Debit), and paid cash (Asset ⬇️ → Credit). Both are assets — one went up, one went down.',
  },
  {
    id: 2,
    date: 'Mar 11',
    description: 'The company earns $1,200 by completing a consulting job. Client pays cash immediately.',
    emoji: '💼',
    hint: 'What did we gain? Cash. What increased because we earned it?',
    deeper: 'One asset came in, and the reason it came in is that the company EARNED it. Assets go up with a debit. The earning gets its own revenue account — and revenue goes up on the opposite side.',
    debitAccount: 'Cash',
    creditAccount: 'Service Revenue',
    debitAmount: 1200,
    creditAmount: 1200,
    debitOptions: ['Cash', 'Service Revenue', 'Accounts Receivable', 'Expense'],
    creditOptions: ['Service Revenue', 'Cash', 'Accounts Payable', 'Bank Loan'],
    explanation: 'We received cash (Asset ⬆️ → Debit). We earned revenue (Revenue ⬆️ → Credit). Revenue is always credited when earned.',
  },
  {
    id: 3,
    date: 'Mar 31',
    description: 'The company pays $800 of monthly rent.',
    emoji: '🏠',
    hint: 'Paying rent creates an expense. Cash goes out. Expense goes up.',
    deeper: 'Rent is a cost of operating, so it belongs in an expense account rather than an asset one — the company has nothing left to show for it. Expenses go up with a debit, and cash leaving is always a credit.',
    debitAccount: 'Rent Expense',
    creditAccount: 'Cash',
    debitAmount: 800,
    creditAmount: 800,
    debitOptions: ['Rent Expense', 'Cash', 'Prepaid Rent', 'Revenue'],
    creditOptions: ['Cash', 'Rent Expense', 'Accounts Payable', 'Common Stock'],
    explanation: 'Rent Expense increases (Expense ⬆️ → Debit). Cash decreases as we pay out (Asset ⬇️ → Credit). Expenses always get debited.',
  },
]

function JournalEntryRow({ label, amount, side, isCorrect, isWrong }) {
  return (
    <div className={`flex items-center py-2 px-3 rounded-lg ${isCorrect ? 'bg-green-900/30' : isWrong ? 'bg-red-900/30' : 'bg-slate-800/50'}`}>
      {side === 'credit' && <div className="w-6" />}
      <div className="flex-1">
        <span className={`font-medium text-sm ${isCorrect ? 'text-green-300' : isWrong ? 'text-red-300' : 'text-white'}`}>
          {label}
        </span>
      </div>
      <div className="text-right">
        <span className={`text-sm font-mono ${side === 'debit' ? 'text-white' : 'text-slate-400'}`}>
          {side === 'debit' ? `$${amount}` : ''}
        </span>
        <span className="w-16 inline-block text-right text-sm font-mono text-slate-400">
          {side === 'credit' ? `$${amount}` : ''}
        </span>
      </div>
      {isCorrect && <span className="ml-2 text-green-400">✓</span>}
      {isWrong && <span className="ml-2 text-red-400">✗</span>}
    </div>
  )
}

export default function Level4() {
  const navigate = useNavigate()
  const { completeLevel, recordTask } = useProgress()
  const [phase, setPhase] = useState('learn')
  const [txIndex, setTxIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState({})
  const [allDone, setAllDone] = useState(false)
  const [transactions, setTransactions] = useState(() => TRANSACTIONS.map(t => shuffleFields(t, ['debitOptions', 'creditOptions'])))
  useScrollTop([phase])
  const hints = useHints()

  const tx = transactions[txIndex]
  const ans = answers[tx.id] || { debit: '', credit: '' }
  const isSubmitted = submitted[tx.id]

  function setAns(field, val) {
    setAnswers(prev => ({ ...prev, [tx.id]: { ...prev[tx.id], [field]: val } }))
  }

  function handleSubmit() {
    setSubmitted(prev => ({ ...prev, [tx.id]: true }))
    const right = ans.debit === tx.debitAccount && ans.credit === tx.creditAccount
    recordTask(`L4-tx${tx.id}`, right, `Journal entry — ${tx.date}: ${tx.description.slice(0, 46)}…`, 4)
  }

  function goNext() {
    if (txIndex + 1 >= TRANSACTIONS.length) {
      const correct = TRANSACTIONS.filter(t => {
        const a = answers[t.id] || {}
        return a.debit === t.debitAccount && a.credit === t.creditAccount
      }).length
      completeLevel(4, Math.round((correct / TRANSACTIONS.length) * 100))
      setAllDone(true)
    } else {
      setTxIndex(i => i + 1)
    }
  }

  const debitCorrect = isSubmitted && ans.debit === tx.debitAccount
  const creditCorrect = isSubmitted && ans.credit === tx.creditAccount
  const debitWrong = isSubmitted && ans.debit !== tx.debitAccount
  const creditWrong = isSubmitted && ans.credit !== tx.creditAccount

  if (phase === 'learn') {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <div className="text-sm text-orange-400 font-semibold mb-1">Level 4</div>
          <h1 className="text-3xl font-extrabold text-white mb-2">Journal Entries</h1>
          <p className="text-slate-400">How accountants formally record every business transaction.</p>
        </div>

        <div className="rounded-xl bg-white/5 border border-white/10 p-5 mb-6">
          <h3 className="font-bold text-white mb-3">The Format</h3>
          <p className="text-slate-300 text-sm mb-4">Every journal entry has two parts: a Debit (left) and a Credit (right). They always equal each other.</p>
          {/* Example entry */}
          <div className="rounded-lg overflow-hidden border border-white/10">
            <div className="grid grid-cols-3 bg-slate-800 text-xs font-bold text-slate-400 uppercase tracking-wider px-3 py-2">
              <span>Account</span>
              <span className="text-center">Debit</span>
              <span className="text-right">Credit</span>
            </div>
            <div className="grid grid-cols-3 px-3 py-2 text-sm">
              <span className="text-white">Cash</span>
              <span className="text-center text-white font-mono">$1,000</span>
              <span className="text-right font-mono text-slate-400"></span>
            </div>
            <div className="grid grid-cols-3 px-3 py-2 text-sm bg-white/5">
              <span className="text-slate-400 pl-4 italic">Common Stock</span>
              <span className="text-center font-mono text-slate-400"></span>
              <span className="text-right text-white font-mono">$1,000</span>
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-2 text-center">Owner invests $1,000 cash → Cash (Asset ⬆️ Debit), Common Stock (Equity ⬆️ Credit)</p>
        </div>

        <div className="space-y-3 mb-8">
          {[
            { rule: 'Debit goes first', detail: 'The debited account is always listed on top, with the amount in the Debit column.' },
            { rule: 'Credit goes second', detail: 'The credited account is listed below, indented slightly, with the amount in the Credit column.' },
            { rule: 'Debits must equal Credits', detail: 'Every transaction must balance. If they don\'t match, something went wrong.' },
            { rule: 'Use account names, not descriptions', detail: 'Write "Cash" not "money we received." Real journal entries use standardized account names.' },
          ].map((item, i) => (
            <div key={i} className="flex gap-3 rounded-xl bg-orange-500/10 border border-orange-500/20 p-4">
              <span className="text-orange-400 font-bold text-sm shrink-0">#{i + 1}</span>
              <div>
                <p className="font-semibold text-white text-sm">{item.rule}</p>
                <p className="text-slate-400 text-xs mt-0.5">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => setPhase('play')}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 text-white font-bold text-lg hover:opacity-90 transition-opacity"
        >
          Record Your First Journal Entry →
        </button>
      </div>
    )
  }

  if (allDone) {
    const correct = TRANSACTIONS.filter(t => {
      const a = answers[t.id] || {}
      return a.debit === t.debitAccount && a.credit === t.creditAccount
    }).length

    return (
      <div className="max-w-xl mx-auto text-center">
        <div className="text-5xl mb-4">{correct === 3 ? '🎉' : '📓'}</div>
        <h2 className="text-3xl font-extrabold text-white mb-2">Journal Entries Complete!</h2>
        <p className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400 mb-2">
          {correct} / 3
        </p>
        {hints.usedCount > 0 && <p className="text-xs text-slate-500 mb-3">{hintTally(hints.usedCount)}</p>}
        <p className="text-slate-400 mb-8">
          {correct === 3 ? "You're thinking like a real accountant. Every entry balanced perfectly." :
           correct >= 2 ? "Nearly there! Review the explanations — you're very close." :
           "Journal entries take practice. Review the rules and try again!"}
        </p>
        <div className="flex gap-3">
          <button onClick={() => { setTxIndex(0); setAnswers({}); setSubmitted({}); setAllDone(false); setTransactions(TRANSACTIONS.map(t => shuffleFields(t, ['debitOptions', 'creditOptions']))) }} className="flex-1 py-3 rounded-xl bg-white/10 text-white font-semibold hover:bg-white/20">
            Try Again
          </button>
          <button onClick={() => navigate('/level/5')} className="flex-1 py-3 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 text-white font-bold hover:opacity-90">
            Final Level →
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="text-sm text-orange-400 font-semibold">Level 4 — Transaction {txIndex + 1} of {TRANSACTIONS.length}</div>
          <h1 className="text-xl font-extrabold text-white">Record the Journal Entry</h1>
        </div>
        <div className="flex gap-1">
          {TRANSACTIONS.map((_, i) => (
            <div key={i} className={`w-3 h-3 rounded-full ${i < txIndex ? 'bg-green-500' : i === txIndex ? 'bg-orange-500' : 'bg-slate-700'}`} />
          ))}
        </div>
      </div>

      {/* Transaction description */}
      <div className="rounded-xl bg-amber-500/10 border border-amber-500/20 p-5 mb-6">
        <div className="flex items-start gap-3">
          <span className="text-3xl">{tx.emoji}</span>
          <div>
            <p className="text-xs font-semibold text-amber-300 mb-1">{tx.date}</p>
            <p className="font-semibold text-white mb-1">{tx.description}</p>
            <p className="text-xs text-amber-400/70 italic">{tx.hint}</p>
          </div>
        </div>
      </div>

      {!isSubmitted && (
        <HintBar
          open={hints.isOpen(tx.id)}
          onToggle={() => hints.toggle(tx.id)}
          text={tx.deeper}
          className="mb-5"
        />
      )}

      {/* Entry builder */}
      <div className="rounded-xl border border-white/10 bg-slate-900/50 overflow-hidden mb-6">
        <div className="grid grid-cols-[3.6rem_1fr_5rem_5rem] bg-slate-800 text-[10px] font-bold text-slate-400 uppercase tracking-wider px-4 py-2">
          <span>Date</span>
          <span>Account Description</span>
          <span className="text-right">Debit</span>
          <span className="text-right">Credit</span>
        </div>

        {/* Debit row */}
        <div className="px-4 py-3 border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="w-12 shrink-0 text-xs text-slate-400">{tx.date}</span>
            <select
              value={ans.debit}
              onChange={e => setAns('debit', e.target.value)}
              disabled={isSubmitted}
              className={`flex-1 bg-slate-800 border rounded-lg px-3 py-2 text-sm text-white outline-none focus:ring-1 focus:ring-orange-500 disabled:opacity-60 ${
                debitCorrect ? 'border-green-500' : debitWrong ? 'border-red-500' : 'border-slate-600'
              }`}
            >
              <option value="">Select account to DEBIT…</option>
              {tx.debitOptions.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
            <span className="text-white font-mono text-sm">${tx.debitAmount}</span>
            <span className="w-16 text-right text-slate-600 text-sm font-mono">—</span>
          </div>
        </div>

        {/* Credit row */}
        <div className="px-4 py-3">
          <div className="flex items-center gap-3">
            <span className="w-12 shrink-0" />
            <div className="w-4 shrink-0" />
            <select
              value={ans.credit}
              onChange={e => setAns('credit', e.target.value)}
              disabled={isSubmitted}
              className={`flex-1 bg-slate-800 border rounded-lg px-3 py-2 text-sm text-white outline-none focus:ring-1 focus:ring-orange-500 disabled:opacity-60 ${
                creditCorrect ? 'border-green-500' : creditWrong ? 'border-red-500' : 'border-slate-600'
              }`}
            >
              <option value="">Select account to CREDIT…</option>
              {tx.creditOptions.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
            <span className="text-slate-600 font-mono text-sm w-10 text-right">—</span>
            <span className="text-white font-mono text-sm w-16 text-right">${tx.creditAmount}</span>
          </div>
        </div>
      </div>

      {/* Feedback */}
      {isSubmitted && (
        <div className={`rounded-xl p-5 mb-6 ${debitCorrect && creditCorrect ? 'bg-green-900/30 border border-green-700' : 'bg-amber-900/30 border border-amber-700'}`}>
          <p className="font-bold text-white mb-2">
            {debitCorrect && creditCorrect ? '✅ Perfect journal entry!' : '📖 Here\'s the correct answer:'}
          </p>
          {(!debitCorrect || !creditCorrect) && (
            <div className="mb-3 space-y-1">
              <p className="text-sm text-slate-300">
                <span className="font-semibold text-white">Debit:</span> {tx.debitAccount} ${tx.debitAmount}
              </p>
              <p className="text-sm text-slate-300">
                <span className="font-semibold text-white pl-6">Credit:</span> {tx.creditAccount} ${tx.creditAmount}
              </p>
            </div>
          )}
          <p className="text-sm text-slate-300">{tx.explanation}</p>
        </div>
      )}

      <div className="flex gap-3">
        {!isSubmitted ? (
          <button
            onClick={handleSubmit}
            disabled={!ans.debit || !ans.credit}
            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 text-white font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
          >
            {!ans.debit || !ans.credit ? 'Select both accounts' : 'Check My Entry'}
          </button>
        ) : (
          <button onClick={goNext} className="flex-1 py-3 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 text-white font-bold hover:opacity-90 transition-opacity">
            {txIndex + 1 < TRANSACTIONS.length ? `Next Transaction →` : 'See Results →'}
          </button>
        )}
      </div>
    </div>
  )
}

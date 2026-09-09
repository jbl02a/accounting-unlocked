import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useProgress } from '../../context/ProgressContext'
import { useHints, HintBar, hintTally } from '../../components/Hint'

const QUESTIONS = [
  { account: 'Cash', type: 'asset', action: 'increasing', correct: 'debit', explanation: 'Cash is an Asset. Assets increase with a Debit.', hint: 'First name the category: cash is something the business owns. Then recall which side that category lives on — an account always GROWS on its own normal side.' },
  { account: 'Accounts Payable', type: 'liability', action: 'increasing', correct: 'credit', explanation: 'Accounts Payable is a Liability. Liabilities increase with a Credit.', hint: 'A payable is money owed to an outsider, which makes it a liability. Liabilities sit on the opposite side from assets — and increasing puts it on its own side.' },
  { account: 'Sales Revenue', type: 'revenue', action: 'increasing', correct: 'credit', explanation: 'Sales Revenue is Revenue. Revenue increases with a Credit.', hint: 'Revenue makes the owners\u2019 stake in the business bigger. Work out which side equity grows on, because revenue always follows equity there.' },
  { account: 'Rent Expense', type: 'expense', action: 'increasing', correct: 'debit', explanation: 'Rent Expense is an Expense. Expenses increase with a Debit.', hint: 'Expenses do the opposite of revenue — they shrink the owners\u2019 stake. So if revenue grows on one side, expenses have to grow on the other.' },
  { account: 'Common Stock', type: 'equity', action: 'increasing', correct: 'credit', explanation: 'Common Stock is Equity. Equity increases with a Credit.', hint: 'Common Stock is the owners\u2019 investment, which is straight equity. This is the base case — whichever side equity grows on is the answer.' },
  { account: 'Cash', type: 'asset', action: 'decreasing', correct: 'credit', explanation: 'Cash is an Asset. Assets decrease with a Credit.', hint: 'Read it twice — this one says DECREASING. Work out the side cash normally grows on, then take the opposite side.' },
  { account: 'Bank Loan', type: 'liability', action: 'decreasing', correct: 'debit', explanation: 'Bank Loan is a Liability. Liabilities decrease with a Debit.', hint: 'Paying down a loan makes a liability smaller. Find the side liabilities normally grow on, then flip it — shrinking always means the opposite side.' },
  { account: 'Office Supplies', type: 'asset', action: 'increasing', correct: 'debit', explanation: 'Office Supplies is an Asset. Assets increase with a Debit.', hint: 'Unused supplies are something the business owns, so this is an asset going up. Identical reasoning to the very first question.' },
  { account: 'Utilities Expense', type: 'expense', action: 'increasing', correct: 'debit', explanation: 'Utilities Expense is an Expense. Expenses increase with a Debit.', hint: 'Every expense account behaves the same way, no matter what the money was spent on. If you got Rent Expense, this is the same answer.' },
  { account: 'Retained Earnings', type: 'equity', action: 'increasing', correct: 'credit', explanation: 'Retained Earnings is Equity. Equity increases with a Credit.', hint: 'Retained earnings are profits kept in the business — still part of the owners\u2019 stake. Same category as Common Stock, so the same answer.' },
]

const TYPE_COLORS = {
  asset: 'text-indigo-400',
  liability: 'text-red-400',
  equity: 'text-purple-400',
  revenue: 'text-green-400',
  expense: 'text-orange-400',
}

function TAccount({ account, type }) {
  const color = TYPE_COLORS[type] || 'text-white'
  return (
    <div className="inline-flex flex-col items-center">
      <div className={`font-bold text-lg mb-1 ${color}`}>{account}</div>
      <div className="border-2 border-slate-500 rounded-t-sm w-64">
        <div className="flex">
          <div className="flex-1 border-r-2 border-slate-500 p-4 text-center min-h-20">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Debit</div>
            <div className="text-xs text-slate-500">(Left side)</div>
          </div>
          <div className="flex-1 p-4 text-center min-h-20">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Credit</div>
            <div className="text-xs text-slate-500">(Right side)</div>
          </div>
        </div>
      </div>
      <div className="w-0.5 h-4 bg-slate-500" />
      <div className="text-xs text-slate-500">pivot</div>
    </div>
  )
}

export default function Level3() {
  const navigate = useNavigate()
  const { completeLevel } = useProgress()
  const [phase, setPhase] = useState('learn')
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState([])
  const [chosen, setChosen] = useState(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [done, setDone] = useState(false)
  const hints = useHints()

  const q = QUESTIONS[current]

  function handleAnswer(choice) {
    if (showFeedback) return
    setChosen(choice)
    setShowFeedback(true)
    const isCorrect = choice === q.correct
    setAnswers(prev => [...prev, isCorrect])
  }

  function nextQuestion() {
    if (current + 1 >= QUESTIONS.length) {
      const score = Math.round((answers.filter(Boolean).length / QUESTIONS.length) * 100)
      completeLevel(3, score)
      setDone(true)
    } else {
      setCurrent(c => c + 1)
      setChosen(null)
      setShowFeedback(false)
    }
  }

  if (phase === 'learn') {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <div className="text-sm text-emerald-400 font-semibold mb-1">Level 3</div>
          <h1 className="text-3xl font-extrabold text-white mb-2">Debits & Credits</h1>
          <p className="text-slate-400">The most misunderstood concept in accounting. Let's clear it up once and for all.</p>
        </div>

        {/* T-Account visual */}
        <div className="flex justify-center mb-8">
          <TAccount account="Any Account" type="asset" />
        </div>

        <div className="rounded-xl bg-white/5 border border-white/10 p-5 mb-6">
          <p className="text-white font-semibold mb-2">The key insight:</p>
          <p className="text-slate-300 text-sm leading-relaxed mb-3">
            "Debit" just means the <span className="text-white font-semibold">left side</span> of a T-account. "Credit" just means the <span className="text-white font-semibold">right side</span>.
            They are <span className="text-white font-semibold">neutral words</span> — they don't inherently mean "good" or "bad."
            Whether a debit increases or decreases an account depends on the <span className="text-white font-semibold">account type</span>.
          </p>
        </div>

        {/* Rules table */}
        <div className="rounded-xl overflow-hidden border border-white/10 mb-8">
          <div className="grid grid-cols-3 bg-slate-800 text-xs font-bold text-slate-400 uppercase tracking-wider px-4 py-2">
            <span>Account Type</span>
            <span className="text-center">Debit Does</span>
            <span className="text-center">Credit Does</span>
          </div>
          {[
            { type: 'Assets', color: 'indigo', debit: '⬆️ Increases', credit: '⬇️ Decreases' },
            { type: 'Liabilities', color: 'red', debit: '⬇️ Decreases', credit: '⬆️ Increases' },
            { type: 'Equity', color: 'purple', debit: '⬇️ Decreases', credit: '⬆️ Increases' },
            { type: 'Revenue', color: 'green', debit: '⬇️ Decreases', credit: '⬆️ Increases' },
            { type: 'Expenses', color: 'orange', debit: '⬆️ Increases', credit: '⬇️ Decreases' },
          ].map((row, i) => (
            <div key={i} className="grid grid-cols-3 border-t border-white/10 px-4 py-3 hover:bg-white/5">
              <span className="font-semibold text-white text-sm">{row.type}</span>
              <span className="text-center text-sm text-slate-300">{row.debit}</span>
              <span className="text-center text-sm text-slate-300">{row.credit}</span>
            </div>
          ))}
        </div>

        {/* Mnemonic */}
        <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/30 p-5 mb-8">
          <p className="font-bold text-emerald-400 mb-2">Memory trick: DEAD CLIC</p>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-white font-semibold mb-1">Debits increase:</p>
              <p className="text-slate-300"><span className="text-white font-bold">D</span>ividends</p>
              <p className="text-slate-300"><span className="text-white font-bold">E</span>xpenses</p>
              <p className="text-slate-300"><span className="text-white font-bold">A</span>ssets</p>
              <p className="text-slate-300"><span className="text-white font-bold">D</span>rawings</p>
            </div>
            <div>
              <p className="text-white font-semibold mb-1">Credits increase:</p>
              <p className="text-slate-300"><span className="text-white font-bold">C</span>apital (Equity)</p>
              <p className="text-slate-300"><span className="text-white font-bold">L</span>iabilities</p>
              <p className="text-slate-300"><span className="text-white font-bold">I</span>ncome (Revenue)</p>
              <p className="text-slate-300"><span className="text-white font-bold">C</span>redits</p>
            </div>
          </div>
        </div>

        <button
          onClick={() => setPhase('quiz')}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-lg hover:opacity-90 transition-opacity"
        >
          Start the Quiz — 10 Questions →
        </button>
      </div>
    )
  }

  if (done) {
    const correctCount = answers.filter(Boolean).length
    const pct = Math.round((correctCount / QUESTIONS.length) * 100)
    return (
      <div className="max-w-xl mx-auto text-center">
        <div className="text-6xl mb-4">{pct >= 80 ? '🎉' : pct >= 50 ? '👍' : '📚'}</div>
        <h2 className="text-3xl font-extrabold text-white mb-2">Quiz Complete!</h2>
        <p className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400 mb-2">{pct}%</p>
        <p className="text-slate-400 mb-2">{correctCount} / {QUESTIONS.length} correct</p>
        {hints.usedCount > 0 && <p className="text-xs text-slate-500 mb-2">{hintTally(hints.usedCount)}</p>}
        <p className="text-slate-300 mb-8">
          {pct === 100 ? "Flawless! You've mastered debits and credits." :
           pct >= 80 ? "Great work! The rules are sticking." :
           pct >= 50 ? "Good start! Review the table and try again — you've got this." :
           "Debits and credits take practice. Review the rules and give it another shot!"}
        </p>
        <div className="flex gap-3">
          <button onClick={() => { setCurrent(0); setAnswers([]); setChosen(null); setShowFeedback(false); setDone(false) }} className="flex-1 py-3 rounded-xl bg-white/10 text-white font-semibold hover:bg-white/20">
            Try Again
          </button>
          <button onClick={() => navigate('/level/4')} className="flex-1 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold hover:opacity-90">
            Next Level →
          </button>
        </div>
      </div>
    )
  }

  const correctCount = answers.filter(Boolean).length

  return (
    <div className="max-w-xl mx-auto">
      {/* Progress */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-slate-400">Question {current + 1} of {QUESTIONS.length}</span>
        <span className="text-sm font-semibold text-emerald-400">{correctCount} correct</span>
      </div>
      <div className="h-1.5 rounded-full bg-white/10 overflow-hidden mb-8">
        <div
          className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-300"
          style={{ width: `${(current / QUESTIONS.length) * 100}%` }}
        />
      </div>

      {/* Question card */}
      <div className="rounded-2xl bg-slate-900/70 border border-white/10 p-8 mb-6 text-center">
        <p className="text-slate-400 text-sm mb-3">
          This account is <span className={`font-bold ${TYPE_COLORS[q.type]}`}>{q.type}</span> type
        </p>
        <h2 className="text-2xl font-extrabold text-white mb-1">{q.account}</h2>
        <p className="text-xl font-semibold mb-6">
          is <span className={q.action === 'increasing' ? 'text-green-400' : 'text-red-400'}>
            {q.action === 'increasing' ? '⬆️ increasing' : '⬇️ decreasing'}
          </span>
        </p>
        <p className="text-slate-400 text-sm">Should this be recorded as a…</p>
      </div>

      {!showFeedback && (
        <HintBar
          open={hints.isOpen(current)}
          onToggle={() => hints.toggle(current)}
          text={q.hint}
          className="mb-5"
        />
      )}

      {/* Answer buttons */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {['debit', 'credit'].map(choice => {
          let style = 'bg-slate-800 border-slate-600 text-white hover:border-indigo-400'
          if (showFeedback) {
            if (choice === q.correct) style = 'bg-green-900/50 border-green-500 text-green-300'
            else if (choice === chosen && chosen !== q.correct) style = 'bg-red-900/50 border-red-500 text-red-300'
          }
          return (
            <button
              key={choice}
              onClick={() => handleAnswer(choice)}
              disabled={showFeedback}
              className={`py-6 rounded-xl border-2 font-bold text-xl transition-colors ${style} disabled:cursor-not-allowed`}
            >
              {choice === 'debit' ? '← Debit' : 'Credit →'}
              <div className="text-xs font-normal text-slate-400 mt-1">(Left side)</div>
            </button>
          )
        })}
      </div>

      {/* Feedback */}
      {showFeedback && (
        <div className={`rounded-xl p-4 mb-6 ${chosen === q.correct ? 'bg-green-900/30 border border-green-700' : 'bg-red-900/30 border border-red-700'}`}>
          <p className="font-bold text-white mb-1">{chosen === q.correct ? '✅ Correct!' : '❌ Not quite.'}</p>
          <p className="text-sm text-slate-300">{q.explanation}</p>
        </div>
      )}

      {showFeedback && (
        <button
          onClick={nextQuestion}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold hover:opacity-90 transition-opacity"
        >
          {current + 1 < QUESTIONS.length ? 'Next Question →' : 'See Results →'}
        </button>
      )}
    </div>
  )
}

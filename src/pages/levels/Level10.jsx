import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useProgress } from '../../context/ProgressContext'
import EntryTable, { money } from '../../components/EntryTable'
import { useHints, HintToggle, HintPanel, HintBar, hintTally } from '../../components/Hint'

// Novak Consulting — one month, ten transactions, one balanced trial balance ($33,000).
// Four entries are shown as worked examples; six are the student's to record.
const LEDGER_STORY = [
  { date: 'Mar 1', text: 'Alex Novak invests $20,000 cash in the business in exchange for common stock.', given: [{ account: 'Cash', dr: 20000 }, { account: 'Common Stock', cr: 20000 }] },
  { date: 'Mar 3', text: 'Buys office equipment for $6,000, paying $2,000 cash and signing a note payable for the balance.', quiz: 1 },
  { date: 'Mar 5', text: 'Purchases $900 of supplies on account.', quiz: 2 },
  { date: 'Mar 9', text: 'Completes a consulting job and receives $5,500 in cash.', given: [{ account: 'Cash', dr: 5500 }, { account: 'Service Revenue', cr: 5500 }] },
  { date: 'Mar 14', text: 'Completes a $3,200 job for a client and bills them; payment is due next month.', quiz: 3 },
  { date: 'Mar 18', text: 'Pays March office rent of $1,100.', given: [{ account: 'Rent Expense', dr: 1100 }, { account: 'Cash', cr: 1100 }] },
  { date: 'Mar 22', text: 'Receives $1,800 from the client billed on March 14.', quiz: 4 },
  { date: 'Mar 25', text: 'Pays $600 of the amount owed for the supplies bought on March 5.', quiz: 5 },
  { date: 'Mar 28', text: 'Pays the assistant’s salary of $2,400.', given: [{ account: 'Salaries Expense', dr: 2400 }, { account: 'Cash', cr: 2400 }] },
  { date: 'Mar 31', text: 'Pays a $1,000 cash dividend to Alex.', quiz: 6 },
]

const JOURNAL_QUIZ = [
  {
    n: 1, date: 'Mar 3',
    prompt: 'Buys office equipment for $6,000, paying $2,000 cash and signing a note payable for the balance.',
    options: [
      [{ account: 'Equipment', dr: 6000 }, { account: 'Cash', cr: 2000 }, { account: 'Notes Payable', cr: 4000 }],
      [{ account: 'Equipment', dr: 2000 }, { account: 'Cash', cr: 2000 }],
      [{ account: 'Equipment', dr: 6000 }, { account: 'Cash', cr: 6000 }],
      [{ account: 'Equipment Expense', dr: 6000 }, { account: 'Cash', cr: 2000 }, { account: 'Notes Payable', cr: 4000 }],
    ],
    correctIndex: 0,
        hint: 'Two questions settle this. First: is the equipment worth $6,000 or only the $2,000 that was paid today? Second: paying partly in cash and partly with a promise means the credit side has to split into two lines.',
    explanation: 'The equipment is worth $6,000 no matter how it was paid for, so Equipment is debited $6,000. The credits split between the $2,000 of cash that left and the $4,000 promise to pay. Equipment is an asset, not an expense — it will be used for years.',
  },
  {
    n: 2, date: 'Mar 5',
    prompt: 'Purchases $900 of supplies on account.',
    options: [
      [{ account: 'Supplies', dr: 900 }, { account: 'Accounts Payable', cr: 900 }],
      [{ account: 'Supplies', dr: 900 }, { account: 'Cash', cr: 900 }],
      [{ account: 'Supplies Expense', dr: 900 }, { account: 'Accounts Payable', cr: 900 }],
      [{ account: 'Accounts Payable', dr: 900 }, { account: 'Supplies', cr: 900 }],
    ],
    correctIndex: 0,
        hint: 'Two traps in one entry. Did any cash actually move here? And are unused supplies a thing the company owns, or a cost it has already burned through?',
    explanation: '"On account" means no cash moved — a payable was created instead. And supplies are an asset when purchased; they only become Supplies Expense as they are consumed.',
  },
  {
    n: 3, date: 'Mar 14',
    prompt: 'Completes a $3,200 job for a client and bills them; payment is due next month.',
    options: [
      [{ account: 'Accounts Receivable', dr: 3200 }, { account: 'Service Revenue', cr: 3200 }],
      [{ account: 'Cash', dr: 3200 }, { account: 'Service Revenue', cr: 3200 }],
      [{ account: 'Accounts Payable', dr: 3200 }, { account: 'Service Revenue', cr: 3200 }],
      [{ account: 'Service Revenue', dr: 3200 }, { account: 'Accounts Receivable', cr: 3200 }],
    ],
    correctIndex: 0,
        hint: 'The job is finished, so the revenue is definitely earned today. The only question is what to put on the debit side when no cash arrived.',
    explanation: 'The work is done, so the revenue is earned and recorded today — that is accrual accounting. Because the client has not paid, the debit goes to Accounts Receivable instead of Cash.',
  },
  {
    n: 4, date: 'Mar 22',
    prompt: 'Receives $1,800 from the client billed on March 14.',
    options: [
      [{ account: 'Cash', dr: 1800 }, { account: 'Accounts Receivable', cr: 1800 }],
      [{ account: 'Cash', dr: 1800 }, { account: 'Service Revenue', cr: 1800 }],
      [{ account: 'Accounts Receivable', dr: 1800 }, { account: 'Cash', cr: 1800 }],
      [{ account: 'Cash', dr: 1800 }, { account: 'Accounts Payable', cr: 1800 }],
    ],
    correctIndex: 0,
        hint: 'Look back at what was already recorded on March 14 before you answer. Has the company earned anything NEW today, or is one asset just turning into another?',
    explanation: 'The revenue was already recorded on March 14. Crediting Service Revenue again would double-count it. Collecting simply turns a receivable into cash — total assets do not change.',
  },
  {
    n: 5, date: 'Mar 25',
    prompt: 'Pays $600 of the amount owed for the supplies bought on March 5.',
    options: [
      [{ account: 'Accounts Payable', dr: 600 }, { account: 'Cash', cr: 600 }],
      [{ account: 'Supplies Expense', dr: 600 }, { account: 'Cash', cr: 600 }],
      [{ account: 'Supplies', dr: 600 }, { account: 'Cash', cr: 600 }],
      [{ account: 'Cash', dr: 600 }, { account: 'Accounts Payable', cr: 600 }],
    ],
    correctIndex: 0,
        hint: 'The supplies themselves were recorded back on March 5. So today, is a new cost being created, or is an existing debt being paid down?',
    explanation: 'The supplies were recorded when purchased. Paying only erases part of the debt: debit Accounts Payable to shrink the liability, credit Cash as it leaves.',
  },
  {
    n: 6, date: 'Mar 31',
    prompt: 'Pays a $1,000 cash dividend to Alex.',
    options: [
      [{ account: 'Dividends', dr: 1000 }, { account: 'Cash', cr: 1000 }],
      [{ account: 'Dividend Expense', dr: 1000 }, { account: 'Cash', cr: 1000 }],
      [{ account: 'Common Stock', dr: 1000 }, { account: 'Cash', cr: 1000 }],
      [{ account: 'Cash', dr: 1000 }, { account: 'Dividends', cr: 1000 }],
    ],
    correctIndex: 0,
        hint: 'Cash clearly leaves. The real question is what to call the other side: is paying the owner a cost of running the business, or is it handing profit back to him?',
    explanation: 'Dividends get their own account with a debit balance. They are NOT an expense — they never touch the income statement. They are a distribution of profit that reduces equity.',
  },
]

const POSTING = [
  {
    account: 'Cash', answer: 20200, side: 'debit',
    math: '20,000 + 5,500 + 1,800 = 27,300 of debits; 2,000 + 1,100 + 600 + 2,400 + 1,000 = 7,100 of credits; 27,300 − 7,100 = 20,200 debit.',
    postings: 'Debits: 20,000 (investment), 5,500 (cash job), 1,800 (collection). Credits: 2,000 (equipment), 1,100 (rent), 600 (paid on account), 2,400 (salary), 1,000 (dividend).',
        hint: 'This is the busiest account, so be systematic. Add the three amounts that brought cash IN, add the five that took cash OUT, then subtract. Work down the list in order so you do not miss one.',
  },
  {
    account: 'Accounts Receivable', answer: 1400, side: 'debit',
    math: '3,200 billed − 1,800 collected = 1,400 debit.',
    postings: 'Debits: 3,200 (Mar 14 billing). Credits: 1,800 (Mar 22 collection).',
        hint: 'Only two transactions in the whole month touched receivables: the day the client was billed, and the day they paid part of it. What is still outstanding?',
  },
  {
    account: 'Accounts Payable', answer: 300, side: 'credit',
    math: '900 owed − 600 paid = 300 credit.',
    postings: 'Credits: 900 (Mar 5 supplies). Debits: 600 (Mar 25 payment).',
        hint: 'Two transactions again: the purchase created the debt, the payment shrank it. How much does Novak still owe the vendor?',
  },
  {
    account: 'Service Revenue', answer: 8700, side: 'credit',
    math: '5,500 + 3,200 = 8,700 credit.',
    postings: 'Credits: 5,500 (Mar 9 cash job), 3,200 (Mar 14 job on account). Revenue is never debited during the period.',
        hint: 'Two jobs were completed in March. Add both — it makes no difference that one was paid in cash and the other is still owed.',
  },
]

const TRIAL_BALANCE = [
  { name: 'Cash', amount: 20200, side: 'debit' },
  { name: 'Accounts Receivable', amount: 1400, side: 'debit' },
  { name: 'Supplies', amount: 900, side: 'debit' },
  { name: 'Equipment', amount: 6000, side: 'debit' },
  { name: 'Accounts Payable', amount: 300, side: 'credit' },
  { name: 'Notes Payable', amount: 4000, side: 'credit' },
  { name: 'Common Stock', amount: 20000, side: 'credit' },
  { name: 'Dividends', amount: 1000, side: 'debit' },
  { name: 'Service Revenue', amount: 8700, side: 'credit' },
  { name: 'Rent Expense', amount: 1100, side: 'debit' },
  { name: 'Salaries Expense', amount: 2400, side: 'debit' },
]

const TB_TOTAL = 33000

// Deliberately terser than the Level 9 hints — by the capstone he should need
// a reminder of the category, not a walkthrough of the rule.
const COLUMN_HINTS = {
  Cash: 'Something the company owns. Which column do owned things sit in?',
  'Accounts Receivable': 'Customers owe US. That makes it a thing the company owns, not something it owes.',
  Supplies: 'Still on the shelf and unused, so the company owns them. Not an expense yet.',
  Equipment: 'Owned and used for years — the same category as Cash and Supplies.',
  'Accounts Payable': 'Novak owes the vendor. Owed to an outsider is the opposite column from owned.',
  'Notes Payable': 'A written promise to repay. Same category as Accounts Payable.',
  'Common Stock': 'What the owner put in. Equity — and equity increases on one particular side.',
  Dividends: 'The oddball. It sits in the equity group but REDUCES equity, and reducing equity means the opposite column from Common Stock.',
  'Service Revenue': 'Revenue makes the owners\u2019 stake bigger, so it follows equity into the same column.',
  'Rent Expense': 'Expenses shrink the owners\u2019 stake, so they land opposite revenue.',
  'Salaries Expense': 'Every expense goes the same way, whatever it was spent on.',
}

const ANALYSIS = [
  {
    prompt: 'What was Novak Consulting’s net income for March?',
    options: ['$5,200', '$4,200', '$8,700', '$2,800'],
    correctIndex: 0,
        hint: 'Net income is revenue minus expenses. Before you compute, settle one thing: does the $1,000 dividend belong in that subtraction? Two of the answer choices differ by exactly that amount.',
    explanation: 'Net income = Revenue − Expenses = $8,700 − ($1,100 rent + $2,400 salaries) = $5,200. Dividends are NOT an expense, so the $1,000 is not subtracted here. ($4,200 is the trap — that is what is left after the dividend, which is the change in retained earnings, not net income.)',
  },
  {
    prompt: 'Retained Earnings does not even appear on this trial balance. Why?',
    options: [
      'March is the company’s first month, so it starts at $0 — and the closing entries that move net income into it have not happened yet',
      'Retained Earnings only appears on the balance sheet, never on a trial balance',
      'It was replaced by the Dividends account',
      'The trial balance is missing an account and does not actually balance',
    ],
    correctIndex: 0,
        hint: 'Ask what retained earnings actually accumulates — and then ask whether any of that has had a chance to happen yet in a company\u2019s very first month of existence.',
    explanation: 'Retained Earnings holds profits from PRIOR periods. In a first month it is $0. This month’s profit is still sitting in the revenue and expense accounts; closing entries at period-end sweep them into Retained Earnings. After closing, Novak’s Retained Earnings would be $5,200 − $1,000 of dividends = $4,200.',
  },
  {
    prompt: 'Novak’s trial balance shows $33,000 in both columns. What does that prove?',
    options: [
      'Only that total debits equal total credits — an entry could still be in the wrong account',
      'That every transaction was recorded in the correct account',
      'That the company was profitable',
      'That no transactions were left out',
    ],
    correctIndex: 0,
        hint: 'Try to invent a mistake that would still leave both columns equal. If you can think of even one, that tells you what equal columns can and cannot prove.',
    explanation: 'A trial balance is an arithmetic check, not an accuracy check. Debiting Utilities Expense instead of Rent Expense still balances. So does forgetting an entire transaction. That is why accountants review the entries themselves, not just the totals.',
  },
]

function parseAmount(raw) {
  const cleaned = String(raw).replace(/[^0-9.]/g, '')
  return cleaned === '' ? null : Number(cleaned)
}

export default function Level10() {
  const navigate = useNavigate()
  const { completeLevel } = useProgress()
  const [phase, setPhase] = useState('brief')
  const [step, setStep] = useState(1)

  const [jIndex, setJIndex] = useState(0)
  const [jChosen, setJChosen] = useState(null)
  const [jResults, setJResults] = useState([])

  const [balances, setBalances] = useState({})
  const [checked2, setChecked2] = useState(false)

  const [columns, setColumns] = useState({})
  const [drTotal, setDrTotal] = useState('')
  const [crTotal, setCrTotal] = useState('')
  const [checked3, setChecked3] = useState(false)

  const [aIndex, setAIndex] = useState(0)
  const [aChosen, setAChosen] = useState(null)
  const [aResults, setAResults] = useState([])

  const [done, setDone] = useState(false)
  const hints = useHints()

  const postingCorrect = POSTING.filter(p => parseAmount(balances[p.account] || '') === p.answer).length
  const columnCorrect = TRIAL_BALANCE.filter(a => columns[a.name] === a.side).length
  const drRight = parseAmount(drTotal) === TB_TOTAL
  const crRight = parseAmount(crTotal) === TB_TOTAL
  const totalsCorrect = (drRight ? 1 : 0) + (crRight ? 1 : 0)

  const maxPoints = JOURNAL_QUIZ.length + POSTING.length + TRIAL_BALANCE.length + 2 + ANALYSIS.length
  const earned = jResults.filter(Boolean).length + postingCorrect + columnCorrect + totalsCorrect + aResults.filter(Boolean).length
  const pct = Math.round((earned / maxPoints) * 100)

  function restart() {
    setStep(1); setJIndex(0); setJChosen(null); setJResults([]); setBalances({}); setChecked2(false)
    setColumns({}); setDrTotal(''); setCrTotal(''); setChecked3(false); setAIndex(0); setAChosen(null); setAResults([]); setDone(false)
    hints.reset()
  }

  if (phase === 'brief') {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <div className="text-sm text-fuchsia-400 font-semibold mb-1">Level 10 — Capstone</div>
          <h1 className="text-3xl font-extrabold text-white mb-2">The Full Cycle Challenge</h1>
          <p className="text-slate-400">Everything from Levels 1 through 9, on one company, in one sitting. This is what an exam problem actually looks like.</p>
        </div>

        <div className="rounded-2xl border border-fuchsia-500/30 bg-fuchsia-500/10 p-5 mb-6">
          <p className="text-xs font-bold uppercase tracking-wider text-fuchsia-300 mb-3">Your four jobs</p>
          <div className="space-y-2">
            {[
              { n: 1, t: 'Journalize', d: 'Record 6 of Novak Consulting’s March transactions. Four are already done as examples.' },
              { n: 2, t: 'Post', d: 'Work out the ending balance of four busy accounts.' },
              { n: 3, t: 'Trial balance', d: 'Put every balance in the right column and total them.' },
              { n: 4, t: 'Analyze', d: 'Answer what the finished statement actually tells you.' },
            ].map(s => (
              <div key={s.n} className="flex gap-3 rounded-xl bg-black/20 p-3">
                <span className="shrink-0 w-6 h-6 rounded-full bg-white/10 text-white text-xs font-bold flex items-center justify-center">{s.n}</span>
                <div>
                  <p className="font-bold text-sm text-white">{s.t}</p>
                  <p className="text-xs text-slate-400">{s.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl bg-white/5 border border-white/10 p-5 mb-6">
          <p className="font-bold text-white mb-1">Novak Consulting — March transactions</p>
          <p className="text-xs text-slate-400 mb-3">Read them once now. You will come back to them in every step.</p>
          <div className="divide-y divide-white/5">
            {LEDGER_STORY.map((t, i) => (
              <div key={i} className="py-2 flex gap-3">
                <span className="shrink-0 w-14 text-xs font-semibold text-fuchsia-300 pt-0.5">{t.date}</span>
                <div className="flex-1">
                  <p className="text-sm text-slate-300">{t.text}</p>
                  {t.given && (
                    <p className="text-[11px] text-slate-500 mt-1 font-mono">
                      recorded for you: DR {t.given[0].account} {money(t.given[0].dr)} / CR {t.given[1].account} {money(t.given[1].cr)}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => setPhase('play')}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-fuchsia-600 to-rose-600 text-white font-bold text-lg hover:opacity-90 transition-opacity"
        >
          Start the challenge →
        </button>
        <button
          onClick={() => { completeLevel(10); navigate('/') }}
          className="w-full mt-3 py-2.5 rounded-xl text-sm text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
        >
          Skip for now — mark this lesson read
        </button>
      </div>
    )
  }

  if (done) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-6">
          <div className="text-5xl mb-4">{pct === 100 ? '🏆' : pct >= 80 ? '🎉' : '📊'}</div>
          <h2 className="text-3xl font-extrabold text-white mb-2">Full Cycle Complete</h2>
          <p className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-rose-400 mb-3">{pct}%</p>
          <div className="inline-flex flex-wrap justify-center gap-2 text-xs text-slate-400">
            <span className="rounded-full bg-white/5 px-3 py-1">Journalizing {jResults.filter(Boolean).length}/{JOURNAL_QUIZ.length}</span>
            <span className="rounded-full bg-white/5 px-3 py-1">Posting {postingCorrect}/{POSTING.length}</span>
            <span className="rounded-full bg-white/5 px-3 py-1">Trial balance {columnCorrect + totalsCorrect}/{TRIAL_BALANCE.length + 2}</span>
            <span className="rounded-full bg-white/5 px-3 py-1">Analysis {aResults.filter(Boolean).length}/{ANALYSIS.length}</span>
          </div>
          {hints.usedCount > 0 && <p className="text-xs text-slate-500 mt-3">{hintTally(hints.usedCount)}</p>}
        </div>

        <div className="rounded-xl border border-white/10 overflow-hidden mb-6">
          <div className="bg-slate-800 px-4 py-3 text-center">
            <p className="font-bold text-white">Novak Consulting</p>
            <p className="text-sm text-slate-300">Trial Balance</p>
            <p className="text-xs text-slate-500">March 31, 2025</p>
          </div>
          <div className="grid grid-cols-[1fr_6.5rem_6.5rem] bg-slate-800/60 text-[10px] font-bold text-slate-400 uppercase tracking-wider px-4 py-1.5">
            <span>Account</span><span className="text-right">Debit</span><span className="text-right">Credit</span>
          </div>
          {TRIAL_BALANCE.map(a => (
            <div key={a.name} className="grid grid-cols-[1fr_6.5rem_6.5rem] px-4 py-1 text-sm border-t border-white/5">
              <span className="text-white">{a.name}</span>
              <span className="text-right font-mono text-slate-200">{a.side === 'debit' ? money(a.amount) : ''}</span>
              <span className="text-right font-mono text-slate-200">{a.side === 'credit' ? money(a.amount) : ''}</span>
            </div>
          ))}
          <div className="grid grid-cols-[1fr_6.5rem_6.5rem] px-4 py-2 text-sm border-t-2 border-white/20 bg-slate-800/60 font-bold">
            <span className="text-slate-300">Totals</span>
            <span className="text-right font-mono text-green-400">{money(TB_TOTAL)}</span>
            <span className="text-right font-mono text-green-400">{money(TB_TOTAL)}</span>
          </div>
        </div>

        <div className="rounded-xl bg-fuchsia-500/10 border border-fuchsia-500/20 p-5 mb-6">
          <p className="font-bold text-white mb-2">What this trial balance tells you</p>
          <ul className="text-sm text-slate-300 space-y-1">
            <li>• Net income for March: $8,700 revenue − $3,500 expenses = <span className="text-white font-semibold">$5,200</span></li>
            <li>• Ending retained earnings: $0 + $5,200 − $1,000 dividends = <span className="text-white font-semibold">$4,200</span></li>
            <li>• Assets $28,500 = Liabilities $4,300 + Equity $24,200 <span className="text-slate-500">($20,000 stock + $4,200 retained earnings)</span></li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button onClick={restart} className="flex-1 py-3 rounded-xl bg-white/10 text-white font-semibold hover:bg-white/20">Try Again</button>
          <button onClick={() => navigate('/exam')} className="flex-1 py-3 rounded-xl bg-gradient-to-r from-fuchsia-600 to-rose-600 text-white font-bold hover:opacity-90">Take the Practice Exam →</button>
        </div>
      </div>
    )
  }

  const StepHeader = ({ title }) => (
    <div className="flex items-center justify-between mb-5">
      <div>
        <div className="text-sm text-fuchsia-400 font-semibold">Level 10 — Step {step} of 4</div>
        <h1 className="text-xl font-extrabold text-white">{title}</h1>
      </div>
      <div className="flex gap-1">
        {[1, 2, 3, 4].map(s => (
          <div key={s} className={`w-2.5 h-2.5 rounded-full ${s < step ? 'bg-green-500' : s === step ? 'bg-fuchsia-500' : 'bg-slate-700'}`} />
        ))}
      </div>
    </div>
  )

  // ── Step 1: journalize ──────────────────────────────────────────────
  if (step === 1) {
    const q = JOURNAL_QUIZ[jIndex]
    return (
      <div className="max-w-xl mx-auto">
        <StepHeader title={`Journalize — entry ${jIndex + 1} of ${JOURNAL_QUIZ.length}`} />
        <div className="rounded-xl bg-rose-500/10 border border-rose-500/20 p-4 mb-5">
          <p className="text-xs font-semibold text-rose-300 mb-1">{q.date}</p>
          <p className="font-semibold text-white">{q.prompt}</p>
        </div>

        {jChosen === null && (
          <HintBar open={hints.isOpen(`j${q.n}`)} onToggle={() => hints.toggle(`j${q.n}`)} text={q.hint} className="mb-5" />
        )}

        <div className="space-y-3 mb-5">
          {q.options.map((opt, i) => {
            const isAnswer = jChosen !== null && i === q.correctIndex
            const isWrongPick = jChosen === i && i !== q.correctIndex
            return (
              <button
                key={i}
                onClick={() => {
                  if (jChosen !== null) return
                  setJChosen(i)
                  setJResults(prev => [...prev, i === q.correctIndex])
                }}
                disabled={jChosen !== null}
                className={`w-full text-left rounded-xl border p-3 transition-colors ${
                  isAnswer ? 'border-green-500 bg-green-900/30'
                    : isWrongPick ? 'border-red-500 bg-red-900/30'
                    : jChosen !== null ? 'border-white/10 bg-white/5 opacity-60'
                    : 'border-white/10 bg-white/5 hover:border-fuchsia-400 hover:bg-white/10'
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-xs font-bold text-slate-500 mt-1">{'ABCD'[i]}</span>
                  <div className="flex-1"><EntryTable lines={opt} dense /></div>
                  {isAnswer && <span className="text-green-400">✓</span>}
                  {isWrongPick && <span className="text-red-400">✗</span>}
                </div>
              </button>
            )
          })}
        </div>

        {jChosen !== null && (
          <>
            <div className={`rounded-xl p-5 mb-5 ${jChosen === q.correctIndex ? 'bg-green-900/30 border border-green-700' : 'bg-amber-900/30 border border-amber-700'}`}>
              <p className="font-bold text-white mb-2">{jChosen === q.correctIndex ? '✅ Correct' : '📖 Not quite'}</p>
              <p className="text-sm text-slate-300">{q.explanation}</p>
            </div>
            <button
              onClick={() => {
                if (jIndex + 1 >= JOURNAL_QUIZ.length) setStep(2)
                else { setJIndex(i => i + 1); setJChosen(null) }
              }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-fuchsia-600 to-rose-600 text-white font-bold hover:opacity-90"
            >
              {jIndex + 1 < JOURNAL_QUIZ.length ? 'Next Entry →' : 'Step 2: Post to the ledger →'}
            </button>
          </>
        )}
      </div>
    )
  }

  // ── Step 2: posting ─────────────────────────────────────────────────
  if (step === 2) {
    const allFilled = POSTING.every(p => parseAmount(balances[p.account] || '') !== null)
    return (
      <div className="max-w-xl mx-auto">
        <StepHeader title="Post — find each ending balance" />
        <p className="text-sm text-slate-400 mb-4">
          All ten entries have now been posted. Using the March transaction list, work out where each of these four accounts ended up. Enter the amount only — the side is shown for you.
        </p>

        <div className="space-y-3 mb-5">
          {POSTING.map(p => {
            const val = parseAmount(balances[p.account] || '')
            const right = checked2 && val === p.answer
            const wrong = checked2 && val !== p.answer
            return (
              <div key={p.account} className={`rounded-xl border p-4 ${right ? 'border-green-600 bg-green-900/15' : wrong ? 'border-red-600 bg-red-900/15' : 'border-white/10 bg-white/5'}`}>
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex-1">
                    <p className="font-semibold text-white text-sm">{p.account}</p>
                    <p className="text-[11px] text-slate-500 uppercase tracking-wider">{p.side} balance</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-slate-400 font-mono">$</span>
                    <input
                      inputMode="numeric"
                      value={balances[p.account] || ''}
                      onChange={e => !checked2 && setBalances(b => ({ ...b, [p.account]: e.target.value }))}
                      disabled={checked2}
                      placeholder="0"
                      className="w-28 rounded-lg border border-slate-600 bg-slate-800 px-2 py-1.5 text-sm font-mono text-right text-white outline-none focus:ring-1 focus:ring-fuchsia-500 disabled:opacity-70"
                    />
                  </div>
                </div>
                <p className="text-[11px] text-slate-500">{p.postings}</p>
                {!checked2 && (
                  <HintBar
                    open={hints.isOpen(`post-${p.account}`)}
                    onToggle={() => hints.toggle(`post-${p.account}`)}
                    text={p.hint}
                    className="mt-2"
                  />
                )}
                {checked2 && (
                  <p className={`text-xs mt-2 ${right ? 'text-green-300' : 'text-amber-300'}`}>
                    {right ? '✓ ' : `The balance is ${money(p.answer)} ${p.side}. `}{p.math}
                  </p>
                )}
              </div>
            )
          })}
        </div>

        {!checked2 ? (
          <button
            onClick={() => setChecked2(true)}
            disabled={!allFilled}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-fuchsia-600 to-rose-600 text-white font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90"
          >
            {allFilled ? 'Check My Balances' : 'Fill in all four balances'}
          </button>
        ) : (
          <button onClick={() => setStep(3)} className="w-full py-3 rounded-xl bg-gradient-to-r from-fuchsia-600 to-rose-600 text-white font-bold hover:opacity-90">
            Step 3: Build the trial balance →
          </button>
        )}
      </div>
    )
  }

  // ── Step 3: trial balance ───────────────────────────────────────────
  if (step === 3) {
    const allPlaced = TRIAL_BALANCE.every(a => columns[a.name])
    const totalsFilled = parseAmount(drTotal) !== null && parseAmount(crTotal) !== null
    return (
      <div className="max-w-2xl mx-auto">
        <StepHeader title="Build the trial balance" />
        <p className="text-sm text-slate-400 mb-4">
          The accounts are already in proper order — assets, liabilities, equity, revenue, expenses. Choose the column each balance belongs in, then total both columns.
        </p>

        <div className="rounded-xl border border-white/10 overflow-hidden mb-4">
          {TRIAL_BALANCE.map((a, i) => {
            const pick = columns[a.name]
            const wrong = checked3 && pick !== a.side
            return (
              <div key={a.name} className={`px-3 py-2 ${i ? 'border-t border-white/5' : ''} ${wrong ? 'bg-red-900/20' : ''}`}>
                <div className="flex items-center gap-2">
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white truncate">{a.name}</p>
                  <p className="text-xs text-slate-500 font-mono">{money(a.amount)}</p>
                </div>
                {!checked3 && (
                  <HintToggle open={hints.isOpen(`col-${a.name}`)} onClick={() => hints.toggle(`col-${a.name}`)} label={a.name} />
                )}
                {['debit', 'credit'].map(s => {
                  const selected = pick === s
                  const isAnswer = checked3 && a.side === s
                  return (
                    <button
                      key={s}
                      onClick={() => !checked3 && setColumns(c => ({ ...c, [a.name]: s }))}
                      disabled={checked3}
                      className={`w-16 py-1.5 rounded-lg text-xs font-bold uppercase border transition-colors ${
                        isAnswer ? 'border-green-500 bg-green-900/40 text-green-300'
                          : selected ? 'border-fuchsia-500 bg-fuchsia-900/30 text-white'
                          : 'border-slate-600 bg-slate-800 text-slate-400 hover:border-fuchsia-400'
                      }`}
                    >
                      {s === 'debit' ? 'DR' : 'CR'}
                    </button>
                  )
                })}
                </div>
                {!checked3 && hints.isOpen(`col-${a.name}`) && <HintPanel className="mt-2">{COLUMN_HINTS[a.name]}</HintPanel>}
              </div>
            )
          })}
        </div>

        <div className="rounded-xl border border-white/10 bg-white/5 p-4 mb-5">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Column totals</p>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Total Debits', val: drTotal, set: setDrTotal, ok: drRight },
              { label: 'Total Credits', val: crTotal, set: setCrTotal, ok: crRight },
            ].map(f => (
              <div key={f.label}>
                <label className="block text-xs text-slate-500 mb-1">{f.label}</label>
                <input
                  inputMode="numeric" value={f.val} onChange={e => !checked3 && f.set(e.target.value)} disabled={checked3}
                  placeholder="0"
                  className={`w-full rounded-lg border bg-slate-800 px-3 py-2 font-mono text-right text-white outline-none focus:ring-1 focus:ring-fuchsia-500 disabled:opacity-70 ${
                    checked3 ? (f.ok ? 'border-green-500' : 'border-red-500') : 'border-slate-600'}`}
                />
              </div>
            ))}
          </div>
        </div>

        {checked3 && (
          <div className={`rounded-xl p-5 mb-5 ${columnCorrect === TRIAL_BALANCE.length && totalsCorrect === 2 ? 'bg-green-900/30 border border-green-700' : 'bg-amber-900/30 border border-amber-700'}`}>
            <p className="font-bold text-white mb-2">
              {columnCorrect} of {TRIAL_BALANCE.length} columns right · totals {totalsCorrect}/2
            </p>
            <p className="text-sm text-slate-300">
              Both columns total <span className="text-white font-semibold">{money(TB_TOTAL)}</span>. Debits: 20,200 + 1,400 + 900 + 6,000 + 1,000 + 1,100 + 2,400. Credits: 300 + 4,000 + 20,000 + 8,700.
              Remember Dividends is the debit-balance oddball in the equity group.
            </p>
          </div>
        )}

        {!checked3 ? (
          <button
            onClick={() => setChecked3(true)}
            disabled={!allPlaced || !totalsFilled}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-fuchsia-600 to-rose-600 text-white font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90"
          >
            {allPlaced && totalsFilled ? 'Check My Trial Balance' : 'Place every account and enter both totals'}
          </button>
        ) : (
          <button onClick={() => setStep(4)} className="w-full py-3 rounded-xl bg-gradient-to-r from-fuchsia-600 to-rose-600 text-white font-bold hover:opacity-90">
            Step 4: Analysis →
          </button>
        )}
      </div>
    )
  }

  // ── Step 4: analysis ────────────────────────────────────────────────
  const q = ANALYSIS[aIndex]
  return (
    <div className="max-w-xl mx-auto">
      <StepHeader title={`Analyze — question ${aIndex + 1} of ${ANALYSIS.length}`} />
      <div className="rounded-xl bg-rose-500/10 border border-rose-500/20 p-4 mb-5">
        <p className="font-semibold text-white">{q.prompt}</p>
      </div>

      {aChosen === null && (
        <HintBar open={hints.isOpen(`a${aIndex}`)} onToggle={() => hints.toggle(`a${aIndex}`)} text={q.hint} className="mb-5" />
      )}

      <div className="space-y-3 mb-5">
        {q.options.map((opt, i) => {
          const isAnswer = aChosen !== null && i === q.correctIndex
          const isWrongPick = aChosen === i && i !== q.correctIndex
          return (
            <button
              key={i}
              onClick={() => {
                if (aChosen !== null) return
                setAChosen(i)
                setAResults(prev => [...prev, i === q.correctIndex])
              }}
              disabled={aChosen !== null}
              className={`w-full text-left rounded-xl border p-3 flex items-start gap-3 transition-colors ${
                isAnswer ? 'border-green-500 bg-green-900/30'
                  : isWrongPick ? 'border-red-500 bg-red-900/30'
                  : aChosen !== null ? 'border-white/10 bg-white/5 opacity-60'
                  : 'border-white/10 bg-white/5 hover:border-fuchsia-400 hover:bg-white/10'
              }`}
            >
              <span className="text-xs font-bold text-slate-500 mt-0.5">{'ABCD'[i]}</span>
              <span className="text-sm text-white flex-1">{opt}</span>
              {isAnswer && <span className="text-green-400">✓</span>}
              {isWrongPick && <span className="text-red-400">✗</span>}
            </button>
          )
        })}
      </div>

      {aChosen !== null && (
        <>
          <div className={`rounded-xl p-5 mb-5 ${aChosen === q.correctIndex ? 'bg-green-900/30 border border-green-700' : 'bg-amber-900/30 border border-amber-700'}`}>
            <p className="font-bold text-white mb-2">{aChosen === q.correctIndex ? '✅ Correct' : '📖 Not quite'}</p>
            <p className="text-sm text-slate-300">{q.explanation}</p>
          </div>
          <button
            onClick={() => {
              if (aIndex + 1 >= ANALYSIS.length) {
                completeLevel(10, Math.round((earned / maxPoints) * 100))
                setDone(true)
              } else { setAIndex(i => i + 1); setAChosen(null) }
            }}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-fuchsia-600 to-rose-600 text-white font-bold hover:opacity-90"
          >
            {aIndex + 1 < ANALYSIS.length ? 'Next Question →' : 'See My Results →'}
          </button>
        </>
      )}
    </div>
  )
}

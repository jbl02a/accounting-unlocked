import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useProgress } from '../../context/ProgressContext'
import EntryTable from '../../components/EntryTable'
import { useHints, HintBar, hintTally } from '../../components/Hint'

const DECODER = [
  { phrase: '"…on account"  /  "…on credit"', means: 'No cash moves right now. A receivable or a payable is created instead.' },
  { phrase: '"Billed the customer"  /  "sent an invoice"', means: 'We earned it and they owe us → Accounts Receivable (Asset).' },
  { phrase: '"Purchased supplies on account"', means: 'We got the goods and we owe them → Accounts Payable (Liability).' },
  { phrase: '"Received payment on account"', means: 'A customer is paying off an old bill → Cash up, A/R down. No new revenue.' },
  { phrase: '"Paid on account"  /  "paid the amount owed"', means: 'We are paying off an old bill → A/P down, Cash down. No new expense.' },
  { phrase: '"Received cash in advance"', means: 'We owe them WORK, not money → Unearned Revenue (Liability).' },
]

const SALES_CYCLE = [
  {
    step: 'Step 1 — We do the work, they promise to pay',
    caption: 'Performed $3,500 of design work on account.',
    lines: [
      { account: 'Accounts Receivable', dr: 3500 },
      { account: 'Service Revenue', cr: 3500 },
    ],
    note: 'Revenue is recorded NOW, when the work is done — not when the cash arrives.',
  },
  {
    step: 'Step 2 — They pay us later',
    caption: 'Collected the $3,500 from the customer.',
    lines: [
      { account: 'Cash', dr: 3500 },
      { account: 'Accounts Receivable', cr: 3500 },
    ],
    note: 'No revenue here! We already recorded it in Step 1. This just swaps one asset for another.',
  },
]

const PURCHASE_CYCLE = [
  {
    step: 'Step 1 — We get the goods, we promise to pay',
    caption: 'Purchased $600 of supplies on account.',
    lines: [
      { account: 'Supplies', dr: 600 },
      { account: 'Accounts Payable', cr: 600 },
    ],
    note: 'We owe the supplier, so a liability goes up with a credit.',
  },
  {
    step: 'Step 2 — We pay them later',
    caption: 'Paid the $600 owed to the supplier.',
    lines: [
      { account: 'Accounts Payable', dr: 600 },
      { account: 'Cash', cr: 600 },
    ],
    note: 'No expense here! We are just erasing a debt. Debit the liability to shrink it.',
  },
]

const QUESTIONS = [
  {
    id: 1,
    kind: 'text',
    emoji: '🧾',
    prompt: 'Cypress Design finishes a $3,500 logo project and sends the client an invoice. The client will pay in 30 days. What account does Cypress record?',
    options: ['Accounts Receivable — an asset', 'Accounts Payable — a liability', 'Unearned Revenue — a liability', 'Cash — an asset'],
    correctIndex: 0,
        hint: 'Ask who is waiting on whom. The customer already received the finished work; Cypress is the one still waiting to be paid. Whichever side is owed money decides the account.',
    explanation: 'The customer owes US, so it is a receivable. Receivables are assets — a legal claim to future cash.',
  },
  {
    id: 2,
    kind: 'entry',
    emoji: '✍️',
    prompt: 'Record that $3,500 job done on account.',
    options: [
      [{ account: 'Accounts Receivable', dr: 3500 }, { account: 'Service Revenue', cr: 3500 }],
      [{ account: 'Cash', dr: 3500 }, { account: 'Service Revenue', cr: 3500 }],
      [{ account: 'Service Revenue', dr: 3500 }, { account: 'Accounts Receivable', cr: 3500 }],
      [{ account: 'Accounts Receivable', dr: 3500 }, { account: 'Accounts Payable', cr: 3500 }],
    ],
    correctIndex: 0,
        hint: 'Two things changed: the company earned income, and it gained the right to collect money later. Nothing about cash changed. Work out which of those two goes on the debit side.',
    explanation: 'A/R goes up (asset ⬆ = debit) and Service Revenue goes up (revenue ⬆ = credit). No cash touched this transaction.',
  },
  {
    id: 3,
    kind: 'text',
    emoji: '🖨️',
    prompt: 'Cypress buys $600 of printer supplies on account from a vendor. What account does Cypress record?',
    options: ['Accounts Payable — a liability', 'Accounts Receivable — an asset', 'Notes Receivable — an asset', 'Supplies Expense — an expense'],
    correctIndex: 0,
        hint: 'Flip the last question around. Here Cypress is the one who received something and has not paid yet. Who is owed money now?',
    explanation: 'WE owe the vendor, so it is a payable — a liability. Same word "account," opposite direction.',
  },
  {
    id: 4,
    kind: 'entry',
    emoji: '✍️',
    prompt: 'Record that $600 supply purchase on account.',
    options: [
      [{ account: 'Supplies', dr: 600 }, { account: 'Accounts Payable', cr: 600 }],
      [{ account: 'Accounts Payable', dr: 600 }, { account: 'Supplies', cr: 600 }],
      [{ account: 'Supplies', dr: 600 }, { account: 'Cash', cr: 600 }],
      [{ account: 'Supplies', dr: 600 }, { account: 'Accounts Receivable', cr: 600 }],
    ],
    correctIndex: 0,
        hint: 'Something the company owns went up — it has the supplies. Nothing was paid, so what got created on the other side to balance it?',
    explanation: 'Supplies (asset) up with a debit; Accounts Payable (liability) up with a credit. Cash is untouched — that is the whole point of "on account."',
  },
  {
    id: 5,
    kind: 'entry',
    emoji: '💵',
    prompt: 'THE CLASSIC TRAP: the client from question 1 mails a check for the full $3,500. Record it.',
    options: [
      [{ account: 'Cash', dr: 3500 }, { account: 'Accounts Receivable', cr: 3500 }],
      [{ account: 'Cash', dr: 3500 }, { account: 'Service Revenue', cr: 3500 }],
      [{ account: 'Accounts Receivable', dr: 3500 }, { account: 'Cash', cr: 3500 }],
      [{ account: 'Cash', dr: 3500 }, { account: 'Accounts Payable', cr: 3500 }],
    ],
    correctIndex: 0,
        hint: 'Before picking, ask the key question: has Cypress earned anything NEW today? Or did one thing it owned simply turn into a different thing it owns?',
    explanation: 'Crediting Service Revenue again would count the same $3,500 of income twice. The revenue was already earned and recorded — collecting only converts A/R into Cash.',
  },
  {
    id: 6,
    kind: 'entry',
    emoji: '💸',
    prompt: 'THE MIRROR TRAP: Cypress pays the vendor the $600 it owed. Record it.',
    options: [
      [{ account: 'Accounts Payable', dr: 600 }, { account: 'Cash', cr: 600 }],
      [{ account: 'Supplies Expense', dr: 600 }, { account: 'Cash', cr: 600 }],
      [{ account: 'Cash', dr: 600 }, { account: 'Accounts Payable', cr: 600 }],
      [{ account: 'Supplies', dr: 600 }, { account: 'Cash', cr: 600 }],
    ],
    correctIndex: 0,
        hint: 'Mirror of the last one. The supplies were recorded the day they arrived. So today, is a new cost being created — or is an existing debt being erased?',
    explanation: 'The supplies were already recorded when purchased. Paying only removes the debt: debit A/P to shrink the liability, credit Cash as it leaves.',
  },
  {
    id: 7,
    kind: 'text',
    emoji: '📅',
    prompt: 'A new client pays Cypress $1,200 up front for a project that starts next month. What does Cypress credit?',
    options: ['Unearned Revenue — a liability', 'Service Revenue — revenue', 'Accounts Receivable — an asset', 'Accounts Payable — a liability'],
    correctIndex: 0,
        hint: 'Cash arrived, but no work has been done. Cypress owes the client something — but is it money, or is it work? Both count as obligations.',
    explanation: 'Cash was received but nothing has been earned yet, so Cypress owes the client WORK. That obligation is a liability called Unearned Revenue. Revenue gets recorded later, as the work is performed.',
  },
  {
    id: 8,
    kind: 'text',
    emoji: '⚖️',
    prompt: 'When that customer pays off the $3,500 they owed, what happens to Cypress’s TOTAL assets?',
    options: [
      'They stay exactly the same',
      'They increase by $3,500',
      'They decrease by $3,500',
      'They increase by $7,000',
    ],
    correctIndex: 0,
        hint: 'List the two accounts that change and mark whether each goes up or down. Then add those two movements together and see what the net effect on total assets is.',
    explanation: 'Cash goes up $3,500 and Accounts Receivable goes down $3,500. One asset became another asset — the total is unchanged, and so is the accounting equation.',
  },
]

function CycleCard({ item, accent }) {
  return (
    <div className="rounded-xl bg-white/5 border border-white/10 p-4">
      <p className={`text-xs font-bold uppercase tracking-wider mb-1 ${accent}`}>{item.step}</p>
      <p className="text-sm text-slate-300 mb-3">{item.caption}</p>
      <EntryTable lines={item.lines} dense />
      <p className="text-xs text-slate-400 mt-2 italic">{item.note}</p>
    </div>
  )
}

export default function Level6() {
  const navigate = useNavigate()
  const { completeLevel } = useProgress()
  const [phase, setPhase] = useState('learn')
  const [current, setCurrent] = useState(0)
  const [chosen, setChosen] = useState(null)
  const [results, setResults] = useState([])
  const [done, setDone] = useState(false)
  const hints = useHints()

  const q = QUESTIONS[current]

  function choose(i) {
    if (chosen !== null) return
    setChosen(i)
    setResults(prev => [...prev, i === q.correctIndex])
  }

  function next() {
    if (current + 1 >= QUESTIONS.length) {
      const correct = results.filter(Boolean).length
      completeLevel(6, Math.round((correct / QUESTIONS.length) * 100))
      setDone(true)
    } else {
      setCurrent(c => c + 1)
      setChosen(null)
    }
  }

  function restart() {
    setCurrent(0); setChosen(null); setResults([]); setDone(false)
  }

  if (phase === 'learn') {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <div className="text-sm text-sky-400 font-semibold mb-1">Level 6</div>
          <h1 className="text-3xl font-extrabold text-white mb-2">Receivables vs. Payables</h1>
          <p className="text-slate-400">Two accounts with almost the same name that sit on opposite sides of the balance sheet. Mix them up and every statement you build is wrong.</p>
        </div>

        <div className="rounded-2xl border border-sky-500/30 bg-sky-500/10 p-5 mb-6">
          <p className="text-xs font-bold uppercase tracking-wider text-sky-300 mb-3">The one question that settles it</p>
          <p className="text-2xl font-extrabold text-white mb-4">&ldquo;Who owes whom?&rdquo;</p>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="rounded-xl bg-indigo-500/10 border border-indigo-500/30 p-4">
              <p className="font-bold text-indigo-300 mb-1">📥 They owe US</p>
              <p className="text-sm text-white font-semibold">Accounts Receivable</p>
              <p className="text-xs text-slate-400 mt-1">An <span className="text-white">ASSET</span>. We will <span className="text-white">receive</span> cash later. Increases with a <span className="text-white">DEBIT</span>.</p>
            </div>
            <div className="rounded-xl bg-red-500/10 border border-red-500/30 p-4">
              <p className="font-bold text-red-300 mb-1">📤 WE owe them</p>
              <p className="text-sm text-white font-semibold">Accounts Payable</p>
              <p className="text-xs text-slate-400 mt-1">A <span className="text-white">LIABILITY</span>. We must <span className="text-white">pay</span> cash later. Increases with a <span className="text-white">CREDIT</span>.</p>
            </div>
          </div>
          <p className="text-xs text-slate-400 mt-3">Memory hook: <span className="text-white font-semibold">Recei<span className="text-indigo-300">v</span>able → we recei<span className="text-indigo-300">v</span>e. Pa<span className="text-red-300">y</span>able → we pa<span className="text-red-300">y</span>.</span></p>
        </div>

        <div className="rounded-xl bg-white/5 border border-white/10 p-5 mb-6">
          <h3 className="font-bold text-white mb-3">Word-problem decoder</h3>
          <p className="text-sm text-slate-400 mb-4">Exams hide the answer in the wording. These phrases give it away every time.</p>
          <div className="divide-y divide-white/5">
            {DECODER.map((d, i) => (
              <div key={i} className="py-2.5 flex flex-col sm:flex-row sm:gap-4">
                <div className="sm:w-64 shrink-0 text-sm font-semibold text-sky-300">{d.phrase}</div>
                <div className="text-sm text-slate-400">{d.means}</div>
              </div>
            ))}
          </div>
        </div>

        <h3 className="font-bold text-white mb-3">📥 The receivable cycle (money coming in)</h3>
        <div className="space-y-3 mb-6">
          {SALES_CYCLE.map((item, i) => <CycleCard key={i} item={item} accent="text-indigo-300" />)}
        </div>

        <h3 className="font-bold text-white mb-3">📤 The payable cycle (money going out)</h3>
        <div className="space-y-3 mb-6">
          {PURCHASE_CYCLE.map((item, i) => <CycleCard key={i} item={item} accent="text-red-300" />)}
        </div>

        <div className="rounded-xl bg-amber-500/10 border border-amber-500/30 p-5 mb-8">
          <p className="font-bold text-amber-300 mb-2">⚠️ The two mistakes graders love to catch</p>
          <ol className="list-decimal list-inside space-y-1 text-sm text-slate-300">
            <li>Recording revenue <span className="text-white font-semibold">again</span> when the customer pays. The revenue was earned when the work was done.</li>
            <li>Recording an expense <span className="text-white font-semibold">again</span> when you pay a bill. The expense was recorded when you received the goods or service.</li>
          </ol>
          <p className="text-xs text-slate-400 mt-3">Step 2 of either cycle <span className="text-white">never</span> touches Revenue or Expense. It only touches Cash and the receivable/payable.</p>
        </div>

        <button
          onClick={() => setPhase('play')}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-sky-600 to-cyan-600 text-white font-bold text-lg hover:opacity-90 transition-opacity"
        >
          Practice: 8 questions →
        </button>
        <button
          onClick={() => { completeLevel(6); navigate('/') }}
          className="w-full mt-3 py-2.5 rounded-xl text-sm text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
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
        <div className="text-5xl mb-4">{correct === QUESTIONS.length ? '🎉' : '📥'}</div>
        <h2 className="text-3xl font-extrabold text-white mb-2">Receivables vs. Payables</h2>
        <p className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-400 mb-2">
          {correct} / {QUESTIONS.length}
        </p>
        {hints.usedCount > 0 && <p className="text-xs text-slate-500 mb-3">{hintTally(hints.usedCount)}</p>}
        <p className="text-slate-400 mb-8">
          {correct === QUESTIONS.length ? 'Perfect. You can tell a receivable from a payable in your sleep.'
            : correct >= 6 ? 'Strong work. Re-read the two traps and run it again.'
            : 'Go back through the two cycles — Step 2 never touches revenue or expense.'}
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <button onClick={restart} className="flex-1 py-3 rounded-xl bg-white/10 text-white font-semibold hover:bg-white/20">Try Again</button>
          <button onClick={() => setPhase('learn')} className="flex-1 py-3 rounded-xl bg-white/10 text-white font-semibold hover:bg-white/20">Review Lesson</button>
          <button onClick={() => navigate('/level/7')} className="flex-1 py-3 rounded-xl bg-gradient-to-r from-sky-600 to-cyan-600 text-white font-bold hover:opacity-90">Level 7 →</button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="text-sm text-sky-400 font-semibold">Level 6 — Question {current + 1} of {QUESTIONS.length}</div>
          <h1 className="text-xl font-extrabold text-white">Who owes whom?</h1>
        </div>
        <div className="flex gap-1">
          {QUESTIONS.map((_, i) => (
            <div key={i} className={`w-2.5 h-2.5 rounded-full ${
              i < results.length ? (results[i] ? 'bg-green-500' : 'bg-red-500') : i === current ? 'bg-sky-500' : 'bg-slate-700'
            }`} />
          ))}
        </div>
      </div>

      <div className="rounded-xl bg-cyan-500/10 border border-cyan-500/20 p-5 mb-5">
        <div className="flex items-start gap-3">
          <span className="text-3xl">{q.emoji}</span>
          <p className="font-semibold text-white">{q.prompt}</p>
        </div>
      </div>

      {chosen === null && (
        <HintBar open={hints.isOpen(q.id)} onToggle={() => hints.toggle(q.id)} text={q.hint} className="mb-5" />
      )}

      <div className="space-y-3 mb-6">
        {q.options.map((opt, i) => {
          const isCorrect = chosen !== null && i === q.correctIndex
          const isWrongPick = chosen === i && i !== q.correctIndex
          const base = 'w-full text-left rounded-xl border p-3 transition-colors'
          const state = isCorrect ? 'border-green-500 bg-green-900/30'
            : isWrongPick ? 'border-red-500 bg-red-900/30'
            : chosen !== null ? 'border-white/10 bg-white/5 opacity-60'
            : 'border-white/10 bg-white/5 hover:border-sky-400 hover:bg-white/10'
          return (
            <button key={i} onClick={() => choose(i)} disabled={chosen !== null} className={`${base} ${state}`}>
              <div className="flex items-start gap-3">
                <span className="text-xs font-bold text-slate-500 mt-1 shrink-0">{'ABCD'[i]}</span>
                <div className="flex-1">
                  {q.kind === 'entry'
                    ? <EntryTable lines={opt} dense />
                    : <span className="text-sm text-white">{opt}</span>}
                </div>
                {isCorrect && <span className="text-green-400">✓</span>}
                {isWrongPick && <span className="text-red-400">✗</span>}
              </div>
            </button>
          )
        })}
      </div>

      {chosen !== null && (
        <div className={`rounded-xl p-5 mb-6 ${chosen === q.correctIndex ? 'bg-green-900/30 border border-green-700' : 'bg-amber-900/30 border border-amber-700'}`}>
          <p className="font-bold text-white mb-2">{chosen === q.correctIndex ? '✅ Correct' : '📖 Not quite'}</p>
          <p className="text-sm text-slate-300">{q.explanation}</p>
        </div>
      )}

      {chosen !== null && (
        <button onClick={next} className="w-full py-3 rounded-xl bg-gradient-to-r from-sky-600 to-cyan-600 text-white font-bold hover:opacity-90">
          {current + 1 < QUESTIONS.length ? 'Next Question →' : 'See Results →'}
        </button>
      )}
    </div>
  )
}

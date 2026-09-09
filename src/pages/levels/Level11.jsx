import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useProgress } from '../../context/ProgressContext'

// The handful of principles and assumptions a first financial accounting exam
// actually asks about. Each one gets a plain-English rule and one concrete example.
const PRINCIPLES = [
  {
    id: 'revenue',
    name: 'Revenue Recognition Principle',
    short: 'Record revenue when it is EARNED',
    rule: 'Record revenue when you do the work or deliver the goods — not when the cash shows up.',
    example: 'You finish a $2,000 job on March 28. The client pays you on April 15. The revenue belongs to MARCH.',
    matchText: 'A landscaper finishes a $2,000 job on March 28 and records the revenue in March, even though the client does not pay until April 15.',
    why: 'This is the reason Accounts Receivable exists. If revenue only counted when cash arrived, a company could look broke in the month it did all its best work.',
  },
  {
    id: 'expense',
    name: 'Expense Recognition (Matching) Principle',
    short: 'Match expenses to the revenue they produced',
    rule: 'Record an expense in the same period as the revenue it helped generate — not when you pay the bill.',
    example: 'Sales commissions earned on March sales are March expenses, even though the checks go out in April.',
    matchText: 'Employees earn $4,000 of wages during the last week of December. The company records the expense in December, though payday is January 3.',
    why: 'This is why Accounts Payable exists, and it is the twin of revenue recognition. Together they ARE accrual accounting.',
  },
  {
    id: 'cost',
    name: 'Cost Principle (Historical Cost)',
    short: 'Record assets at what you PAID',
    rule: 'Assets go on the books at their purchase price and stay there — not at what they are worth today.',
    example: 'Land bought in 2015 for $80,000 is worth $200,000 today. The balance sheet still says $80,000.',
    matchText: 'A building purchased for $250,000 in 2019 is appraised at $400,000 today, but the balance sheet still reports $250,000.',
    why: 'Purchase price is objective and verifiable — there is a receipt. Market value is somebody’s opinion, and opinions change daily.',
  },
  {
    id: 'entity',
    name: 'Economic Entity Assumption',
    short: 'Keep the business separate from the owner',
    rule: 'The company’s records include only the company’s activity. The owner’s personal life stays out.',
    example: 'The owner buys a boat with personal money. It never touches the company books.',
    matchText: 'The owner pays for a family vacation with her own credit card, and none of it is recorded in the company’s books.',
    why: 'Without this, you could never tell whether the business itself is profitable. It is also why an owner putting money in is recorded as Common Stock, not revenue.',
  },
  {
    id: 'monetary',
    name: 'Monetary Unit Assumption',
    short: 'Only record what you can put a dollar figure on',
    rule: 'If it cannot be measured reliably in money, it does not go in the accounting records.',
    example: 'A company’s brilliant staff and loyal customers are hugely valuable — and appear nowhere on the balance sheet.',
    matchText: 'A company’s outstanding reputation for customer service is never listed as an asset on its balance sheet.',
    why: 'Accounting reports in one common unit so numbers can be added together. "Really good employees" cannot be added to "$14,500 of cash."',
  },
  {
    id: 'going',
    name: 'Going Concern Assumption',
    short: 'Assume the business will keep operating',
    rule: 'We assume the company will stay in business long enough to use up its assets and pay its debts.',
    example: 'That is why equipment is carried at cost and depreciated over ten years, instead of at what it would fetch in a fire sale.',
    matchText: 'A company reports its delivery trucks at cost and depreciates them over eight years rather than at what they would sell for tomorrow.',
    why: 'If a company is about to shut down, this assumption breaks and everything gets restated at liquidation value. Auditors have to flag that.',
  },
  {
    id: 'period',
    name: 'Periodicity (Time Period) Assumption',
    short: 'Chop business life into reporting periods',
    rule: 'A company’s ongoing life gets divided into months, quarters and years so results can be reported.',
    example: 'A construction firm reports quarterly results even though its projects run for years.',
    matchText: 'A construction company prepares financial statements every three months even though its building projects each take two years.',
    why: 'Nobody can wait until a company closes to find out how it did. Splitting time into periods is also exactly why adjusting entries are needed.',
  },
  {
    id: 'disclosure',
    name: 'Full Disclosure Principle',
    short: 'Report anything that would change a reader’s mind',
    rule: 'Any information that would affect someone’s decision must appear in the statements or the notes attached to them.',
    example: 'A pending $5 million lawsuit is described in the notes even though not a dollar has been paid.',
    matchText: 'A company describes a pending $5 million lawsuit in the notes to its financial statements, even though no money has changed hands.',
    why: 'The numbers alone can hide risk. The notes are part of the financial statements, not an optional extra.',
  },
]

const EXTRA = [
  { name: 'Materiality', text: 'If an amount is too small to change anyone’s decision, you are allowed to handle it the easy way — like expensing a $12 stapler instead of depreciating it for five years.' },
  { name: 'Conservatism', text: 'When two treatments are equally defensible, pick the one less likely to overstate assets or income. Do not make the company look better than it is.' },
  { name: 'Cost–Benefit', text: 'Information has to be worth more than it costs to produce. This is why small companies are not held to every rule a global corporation is.' },
]

const SCENARIOS = [
  {
    text: 'Riverbend Co. delivers $3,000 of custom cabinets to a customer in June. The customer pays in July. Riverbend records the $3,000 of revenue in June.',
    options: ['Revenue Recognition Principle', 'Cost Principle', 'Monetary Unit Assumption', 'Full Disclosure Principle'],
    correctIndex: 0,
    explanation: 'Revenue is recorded when it is earned — the cabinets were delivered in June. The July cash receipt is a separate entry: debit Cash, credit Accounts Receivable.',
  },
  {
    text: 'The owner of Riverbend buys a jet ski for herself using her personal savings. It is not recorded anywhere in the company’s books.',
    options: ['Economic Entity Assumption', 'Going Concern Assumption', 'Expense Recognition Principle', 'Periodicity Assumption'],
    correctIndex: 0,
    explanation: 'The business and its owner are separate economic entities. Her personal purchases are not the company’s transactions — this is exactly the assumption being applied.',
  },
  {
    text: 'Riverbend bought its workshop in 2018 for $180,000. A realtor says it would sell for $310,000 today. The balance sheet still shows $180,000.',
    options: ['Cost Principle', 'Materiality', 'Revenue Recognition Principle', 'Monetary Unit Assumption'],
    correctIndex: 0,
    explanation: 'Assets are carried at historical cost. The purchase price is objective and verifiable; an appraisal is an estimate that would change every year.',
  },
  {
    text: 'Riverbend’s crew earns $4,000 of wages in the last week of December. Payday is January 3, but the $4,000 is recorded as a December expense.',
    options: ['Expense Recognition (Matching) Principle', 'Full Disclosure Principle', 'Cost Principle', 'Going Concern Assumption'],
    correctIndex: 0,
    explanation: 'The work was done in December and helped earn December revenue, so the expense belongs in December. The unpaid amount sits in a liability — Salaries Payable — until January 3.',
  },
  {
    text: 'Riverbend has a reputation as the most reliable cabinet shop in the state. Nothing about that appears on its balance sheet.',
    options: ['Monetary Unit Assumption', 'Conservatism', 'Periodicity Assumption', 'Economic Entity Assumption'],
    correctIndex: 0,
    explanation: 'Only items measurable in dollars get recorded. A reputation is real and valuable but cannot be reliably assigned a dollar figure, so it stays off the books.',
  },
  {
    text: 'Riverbend is being sued for $2 million. Nothing has been paid or settled, but the situation is described in the notes to the financial statements.',
    options: ['Full Disclosure Principle', 'Cost Principle', 'Revenue Recognition Principle', 'Monetary Unit Assumption'],
    correctIndex: 0,
    explanation: 'A lawsuit that size would absolutely change how a lender or investor reads the statements, so it must be disclosed — in the notes, if not in the numbers themselves.',
  },
  {
    text: 'Riverbend closes its books and issues financial statements every three months, even though the company plans to operate for decades.',
    options: ['Periodicity (Time Period) Assumption', 'Going Concern Assumption', 'Materiality', 'Expense Recognition Principle'],
    correctIndex: 0,
    explanation: 'Business life is divided into artificial time periods so results can be reported regularly. (Going concern is the related idea that the company will keep operating — but the quarterly reporting itself is periodicity.)',
  },
]

function shuffled(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function Level11() {
  const navigate = useNavigate()
  const { completeLevel } = useProgress()
  const [phase, setPhase] = useState('learn')

  // Matching round
  const [examples, setExamples] = useState(() => shuffled(PRINCIPLES))
  const [pickedPrinciple, setPickedPrinciple] = useState(null)
  const [pickedExample, setPickedExample] = useState(null)
  const [matched, setMatched] = useState([])
  const [wrongPair, setWrongPair] = useState(null)
  const [attempts, setAttempts] = useState(0)
  const flashTimer = useRef(null)

  // Scenario round
  const [sIndex, setSIndex] = useState(0)
  const [sChosen, setSChosen] = useState(null)
  const [sResults, setSResults] = useState([])
  const [done, setDone] = useState(false)

  useEffect(() => () => clearTimeout(flashTimer.current), [])

  const allMatched = matched.length === PRINCIPLES.length

  function tryPair(principleId, exampleId) {
    setAttempts(a => a + 1)
    if (principleId === exampleId) {
      setMatched(m => [...m, principleId])
      setPickedPrinciple(null)
      setPickedExample(null)
    } else {
      setWrongPair({ principleId, exampleId })
      setPickedPrinciple(null)
      setPickedExample(null)
      clearTimeout(flashTimer.current)
      flashTimer.current = setTimeout(() => setWrongPair(null), 700)
    }
  }

  function pickPrinciple(id) {
    if (matched.includes(id)) return
    if (pickedExample) tryPair(id, pickedExample)
    else setPickedPrinciple(prev => (prev === id ? null : id))
  }

  function pickExample(id) {
    if (matched.includes(id)) return
    if (pickedPrinciple) tryPair(pickedPrinciple, id)
    else setPickedExample(prev => (prev === id ? null : id))
  }

  function resetMatching() {
    setExamples(shuffled(PRINCIPLES))
    setPickedPrinciple(null); setPickedExample(null); setMatched([]); setWrongPair(null); setAttempts(0)
  }

  // Perfect play is one attempt per pair; every extra guess costs accuracy.
  const matchAccuracy = attempts ? Math.round((PRINCIPLES.length / attempts) * 100) : 0

  function restartAll() {
    resetMatching()
    setSIndex(0); setSChosen(null); setSResults([]); setDone(false); setPhase('match')
  }

  // ── Lesson ──────────────────────────────────────────────────────────
  if (phase === 'learn') {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <div className="text-sm text-teal-400 font-semibold mb-1">Level 11</div>
          <h1 className="text-3xl font-extrabold text-white mb-2">Accounting Principles</h1>
          <p className="text-slate-400">
            Every rule you have learned so far comes from one of a handful of ideas. Exams love these because they are easy to ask about: here is a situation, name the principle.
          </p>
        </div>

        <div className="rounded-2xl border border-teal-500/30 bg-teal-500/10 p-5 mb-6">
          <p className="text-xs font-bold uppercase tracking-wider text-teal-300 mb-2">The two that matter most</p>
          <p className="text-sm text-slate-300">
            <span className="text-white font-semibold">Revenue recognition</span> (record revenue when earned) and
            <span className="text-white font-semibold"> expense recognition / matching</span> (record expenses in the period they helped earn revenue)
            are the two halves of <span className="text-white font-semibold">accrual accounting</span>. They are why Accounts Receivable, Accounts Payable and Unearned Revenue exist at all.
          </p>
          <div className="mt-3 grid sm:grid-cols-2 gap-3">
            <div className="rounded-xl bg-black/20 p-3">
              <p className="text-xs font-bold text-teal-300 mb-1">Accrual basis (what you are learning)</p>
              <p className="text-xs text-slate-400">Revenue when earned, expenses when incurred. Cash timing is irrelevant. Required by GAAP.</p>
            </div>
            <div className="rounded-xl bg-black/20 p-3">
              <p className="text-xs font-bold text-slate-400 mb-1">Cash basis</p>
              <p className="text-xs text-slate-400">Revenue when cash arrives, expenses when cash leaves. Simple, but not allowed for most companies.</p>
            </div>
          </div>
        </div>

        <div className="space-y-3 mb-6">
          {PRINCIPLES.map((p, i) => (
            <div key={p.id} className="rounded-xl bg-white/5 border border-white/10 p-4">
              <div className="flex items-start gap-3">
                <span className="shrink-0 w-6 h-6 rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold flex items-center justify-center">{i + 1}</span>
                <div className="flex-1">
                  <p className="font-bold text-white text-sm">{p.name}</p>
                  <p className="text-xs text-teal-300 mb-2">{p.short}</p>
                  <p className="text-sm text-slate-300 mb-2">{p.rule}</p>
                  <div className="rounded-lg bg-slate-900/60 border border-white/10 p-3 mb-2">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">Example</p>
                    <p className="text-sm text-slate-300">{p.example}</p>
                  </div>
                  <p className="text-xs text-slate-500 italic">{p.why}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-xl bg-white/5 border border-white/10 p-5 mb-8">
          <h3 className="font-bold text-white mb-1">Three more you may hear</h3>
          <p className="text-xs text-slate-400 mb-3">Worth recognizing by name. They rarely carry many points on a first exam.</p>
          <div className="divide-y divide-white/5">
            {EXTRA.map(e => (
              <div key={e.name} className="py-2.5 flex flex-col sm:flex-row sm:gap-4">
                <div className="sm:w-32 shrink-0 text-sm font-semibold text-teal-300">{e.name}</div>
                <div className="text-sm text-slate-400">{e.text}</div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => setPhase('match')}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-bold text-lg hover:opacity-90 transition-opacity"
        >
          Practice: match the examples →
        </button>
        <button
          onClick={() => { completeLevel(11); navigate('/') }}
          className="w-full mt-3 py-2.5 rounded-xl text-sm text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
        >
          Skip the practice — mark this lesson read
        </button>
      </div>
    )
  }

  // ── Results ─────────────────────────────────────────────────────────
  if (done) {
    const scenarioCorrect = sResults.filter(Boolean).length
    const score = Math.round(((matchAccuracy / 100) * 50) + ((scenarioCorrect / SCENARIOS.length) * 50))
    return (
      <div className="max-w-xl mx-auto text-center">
        <div className="text-5xl mb-4">{score >= 90 ? '🎉' : '📜'}</div>
        <h2 className="text-3xl font-extrabold text-white mb-2">Principles Complete</h2>
        <p className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400 mb-2">{score}%</p>
        <p className="text-slate-400 text-sm mb-6">
          Matching: {PRINCIPLES.length} pairs in {attempts} guesses ({matchAccuracy}% accuracy) · Scenarios: {scenarioCorrect}/{SCENARIOS.length}
        </p>
        <p className="text-slate-400 mb-8">
          {score >= 90 ? 'You can name the principle behind any transaction. That is the whole skill.'
            : score >= 70 ? 'Good grasp. Re-read revenue recognition and matching — they carry the most exam points.'
            : 'Go back through the eight cards once more, then run the matching again. The examples are the fastest way to remember the names.'}
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <button onClick={restartAll} className="flex-1 py-3 rounded-xl bg-white/10 text-white font-semibold hover:bg-white/20">Try Again</button>
          <button onClick={() => setPhase('learn')} className="flex-1 py-3 rounded-xl bg-white/10 text-white font-semibold hover:bg-white/20">Review Lesson</button>
          <button onClick={() => navigate('/exam')} className="flex-1 py-3 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-bold hover:opacity-90">Practice Exam →</button>
        </div>
      </div>
    )
  }

  // ── Matching round ──────────────────────────────────────────────────
  if (phase === 'match') {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-5">
          <div>
            <div className="text-sm text-teal-400 font-semibold">Level 11 — Round 1 of 2</div>
            <h1 className="text-xl font-extrabold text-white">Match each principle to its example</h1>
          </div>
          <div className="text-right">
            <p className="text-sm font-bold text-white">{matched.length} / {PRINCIPLES.length}</p>
            <p className="text-xs text-slate-500">{attempts} guess{attempts === 1 ? '' : 'es'}</p>
          </div>
        </div>

        <p className="text-sm text-slate-400 mb-4">
          Tap a principle on the left, then the example on the right that shows it in action. Correct pairs lock in green.
        </p>

        <div className="grid sm:grid-cols-2 gap-3 mb-6">
          {/* Principles */}
          <div className="space-y-2">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 px-1">Principle</p>
            {PRINCIPLES.map(p => {
              const isMatched = matched.includes(p.id)
              const isPicked = pickedPrinciple === p.id
              const isWrong = wrongPair?.principleId === p.id
              return (
                <button
                  key={p.id}
                  onClick={() => pickPrinciple(p.id)}
                  disabled={isMatched}
                  className={`w-full text-left rounded-xl border p-3 transition-colors ${
                    isMatched ? 'border-green-600 bg-green-900/25 opacity-70'
                      : isWrong ? 'border-red-500 bg-red-900/30'
                      : isPicked ? 'border-teal-400 bg-teal-900/40 ring-1 ring-teal-400'
                      : 'border-white/10 bg-white/5 hover:border-teal-400 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <span className="text-sm text-white font-semibold flex-1">{p.name}</span>
                    {isMatched && <span className="text-green-400 text-sm">✓</span>}
                  </div>
                </button>
              )
            })}
          </div>

          {/* Examples */}
          <div className="space-y-2">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 px-1">Example</p>
            {examples.map(p => {
              const isMatched = matched.includes(p.id)
              const isPicked = pickedExample === p.id
              const isWrong = wrongPair?.exampleId === p.id
              return (
                <button
                  key={p.id}
                  onClick={() => pickExample(p.id)}
                  disabled={isMatched}
                  className={`w-full text-left rounded-xl border p-3 transition-colors ${
                    isMatched ? 'border-green-600 bg-green-900/25 opacity-70'
                      : isWrong ? 'border-red-500 bg-red-900/30'
                      : isPicked ? 'border-teal-400 bg-teal-900/40 ring-1 ring-teal-400'
                      : 'border-white/10 bg-white/5 hover:border-teal-400 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <span className="text-xs text-slate-300 flex-1 leading-relaxed">{p.matchText}</span>
                    {isMatched && <span className="text-green-400 text-sm">✓</span>}
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {allMatched ? (
          <>
            <div className="rounded-xl bg-green-900/30 border border-green-700 p-5 mb-4">
              <p className="font-bold text-white mb-1">✅ All eight matched</p>
              <p className="text-sm text-slate-300">
                You needed {attempts} guess{attempts === 1 ? '' : 'es'} for {PRINCIPLES.length} pairs — {matchAccuracy}% accuracy.
                {matchAccuracy === 100 ? ' Perfect run.' : ' A perfect run is eight guesses.'}
              </p>
            </div>
            <div className="flex gap-3">
              <button onClick={resetMatching} className="px-5 py-3 rounded-xl bg-white/10 text-white font-semibold hover:bg-white/20">Redo matching</button>
              <button onClick={() => setPhase('scenarios')} className="flex-1 py-3 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-bold hover:opacity-90">
                Round 2: Name the principle →
              </button>
            </div>
          </>
        ) : (
          <p className="text-center text-sm text-slate-500">
            {pickedPrinciple ? 'Now tap the example that matches it.'
              : pickedExample ? 'Now tap the principle it demonstrates.'
              : 'Tap either side to start a pair.'}
          </p>
        )}
      </div>
    )
  }

  // ── Scenario round ──────────────────────────────────────────────────
  const s = SCENARIOS[sIndex]
  return (
    <div className="max-w-xl mx-auto">
      <div className="flex items-center justify-between mb-5">
        <div>
          <div className="text-sm text-teal-400 font-semibold">Level 11 — Round 2, question {sIndex + 1} of {SCENARIOS.length}</div>
          <h1 className="text-xl font-extrabold text-white">Which principle is at work?</h1>
        </div>
        <div className="flex gap-1">
          {SCENARIOS.map((_, i) => (
            <div key={i} className={`w-2.5 h-2.5 rounded-full ${
              i < sResults.length ? (sResults[i] ? 'bg-green-500' : 'bg-red-500') : i === sIndex ? 'bg-teal-500' : 'bg-slate-700'
            }`} />
          ))}
        </div>
      </div>

      <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/20 p-5 mb-5">
        <p className="font-semibold text-white">{s.text}</p>
      </div>

      <div className="space-y-3 mb-5">
        {s.options.map((opt, i) => {
          const isAnswer = sChosen !== null && i === s.correctIndex
          const isWrongPick = sChosen === i && i !== s.correctIndex
          return (
            <button
              key={i}
              onClick={() => {
                if (sChosen !== null) return
                setSChosen(i)
                setSResults(prev => [...prev, i === s.correctIndex])
              }}
              disabled={sChosen !== null}
              className={`w-full text-left rounded-xl border p-3 flex items-start gap-3 transition-colors ${
                isAnswer ? 'border-green-500 bg-green-900/30'
                  : isWrongPick ? 'border-red-500 bg-red-900/30'
                  : sChosen !== null ? 'border-white/10 bg-white/5 opacity-60'
                  : 'border-white/10 bg-white/5 hover:border-teal-400 hover:bg-white/10'
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

      {sChosen !== null && (
        <>
          <div className={`rounded-xl p-5 mb-5 ${sChosen === s.correctIndex ? 'bg-green-900/30 border border-green-700' : 'bg-amber-900/30 border border-amber-700'}`}>
            <p className="font-bold text-white mb-2">{sChosen === s.correctIndex ? '✅ Correct' : '📖 Not quite'}</p>
            <p className="text-sm text-slate-300">{s.explanation}</p>
          </div>
          <button
            onClick={() => {
              if (sIndex + 1 >= SCENARIOS.length) {
                const scenarioCorrect = sResults.filter(Boolean).length
                completeLevel(11, Math.round(((matchAccuracy / 100) * 50) + ((scenarioCorrect / SCENARIOS.length) * 50)))
                setDone(true)
              } else { setSIndex(i => i + 1); setSChosen(null) }
            }}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-bold hover:opacity-90"
          >
            {sIndex + 1 < SCENARIOS.length ? 'Next Scenario →' : 'See My Results →'}
          </button>
        </>
      )}
    </div>
  )
}

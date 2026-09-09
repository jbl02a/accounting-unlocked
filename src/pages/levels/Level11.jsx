import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useProgress } from '../../context/ProgressContext'
import { useHints, HintBar, hintTally } from '../../components/Hint'

// The handful of principles and assumptions a first financial accounting exam
// actually asks about. Each one gets a plain-English rule and one concrete example.
const PRINCIPLES = [
  // Four assumptions, then four principles — the grouping used in Chapter 2.
  {
    id: 'entity',
    group: 'assumption',
    name: 'Economic Entity Assumption',
    short: 'The business is separate from its owners',
    rule: 'Each company is accounted for separately from its owners and from other companies.',
    example: 'The owner buys a boat with personal money. It never touches the company books.',
    matchText: 'The owner pays for a family vacation with her own credit card, and none of it is recorded in the company’s books.',
    why: 'Without this you could never tell whether the business itself is profitable. It is also why an owner putting money in is recorded as Common Stock, not revenue.',
  },
  {
    id: 'going',
    group: 'assumption',
    name: 'Going Concern Assumption',
    short: 'The company will keep operating',
    rule: 'We assume a company will continue to operate long enough to carry out its existing commitments.',
    example: 'That is why equipment is carried at cost and depreciated over years, instead of at what it would fetch in a fire sale.',
    matchText: 'A company reports its delivery trucks at cost and depreciates them over eight years rather than at what they would sell for tomorrow.',
    why: 'If a company is about to shut down, this assumption breaks and everything gets restated at liquidation value. Auditors have to flag that.',
  },
  {
    id: 'period',
    group: 'assumption',
    name: 'Time-Period Assumption',
    short: 'Chop company life into reporting periods',
    rule: 'The life of a company is divided into artificial time periods so net income can be measured for a specific period.',
    example: 'A construction firm reports quarterly results even though its projects run for years.',
    matchText: 'A construction company prepares financial statements every three months even though its building projects each take two years.',
    why: 'Nobody can wait until a company closes to find out how it did. This assumption is also exactly why adjusting entries are needed at period end.',
  },
  {
    id: 'monetary',
    group: 'assumption',
    name: 'Monetary Unit Assumption',
    short: 'Report in dollars',
    rule: 'A company accounts for and reports its financial results in monetary terms — dollars, euros, yen.',
    example: 'A company’s brilliant staff and loyal customers are hugely valuable — and appear nowhere on the balance sheet.',
    matchText: 'A company’s outstanding reputation for customer service is never listed as an asset on its balance sheet.',
    why: 'Accounting reports in one common unit so numbers can be added together. "Really good employees" cannot be added to "$14,500 of cash."',
  },
  {
    id: 'cost',
    group: 'principle',
    name: 'Historical Cost Principle',
    short: 'Record at what you PAID',
    rule: 'Activities are initially measured at cost — the exchange price at the time the activity occurs.',
    example: 'Land bought in 2015 for $80,000 is worth $200,000 today. The balance sheet still says $80,000.',
    matchText: 'A building purchased for $250,000 in 2019 is appraised at $400,000 today, but the balance sheet still reports $250,000.',
    why: 'Purchase price is objective and verifiable — there is a receipt. Market value is somebody’s opinion, and opinions change daily.',
  },
  {
    id: 'revenue',
    group: 'principle',
    name: 'Revenue Recognition Principle',
    short: 'Record revenue when it is EARNED',
    rule: 'Revenue is recorded in the period the company satisfies its performance obligation — delivers the goods or performs the service — and collection is reasonably assured.',
    example: 'You finish a $2,000 job on March 28. The client pays you on April 15. The revenue belongs to MARCH.',
    matchText: 'A landscaper finishes a $2,000 job on March 28 and records the revenue in March, even though the client does not pay until April 15.',
    why: 'This is the reason Accounts Receivable exists. If revenue only counted when cash arrived, a company could look broke in the month it did all its best work.',
  },
  {
    id: 'expense',
    group: 'principle',
    name: 'Expense Recognition (Matching) Principle',
    short: 'Match expenses to the revenue they produced',
    rule: 'An expense is recorded and reported in the same period as the revenue it helped generate, regardless of when cash is paid.',
    example: 'Sales commissions earned on March sales are March expenses, even though the checks go out in April.',
    matchText: 'Employees earn $4,000 of wages during the last week of December. The company records the expense in December, though payday is January 3.',
    why: 'This is why Accounts Payable exists, and it is the twin of revenue recognition. Together they ARE accrual accounting.',
  },
  {
    id: 'conservatism',
    group: 'principle',
    name: 'Conservatism Principle',
    short: 'When in doubt, do not overstate',
    rule: 'When more than one equally acceptable method exists, choose the one that results in LOWER assets and revenues, or HIGHER liabilities and expenses.',
    example: 'Two equally defensible estimates for uncollectible accounts — $4,000 and $9,000. The accountant records $9,000.',
    matchText: 'Facing two equally acceptable estimates, the accountant picks the one that reports lower income rather than higher.',
    why: 'It breaks a genuine tie in the direction that will not flatter the company. It is NOT a licence to deliberately understate results.',
  },
]

const EXTRA = [
  { name: 'Full disclosure', text: 'Any information that would make a difference to financial statement users should be revealed in the statements or the notes attached to them.' },
  { name: 'Materiality', text: 'If the omission or misstatement of an amount could influence a decision, it is material. Amounts too small to change a decision can be handled the easy way.' },
  { name: 'Cost constraint', text: 'The benefit received from accounting information should be greater than the cost of providing it. If cost exceeds benefit, the information is not considered useful.' },
]

// Chapter 2 also tests these by name.
const QUALITATIVE = {
  fundamental: [
    { name: 'Relevance', text: 'Capable of making a difference in a decision — it has predictive value, confirmatory value, or both.' },
    { name: 'Faithful representation', text: 'Complete, neutral and free from error — it portrays the real economic event.' },
  ],
  enhancing: [
    { name: 'Comparability', text: 'Allows comparisons between companies. Consistency is part of this: the same company applying the same methods over time.' },
    { name: 'Verifiability', text: 'Independent parties would reach the same measurement.' },
    { name: 'Timeliness', text: 'Available before it loses its ability to influence a decision.' },
    { name: 'Understandability', text: 'A user with reasonable accounting knowledge can comprehend it.' },
  ],
}

const MATCH_HINT = 'Do not read all sixteen boxes at once. Pick off the pairs you are sure about first — every one you lock in removes a wrong option from the rest. When you are stuck, look for the giveaway in the example: a gap between when the work was done and when the money moved points at revenue recognition or matching; an old purchase price still on the books points at cost; something valuable with no dollar figure points at monetary unit; the owner’s personal money points at economic entity.'

const SCENARIOS = [
  {
    text: 'Riverbend Co. delivers $3,000 of custom cabinets to a customer in June. The customer pays in July. Riverbend records the $3,000 of revenue in June.',
    options: ['Revenue Recognition Principle', 'Cost Principle', 'Monetary Unit Assumption', 'Full Disclosure Principle'],
    correctIndex: 0,
    hint: 'Two dates are in play: the month the work was finished, and the month the money arrived. Which one does accounting say the revenue belongs to?',
    explanation: 'Revenue is recorded when it is earned — the cabinets were delivered in June. The July cash receipt is a separate entry: debit Cash, credit Accounts Receivable.',
  },
  {
    text: 'The owner of Riverbend buys a jet ski for herself using her personal savings. It is not recorded anywhere in the company’s books.',
    options: ['Economic Entity Assumption', 'Going Concern Assumption', 'Expense Recognition Principle', 'Periodicity Assumption'],
    correctIndex: 0,
    hint: 'Whose money paid for it, and whose books should it show up in? This principle is about keeping two things apart.',
    explanation: 'The business and its owner are separate economic entities. Her personal purchases are not the company’s transactions — this is exactly the assumption being applied.',
  },
  {
    text: 'Riverbend bought its workshop in 2018 for $180,000. A realtor says it would sell for $310,000 today. The balance sheet still shows $180,000.',
    options: ['Cost Principle', 'Materiality', 'Revenue Recognition Principle', 'Monetary Unit Assumption'],
    correctIndex: 0,
    hint: 'The workshop is worth more now, but the number on the books has not moved. Which principle is what freezes that number at the original amount?',
    explanation: 'Assets are carried at historical cost. The purchase price is objective and verifiable; an appraisal is an estimate that would change every year.',
  },
  {
    text: 'Riverbend’s crew earns $4,000 of wages in the last week of December. Payday is January 3, but the $4,000 is recorded as a December expense.',
    options: ['Expense Recognition (Matching) Principle', 'Full Disclosure Principle', 'Cost Principle', 'Going Concern Assumption'],
    correctIndex: 0,
    hint: 'This is the mirror image of the revenue question. The work happened in one month, the check goes out in another. Which principle decides the period for a COST?',
    explanation: 'The work was done in December and helped earn December revenue, so the expense belongs in December. The unpaid amount sits in a liability — Salaries Payable — until January 3.',
  },
  {
    text: 'Riverbend has a reputation as the most reliable cabinet shop in the state. Nothing about that appears on its balance sheet.',
    options: ['Monetary Unit Assumption', 'Conservatism', 'Periodicity Assumption', 'Economic Entity Assumption'],
    correctIndex: 0,
    hint: 'Nobody doubts the reputation is valuable. Ask what accounting requires before anything can go on the books at all — what would you have to attach to it?',
    explanation: 'Only items measurable in dollars get recorded. A reputation is real and valuable but cannot be reliably assigned a dollar figure, so it stays off the books.',
  },
  {
    text: 'Riverbend is being sued for $2 million. Nothing has been paid or settled, but the situation is described in the notes to the financial statements.',
    options: ['Full Disclosure Principle', 'Cost Principle', 'Revenue Recognition Principle', 'Monetary Unit Assumption'],
    correctIndex: 0,
    hint: 'No money has moved, so there is no journal entry to make. But a lender reading these statements would badly want to know. Which principle covers information that belongs in the notes rather than the numbers?',
    explanation: 'A lawsuit that size would absolutely change how a lender or investor reads the statements, so it must be disclosed — in the notes, if not in the numbers themselves.',
  },
  {
    text: 'Riverbend closes its books and issues financial statements every three months, even though the company plans to operate for decades.',
    options: ['Periodicity (Time Period) Assumption', 'Going Concern Assumption', 'Materiality', 'Expense Recognition Principle'],
    correctIndex: 0,
    hint: 'This one is not about value or cash at all — it is about TIME. The company slices its ongoing life into chunks so it can report. What is that slicing called?',
    explanation: 'Business life is divided into artificial time periods so results can be reported regularly. (Going concern is the related idea that the company will keep operating — but the quarterly reporting itself is periodicity.)',
  },
  {
    text: 'Riverbend has no plans to close or sell out. Its accountant therefore reports the workshop equipment at cost less depreciation, rather than at what it would bring in an immediate liquidation sale.',
    options: ['Going Concern Assumption', 'Cost Principle', 'Conservatism', 'Materiality'],
    correctIndex: 0,
    hint: 'Two of the choices are genuinely tempting. One principle explains WHICH dollar figure gets used; the other explains why using that figure makes sense at all — because the company is not about to shut its doors. The scenario stresses the second idea.',
    explanation: 'Careful here — two principles are in play and only one is the answer. The COST principle explains the dollar figure used (what Riverbend paid). The GOING CONCERN assumption is what makes cost the right basis in the first place: the company will keep operating and use the equipment up, so liquidation value is irrelevant. If Riverbend were shutting down, everything would be restated at liquidation value.',
  },
  {
    text: 'Riverbend\u2019s accountant is weighing two equally defensible estimates for uncollectible accounts: $4,000 or $9,000. Genuinely unsure which is closer to the truth, she records $9,000 so that assets and income are not overstated.',
    options: ['Conservatism', 'Materiality', 'Full Disclosure Principle', 'Revenue Recognition Principle'],
    correctIndex: 0,
    hint: 'Notice that BOTH estimates are described as defensible — there is no clearly right answer. Which principle tells you which way to lean when you genuinely cannot tell?',
    explanation: 'When two treatments are equally defensible, conservatism breaks the tie in the direction that avoids overstating assets or income. Note what it does NOT mean: it is not a license to deliberately understate results — only to avoid painting a rosier picture than the facts support.',
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
  const hints = useHints()

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
          <h1 className="text-3xl font-extrabold text-white mb-2">Assumptions &amp; Principles</h1>
          <p className="text-slate-400">
            Four assumptions and four principles hold up everything else you have learned. Exams love them because they are easy to ask about: here is a situation, name the one at work.
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

        {[
          { key: 'assumption', label: 'The Four Assumptions', blurb: 'What accounting takes for granted before it records anything.' },
          { key: 'principle', label: 'The Four Principles', blurb: 'How activity gets measured and which period it lands in.' },
        ].map(section => (
        <div key={section.key} className="mb-6">
          <h3 className="font-bold text-white mb-1">{section.label}</h3>
          <p className="text-xs text-slate-400 mb-3">{section.blurb}</p>
          <div className="space-y-3">
          {PRINCIPLES.filter(p => p.group === section.key).map((p, i) => (
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
        </div>
        ))}

        <div className="rounded-xl bg-white/5 border border-white/10 p-5 mb-6">
          <h3 className="font-bold text-white mb-1">Qualitative characteristics of useful information</h3>
          <p className="text-xs text-slate-400 mb-3">Chapter 2 asks you to name these. Two are fundamental; four enhance them.</p>
          <p className="text-[10px] font-bold uppercase tracking-wider text-teal-300 mb-1">Fundamental</p>
          <div className="divide-y divide-white/5 mb-3">
            {QUALITATIVE.fundamental.map(q => (
              <div key={q.name} className="py-2 flex flex-col sm:flex-row sm:gap-4">
                <div className="sm:w-40 shrink-0 text-sm font-semibold text-white">{q.name}</div>
                <div className="text-xs text-slate-400">{q.text}</div>
              </div>
            ))}
          </div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-teal-300 mb-1">Enhancing</p>
          <div className="divide-y divide-white/5">
            {QUALITATIVE.enhancing.map(q => (
              <div key={q.name} className="py-2 flex flex-col sm:flex-row sm:gap-4">
                <div className="sm:w-40 shrink-0 text-sm font-semibold text-white">{q.name}</div>
                <div className="text-xs text-slate-400">{q.text}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl bg-white/5 border border-white/10 p-5 mb-8">
          <h3 className="font-bold text-white mb-1">Three more you should recognize</h3>
          <p className="text-xs text-slate-400 mb-3">Not counted among the four principles, but named in the same chapter.</p>
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
        <p className="text-slate-400 text-sm mb-2">
          Matching: {PRINCIPLES.length} pairs in {attempts} guesses ({matchAccuracy}% accuracy) · Scenarios: {scenarioCorrect}/{SCENARIOS.length}
        </p>
        {hints.usedCount > 0 && <p className="text-xs text-slate-500 mb-6">{hintTally(hints.usedCount)}</p>}
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
            <h1 className="text-xl font-extrabold text-white">Match each one to its example</h1>
          </div>
          <div className="text-right">
            <p className="text-sm font-bold text-white">{matched.length} / {PRINCIPLES.length}</p>
            <p className="text-xs text-slate-500">{attempts} guess{attempts === 1 ? '' : 'es'}</p>
          </div>
        </div>

        <p className="text-sm text-slate-400 mb-4">
          Tap an assumption or principle on the left, then the example on the right that shows it in action. Correct pairs lock in green.
        </p>

        {!allMatched && (
          <HintBar open={hints.isOpen('match')} onToggle={() => hints.toggle('match')} text={MATCH_HINT} className="mb-4" />
        )}

        <div className="grid sm:grid-cols-2 gap-3 mb-6">
          {/* Principles */}
          <div className="space-y-2">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 px-1">Assumption / Principle</p>
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
          <h1 className="text-xl font-extrabold text-white">Which one is at work?</h1>
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

      {sChosen === null && (
        <HintBar open={hints.isOpen(`s${sIndex}`)} onToggle={() => hints.toggle(`s${sIndex}`)} text={s.hint} className="mb-5" />
      )}

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

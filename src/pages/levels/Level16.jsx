import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useProgress } from '../../context/ProgressContext'
import { money } from '../../components/EntryTable'
import { useHints, HintToggle, HintPanel, HintBar, hintTally } from '../../components/Hint'

// Lakeside Outfitters, Inc. — year ended December 31, 2025.
const IS_ACCOUNTS = [
  { name: 'Sales revenue', amt: 68400, where: 'revenue' },
  { name: 'Interest income', amt: 1600, where: 'revenue' },
  { name: 'Cost of goods sold', amt: 39200, where: 'expense' },
  { name: 'Salaries expense', amt: 11500, where: 'expense' },
  { name: 'Rent expense', amt: 2800, where: 'expense' },
  { name: 'Insurance expense', amt: 900, where: 'expense' },
  { name: 'Depreciation expense', amt: 1900, where: 'expense' },
  { name: 'Interest expense', amt: 720, where: 'expense' },
  { name: 'Income taxes expense', amt: 2400, where: 'expense' },
  { name: 'Accounts receivable', amt: 6750, where: 'neither' },
  { name: 'Dividends declared', amt: 3500, where: 'neither' },
  { name: 'Unearned revenue', amt: 2000, where: 'neither' },
]

const WHERE_HINTS = {
  'Sales revenue': 'Money earned from the principal activity of the business. Revenue or not?',
  'Interest income': 'Still income — just earned from investments rather than from selling. It belongs with the revenues.',
  'Cost of goods sold': 'The cost to the seller of the goods that were sold. A cost incurred to earn revenue is what kind of account?',
  'Salaries expense': 'The word Expense in the name settles it.',
  'Rent expense': 'Another operating cost of the period.',
  'Insurance expense': 'The portion of coverage used up this period.',
  'Depreciation expense': 'The portion of an asset used up this period. It is an expense even though no cash moved.',
  'Interest expense': 'The cost of borrowing. A cost is a cost, even a non-operating one.',
  'Income taxes expense': 'Taxes on this year’s income. On a single-step statement it sits with the other expenses.',
  'Accounts receivable': 'Money customers owe. Is that something the company OWNS at a point in time, or something it earned over a period?',
  'Dividends declared': 'Careful — this is the classic trap. Dividends reduce equity, but are they a cost of EARNING revenue?',
  'Unearned revenue': 'Read past the word "revenue". Cash was collected but the work is not done, so what the company has is an obligation.',
}

const EQUATION_QS = [
  {
    id: 'eq1',
    prompt: 'On January 1, Halstead Company reported assets of $180,000 and liabilities of $95,000. What is stockholders’ equity on January 1?',
    answer: 85000,
    hint: 'Start from A = L + E and rearrange it so equity is on its own. Equity is whatever is left of the assets after the creditors are satisfied.',
    working: 'A = L + E, so E = A − L = $180,000 − $95,000 = $85,000.',
  },
  {
    id: 'eq2',
    prompt: 'During the year, Halstead’s assets increased by $52,000 and stockholders’ equity increased by $21,000. By how much did LIABILITIES change?',
    answer: 31000,
    hint: 'The equation has to keep balancing after the changes too. If the left side rose by $52,000 and one part of the right side rose by $21,000, the rest of the right side has to absorb the difference.',
    working: 'Change in A = change in L + change in E → $52,000 = change in L + $21,000 → liabilities rose $31,000.',
  },
  {
    id: 'eq3',
    prompt: 'What amount is reported for LIABILITIES on December 31?',
    answer: 126000,
    hint: 'You already know what liabilities started at and how much they moved during the year. Put the two together.',
    working: 'Beginning liabilities $95,000 + $31,000 increase = $126,000. (Check: assets $232,000 = liabilities $126,000 + equity $106,000.)',
  },
]

const TOTAL_REV = IS_ACCOUNTS.filter(a => a.where === 'revenue').reduce((s, a) => s + a.amt, 0)
const TOTAL_EXP = IS_ACCOUNTS.filter(a => a.where === 'expense').reduce((s, a) => s + a.amt, 0)
const NET_INCOME = TOTAL_REV - TOTAL_EXP
const BEGIN_RE = 14420
const DIVIDENDS = 3500
const END_RE = BEGIN_RE + NET_INCOME - DIVIDENDS

function parseAmount(raw) {
  const c = String(raw).replace(/[^0-9.]/g, '')
  return c === '' ? null : Number(c)
}

export default function Level16() {
  const navigate = useNavigate()
  const { completeLevel, recordTask } = useProgress()
  const [phase, setPhase] = useState('learn')
  const [step, setStep] = useState(1)
  const [eqAnswers, setEqAnswers] = useState({})
  const [eqChecked, setEqChecked] = useState(false)
  const [placed, setPlaced] = useState({})
  const [checked2, setChecked2] = useState(false)
  const [totals, setTotals] = useState({ rev: '', exp: '', ni: '' })
  const [checked3, setChecked3] = useState(false)
  const [reAns, setReAns] = useState('')
  const [checked4, setChecked4] = useState(false)
  const [done, setDone] = useState(false)
  const hints = useHints()

  const eqCorrect = EQUATION_QS.filter(q => parseAmount(eqAnswers[q.id] || '') === q.answer).length
  const placeCorrect = IS_ACCOUNTS.filter(a => placed[a.name] === a.where).length
  const totalsCorrect = (parseAmount(totals.rev) === TOTAL_REV ? 1 : 0) + (parseAmount(totals.exp) === TOTAL_EXP ? 1 : 0) + (parseAmount(totals.ni) === NET_INCOME ? 1 : 0)
  const reRight = parseAmount(reAns) === END_RE
  const maxPoints = EQUATION_QS.length + IS_ACCOUNTS.length + 3 + 1
  const earned = eqCorrect + placeCorrect + totalsCorrect + (reRight ? 1 : 0)

  function restart() {
    setStep(1); setEqAnswers({}); setEqChecked(false); setPlaced({}); setChecked2(false)
    setTotals({ rev: '', exp: '', ni: '' }); setChecked3(false); setReAns(''); setChecked4(false)
    setDone(false); hints.reset()
  }

  if (phase === 'learn') {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <div className="text-sm text-purple-400 font-semibold mb-1">Level 16</div>
          <h1 className="text-3xl font-extrabold text-white mb-2">The Four Financial Statements</h1>
          <p className="text-slate-400">Everything the accounting cycle produces ends up in four reports — and they are prepared in a specific order, because each one feeds the next.</p>
        </div>

        <div className="rounded-2xl border border-purple-500/30 bg-purple-500/10 p-5 mb-6">
          <p className="text-xs font-bold uppercase tracking-wider text-purple-300 mb-3">The order they are prepared — and why</p>
          <div className="space-y-2">
            {[
              { n: 1, t: 'Income Statement', f: 'Revenues − Expenses = Net Income', period: 'FOR a period of time', why: 'Must come first: the next statement needs net income.' },
              { n: 2, t: 'Retained Earnings Statement', f: 'Beginning R/E + Net Income − Dividends = Ending R/E', period: 'FOR a period of time', why: 'Takes net income from statement 1. Produces ending R/E for statement 3.' },
              { n: 3, t: 'Balance Sheet', f: 'Assets = Liabilities + Stockholders’ Equity', period: 'AS OF a point in time', why: 'Needs the ending retained earnings figure from statement 2.' },
              { n: 4, t: 'Statement of Cash Flows', f: 'Operating + Investing + Financing = change in Cash', period: 'FOR a period of time', why: 'Explains how the Cash line on the balance sheet got to where it is.' },
            ].map(s => (
              <div key={s.n} className="rounded-xl bg-black/20 p-3">
                <div className="flex items-start gap-3">
                  <span className="shrink-0 w-6 h-6 rounded-full bg-white/10 text-white text-xs font-bold flex items-center justify-center">{s.n}</span>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-baseline gap-2">
                      <p className="font-bold text-white text-sm">{s.t}</p>
                      <span className="text-[10px] uppercase tracking-wider text-purple-300">{s.period}</span>
                    </div>
                    <p className="text-xs font-mono text-purple-200 my-1">{s.f}</p>
                    <p className="text-xs text-slate-400">{s.why}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-sm text-slate-300 mt-3">
            That chain is called <span className="text-white font-semibold">articulation</span> — the statements are linked, not independent.
            Only the balance sheet is a snapshot; the other three cover a span of time.
          </p>
        </div>

        <div className="rounded-xl bg-white/5 border border-white/10 p-5 mb-6">
          <h3 className="font-bold text-white mb-2">The three key linkages</h3>
          <ul className="text-sm text-slate-300 space-y-2">
            <li>• The <span className="text-white font-semibold">income statement</span> links the beginning and ending balance sheets through Retained Earnings.</li>
            <li>• The <span className="text-white font-semibold">statement of stockholders’ equity</span> links beginning and ending equity.</li>
            <li>• The <span className="text-white font-semibold">statement of cash flows</span> links beginning and ending Cash.</li>
          </ul>
        </div>

        <div className="rounded-xl bg-white/5 border border-white/10 p-5 mb-6">
          <h3 className="font-bold text-white mb-2">Single-step vs. multiple-step income statement</h3>
          <div className="grid sm:grid-cols-2 gap-3 mb-3">
            <div className="rounded-lg bg-slate-900/60 border border-white/10 p-3">
              <p className="font-semibold text-white text-sm mb-1">Single-step</p>
              <p className="text-xs text-slate-400">Two categories only: <span className="text-white">total revenues</span> minus <span className="text-white">total expenses</span>. One subtraction, one answer.</p>
            </div>
            <div className="rounded-lg bg-slate-900/60 border border-white/10 p-3">
              <p className="font-semibold text-white text-sm mb-1">Multiple-step</p>
              <p className="text-xs text-slate-400">Adds subtotals: Gross margin = Net sales − COGS. Income from operations = Gross margin − operating expenses.</p>
            </div>
          </div>
          <p className="text-xs text-slate-400">
            Two ratios that come off these statements: <span className="text-white">Net profit margin = Net income ÷ Sales revenue</span>.
            And on a multiple-step statement, gross margin is watched closely because it shows profit before operating costs.
          </p>
        </div>

        <div className="rounded-xl bg-white/5 border border-white/10 p-5 mb-6">
          <h3 className="font-bold text-white mb-2">Statement of cash flows — the three buckets</h3>
          <div className="space-y-2 text-sm">
            <p className="text-slate-300"><span className="text-white font-semibold">Operating</span> — cash tied to earning income: cash sales, collections, payments for goods, salaries, interest.</p>
            <p className="text-slate-300"><span className="text-white font-semibold">Investing</span> — buying and selling long-term assets and investments.</p>
            <p className="text-slate-300"><span className="text-white font-semibold">Financing</span> — raising and repaying capital: issuing stock, borrowing, repaying debt, paying dividends.</p>
          </div>
        </div>

        <button onClick={() => setPhase('play')} className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-violet-600 text-white font-bold text-lg hover:opacity-90">
          Build the statements in 4 steps →
        </button>
        <button onClick={() => { completeLevel(16); navigate('/') }} className="w-full mt-3 py-2.5 rounded-xl text-sm text-slate-400 hover:text-white hover:bg-white/5">
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
          <div className="text-5xl mb-4">{pct === 100 ? '🎉' : '📑'}</div>
          <h2 className="text-3xl font-extrabold text-white mb-2">Statements Complete</h2>
          <p className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-violet-400 mb-2">{pct}%</p>
          <p className="text-slate-400 text-sm">
            Equation {eqCorrect}/{EQUATION_QS.length} · Placement {placeCorrect}/{IS_ACCOUNTS.length} · Totals {totalsCorrect}/3 · Ending R/E {reRight ? 1 : 0}/1
          </p>
          {hints.usedCount > 0 && <p className="text-xs text-slate-500 mt-2">{hintTally(hints.usedCount)}</p>}
        </div>

        <div className="rounded-xl border border-white/10 overflow-hidden mb-4">
          <div className="bg-slate-800 px-4 py-3 text-center">
            <p className="font-bold text-white">Lakeside Outfitters, Inc.</p>
            <p className="text-sm text-slate-300">Income Statement (single-step)</p>
            <p className="text-xs text-slate-500">For the Year Ended December 31, 2025</p>
          </div>
          <div className="px-4 py-2">
            <p className="text-[10px] font-bold uppercase tracking-wider text-purple-300 mb-1">Revenues</p>
            {IS_ACCOUNTS.filter(a => a.where === 'revenue').map(a => (
              <div key={a.name} className="flex justify-between text-sm py-0.5"><span className="text-slate-300">{a.name}</span><span className="font-mono text-slate-200">{money(a.amt)}</span></div>
            ))}
            <div className="flex justify-between text-sm py-1 border-t border-white/10 mt-1 font-semibold"><span className="text-white">Total revenues</span><span className="font-mono text-white">{money(TOTAL_REV)}</span></div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-purple-300 mt-3 mb-1">Expenses</p>
            {IS_ACCOUNTS.filter(a => a.where === 'expense').map(a => (
              <div key={a.name} className="flex justify-between text-sm py-0.5"><span className="text-slate-300">{a.name}</span><span className="font-mono text-slate-200">{money(a.amt)}</span></div>
            ))}
            <div className="flex justify-between text-sm py-1 border-t border-white/10 mt-1 font-semibold"><span className="text-white">Total expenses</span><span className="font-mono text-white">{money(TOTAL_EXP)}</span></div>
            <div className="flex justify-between text-base py-2 border-t-2 border-white/20 mt-2 font-bold"><span className="text-white">Net income</span><span className="font-mono text-green-400">{money(NET_INCOME)}</span></div>
          </div>
        </div>

        <div className="rounded-xl border border-white/10 overflow-hidden mb-6">
          <div className="bg-slate-800 px-4 py-3 text-center">
            <p className="font-bold text-white">Lakeside Outfitters, Inc.</p>
            <p className="text-sm text-slate-300">Retained Earnings Statement</p>
            <p className="text-xs text-slate-500">For the Year Ended December 31, 2025</p>
          </div>
          <div className="px-4 py-2">
            <div className="flex justify-between text-sm py-0.5"><span className="text-slate-300">Retained earnings, January 1</span><span className="font-mono text-slate-200">{money(BEGIN_RE)}</span></div>
            <div className="flex justify-between text-sm py-0.5"><span className="text-slate-300">Add: Net income</span><span className="font-mono text-slate-200">{money(NET_INCOME)}</span></div>
            <div className="flex justify-between text-sm py-0.5"><span className="text-slate-300">Less: Dividends declared</span><span className="font-mono text-slate-200">({DIVIDENDS.toLocaleString()})</span></div>
            <div className="flex justify-between text-base py-2 border-t-2 border-white/20 mt-1 font-bold"><span className="text-white">Retained earnings, December 31</span><span className="font-mono text-green-400">{money(END_RE)}</span></div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button onClick={restart} className="flex-1 py-3 rounded-xl bg-white/10 text-white font-semibold hover:bg-white/20">Try Again</button>
          <button onClick={() => setPhase('learn')} className="flex-1 py-3 rounded-xl bg-white/10 text-white font-semibold hover:bg-white/20">Review Lesson</button>
          <button onClick={() => navigate('/level/17')} className="flex-1 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-violet-600 text-white font-bold hover:opacity-90">Level 17 →</button>
        </div>
      </div>
    )
  }

  const StepHeader = ({ title }) => (
    <div className="flex items-center justify-between mb-5">
      <div>
        <div className="text-sm text-purple-400 font-semibold">Level 16 — Step {step} of 4</div>
        <h1 className="text-xl font-extrabold text-white">{title}</h1>
      </div>
      <div className="flex gap-1">
        {[1, 2, 3, 4].map(s => <div key={s} className={`w-2.5 h-2.5 rounded-full ${s < step ? 'bg-green-500' : s === step ? 'bg-purple-500' : 'bg-slate-700'}`} />)}
      </div>
    </div>
  )

  if (step === 1) {
    const filled = EQUATION_QS.every(q => parseAmount(eqAnswers[q.id] || '') !== null)
    return (
      <div className="max-w-2xl mx-auto">
        <StepHeader title="Work the accounting equation" />
        <p className="text-sm text-slate-400 mb-4">Three linked questions about the same company. Each one builds on the last.</p>
        <div className="space-y-3 mb-5">
          {EQUATION_QS.map(q => {
            const v = parseAmount(eqAnswers[q.id] || '')
            const ok = eqChecked && v === q.answer
            const bad = eqChecked && v !== q.answer
            return (
              <div key={q.id} className={`rounded-xl border p-4 ${ok ? 'border-green-600 bg-green-900/15' : bad ? 'border-red-600 bg-red-900/15' : 'border-white/10 bg-white/5'}`}>
                <p className="text-sm text-white mb-2">{q.prompt}</p>
                {!eqChecked && <HintBar open={hints.isOpen(q.id)} onToggle={() => hints.toggle(q.id)} text={q.hint} className="mb-2" />}
                <div className="flex gap-2">
                  <span className="flex items-center px-3 rounded-lg bg-slate-800 border border-slate-600 text-slate-400 font-mono">$</span>
                  <input inputMode="numeric" value={eqAnswers[q.id] || ''} onChange={e => !eqChecked && setEqAnswers(p => ({ ...p, [q.id]: e.target.value }))} disabled={eqChecked}
                    placeholder="0" className={`flex-1 rounded-lg border bg-slate-800 px-3 py-2 font-mono text-right text-white outline-none focus:ring-1 focus:ring-purple-500 disabled:opacity-70 ${eqChecked ? (ok ? 'border-green-500' : 'border-red-500') : 'border-slate-600'}`} />
                </div>
                {eqChecked && <p className={`text-xs mt-2 ${ok ? 'text-green-300' : 'text-amber-300'}`}>{q.working}</p>}
              </div>
            )
          })}
        </div>
        {!eqChecked ? (
          <button onClick={() => {
            setEqChecked(true)
            EQUATION_QS.forEach((q, i) => recordTask(`L16-eq${i + 1}`, parseAmount(eqAnswers[q.id] || '') === q.answer, `Accounting equation — ${q.prompt.slice(0, 46)}…`, 16))
          }} disabled={!filled}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-violet-600 text-white font-bold disabled:opacity-40 hover:opacity-90">
            {filled ? 'Check My Answers' : 'Answer all three'}
          </button>
        ) : (
          <button onClick={() => setStep(2)} className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-violet-600 text-white font-bold hover:opacity-90">
            Step 2: Sort the accounts →
          </button>
        )}
      </div>
    )
  }

  if (step === 2) {
    const allPlaced = IS_ACCOUNTS.every(a => placed[a.name])
    const opts = [
      { id: 'revenue', label: 'Revenue' },
      { id: 'expense', label: 'Expense' },
      { id: 'neither', label: 'Not on the IS' },
    ]
    return (
      <div className="max-w-2xl mx-auto">
        <StepHeader title="Which accounts go on the income statement?" />
        <p className="text-sm text-slate-400 mb-4">
          Lakeside Outfitters’ account balances for the year. Mark each one — three of these do not belong on an income statement at all.
        </p>
        <div className="rounded-xl border border-white/10 overflow-hidden mb-5">
          {IS_ACCOUNTS.map((a, i) => {
            const pick = placed[a.name]
            const wrong = checked2 && pick !== a.where
            return (
              <div key={a.name} className={`px-3 py-2 ${i ? 'border-t border-white/5' : ''} ${wrong ? 'bg-red-900/20' : ''}`}>
                <div className="flex items-center gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white truncate">{a.name}</p>
                    <p className="text-xs text-slate-500 font-mono">{money(a.amt)}</p>
                  </div>
                  {!checked2 && <HintToggle open={hints.isOpen(a.name)} onClick={() => hints.toggle(a.name)} label={a.name} />}
                  {opts.map(o => {
                    const isAnswer = checked2 && a.where === o.id
                    return (
                      <button key={o.id} onClick={() => !checked2 && setPlaced(p => ({ ...p, [a.name]: o.id }))} disabled={checked2}
                        className={`w-20 py-1.5 rounded-lg text-[10px] font-bold uppercase border transition-colors ${
                          isAnswer ? 'border-green-500 bg-green-900/40 text-green-300'
                            : pick === o.id ? 'border-purple-500 bg-purple-900/30 text-white'
                            : 'border-slate-600 bg-slate-800 text-slate-400 hover:border-purple-400'}`}>
                        {o.label}
                      </button>
                    )
                  })}
                </div>
                {!checked2 && hints.isOpen(a.name) && <HintPanel className="mt-2">{WHERE_HINTS[a.name]}</HintPanel>}
              </div>
            )
          })}
        </div>
        {checked2 && (
          <div className={`rounded-xl p-4 mb-5 ${placeCorrect === IS_ACCOUNTS.length ? 'bg-green-900/30 border border-green-700' : 'bg-amber-900/30 border border-amber-700'}`}>
            <p className="font-bold text-white">{placeCorrect} of {IS_ACCOUNTS.length} correct</p>
            <p className="text-sm text-slate-300 mt-1">
              Accounts receivable and unearned revenue are balance sheet accounts. <span className="text-white font-semibold">Dividends declared is the trap</span> — it reduces equity but is never an expense, so it belongs on the retained earnings statement instead.
            </p>
          </div>
        )}
        {!checked2 ? (
          <button onClick={() => {
            setChecked2(true)
            IS_ACCOUNTS.forEach(a => recordTask(`L16-place-${a.name}`, placed[a.name] === a.where, `Income statement placement — ${a.name}`, 16))
          }} disabled={!allPlaced}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-violet-600 text-white font-bold disabled:opacity-40 hover:opacity-90">
            {allPlaced ? 'Check My Answers' : 'Mark every account'}
          </button>
        ) : (
          <button onClick={() => setStep(3)} className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-violet-600 text-white font-bold hover:opacity-90">
            Step 3: Compute net income →
          </button>
        )}
      </div>
    )
  }

  if (step === 3) {
    const filled = ['rev', 'exp', 'ni'].every(k => parseAmount(totals[k]) !== null)
    const fields = [
      { k: 'rev', label: 'Total revenues', ans: TOTAL_REV, hint: 'There are only two revenue accounts in the list. Interest income counts even though it is not from selling.' },
      { k: 'exp', label: 'Total expenses', ans: TOTAL_EXP, hint: 'Seven expense accounts, including cost of goods sold and income taxes expense. Do NOT include dividends declared.' },
      { k: 'ni', label: 'Net income', ans: NET_INCOME, hint: 'On a single-step statement this is one subtraction: total revenues minus total expenses.' },
    ]
    return (
      <div className="max-w-2xl mx-auto">
        <StepHeader title="Total the single-step income statement" />
        <div className="rounded-xl border border-white/10 overflow-hidden mb-5">
          <div className="grid grid-cols-[1fr_7rem] bg-slate-800 text-[10px] font-bold text-slate-400 uppercase tracking-wider px-4 py-2">
            <span>Account</span><span className="text-right">Amount</span>
          </div>
          {IS_ACCOUNTS.filter(a => a.where !== 'neither').map(a => (
            <div key={a.name} className="grid grid-cols-[1fr_7rem] px-4 py-1 text-sm border-t border-white/5">
              <span className="text-white">{a.name} <span className="text-[10px] text-slate-500 uppercase">({a.where})</span></span>
              <span className="text-right font-mono text-slate-200">{money(a.amt)}</span>
            </div>
          ))}
        </div>
        <div className="space-y-3 mb-5">
          {fields.map(f => {
            const v = parseAmount(totals[f.k])
            const ok = checked3 && v === f.ans
            const bad = checked3 && v !== f.ans
            return (
              <div key={f.k} className={`rounded-xl border p-4 ${ok ? 'border-green-600 bg-green-900/15' : bad ? 'border-red-600 bg-red-900/15' : 'border-white/10 bg-white/5'}`}>
                <p className="text-sm font-semibold text-white mb-2">{f.label}</p>
                {!checked3 && <HintBar open={hints.isOpen(f.k)} onToggle={() => hints.toggle(f.k)} text={f.hint} className="mb-2" />}
                <div className="flex gap-2">
                  <span className="flex items-center px-3 rounded-lg bg-slate-800 border border-slate-600 text-slate-400 font-mono">$</span>
                  <input inputMode="numeric" value={totals[f.k]} onChange={e => !checked3 && setTotals(p => ({ ...p, [f.k]: e.target.value }))} disabled={checked3}
                    placeholder="0" className={`flex-1 rounded-lg border bg-slate-800 px-3 py-2 font-mono text-right text-white outline-none focus:ring-1 focus:ring-purple-500 disabled:opacity-70 ${checked3 ? (ok ? 'border-green-500' : 'border-red-500') : 'border-slate-600'}`} />
                </div>
                {checked3 && !ok && <p className="text-xs text-amber-300 mt-2">The correct amount is {money(f.ans)}.</p>}
              </div>
            )
          })}
        </div>
        {!checked3 ? (
          <button onClick={() => {
            setChecked3(true)
            fields.forEach(f => recordTask(`L16-total-${f.k}`, parseAmount(totals[f.k]) === f.ans, f.label, 16))
          }} disabled={!filled}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-violet-600 text-white font-bold disabled:opacity-40 hover:opacity-90">
            {filled ? 'Check My Totals' : 'Fill in all three'}
          </button>
        ) : (
          <button onClick={() => setStep(4)} className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-violet-600 text-white font-bold hover:opacity-90">
            Step 4: Retained earnings statement →
          </button>
        )}
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <StepHeader title="Prepare the retained earnings statement" />
      <div className="rounded-xl bg-violet-500/10 border border-violet-500/20 p-5 mb-5">
        <p className="text-sm text-slate-300 mb-2">Lakeside Outfitters reports:</p>
        <ul className="text-sm text-white space-y-1">
          <li>• Retained earnings, January 1: <span className="font-mono">{money(BEGIN_RE)}</span></li>
          <li>• Net income for the year: <span className="font-mono">{money(NET_INCOME)}</span> <span className="text-xs text-slate-400">(from step 3)</span></li>
          <li>• Dividends declared: <span className="font-mono">{money(DIVIDENDS)}</span></li>
        </ul>
      </div>
      <div className="rounded-xl border border-white/10 bg-white/5 p-4 mb-5">
        <p className="text-sm font-semibold text-white mb-2">What is Retained earnings at December 31?</p>
        {!checked4 && <HintBar open={hints.isOpen('re')} onToggle={() => hints.toggle('re')} text="Beginning R/E + Net Income − Dividends. Profit adds to what the company has kept; dividends take some back out. Note dividends were never subtracted in getting to net income, so they come out here." className="mb-2" />}
        <div className="flex gap-2">
          <span className="flex items-center px-3 rounded-lg bg-slate-800 border border-slate-600 text-slate-400 font-mono">$</span>
          <input inputMode="numeric" value={reAns} onChange={e => !checked4 && setReAns(e.target.value)} disabled={checked4} placeholder="0"
            className={`flex-1 rounded-lg border bg-slate-800 px-3 py-2 font-mono text-right text-white outline-none focus:ring-1 focus:ring-purple-500 disabled:opacity-70 ${checked4 ? (reRight ? 'border-green-500' : 'border-red-500') : 'border-slate-600'}`} />
        </div>
        {checked4 && (
          <p className={`text-xs mt-2 ${reRight ? 'text-green-300' : 'text-amber-300'}`}>
            {money(BEGIN_RE)} + {money(NET_INCOME)} − {money(DIVIDENDS)} = <span className="font-semibold">{money(END_RE)}</span>. This figure carries straight onto the balance sheet.
          </p>
        )}
      </div>
      {!checked4 ? (
        <button onClick={() => {
          setChecked4(true)
          recordTask('L16-endre', reRight, 'Ending retained earnings', 16)
        }} disabled={parseAmount(reAns) === null}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-violet-600 text-white font-bold disabled:opacity-40 hover:opacity-90">
          Check My Answer
        </button>
      ) : (
        <button onClick={() => { completeLevel(16, Math.round((earned / maxPoints) * 100)); setDone(true) }}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-violet-600 text-white font-bold hover:opacity-90">
          See My Results →
        </button>
      )}
    </div>
  )
}

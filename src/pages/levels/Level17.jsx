import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useProgress } from '../../context/ProgressContext'
import { money } from '../../components/EntryTable'
import { useHints, HintToggle, HintPanel, HintBar, hintTally } from '../../components/Hint'

// Lakeside Outfitters, Inc. — balance sheet at December 31, 2025. Ties to Level 16.
const BS = [
  { name: 'Cash', amt: 8250, section: 'ca' },
  { name: 'Accounts receivable', amt: 6750, section: 'ca' },
  { name: 'Inventories', amt: 5400, section: 'ca' },
  { name: 'Prepaid insurance', amt: 1100, section: 'ca' },
  { name: 'Land', amt: 15000, section: 'lta' },
  { name: 'Equipment', amt: 28000, section: 'lta' },
  { name: 'Accumulated depreciation', amt: -7600, section: 'lta' },
  { name: 'Patents', amt: 3200, section: 'lta' },
  { name: 'Accounts payable', amt: 5900, section: 'cl' },
  { name: 'Salaries payable', amt: 700, section: 'cl' },
  { name: 'Unearned revenue', amt: 2000, section: 'cl' },
  { name: 'Notes payable, long-term', amt: 12000, section: 'ltl' },
  { name: 'Common stock', amt: 18000, section: 'se' },
  { name: 'Retained earnings', amt: 21500, section: 'se' },
]

const SECTIONS = [
  { id: 'ca', label: 'Current assets', short: 'Curr. Asset' },
  { id: 'lta', label: 'Long-term assets', short: 'LT Asset' },
  { id: 'cl', label: 'Current liabilities', short: 'Curr. Liab' },
  { id: 'ltl', label: 'Long-term liabilities', short: 'LT Liab' },
  { id: 'se', label: 'Stockholders’ equity', short: 'Equity' },
]

const SECTION_HINTS = {
  Cash: 'Owned, and about as liquid as it gets. Assets the company will use or convert within a year are CURRENT.',
  'Accounts receivable': 'Customers owe this and will normally pay within 30 to 60 days — comfortably inside one year.',
  Inventories: 'Goods held for sale. A business expects to sell these within the operating cycle.',
  'Prepaid insurance': 'Coverage already paid for. It is an asset, and it will be used up within the coming year.',
  Land: 'Owned and used for years, not sold within twelve months. Which asset group does that put it in?',
  Equipment: 'A long-lived operational asset — property, plant and equipment.',
  'Accumulated depreciation': 'A contra-asset with a credit balance. It is shown as a SUBTRACTION inside the same group as the asset it offsets. Which group is Equipment in?',
  Patents: 'An intangible long-lived asset. Not converted to cash within a year.',
  'Accounts payable': 'Owed to suppliers, normally due in 30 to 60 days. Debts due within one year are CURRENT.',
  'Salaries payable': 'Wages already earned by employees and payable on the next payday — very short term.',
  'Unearned revenue': 'An obligation to deliver work, and the name of the contract tells you it is within the year. Still a liability.',
  'Notes payable, long-term': 'The name tells you the term. Debts NOT due within one year go in a separate group.',
  'Common stock': 'The owners’ investment. Not a debt at all — which section holds the owners’ claim?',
  'Retained earnings': 'Accumulated profit kept in the business. Same section as common stock.',
}

const sum = ids => BS.filter(a => ids.includes(a.section)).reduce((s, a) => s + a.amt, 0)
const TOTAL_CA = sum(['ca'])
const TOTAL_LTA = sum(['lta'])
const TOTAL_ASSETS = TOTAL_CA + TOTAL_LTA
const TOTAL_CL = sum(['cl'])
const TOTAL_LIAB = TOTAL_CL + sum(['ltl'])
const TOTAL_SE = sum(['se'])
const WORKING_CAPITAL = TOTAL_CA - TOTAL_CL
const CURRENT_RATIO = TOTAL_CA / TOTAL_CL

function parseAmount(raw) {
  const c = String(raw).replace(/[^0-9.]/g, '')
  return c === '' ? null : Number(c)
}

export default function Level17() {
  const navigate = useNavigate()
  const { completeLevel, recordTask } = useProgress()
  const [phase, setPhase] = useState('learn')
  const [step, setStep] = useState(1)
  const [placed, setPlaced] = useState({})
  const [checked1, setChecked1] = useState(false)
  const [totals, setTotals] = useState({ ca: '', ta: '', tl: '', se: '' })
  const [checked2, setChecked2] = useState(false)
  const [ratios, setRatios] = useState({ wc: '', cr: '' })
  const [checked3, setChecked3] = useState(false)
  const [done, setDone] = useState(false)
  const hints = useHints()

  const placeCorrect = BS.filter(a => placed[a.name] === a.section).length
  const totalDefs = [
    { k: 'ca', label: 'Total current assets', ans: TOTAL_CA, hint: 'Add the four assets you marked current. Do not include land, equipment or patents.' },
    { k: 'ta', label: 'Total assets', ans: TOTAL_ASSETS, hint: 'Current assets plus long-term assets. Remember accumulated depreciation SUBTRACTS $7,600 rather than adding.' },
    { k: 'tl', label: 'Total liabilities', ans: TOTAL_LIAB, hint: 'Both liability groups together — the three current ones plus the long-term note.' },
    { k: 'se', label: 'Total stockholders’ equity', ans: TOTAL_SE, hint: 'Common stock plus retained earnings. The retained earnings figure came off the statement you prepared in Level 16.' },
  ]
  const totalsCorrect = totalDefs.filter(f => parseAmount(totals[f.k]) === f.ans).length
  const wcRight = parseAmount(ratios.wc) === WORKING_CAPITAL
  const crRight = Math.abs((parseAmount(ratios.cr) ?? -99) - CURRENT_RATIO) < 0.06
  const ratiosCorrect = (wcRight ? 1 : 0) + (crRight ? 1 : 0)

  const maxPoints = BS.length + totalDefs.length + 2
  const earned = placeCorrect + totalsCorrect + ratiosCorrect

  function restart() {
    setStep(1); setPlaced({}); setChecked1(false); setTotals({ ca: '', ta: '', tl: '', se: '' })
    setChecked2(false); setRatios({ wc: '', cr: '' }); setChecked3(false); setDone(false); hints.reset()
  }

  if (phase === 'learn') {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <div className="text-sm text-cyan-400 font-semibold mb-1">Level 17</div>
          <h1 className="text-3xl font-extrabold text-white mb-2">The Classified Balance Sheet</h1>
          <p className="text-slate-400">A plain balance sheet lists accounts. A classified one groups them — and that grouping is what lets anyone judge whether the company can pay its bills.</p>
        </div>

        <div className="rounded-2xl border border-cyan-500/30 bg-cyan-500/10 p-5 mb-6">
          <p className="text-xs font-bold uppercase tracking-wider text-cyan-300 mb-2">The dividing line: one year</p>
          <p className="text-sm text-slate-300 mb-3">
            <span className="text-white font-semibold">Current</span> means it will be used, converted to cash, or come due <span className="text-white font-semibold">within one year</span>. Everything else is long-term.
            That single test sorts both the assets and the liabilities.
          </p>
          <div className="space-y-2">
            {[
              { t: 'Current assets', d: 'Cash, accounts receivable, inventories, supplies, prepaid expenses. Listed in order of liquidity — cash first.' },
              { t: 'Long-term assets', d: 'Property, plant and equipment (land, buildings, equipment), intangibles like patents. Accumulated depreciation is shown here as a subtraction.' },
              { t: 'Current liabilities', d: 'Accounts payable, salaries payable, unearned revenue, short-term notes — anything due within a year.' },
              { t: 'Long-term liabilities', d: 'Notes and bonds payable not due within a year.' },
              { t: 'Stockholders’ equity', d: 'Common stock and retained earnings.' },
            ].map((s, i) => (
              <div key={i} className="rounded-xl bg-black/20 p-3">
                <p className="font-bold text-white text-sm">{s.t}</p>
                <p className="text-xs text-slate-400">{s.d}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl bg-white/5 border border-white/10 p-5 mb-6">
          <h3 className="font-bold text-white mb-2">Why the grouping matters: liquidity</h3>
          <p className="text-sm text-slate-300 mb-4">
            Once current assets and current liabilities are separated, two measures fall straight out. Both answer the same question — can this company pay what is coming due?
          </p>
          <div className="space-y-3">
            <div className="rounded-lg bg-cyan-500/10 border border-cyan-500/30 p-4">
              <p className="text-sm font-bold text-white mb-1">Working capital</p>
              <p className="font-mono text-cyan-200 text-sm mb-1">Current Assets − Current Liabilities</p>
              <p className="text-xs text-slate-400">A dollar amount. Positive means there is a cushion to cover what is due this year.</p>
            </div>
            <div className="rounded-lg bg-cyan-500/10 border border-cyan-500/30 p-4">
              <p className="text-sm font-bold text-white mb-1">Current ratio</p>
              <p className="font-mono text-cyan-200 text-sm mb-1">Current Assets ÷ Current Liabilities</p>
              <p className="text-xs text-slate-400">
                A ratio, so it can compare companies of different sizes. Below 1.00 is a warning sign — current liabilities are outpacing current assets.
              </p>
            </div>
          </div>
          <p className="text-xs text-slate-400 mt-3">
            Same two inputs, two different uses: working capital tells you the size of the cushion in dollars, the current ratio lets you compare one company against another.
          </p>
        </div>

        <div className="rounded-xl bg-white/5 border border-white/10 p-5 mb-6">
          <h3 className="font-bold text-white mb-2">Two things that trip people up</h3>
          <p className="text-sm text-slate-300 mb-2">
            <span className="text-white font-semibold">Accumulated depreciation</span> is not a liability. It sits in the long-term asset group as a subtraction from the asset it offsets, and cost minus accumulated depreciation is the book value.
          </p>
          <p className="text-sm text-slate-300">
            <span className="text-white font-semibold">Unearned revenue</span> is not revenue. Cash was collected, work is still owed, so it is a current liability.
          </p>
        </div>

        <button onClick={() => setPhase('play')} className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-600 to-sky-600 text-white font-bold text-lg hover:opacity-90">
          Build a classified balance sheet →
        </button>
        <button onClick={() => { completeLevel(17); navigate('/') }} className="w-full mt-3 py-2.5 rounded-xl text-sm text-slate-400 hover:text-white hover:bg-white/5">
          Skip the practice — mark this lesson read
        </button>
      </div>
    )
  }

  if (done) {
    const pct = Math.round((earned / maxPoints) * 100)
    let last = null
    return (
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-6">
          <div className="text-5xl mb-4">{pct === 100 ? '🎉' : '🧾'}</div>
          <h2 className="text-3xl font-extrabold text-white mb-2">Balance Sheet Complete</h2>
          <p className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-sky-400 mb-2">{pct}%</p>
          <p className="text-slate-400 text-sm">
            Sections {placeCorrect}/{BS.length} · Totals {totalsCorrect}/{totalDefs.length} · Ratios {ratiosCorrect}/2
          </p>
          {hints.usedCount > 0 && <p className="text-xs text-slate-500 mt-2">{hintTally(hints.usedCount)}</p>}
        </div>

        <div className="rounded-xl border border-white/10 overflow-hidden mb-4">
          <div className="bg-slate-800 px-4 py-3 text-center">
            <p className="font-bold text-white">Lakeside Outfitters, Inc.</p>
            <p className="text-sm text-slate-300">Balance Sheet</p>
            <p className="text-xs text-slate-500">December 31, 2025</p>
          </div>
          <div className="px-4 py-2">
            {BS.map(a => {
              const header = a.section !== last ? SECTIONS.find(s => s.id === a.section).label : null
              last = a.section
              return (
                <div key={a.name}>
                  {header && <p className="text-[10px] font-bold uppercase tracking-wider text-cyan-300 mt-3 mb-1">{header}</p>}
                  <div className="flex justify-between text-sm py-0.5">
                    <span className="text-slate-300">{a.name}</span>
                    <span className="font-mono text-slate-200">{a.amt < 0 ? `(${Math.abs(a.amt).toLocaleString()})` : money(a.amt)}</span>
                  </div>
                </div>
              )
            })}
            <div className="flex justify-between text-sm py-2 border-t-2 border-white/20 mt-3 font-bold">
              <span className="text-white">Total assets</span><span className="font-mono text-green-400">{money(TOTAL_ASSETS)}</span>
            </div>
            <div className="flex justify-between text-sm py-1 font-bold">
              <span className="text-white">Total liabilities + equity</span><span className="font-mono text-green-400">{money(TOTAL_LIAB + TOTAL_SE)}</span>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-cyan-500/10 border border-cyan-500/20 p-5 mb-6">
          <p className="font-bold text-white mb-2">What it says about Lakeside</p>
          <ul className="text-sm text-slate-300 space-y-1">
            <li>• Working capital: {money(TOTAL_CA)} − {money(TOTAL_CL)} = <span className="text-white font-semibold">{money(WORKING_CAPITAL)}</span> of cushion</li>
            <li>• Current ratio: {money(TOTAL_CA)} ÷ {money(TOTAL_CL)} = <span className="text-white font-semibold">{CURRENT_RATIO.toFixed(2)}</span> — comfortably above 1.00</li>
            <li>• The equation holds: {money(TOTAL_ASSETS)} = {money(TOTAL_LIAB)} + {money(TOTAL_SE)}</li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button onClick={restart} className="flex-1 py-3 rounded-xl bg-white/10 text-white font-semibold hover:bg-white/20">Try Again</button>
          <button onClick={() => setPhase('learn')} className="flex-1 py-3 rounded-xl bg-white/10 text-white font-semibold hover:bg-white/20">Review Lesson</button>
          <button onClick={() => navigate('/exam')} className="flex-1 py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-sky-600 text-white font-bold hover:opacity-90">Practice Exam →</button>
        </div>
      </div>
    )
  }

  const StepHeader = ({ title }) => (
    <div className="flex items-center justify-between mb-5">
      <div>
        <div className="text-sm text-cyan-400 font-semibold">Level 17 — Step {step} of 3</div>
        <h1 className="text-xl font-extrabold text-white">{title}</h1>
      </div>
      <div className="flex gap-1">
        {[1, 2, 3].map(s => <div key={s} className={`w-2.5 h-2.5 rounded-full ${s < step ? 'bg-green-500' : s === step ? 'bg-cyan-500' : 'bg-slate-700'}`} />)}
      </div>
    </div>
  )

  if (step === 1) {
    const allPlaced = BS.every(a => placed[a.name])
    return (
      <div className="max-w-2xl mx-auto">
        <StepHeader title="Sort each account into its section" />
        <p className="text-sm text-slate-400 mb-4">
          Lakeside Outfitters’ balances at December 31. The test is always the same: will it be used, collected or come due within one year?
        </p>
        <div className="rounded-xl border border-white/10 overflow-hidden mb-5">
          {BS.map((a, i) => {
            const pick = placed[a.name]
            const wrong = checked1 && pick !== a.section
            return (
              <div key={a.name} className={`px-3 py-2 ${i ? 'border-t border-white/5' : ''} ${wrong ? 'bg-red-900/20' : ''}`}>
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white truncate">{a.name}</p>
                    <p className="text-xs text-slate-500 font-mono">{a.amt < 0 ? `(${Math.abs(a.amt).toLocaleString()})` : money(a.amt)}</p>
                  </div>
                  {!checked1 && <HintToggle open={hints.isOpen(a.name)} onClick={() => hints.toggle(a.name)} label={a.name} />}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {SECTIONS.map(sec => {
                    const isAnswer = checked1 && a.section === sec.id
                    return (
                      <button key={sec.id} onClick={() => !checked1 && setPlaced(p => ({ ...p, [a.name]: sec.id }))} disabled={checked1}
                        className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase border transition-colors ${
                          isAnswer ? 'border-green-500 bg-green-900/40 text-green-300'
                            : pick === sec.id ? 'border-cyan-500 bg-cyan-900/30 text-white'
                            : 'border-slate-600 bg-slate-800 text-slate-400 hover:border-cyan-400'}`}>
                        {sec.short}
                      </button>
                    )
                  })}
                </div>
                {!checked1 && hints.isOpen(a.name) && <HintPanel className="mt-2">{SECTION_HINTS[a.name]}</HintPanel>}
              </div>
            )
          })}
        </div>
        {checked1 && (
          <div className={`rounded-xl p-4 mb-5 ${placeCorrect === BS.length ? 'bg-green-900/30 border border-green-700' : 'bg-amber-900/30 border border-amber-700'}`}>
            <p className="font-bold text-white">{placeCorrect} of {BS.length} correct</p>
            <p className="text-sm text-slate-300 mt-1">Accumulated depreciation belongs with the long-term ASSETS as a subtraction — never with the liabilities. Unearned revenue is a current liability despite its name.</p>
          </div>
        )}
        {!checked1 ? (
          <button onClick={() => {
            setChecked1(true)
            BS.forEach(a => recordTask(`L17-sec-${a.name}`, placed[a.name] === a.section, `Balance sheet section — ${a.name}`, 17))
          }} disabled={!allPlaced}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-sky-600 text-white font-bold disabled:opacity-40 hover:opacity-90">
            {allPlaced ? 'Check My Sections' : 'Place every account'}
          </button>
        ) : (
          <button onClick={() => setStep(2)} className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-sky-600 text-white font-bold hover:opacity-90">
            Step 2: Total the sections →
          </button>
        )}
      </div>
    )
  }

  if (step === 2) {
    const filled = totalDefs.every(f => parseAmount(totals[f.k]) !== null)
    return (
      <div className="max-w-2xl mx-auto">
        <StepHeader title="Total the balance sheet" />
        <div className="rounded-xl border border-white/10 overflow-hidden mb-5">
          <div className="grid grid-cols-[1fr_7rem] bg-slate-800 text-[10px] font-bold text-slate-400 uppercase tracking-wider px-4 py-2">
            <span>Account</span><span className="text-right">Amount</span>
          </div>
          {BS.map(a => (
            <div key={a.name} className="grid grid-cols-[1fr_7rem] px-4 py-1 text-sm border-t border-white/5">
              <span className="text-white">{a.name} <span className="text-[10px] text-slate-500 uppercase">({SECTIONS.find(s => s.id === a.section).short})</span></span>
              <span className="text-right font-mono text-slate-200">{a.amt < 0 ? `(${Math.abs(a.amt).toLocaleString()})` : money(a.amt)}</span>
            </div>
          ))}
        </div>
        <div className="space-y-3 mb-5">
          {totalDefs.map(f => {
            const v = parseAmount(totals[f.k])
            const ok = checked2 && v === f.ans
            const bad = checked2 && v !== f.ans
            return (
              <div key={f.k} className={`rounded-xl border p-4 ${ok ? 'border-green-600 bg-green-900/15' : bad ? 'border-red-600 bg-red-900/15' : 'border-white/10 bg-white/5'}`}>
                <p className="text-sm font-semibold text-white mb-2">{f.label}</p>
                {!checked2 && <HintBar open={hints.isOpen(f.k)} onToggle={() => hints.toggle(f.k)} text={f.hint} className="mb-2" />}
                <div className="flex gap-2">
                  <span className="flex items-center px-3 rounded-lg bg-slate-800 border border-slate-600 text-slate-400 font-mono">$</span>
                  <input inputMode="numeric" value={totals[f.k]} onChange={e => !checked2 && setTotals(p => ({ ...p, [f.k]: e.target.value }))} disabled={checked2}
                    placeholder="0" className={`flex-1 rounded-lg border bg-slate-800 px-3 py-2 font-mono text-right text-white outline-none focus:ring-1 focus:ring-cyan-500 disabled:opacity-70 ${checked2 ? (ok ? 'border-green-500' : 'border-red-500') : 'border-slate-600'}`} />
                </div>
                {checked2 && !ok && <p className="text-xs text-amber-300 mt-2">The correct amount is {money(f.ans)}.</p>}
              </div>
            )
          })}
        </div>
        {checked2 && (
          <div className="rounded-xl bg-slate-900/60 border border-white/10 p-4 mb-5">
            <p className="text-sm text-slate-300">
              Check the equation: total assets {money(TOTAL_ASSETS)} = liabilities {money(TOTAL_LIAB)} + equity {money(TOTAL_SE)}. If yours does not balance, the usual culprit is adding accumulated depreciation instead of subtracting it.
            </p>
          </div>
        )}
        {!checked2 ? (
          <button onClick={() => {
            setChecked2(true)
            totalDefs.forEach(f => recordTask(`L17-total-${f.k}`, parseAmount(totals[f.k]) === f.ans, f.label, 17))
          }} disabled={!filled}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-sky-600 text-white font-bold disabled:opacity-40 hover:opacity-90">
            {filled ? 'Check My Totals' : 'Fill in all four'}
          </button>
        ) : (
          <button onClick={() => setStep(3)} className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-sky-600 text-white font-bold hover:opacity-90">
            Step 3: Liquidity →
          </button>
        )}
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <StepHeader title="Measure the liquidity" />
      <div className="rounded-xl bg-sky-500/10 border border-sky-500/20 p-5 mb-5">
        <p className="text-sm text-slate-300">
          Current assets <span className="font-mono text-white">{money(TOTAL_CA)}</span> · Current liabilities <span className="font-mono text-white">{money(TOTAL_CL)}</span>
        </p>
      </div>
      <div className="space-y-3 mb-5">
        {[
          { k: 'wc', label: 'Working capital', unit: '$', ok: wcRight, ans: money(WORKING_CAPITAL), hint: 'Working capital is a SUBTRACTION and the answer is a dollar amount: current assets minus current liabilities.' },
          { k: 'cr', label: 'Current ratio (to 2 decimals)', unit: '', ok: crRight, ans: CURRENT_RATIO.toFixed(2), hint: 'The current ratio is a DIVISION, not a subtraction: current assets divided by current liabilities. The answer is a plain number, not dollars.' },
        ].map(f => (
          <div key={f.k} className={`rounded-xl border p-4 ${checked3 ? (f.ok ? 'border-green-600 bg-green-900/15' : 'border-red-600 bg-red-900/15') : 'border-white/10 bg-white/5'}`}>
            <p className="text-sm font-semibold text-white mb-2">{f.label}</p>
            {!checked3 && <HintBar open={hints.isOpen(f.k)} onToggle={() => hints.toggle(f.k)} text={f.hint} className="mb-2" />}
            <div className="flex gap-2">
              {f.unit && <span className="flex items-center px-3 rounded-lg bg-slate-800 border border-slate-600 text-slate-400 font-mono">{f.unit}</span>}
              <input inputMode="decimal" value={ratios[f.k]} onChange={e => !checked3 && setRatios(p => ({ ...p, [f.k]: e.target.value }))} disabled={checked3}
                placeholder="0" className={`flex-1 rounded-lg border bg-slate-800 px-3 py-2 font-mono text-right text-white outline-none focus:ring-1 focus:ring-cyan-500 disabled:opacity-70 ${checked3 ? (f.ok ? 'border-green-500' : 'border-red-500') : 'border-slate-600'}`} />
            </div>
            {checked3 && !f.ok && <p className="text-xs text-amber-300 mt-2">The answer is {f.ans}.</p>}
          </div>
        ))}
      </div>
      {checked3 && (
        <div className="rounded-xl bg-slate-900/60 border border-white/10 p-4 mb-5">
          <p className="text-sm text-slate-300">
            {money(TOTAL_CA)} − {money(TOTAL_CL)} = <span className="text-white font-semibold">{money(WORKING_CAPITAL)}</span> of working capital, and
            {' '}{money(TOTAL_CA)} ÷ {money(TOTAL_CL)} = <span className="text-white font-semibold">{CURRENT_RATIO.toFixed(2)}</span>.
            A ratio of {CURRENT_RATIO.toFixed(2)} means Lakeside holds {CURRENT_RATIO.toFixed(2)} of current assets for every $1 coming due this year.
          </p>
        </div>
      )}
      {!checked3 ? (
        <button onClick={() => {
          setChecked3(true)
          recordTask('L17-wc', wcRight, 'Working capital', 17)
          recordTask('L17-cr', crRight, 'Current ratio', 17)
        }} disabled={parseAmount(ratios.wc) === null || parseAmount(ratios.cr) === null}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-sky-600 text-white font-bold disabled:opacity-40 hover:opacity-90">
          Check My Answers
        </button>
      ) : (
        <button onClick={() => { completeLevel(17, Math.round((earned / maxPoints) * 100)); setDone(true) }}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-sky-600 text-white font-bold hover:opacity-90">
          See My Results →
        </button>
      )}
    </div>
  )
}

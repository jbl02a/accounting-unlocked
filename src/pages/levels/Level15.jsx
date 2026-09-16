import { useState } from 'react'
import { useScrollTop } from '../../lib/useScrollTop'
import { useNavigate } from 'react-router-dom'
import { useProgress } from '../../context/ProgressContext'
import EntryTable, { money } from '../../components/EntryTable'
import { useHints, HintToggle, HintPanel, HintBar, hintTally } from '../../components/Hint'

// Harbor Point Marine — a balanced adjusted trial balance ($489,200 each side),
// parallel in structure to the assigned closing-entries problem.
const ATB = [
  { name: 'Cash', dr: 94250, kind: 'permanent' },
  { name: 'Accounts Receivable', dr: 138400, kind: 'permanent' },
  { name: 'Supplies', dr: 2100, kind: 'permanent' },
  { name: 'Prepaid Insurance', dr: 3600, kind: 'permanent' },
  { name: 'Equipment', dr: 86000, kind: 'permanent' },
  { name: 'Accumulated Depreciation', cr: 19500, kind: 'permanent' },
  { name: 'Accounts Payable', cr: 11340, kind: 'permanent' },
  { name: 'Salaries Payable', cr: 6800, kind: 'permanent' },
  { name: 'Utilities Payable', cr: 1260, kind: 'permanent' },
  { name: 'Unearned Revenue', cr: 24000, kind: 'permanent' },
  { name: 'Notes Payable', cr: 60000, kind: 'permanent' },
  { name: 'Common Stock', cr: 120000, kind: 'permanent' },
  { name: 'Retained Earnings', cr: 58900, kind: 'permanent' },
  { name: 'Dividends', dr: 9000, kind: 'temporary' },
  { name: 'Service Revenue', cr: 187400, kind: 'temporary' },
  { name: 'Salaries Expense', dr: 92600, kind: 'temporary' },
  { name: 'Rent Expense', dr: 24000, kind: 'temporary' },
  { name: 'Utilities Expense', dr: 8450, kind: 'temporary' },
  { name: 'Insurance Expense', dr: 4800, kind: 'temporary' },
  { name: 'Depreciation Expense', dr: 9750, kind: 'temporary' },
  { name: 'Supplies Expense', dr: 16250, kind: 'temporary' },
]

const TB_TOTAL = ATB.reduce((s, a) => s + (a.dr || 0), 0)
const REVENUE = 187400
const EXPENSES = ATB.filter(a => a.kind === 'temporary' && a.dr && a.name !== 'Dividends').reduce((s, a) => s + a.dr, 0)
const DIVIDENDS = 9000
const NET_INCOME = REVENUE - EXPENSES
const BEGIN_RE = 58900
const END_RE = BEGIN_RE + NET_INCOME - DIVIDENDS

const CLASSIFY_SET = [
  'Cash', 'Service Revenue', 'Retained Earnings', 'Salaries Expense',
  'Dividends', 'Accounts Payable', 'Supplies Expense', 'Common Stock',
]

const KIND_HINTS = {
  Cash: 'Does the company still have this on January 1 of next year? If a balance carries forward, it is permanent.',
  'Service Revenue': 'Next year starts a brand new income statement. Should this account still hold this year’s figure?',
  'Retained Earnings': 'This is the account everything else closes INTO. It accumulates across years rather than resetting.',
  'Salaries Expense': 'Every expense measures one period only — next year needs a fresh start at zero.',
  Dividends: 'It is in the equity family, but it measures only this year’s distributions. Does that reset?',
  'Accounts Payable': 'If the company still owes this money on January 1, the balance has to survive the closing process.',
  'Supplies Expense': 'Any account with "Expense" in its name is measuring a single period.',
  'Common Stock': 'The owners’ investment does not evaporate at year end — it stays on the balance sheet.',
}

function parseAmount(raw) {
  const c = String(raw).replace(/[^0-9.]/g, '')
  return c === '' ? null : Number(c)
}

export default function Level15() {
  const navigate = useNavigate()
  const { completeLevel, recordTask } = useProgress()
  const [phase, setPhase] = useState('learn')
  const [step, setStep] = useState(1)
  const [kinds, setKinds] = useState({})
  const [checked1, setChecked1] = useState(false)
  const [ce, setCe] = useState({ rev: '', exp: '', div: '' })
  const [checked2, setChecked2] = useState(false)
  const [endRe, setEndRe] = useState('')
  const [postClosing, setPostClosing] = useState({})
  const [checked3, setChecked3] = useState(false)
  const [done, setDone] = useState(false)
  useScrollTop([phase])
  const hints = useHints()

  const kindCorrect = CLASSIFY_SET.filter(n => kinds[n] === ATB.find(a => a.name === n).kind).length
  const ceCorrect = (parseAmount(ce.rev) === REVENUE ? 1 : 0) + (parseAmount(ce.exp) === EXPENSES ? 1 : 0) + (parseAmount(ce.div) === DIVIDENDS ? 1 : 0)
  const reRight = parseAmount(endRe) === END_RE
  const pcSet = ['Cash', 'Service Revenue', 'Dividends', 'Notes Payable', 'Salaries Expense', 'Common Stock']
  const pcCorrect = pcSet.filter(n => {
    const shouldAppear = ATB.find(a => a.name === n).kind === 'permanent'
    return postClosing[n] === (shouldAppear ? 'yes' : 'no')
  }).length

  const maxPoints = CLASSIFY_SET.length + 3 + 1 + pcSet.length
  const earned = kindCorrect + ceCorrect + (reRight ? 1 : 0) + pcCorrect

  function restart() {
    setStep(1); setKinds({}); setChecked1(false); setCe({ rev: '', exp: '', div: '' }); setChecked2(false)
    setEndRe(''); setPostClosing({}); setChecked3(false); setDone(false); hints.reset()
  }

  if (phase === 'learn') {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <div className="text-sm text-rose-400 font-semibold mb-1">Level 15</div>
          <h1 className="text-3xl font-extrabold text-white mb-2">Closing Entries</h1>
          <p className="text-dim">The last step of the cycle. Revenue, expenses and dividends measured THIS year — so before next year starts, they get emptied into Retained Earnings.</p>
        </div>

        <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 p-5 mb-6">
          <p className="text-xs font-bold uppercase tracking-wider text-rose-300 mb-3">Permanent vs. temporary</p>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="rounded-xl bg-black/20 p-4">
              <p className="font-bold text-white text-sm mb-1">Permanent (real)</p>
              <p className="text-xs text-dim mb-2">Balances carry forward into next year.</p>
              <p className="text-sm text-slate-300">Assets · Liabilities · Common Stock · <span className="text-white font-semibold">Retained Earnings</span></p>
              <p className="text-[11px] text-dim mt-2">Everything on the balance sheet.</p>
            </div>
            <div className="rounded-xl bg-black/20 p-4">
              <p className="font-bold text-white text-sm mb-1">Temporary (nominal)</p>
              <p className="text-xs text-dim mb-2">Reset to ZERO so next year starts fresh.</p>
              <p className="text-sm text-slate-300">Revenues · Expenses · <span className="text-white font-semibold">Dividends</span></p>
              <p className="text-[11px] text-dim mt-2">The income statement — plus Dividends.</p>
            </div>
          </div>
          <p className="text-sm text-slate-300 mt-3">
            Dividends is the one to watch: it lives in the equity family but it is <span className="text-white font-semibold">temporary</span>, because it measures only this year’s distributions.
          </p>
        </div>

        <div className="rounded-xl bg-white/5 border border-white/10 p-5 mb-6">
          <h3 className="font-bold text-white mb-3">The three closing entries</h3>
          <div className="space-y-3">
            <div>
              <p className="text-sm font-semibold text-rose-300 mb-1">1. Close revenues</p>
              <p className="text-xs text-dim mb-2">Revenue has a credit balance, so DEBIT it to zero it out.</p>
              <EntryTable lines={[{ account: 'Service Revenue', dr: 187400 }, { account: 'Retained Earnings', cr: 187400 }]} dense />
            </div>
            <div>
              <p className="text-sm font-semibold text-rose-300 mb-1">2. Close expenses</p>
              <p className="text-xs text-dim mb-2">Expenses have debit balances, so CREDIT them. One line each; Retained Earnings takes the total.</p>
              <EntryTable lines={[
                { account: 'Retained Earnings', dr: EXPENSES },
                { account: 'Salaries Expense', cr: 92600 },
                { account: 'Rent Expense', cr: 24000 },
                { account: 'Utilities Expense', cr: 8450 },
                { account: 'Insurance Expense', cr: 4800 },
                { account: 'Depreciation Expense', cr: 9750 },
                { account: 'Supplies Expense', cr: 16250 },
              ]} dense />
            </div>
            <div>
              <p className="text-sm font-semibold text-rose-300 mb-1">3. Close dividends</p>
              <p className="text-xs text-dim mb-2">Dividends has a debit balance, so CREDIT it. Never route dividends through income — they are not an expense.</p>
              <EntryTable lines={[{ account: 'Retained Earnings', dr: 9000 }, { account: 'Dividends', cr: 9000 }]} dense />
            </div>
          </div>
          <div className="mt-4 rounded-lg bg-slate-900/60 border border-white/10 p-3">
            <p className="text-xs text-dim">
              <span className="text-white font-semibold">Note:</span> some textbooks route revenues and expenses through an <span className="text-white">Income Summary</span> account first,
              then close Income Summary to Retained Earnings — that version has four entries instead of three. The result is identical. Follow whichever your worksheet asks for.
            </p>
          </div>
        </div>

        <div className="rounded-xl bg-white/5 border border-white/10 p-5 mb-6">
          <h3 className="font-bold text-white mb-2">Where Retained Earnings ends up</h3>
          <div className="rounded-lg bg-rose-500/10 border border-rose-500/30 p-4 text-center mb-3">
            <p className="text-white font-mono font-bold">Beginning R/E + Net Income − Dividends = Ending R/E</p>
          </div>
          <p className="text-sm text-slate-300">
            The three closing entries do exactly that in journal form: revenue in, expenses out, dividends out. After they post, every temporary account reads zero.
          </p>
        </div>

        <div className="rounded-xl bg-white/5 border border-white/10 p-5 mb-6">
          <h3 className="font-bold text-white mb-2">The post-closing trial balance</h3>
          <p className="text-sm text-slate-300 mb-2">
            The final proof. It lists <span className="text-white font-semibold">only permanent accounts</span> and shows that debits still equal credits for everything carrying into next year.
          </p>
          <p className="text-xs text-dim">
            If any revenue, expense or dividend account still shows a balance on it, a closing entry was missed. Retained Earnings appears at its NEW ending balance.
          </p>
        </div>

        <button onClick={() => setPhase('play')} className="w-full py-4 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 text-white font-bold text-lg hover:opacity-90">
          Close the books in 3 steps →
        </button>
        <button onClick={() => { completeLevel(15); navigate('/') }} className="w-full mt-3 py-2.5 rounded-xl text-sm text-dim hover:text-white hover:bg-white/5">
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
          <div className="text-5xl mb-4">{pct === 100 ? '🏆' : '🔒'}</div>
          <h2 className="text-3xl font-extrabold text-white mb-2">Books Closed</h2>
          <p className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-pink-400 mb-2">{pct}%</p>
          <p className="text-dim text-sm">
            Temporary vs permanent {kindCorrect}/{CLASSIFY_SET.length} · Closing entries {ceCorrect}/3 · Ending R/E {reRight ? 1 : 0}/1 · Post-closing {pcCorrect}/{pcSet.length}
          </p>
          {hints.usedCount > 0 && <p className="text-xs text-dim mt-2">{hintTally(hints.usedCount)}</p>}
        </div>

        <div className="rounded-xl bg-rose-500/10 border border-rose-500/20 p-5 mb-6">
          <p className="font-bold text-white mb-2">Harbor Point Marine — the year in four numbers</p>
          <ul className="text-sm text-slate-300 space-y-1">
            <li>• Revenue {money(REVENUE)} − Expenses {money(EXPENSES)} = <span className="text-white font-semibold">Net income {money(NET_INCOME)}</span></li>
            <li>• Beginning R/E {money(BEGIN_RE)} + {money(NET_INCOME)} − {money(DIVIDENDS)} dividends = <span className="text-white font-semibold">Ending R/E {money(END_RE)}</span></li>
            <li>• Every revenue, expense and dividend account now reads <span className="text-white font-semibold">zero</span></li>
            <li>• The post-closing trial balance carries only the {ATB.filter(a => a.kind === 'permanent').length} permanent accounts forward</li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button onClick={restart} className="flex-1 py-3 rounded-xl bg-white/10 text-white font-semibold hover:bg-white/20">Try Again</button>
          <button onClick={() => setPhase('learn')} className="flex-1 py-3 rounded-xl bg-white/10 text-white font-semibold hover:bg-white/20">Review Lesson</button>
          <button onClick={() => navigate('/exam')} className="flex-1 py-3 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 text-white font-bold hover:opacity-90">Practice Exam →</button>
        </div>
      </div>
    )
  }

  const StepHeader = ({ title }) => (
    <div className="flex items-center justify-between mb-5">
      <div>
        <div className="text-sm text-rose-400 font-semibold">Level 15 — Step {step} of 3</div>
        <h1 className="text-xl font-extrabold text-white">{title}</h1>
      </div>
      <div className="flex gap-1">
        {[1, 2, 3].map(s => <div key={s} className={`w-2.5 h-2.5 rounded-full ${s < step ? 'bg-green-500' : s === step ? 'bg-rose-500' : 'bg-slate-700'}`} />)}
      </div>
    </div>
  )

  const AdjustedTB = () => (
    <div className="rounded-xl border border-white/10 overflow-hidden mb-5">
      <div className="bg-slate-800 px-4 py-3 text-center">
        <p className="font-bold text-white">Harbor Point Marine, Inc.</p>
        <p className="text-sm text-slate-300">Adjusted Trial Balance</p>
        <p className="text-xs text-dim">December 31, 2025</p>
      </div>
      <div className="grid grid-cols-[1fr_6.5rem_6.5rem] bg-slate-800/60 text-[10px] font-bold text-dim uppercase tracking-wider px-4 py-1.5">
        <span>Account</span><span className="text-right">Debit</span><span className="text-right">Credit</span>
      </div>
      {ATB.map(a => (
        <div key={a.name} className={`grid grid-cols-[1fr_6.5rem_6.5rem] px-4 py-1 text-sm border-t border-white/5 ${a.kind === 'temporary' ? 'bg-rose-500/5' : ''}`}>
          <span className={a.kind === 'temporary' ? 'text-rose-200' : 'text-white'}>{a.name}</span>
          <span className="text-right font-mono text-slate-200">{a.dr ? money(a.dr) : ''}</span>
          <span className="text-right font-mono text-slate-200">{a.cr ? money(a.cr) : ''}</span>
        </div>
      ))}
      <div className="grid grid-cols-[1fr_6.5rem_6.5rem] px-4 py-2 text-sm border-t-2 border-white/20 bg-slate-800/60 font-bold">
        <span className="text-slate-300">Totals</span>
        <span className="text-right font-mono text-green-400">{money(TB_TOTAL)}</span>
        <span className="text-right font-mono text-green-400">{money(TB_TOTAL)}</span>
      </div>
    </div>
  )

  if (step === 1) {
    const allDone = CLASSIFY_SET.every(n => kinds[n])
    return (
      <div className="max-w-2xl mx-auto">
        <StepHeader title="Which accounts get closed?" />
        <p className="text-sm text-dim mb-4">
          Mark each account temporary (it gets closed to zero) or permanent (its balance carries into next year).
        </p>
        <div className="rounded-xl border border-white/10 overflow-hidden mb-5">
          {CLASSIFY_SET.map((n, i) => {
            const truth = ATB.find(a => a.name === n).kind
            const pick = kinds[n]
            const wrong = checked1 && pick !== truth
            return (
              <div key={n} className={`px-3 py-2 ${i ? 'border-t border-white/5' : ''} ${wrong ? 'bg-red-900/20' : ''}`}>
                <div className="flex items-center gap-2">
                  <span className="flex-1 text-sm text-white truncate">{n}</span>
                  {!checked1 && <HintToggle open={hints.isOpen(n)} onClick={() => hints.toggle(n)} label={n} />}
                  {['temporary', 'permanent'].map(k => {
                    const isAnswer = checked1 && truth === k
                    return (
                      <button key={k} onClick={() => !checked1 && setKinds(p => ({ ...p, [n]: k }))} disabled={checked1}
                        className={`w-24 py-1.5 rounded-lg text-[11px] font-bold uppercase border transition-colors ${
                          isAnswer ? 'border-green-500 bg-green-900/40 text-green-300'
                            : pick === k ? 'border-rose-500 bg-rose-900/30 text-white'
                            : 'border-slate-600 bg-slate-800 text-dim hover:border-rose-400'}`}>
                        {k}
                      </button>
                    )
                  })}
                </div>
                {!checked1 && hints.isOpen(n) && <HintPanel className="mt-2">{KIND_HINTS[n]}</HintPanel>}
              </div>
            )
          })}
        </div>
        {checked1 && (
          <div className={`rounded-xl p-4 mb-5 ${kindCorrect === CLASSIFY_SET.length ? 'bg-green-900/30 border border-green-700' : 'bg-amber-900/30 border border-amber-700'}`}>
            <p className="font-bold text-white">{kindCorrect} of {CLASSIFY_SET.length} correct</p>
            <p className="text-sm text-slate-300 mt-1">Temporary = revenues, expenses and dividends. Everything else — including Retained Earnings itself — is permanent.</p>
          </div>
        )}
        {!checked1 ? (
          <button onClick={() => {
            setChecked1(true)
            CLASSIFY_SET.forEach(n => recordTask(`L15-kind-${n}`, kinds[n] === ATB.find(a => a.name === n).kind, `Temporary or permanent — ${n}`, 15))
          }} disabled={!allDone}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 text-white font-bold disabled:opacity-40 hover:opacity-90">
            {allDone ? 'Check My Answers' : 'Mark every account'}
          </button>
        ) : (
          <button onClick={() => setStep(2)} className="w-full py-3 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 text-white font-bold hover:opacity-90">
            Step 2: The closing entries →
          </button>
        )}
      </div>
    )
  }

  if (step === 2) {
    const filled = ['rev', 'exp', 'div'].every(k => parseAmount(ce[k]) !== null)
    const fields = [
      { k: 'rev', label: 'Closing Entry 1 — close revenues', sub: 'Debit Service Revenue, credit Retained Earnings for…', ans: REVENUE, hint: 'There is only one revenue account on this trial balance. Read its balance straight off the statement.' },
      { k: 'exp', label: 'Closing Entry 2 — close expenses', sub: 'Debit Retained Earnings, credit each expense. Total to Retained Earnings:', ans: EXPENSES, hint: 'Add up EVERY account with "Expense" in its name — there are six. Do not include Dividends; that gets its own entry.' },
      { k: 'div', label: 'Closing Entry 3 — close dividends', sub: 'Debit Retained Earnings, credit Dividends for…', ans: DIVIDENDS, hint: 'Read the Dividends balance directly off the trial balance. No arithmetic needed.' },
    ]
    return (
      <div className="max-w-2xl mx-auto">
        <StepHeader title="Build the three closing entries" />
        <AdjustedTB />
        <div className="space-y-3 mb-5">
          {fields.map(f => {
            const v = parseAmount(ce[f.k])
            const ok = checked2 && v === f.ans
            const bad = checked2 && v !== f.ans
            return (
              <div key={f.k} className={`rounded-xl border p-4 ${ok ? 'border-green-600 bg-green-900/15' : bad ? 'border-red-600 bg-red-900/15' : 'border-white/10 bg-white/5'}`}>
                <p className="font-semibold text-white text-sm">{f.label}</p>
                <p className="text-xs text-dim mb-2">{f.sub}</p>
                {!checked2 && <HintBar open={hints.isOpen(f.k)} onToggle={() => hints.toggle(f.k)} text={f.hint} className="mb-2" />}
                <div className="flex gap-2">
                  <span className="flex items-center px-3 rounded-lg bg-slate-800 border border-slate-600 text-dim font-mono">$</span>
                  <input inputMode="numeric" value={ce[f.k]} onChange={e => !checked2 && setCe(p => ({ ...p, [f.k]: e.target.value }))} disabled={checked2}
                    placeholder="0" className={`flex-1 rounded-lg border bg-slate-800 px-3 py-2 font-mono text-right text-white outline-none focus:ring-1 focus:ring-rose-500 disabled:opacity-70 ${checked2 ? (ok ? 'border-green-500' : 'border-red-500') : 'border-slate-600'}`} />
                </div>
                {checked2 && !ok && <p className="text-xs text-amber-300 mt-2">The correct amount is {money(f.ans)}.</p>}
              </div>
            )
          })}
        </div>
        {checked2 && (
          <div className="rounded-xl bg-slate-900/60 border border-white/10 p-4 mb-5">
            <p className="text-sm text-slate-300">
              Expenses total {money(EXPENSES)} = 92,600 + 24,000 + 8,450 + 4,800 + 9,750 + 16,250. Revenue {money(REVENUE)} − expenses {money(EXPENSES)} = net income <span className="text-white font-semibold">{money(NET_INCOME)}</span>.
            </p>
          </div>
        )}
        {!checked2 ? (
          <button onClick={() => {
            setChecked2(true)
            fields.forEach(f => recordTask(`L15-close-${f.k}`, parseAmount(ce[f.k]) === f.ans, f.label, 15))
          }} disabled={!filled}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 text-white font-bold disabled:opacity-40 hover:opacity-90">
            {filled ? 'Check My Entries' : 'Fill in all three amounts'}
          </button>
        ) : (
          <button onClick={() => setStep(3)} className="w-full py-3 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 text-white font-bold hover:opacity-90">
            Step 3: After closing →
          </button>
        )}
      </div>
    )
  }

  const allPc = pcSet.every(n => postClosing[n])
  return (
    <div className="max-w-2xl mx-auto">
      <StepHeader title="After the books are closed" />

      <div className="rounded-xl border border-white/10 bg-white/5 p-4 mb-5">
        <p className="font-semibold text-white text-sm mb-1">What is Retained Earnings now?</p>
        <p className="text-xs text-dim mb-2">Beginning R/E was {money(BEGIN_RE)} on the adjusted trial balance.</p>
        {!checked3 && <HintBar open={hints.isOpen('re')} onToggle={() => hints.toggle('re')} text={`Use Beginning R/E + Net Income − Dividends. You worked out net income in step 2: revenue ${money(REVENUE)} less expenses ${money(EXPENSES)}. Then take out the dividends.`} className="mb-2" />}
        <div className="flex gap-2">
          <span className="flex items-center px-3 rounded-lg bg-slate-800 border border-slate-600 text-dim font-mono">$</span>
          <input inputMode="numeric" value={endRe} onChange={e => !checked3 && setEndRe(e.target.value)} disabled={checked3} placeholder="0"
            className={`flex-1 rounded-lg border bg-slate-800 px-3 py-2 font-mono text-right text-white outline-none focus:ring-1 focus:ring-rose-500 disabled:opacity-70 ${checked3 ? (reRight ? 'border-green-500' : 'border-red-500') : 'border-slate-600'}`} />
        </div>
        {checked3 && (
          <p className={`text-xs mt-2 ${reRight ? 'text-green-300' : 'text-amber-300'}`}>
            {money(BEGIN_RE)} + {money(NET_INCOME)} − {money(DIVIDENDS)} = <span className="font-semibold">{money(END_RE)}</span>
          </p>
        )}
      </div>

      <div className="rounded-xl border border-white/10 bg-white/5 p-4 mb-5">
        <p className="font-semibold text-white text-sm mb-1">Which accounts appear on the POST-CLOSING trial balance?</p>
        <p className="text-xs text-dim mb-3">Only permanent accounts survive closing.</p>
        <div className="space-y-2">
          {pcSet.map(n => {
            const should = ATB.find(a => a.name === n).kind === 'permanent' ? 'yes' : 'no'
            const pick = postClosing[n]
            const wrong = checked3 && pick !== should
            return (
              <div key={n} className={`flex items-center gap-2 rounded-lg px-2 py-1.5 ${wrong ? 'bg-red-900/20' : ''}`}>
                <span className="flex-1 text-sm text-white">{n}</span>
                {['yes', 'no'].map(v => {
                  const isAnswer = checked3 && should === v
                  return (
                    <button key={v} onClick={() => !checked3 && setPostClosing(p => ({ ...p, [n]: v }))} disabled={checked3}
                      className={`w-20 py-1 rounded-lg text-[11px] font-bold uppercase border transition-colors ${
                        isAnswer ? 'border-green-500 bg-green-900/40 text-green-300'
                          : pick === v ? 'border-rose-500 bg-rose-900/30 text-white'
                          : 'border-slate-600 bg-slate-800 text-dim hover:border-rose-400'}`}>
                      {v === 'yes' ? 'appears' : 'closed'}
                    </button>
                  )
                })}
              </div>
            )
          })}
        </div>
        {checked3 && (
          <p className="text-xs text-slate-300 mt-3">
            Service Revenue, Salaries Expense and Dividends were all closed to zero, so none of them appears. Cash, Notes Payable and Common Stock carry forward — as does Retained Earnings, now at {money(END_RE)}.
          </p>
        )}
      </div>

      {!checked3 ? (
        <button onClick={() => {
          setChecked3(true)
          recordTask('L15-endre', reRight, 'Ending retained earnings after closing', 15)
          pcSet.forEach(n => recordTask(`L15-pc-${n}`, postClosing[n] === (ATB.find(a => a.name === n).kind === 'permanent' ? 'yes' : 'no'), `On the post-closing trial balance? — ${n}`, 15))
        }} disabled={parseAmount(endRe) === null || !allPc}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 text-white font-bold disabled:opacity-40 hover:opacity-90">
          {parseAmount(endRe) === null || !allPc ? 'Answer both parts' : 'Check My Answers'}
        </button>
      ) : (
        <button onClick={() => { completeLevel(15, Math.round((earned / maxPoints) * 100)); setDone(true) }}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 text-white font-bold hover:opacity-90">
          See My Results →
        </button>
      )}
    </div>
  )
}

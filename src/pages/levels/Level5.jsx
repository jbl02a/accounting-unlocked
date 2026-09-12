import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useProgress } from '../../context/ProgressContext'
import { useHints, HintBar } from '../../components/Hint'

// Griffin Co. Balance Sheet
// 3 deliberate errors planted:
// ERROR 1: "Accounts Receivable" listed under Liabilities (should be Assets)
// ERROR 2: Total Assets = $47,500 but it's labeled $49,500 (arithmetic error)
// ERROR 3: "Retained Earnings" listed as negative without any explanation, making Assets ≠ L+E

const BALANCE_SHEET = {
  date: 'December 31, 2024',
  assets: {
    current: [
      { id: 'cash', label: 'Cash', amount: 12000, error: null },
      { id: 'inv', label: 'Inventory', amount: 8500, error: null },
      { id: 'prepaid', label: 'Prepaid Insurance', amount: 1200, error: null },
    ],
    fixed: [
      { id: 'equip', label: 'Equipment', amount: 22000, error: null },
      { id: 'acc_dep', label: 'Accumulated Depreciation', amount: -3500, error: null },
    ],
    totalLabel: 'Total Assets',
    // Correct total = 12000 + 8500 + 1200 + 22000 - 3500 = 40200
    // ERROR 2: wrong total shown
    total: 40200,
    displayTotal: 42700, // deliberate error
  },
  liabilities: {
    current: [
      // ERROR 1: AR on wrong side
      { id: 'ar', label: 'Accounts Receivable', amount: 2500, error: 1, errorDesc: 'Accounts Receivable is an Asset — money owed TO the company. It should appear in the Assets section, not Liabilities!' },
      { id: 'ap', label: 'Accounts Payable', amount: 5800, error: null },
      { id: 'wage', label: 'Wages Payable', amount: 1200, error: null },
    ],
    longTerm: [
      { id: 'loan', label: 'Bank Loan (Long-term)', amount: 15000, error: null },
    ],
    totalLabel: 'Total Liabilities',
    total: 22000,
  },
  equity: {
    items: [
      { id: 'stock', label: 'Common Stock', amount: 25000, error: null },
      // ERROR 3: Retained earnings is wrong causing imbalance
      { id: 're', label: 'Retained Earnings', amount: -5300, error: 3, errorDesc: 'Retained Earnings shows -$5,300, but with the correct asset total of $40,200 and total liabilities of $22,000, equity should be $18,200. This negative figure is inconsistent and causes the sheet to not balance.' },
    ],
    totalLabel: 'Total Equity',
    total: 19700,
  },
}

// The three errors for detection
const ERRORS = {
  1: {
    id: 1,
    short: 'Wrong side: Accounts Receivable under Liabilities',
    explanation: 'Accounts Receivable ($2,500) is listed under Liabilities, but it\'s actually an Asset — it\'s money that customers OWE to Griffin Co., not money Griffin Co. owes to others.',
  },
  2: {
    id: 2,
    short: 'Arithmetic error: Total Assets is wrong',
    explanation: `The displayed Total Assets is $42,700, but the correct sum is $40,200 ($12,000 + $8,500 + $1,200 + $22,000 − $3,500). Someone made a $2,500 math error — which is exactly the Accounts Receivable amount that was misplaced!`,
  },
  3: {
    id: 3,
    short: "Retained Earnings causes the sheet to not balance",
    explanation: 'With correct Total Assets of $40,200 and Total Liabilities of $22,000, Equity must equal $18,200. But the listed Retained Earnings of −$5,300 gives Equity of only $19,700. The sheet doesn\'t balance, which is a fundamental accounting error.',
  },
}

function Amount({ n }) {
  if (n < 0) return <span className="text-red-400 font-mono">({Math.abs(n).toLocaleString()})</span>
  return <span className="font-mono">${n.toLocaleString()}</span>
}

export default function Level5() {
  const navigate = useNavigate()
  const { completeLevel, recordTask } = useProgress()
  const [phase, setPhase] = useState('learn')
  const [flagged, setFlagged] = useState(new Set())
  const [submitted, setSubmitted] = useState(false)
  const [wrongFlags, setWrongFlags] = useState(new Set())
  const hints = useHints()

  // Clickable items that could be errors
  function toggleFlag(errorId) {
    if (submitted) return
    setFlagged(prev => {
      const next = new Set(prev)
      if (next.has(errorId)) next.delete(errorId)
      else next.add(errorId)
      return next
    })
  }

  function handleSubmit() {
    const wronglyFlagged = new Set()
    // Check if they flagged the "correct total" label as an error (not actually an error item)
    setSubmitted(true)
    const correctErrors = [1, 2, 3]
    correctErrors.forEach(e => recordTask(`L5-err${e}`, flagged.has(e), `Spot the error — ${ERRORS[e].short}`, 5))
    const score = Math.round((correctErrors.filter(e => flagged.has(e)).length / correctErrors.length) * 100)
    completeLevel(5, score)
  }

  const foundCount = [1, 2, 3].filter(e => flagged.has(e)).length

  const AUDIT_HINT = 'Auditors work a checklist rather than hunting at random. Run these three passes: (1) Read every account name and ask whether it is on the right SIDE — is anything filed under Liabilities actually something the company owns? (2) Ignore the printed totals and add the asset column yourself, then compare. (3) Test the equation: does Assets = Liabilities + Equity? If not, the equity section is where to look. There is one error waiting in each pass.'

  if (phase === 'learn') {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <div className="text-sm text-rose-400 font-semibold mb-1">Level 5</div>
          <h1 className="text-3xl font-extrabold text-white mb-2">Reading a Balance Sheet</h1>
          <p className="text-slate-400">A balance sheet is a financial snapshot of a company. Let's learn to read — and audit — one.</p>
        </div>

        <div className="space-y-4 mb-8">
          <div className="rounded-xl bg-white/5 border border-white/10 p-5">
            <h3 className="font-bold text-white mb-3">What's on a Balance Sheet?</h3>
            <div className="space-y-2 text-sm text-slate-300">
              <p>A balance sheet shows <span className="text-white font-semibold">Assets</span>, <span className="text-white font-semibold">Liabilities</span>, and <span className="text-white font-semibold">Equity</span> at a single point in time.</p>
              <p>It proves the accounting equation: <span className="text-indigo-400 font-semibold">Assets = Liabilities + Equity</span></p>
              <p>If those two sides don't equal each other — something is <span className="text-red-400 font-semibold">wrong</span>.</p>
            </div>
          </div>

          <div className="rounded-xl bg-white/5 border border-white/10 p-5">
            <h3 className="font-bold text-white mb-3">What to look for (red flags):</h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li className="flex gap-2"><span className="text-rose-400">🔴</span> Items on the <span className="text-white font-semibold ml-1 mr-1">wrong side</span> (an Asset listed under Liabilities, etc.)</li>
              <li className="flex gap-2"><span className="text-rose-400">🔴</span> <span className="text-white font-semibold">Math errors</span> — totals that don't match the listed items</li>
              <li className="flex gap-2"><span className="text-rose-400">🔴</span> <span className="text-white font-semibold">Imbalance</span> — Assets ≠ Liabilities + Equity</li>
              <li className="flex gap-2"><span className="text-rose-400">🔴</span> <span className="text-white font-semibold">Misclassified items</span> — current items in long-term, or vice versa</li>
            </ul>
          </div>
        </div>

        <button
          onClick={() => setPhase('audit')}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 text-white font-bold text-lg hover:opacity-90 transition-opacity"
        >
          Start the Audit — Find 3 Errors →
        </button>
      </div>
    )
  }

  const allErrors = [1, 2, 3]
  const score = Math.round((allErrors.filter(e => flagged.has(e)).length / allErrors.length) * 100)

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-4">
        <div className="text-sm text-rose-400 font-semibold mb-1">Level 5 — Audit Mode</div>
        <h1 className="text-2xl font-extrabold text-white mb-1">Find the 3 Errors in This Balance Sheet</h1>
        <p className="text-slate-400 text-sm">
          Click on any row or total that you think contains an error. {!submitted ? `${flagged.size} item${flagged.size !== 1 ? 's' : ''} flagged.` : ''}
        </p>
        {!submitted && (
          <HintBar
            open={hints.isOpen('audit')}
            onToggle={() => hints.toggle('audit')}
            text={AUDIT_HINT}
            className="mt-3"
          />
        )}
      </div>

      {/* Flag count */}
      {!submitted && (
        <div className="flex items-center gap-3 mb-4">
          <div className="flex gap-1">
            {[1, 2, 3].map(i => (
              <div key={i} className={`w-3 h-3 rounded-full border-2 ${flagged.size >= i ? 'bg-rose-500 border-rose-500' : 'border-slate-600'}`} />
            ))}
          </div>
          <span className="text-sm text-slate-400">There are exactly 3 errors. Flag them, then submit.</span>
        </div>
      )}

      {/* Balance Sheet */}
      <div className="rounded-2xl border border-white/15 overflow-hidden mb-6 text-sm">
        {/* Header */}
        <div className="bg-slate-800 px-6 py-4 text-center border-b border-white/10">
          <h2 className="text-lg font-bold text-white">Griffin Co.</h2>
          <p className="text-slate-400 text-xs">Balance Sheet</p>
          <p className="text-slate-400 text-xs">{BALANCE_SHEET.date}</p>
        </div>

        {/* ASSETS */}
        <div className="bg-indigo-950/20">
          <div className="px-4 py-2 bg-indigo-900/30 border-b border-indigo-800/40">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Assets</span>
          </div>

          <div className="px-4 py-1.5 border-b border-white/5">
            <span className="text-xs text-slate-500 italic">Current Assets</span>
          </div>
          {BALANCE_SHEET.assets.current.map(item => (
            <div key={item.id} className="flex justify-between px-6 py-2 border-b border-white/5 text-slate-300">
              <span>{item.label}</span>
              <Amount n={item.amount} />
            </div>
          ))}

          <div className="px-4 py-1.5 border-b border-white/5 mt-1">
            <span className="text-xs text-slate-500 italic">Fixed Assets</span>
          </div>
          {BALANCE_SHEET.assets.fixed.map(item => (
            <div key={item.id} className="flex justify-between px-6 py-2 border-b border-white/5 text-slate-300">
              <span>{item.label}</span>
              <Amount n={item.amount} />
            </div>
          ))}

          {/* ERROR 2: Wrong total */}
          <ErrorableRow
            errorId={2}
            label={BALANCE_SHEET.assets.totalLabel}
            display={`$${BALANCE_SHEET.assets.displayTotal.toLocaleString()}`}
            flagged={flagged.has(2)}
            submitted={submitted}
            isRealError={true}
            onToggle={() => toggleFlag(2)}
          />
        </div>

        {/* LIABILITIES */}
        <div className="bg-red-950/10">
          <div className="px-4 py-2 bg-red-900/20 border-b border-red-800/30 border-t border-white/10">
            <span className="text-xs font-bold text-red-400 uppercase tracking-wider">Liabilities</span>
          </div>

          <div className="px-4 py-1.5 border-b border-white/5">
            <span className="text-xs text-slate-500 italic">Current Liabilities</span>
          </div>

          {/* ERROR 1: AR on wrong side */}
          <ErrorableRow
            errorId={1}
            label={BALANCE_SHEET.liabilities.current[0].label}
            display={`$${BALANCE_SHEET.liabilities.current[0].amount.toLocaleString()}`}
            flagged={flagged.has(1)}
            submitted={submitted}
            isRealError={true}
            onToggle={() => toggleFlag(1)}
          />

          {BALANCE_SHEET.liabilities.current.slice(1).map(item => (
            <div key={item.id} className="flex justify-between px-6 py-2 border-b border-white/5 text-slate-300">
              <span>{item.label}</span>
              <Amount n={item.amount} />
            </div>
          ))}

          <div className="px-4 py-1.5 border-b border-white/5 mt-1">
            <span className="text-xs text-slate-500 italic">Long-term Liabilities</span>
          </div>
          {BALANCE_SHEET.liabilities.longTerm.map(item => (
            <div key={item.id} className="flex justify-between px-6 py-2 border-b border-white/5 text-slate-300">
              <span>{item.label}</span>
              <Amount n={item.amount} />
            </div>
          ))}

          <div className="flex justify-between px-4 py-2 bg-red-900/10 border-b border-white/10 font-semibold text-red-300">
            <span>{BALANCE_SHEET.liabilities.totalLabel}</span>
            <span className="font-mono">${BALANCE_SHEET.liabilities.total.toLocaleString()}</span>
          </div>
        </div>

        {/* EQUITY */}
        <div className="bg-purple-950/10">
          <div className="px-4 py-2 bg-purple-900/20 border-b border-purple-800/30 border-t border-white/10">
            <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">Equity</span>
          </div>

          {BALANCE_SHEET.equity.items.slice(0, 1).map(item => (
            <div key={item.id} className="flex justify-between px-6 py-2 border-b border-white/5 text-slate-300">
              <span>{item.label}</span>
              <Amount n={item.amount} />
            </div>
          ))}

          {/* ERROR 3: Wrong retained earnings */}
          <ErrorableRow
            errorId={3}
            label={BALANCE_SHEET.equity.items[1].label}
            display={`($${Math.abs(BALANCE_SHEET.equity.items[1].amount).toLocaleString()})`}
            displayClass="text-red-400 font-mono"
            flagged={flagged.has(3)}
            submitted={submitted}
            isRealError={true}
            onToggle={() => toggleFlag(3)}
          />

          <div className="flex justify-between px-4 py-2 bg-purple-900/10 border-b border-white/10 font-semibold text-purple-300">
            <span>{BALANCE_SHEET.equity.totalLabel}</span>
            <span className="font-mono">${BALANCE_SHEET.equity.total.toLocaleString()}</span>
          </div>
        </div>

        {/* Grand total */}
        <div className="flex justify-between px-4 py-3 bg-slate-800 font-bold text-white border-t border-white/20">
          <span>Total Liabilities + Equity</span>
          <span className="font-mono">${(BALANCE_SHEET.liabilities.total + BALANCE_SHEET.equity.total).toLocaleString()}</span>
        </div>
      </div>

      {/* Submit / Results */}
      {!submitted ? (
        <button
          onClick={handleSubmit}
          disabled={flagged.size === 0}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 text-white font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition-opacity mb-4"
        >
          {flagged.size === 0 ? 'Flag at least one error first' : `Submit ${flagged.size} flagged item${flagged.size !== 1 ? 's' : ''}`}
        </button>
      ) : (
        <div className="mb-6 space-y-3">
          <div className="rounded-xl bg-white/5 border border-white/10 p-5 text-center">
            <p className="text-3xl font-black text-white mb-1">
              {allErrors.filter(e => flagged.has(e)).length} / 3 errors found
            </p>
            <p className="text-slate-400 text-sm">
              {score === 100 ? '🎉 You spotted every error! You think like an auditor.' :
               score >= 67 ? '👍 Good eye! Review the missed error below.' :
               '📚 Tricky ones! Review all three explanations.'}
            </p>
          </div>

          {allErrors.map(errorId => {
            const found = flagged.has(errorId)
            return (
              <div key={errorId} className={`rounded-xl p-4 border ${found ? 'bg-green-900/30 border-green-700' : 'bg-red-900/20 border-red-800'}`}>
                <div className="flex items-start gap-2">
                  <span>{found ? '✅' : '❌'}</span>
                  <div>
                    <p className="font-semibold text-white text-sm mb-1">Error #{errorId}: {ERRORS[errorId].short}</p>
                    <p className="text-slate-300 text-xs leading-relaxed">{ERRORS[errorId].explanation}</p>
                  </div>
                </div>
              </div>
            )
          })}

          <div className="flex gap-3 mt-4">
            <button onClick={() => { setFlagged(new Set()); setSubmitted(false) }} className="flex-1 py-3 rounded-xl bg-white/10 text-white font-semibold hover:bg-white/20">
              Try Again
            </button>
            <button onClick={() => navigate('/')} className="flex-1 py-3 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 text-white font-bold hover:opacity-90">
              Back to Home 🎓
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function ErrorableRow({ errorId, label, display, displayClass = 'font-mono', flagged, submitted, isRealError, onToggle }) {
  let rowStyle = 'flex justify-between px-6 py-2 border-b border-white/5 cursor-pointer transition-all select-none '

  if (submitted) {
    if (isRealError && flagged) rowStyle += 'bg-green-900/40 text-green-300'
    else if (isRealError && !flagged) rowStyle += 'bg-red-900/30 text-red-300 ring-1 ring-red-700 ring-inset'
    else rowStyle += 'text-slate-300'
  } else {
    if (flagged) rowStyle += 'bg-rose-900/40 ring-2 ring-rose-500 ring-inset text-rose-300'
    else rowStyle += 'text-slate-300 hover:bg-white/5'
  }

  return (
    <div className={rowStyle} onClick={onToggle}>
      <span className="flex items-center gap-2">
        {!submitted && flagged && <span className="text-xs bg-rose-500 text-white px-1.5 py-0.5 rounded font-bold">FLAGGED</span>}
        {submitted && isRealError && flagged && <span className="text-green-400 text-xs">✓ Error found</span>}
        {submitted && isRealError && !flagged && <span className="text-red-400 text-xs">✗ Missed</span>}
        {label}
      </span>
      <span className={displayClass || 'font-mono'}>{display}</span>
    </div>
  )
}

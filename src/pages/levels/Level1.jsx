import { useState } from 'react'
import { useScrollTop } from '../../lib/useScrollTop'
import { useNavigate } from 'react-router-dom'
import { useProgress } from '../../context/ProgressContext'
import { useHints, HintToggle, HintPanel } from '../../components/Hint'

const ITEMS = [
  { id: 1, label: 'Cash', correct: 'asset', emoji: '💵',
    hint: 'Ask the ownership question: can the business spend this freely, or does an outsider have a claim on it? Whatever the business controls and can use sits on the left side of the equation.' },
  { id: 2, label: 'Bank Loan', correct: 'liability', emoji: '🏦',
    hint: 'The bank handed over money, but the business has to give it back. Something that must be repaid to an outsider is a claim against the business, not a thing it owns outright.' },
  { id: 3, label: 'Owner Investment', correct: 'equity', emoji: '👤',
    hint: 'The owner put money in. Does the business owe this back to an OUTSIDER, the way it owes a bank? If not, whose claim is it — and which of the three categories holds the owner\u2019s claim?' },
  { id: 4, label: 'Office Equipment', correct: 'asset', emoji: '💻',
    hint: 'The business bought it and uses it every day. Same question as Cash: is this something owned, or something owed?' },
  { id: 5, label: 'Accounts Payable', correct: 'liability', emoji: '📄',
    hint: 'Pa-Y-able → the business will pa-Y somebody. That makes it a claim an outsider has against the business, which is the same family as the bank loan.' },
]

function Seesaw({ assetCount, liabilityEquityCount }) {
  const diff = assetCount - liabilityEquityCount
  const tilt = Math.max(-15, Math.min(15, diff * 6))

  return (
    <div className="relative flex flex-col items-center my-8 select-none">
      {/* Labels */}
      <div className="flex w-full max-w-md justify-between text-xs text-slate-500 mb-1 px-4">
        <span>Assets (Left)</span>
        <span>Liabilities + Equity (Right)</span>
      </div>

      {/* Beam with plates */}
      <div className="relative w-full max-w-md h-20 flex items-center justify-center">
        {/* Pivot */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[16px] border-r-[16px] border-b-[24px] border-l-transparent border-r-transparent border-b-slate-500 z-10" />
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-4 h-4 bg-slate-400 rounded-full z-20" />

        {/* Beam */}
        <div
          className="absolute w-[90%] h-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 rounded-full origin-center transition-transform duration-700 ease-in-out"
          style={{ transform: `rotate(${tilt}deg)`, bottom: '24px' }}
        >
          {/* Left plate */}
          <div className="absolute left-2 -top-6 w-12 h-6 bg-indigo-900 border-2 border-indigo-400 rounded-md flex items-center justify-center">
            <span className="text-indigo-300 font-bold text-sm">{assetCount}</span>
          </div>
          {/* Right plate */}
          <div className="absolute right-2 -top-6 w-12 h-6 bg-purple-900 border-2 border-purple-400 rounded-md flex items-center justify-center">
            <span className="text-purple-300 font-bold text-sm">{liabilityEquityCount}</span>
          </div>
        </div>
      </div>

      {/* Equation label */}
      <div className="mt-6 flex items-center gap-3 text-lg font-bold">
        <span className={`text-indigo-400 ${assetCount === liabilityEquityCount && assetCount > 0 ? 'scale-110' : ''} transition-transform`}>
          Assets
        </span>
        <span className="text-slate-500">=</span>
        <span className="text-purple-400">Liabilities + Equity</span>
      </div>
      {assetCount === liabilityEquityCount && assetCount > 0 && (
        <p className="text-green-400 text-sm font-semibold mt-1 animate-pulse">⚖️ Perfectly balanced!</p>
      )}
    </div>
  )
}

export default function Level1() {
  const navigate = useNavigate()
  const { completeLevel, recordTask } = useProgress()
  const [placed, setPlaced] = useState({})
  const [feedback, setFeedback] = useState({})
  const [dragOver, setDragOver] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const [phase, setPhase] = useState('learn') // 'learn' | 'play'
  useScrollTop([phase])
  const hints = useHints()

  const assetCount = Object.values(placed).filter(v => v === 'asset').length
  const liabilityEquityCount = Object.values(placed).filter(v => v === 'liability' || v === 'equity').length

  function placeItem(itemId, side) {
    if (submitted) return
    setPlaced(prev => ({ ...prev, [itemId]: side }))
  }

  function handleDrop(side, e) {
    e.preventDefault()
    const id = Number(e.dataTransfer.getData('itemId'))
    placeItem(id, side)
    setDragOver(null)
  }

  function handleDragOver(side, e) {
    e.preventDefault()
    setDragOver(side)
  }

  function handleSubmit() {
    const fb = {}
    ITEMS.forEach(item => {
      const p = placed[item.id]
      if (!p) { fb[item.id] = 'missing'; return }
      const isAsset = item.correct === 'asset'
      const placedAsset = p === 'asset'
      fb[item.id] = isAsset === placedAsset ? 'correct' : 'wrong'
    })
    setFeedback(fb)
    setSubmitted(true)
    ITEMS.forEach(item => recordTask(`L1-${item.id}`, fb[item.id] === 'correct', `Asset, liability or equity? — ${item.label}`, 1))
    const allCorrect = ITEMS.every(item => fb[item.id] === 'correct')
    if (allCorrect) completeLevel(1, 100)
    else {
      const score = Math.round((ITEMS.filter(i => fb[i.id] === 'correct').length / ITEMS.length) * 100)
      completeLevel(1, score)
    }
  }

  function resetLevel() {
    setPlaced({})
    setFeedback({})
    setSubmitted(false)
  }

  const unplacedItems = ITEMS.filter(item => !placed[item.id])
  const allPlaced = unplacedItems.length === 0

  if (phase === 'learn') {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <div className="text-sm text-indigo-400 font-semibold mb-1">Level 1</div>
          <h1 className="text-3xl font-extrabold text-white mb-2">The Accounting Equation</h1>
          <p className="text-slate-400">The single most important idea in all of accounting.</p>
        </div>

        <div className="rounded-2xl bg-indigo-500/10 border border-indigo-500/30 p-8 mb-6 text-center">
          <p className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 mb-4">
            A = L + E
          </p>
          <p className="text-xl font-bold text-white mb-2">Assets = Liabilities + Equity</p>
          <p className="text-slate-400">This equation <span className="text-white font-semibold">always</span> balances. Every single transaction in accounting keeps this true.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="rounded-xl bg-indigo-900/40 border border-indigo-500/20 p-5">
            <div className="text-2xl mb-2">🏠</div>
            <h3 className="font-bold text-indigo-300 mb-1">Assets</h3>
            <p className="text-sm text-slate-400">Everything the business <span className="text-white font-semibold">owns</span>. Cash, computers, buildings — anything with value.</p>
          </div>
          <div className="rounded-xl bg-purple-900/40 border border-purple-500/20 p-5">
            <div className="text-2xl mb-2">💳</div>
            <h3 className="font-bold text-purple-300 mb-1">Liabilities</h3>
            <p className="text-sm text-slate-400">Everything the business <span className="text-white font-semibold">owes</span>. Loans, unpaid bills, debt to others.</p>
          </div>
          <div className="rounded-xl bg-pink-900/40 border border-pink-500/20 p-5">
            <div className="text-2xl mb-2">👤</div>
            <h3 className="font-bold text-pink-300 mb-1">Equity</h3>
            <p className="text-sm text-slate-400">What the <span className="text-white font-semibold">owner</span> actually has. What's left after all debts are paid.</p>
          </div>
        </div>

        <div className="rounded-xl bg-white/5 border border-white/10 p-5 mb-8">
          <h3 className="font-bold text-white mb-2">Think of it like this:</h3>
          <p className="text-slate-300 text-sm leading-relaxed">
            You buy a $200,000 house. You pay $50,000 cash (Equity) and borrow $150,000 from the bank (Liability).
            The house itself is the Asset ($200,000). So: <span className="text-white font-semibold">$200k = $150k + $50k</span>.
            The equation always balances — because the asset had to come from somewhere!
          </p>
        </div>

        <button
          onClick={() => setPhase('play')}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-lg hover:opacity-90 transition-opacity"
        >
          Got it — let's play! →
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <div className="text-sm text-indigo-400 font-semibold mb-1">Level 1 — Challenge</div>
        <h1 className="text-2xl font-extrabold text-white mb-1">Sort These Items</h1>
        <p className="text-slate-400 text-sm">
          Place each item on the correct side of the balance. <strong>Assets</strong> go left. <strong>Liabilities &amp; Equity</strong> go right.
        </p>
      </div>

      <Seesaw assetCount={assetCount} liabilityEquityCount={liabilityEquityCount} />

      {/* Drop zones */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* Assets zone */}
        <div
          onDrop={e => handleDrop('asset', e)}
          onDragOver={e => handleDragOver('asset', e)}
          onDragLeave={() => setDragOver(null)}
          className={`min-h-36 rounded-xl border-2 border-dashed p-3 transition-colors ${
            dragOver === 'asset' ? 'border-indigo-400 bg-indigo-950' : 'border-indigo-800 bg-indigo-950/30'
          }`}
        >
          <p className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-2">Assets</p>
          <div className="space-y-2">
            {ITEMS.filter(i => placed[i.id] === 'asset').map(item => (
              <ItemChip key={item.id} item={item} feedback={feedback[item.id]} onRemove={submitted ? null : () => setPlaced(p => { const n = {...p}; delete n[item.id]; return n })} />
            ))}
          </div>
        </div>

        {/* Liabilities + Equity zone */}
        <div
          onDrop={e => handleDrop('liability', e)}
          onDragOver={e => handleDragOver('liability', e)}
          onDragLeave={() => setDragOver(null)}
          className={`min-h-36 rounded-xl border-2 border-dashed p-3 transition-colors ${
            dragOver === 'liability' ? 'border-purple-400 bg-purple-950' : 'border-purple-800 bg-purple-950/30'
          }`}
        >
          <p className="text-xs font-bold text-purple-400 uppercase tracking-wider mb-2">Liabilities + Equity</p>
          <div className="space-y-2">
            {ITEMS.filter(i => placed[i.id] === 'liability' || placed[i.id] === 'equity').map(item => (
              <ItemChip key={item.id} item={item} feedback={feedback[item.id]} onRemove={submitted ? null : () => setPlaced(p => { const n = {...p}; delete n[item.id]; return n })} />
            ))}
          </div>
        </div>
      </div>

      {/* Unplaced items */}
      {!submitted && (
        <div className="mb-6">
          <p className="text-xs text-slate-500 mb-2">
            {unplacedItems.length > 0 ? 'Drag or click an item, then click a zone:' : 'All items placed! Click Submit to check.'}
          </p>
          <div className="flex flex-wrap gap-2">
            {unplacedItems.map(item => (
              <div
                key={item.id}
                draggable
                onDragStart={e => e.dataTransfer.setData('itemId', item.id)}
                className="flex items-center gap-1.5 bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-sm font-medium text-white cursor-grab active:cursor-grabbing hover:border-indigo-400 transition-colors"
              >
                <span>{item.emoji}</span>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-500 mt-4">
            Not sure where one goes? Tap its <span className="inline-flex items-center justify-center w-4 h-4 rounded-full border border-slate-600 text-[9px] font-bold text-slate-400 align-middle">?</span> below for a nudge. Hints never cost you points.
          </p>
          {/* Quick-place buttons for mobile */}
          {unplacedItems.length > 0 && (
            <div className="mt-3 space-y-2">
              {unplacedItems.map(item => (
                <div key={item.id}>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm text-slate-400 w-36">{item.emoji} {item.label}</span>
                    <button onClick={() => placeItem(item.id, 'asset')} className="text-xs px-2 py-1 rounded bg-indigo-900 border border-indigo-600 text-indigo-300 hover:bg-indigo-800">→ Asset</button>
                    <button onClick={() => placeItem(item.id, 'liability')} className="text-xs px-2 py-1 rounded bg-purple-900 border border-purple-600 text-purple-300 hover:bg-purple-800">→ L + E</button>
                    <HintToggle open={hints.isOpen(item.id)} onClick={() => hints.toggle(item.id)} label={item.label} />
                  </div>
                  {hints.isOpen(item.id) && <HintPanel className="mt-2">{item.hint}</HintPanel>}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Feedback */}
      {submitted && (
        <div className="mb-6 space-y-2">
          {ITEMS.map(item => (
            <div key={item.id} className={`flex items-start gap-3 rounded-lg p-3 text-sm ${
              feedback[item.id] === 'correct' ? 'bg-green-900/30 border border-green-700' : 'bg-red-900/30 border border-red-700'
            }`}>
              <span>{feedback[item.id] === 'correct' ? '✅' : '❌'}</span>
              <div>
                <span className="font-semibold text-white">{item.emoji} {item.label}</span>
                <span className="text-slate-400"> — </span>
                <span className="text-slate-300">
                  {item.correct === 'asset' ? 'This is an Asset (something owned).' : item.correct === 'liability' ? 'This is a Liability (something owed to others).' : 'This is Equity (owner\'s stake in the business).'}
                </span>
              </div>
            </div>
          ))}

          <div className="rounded-xl bg-indigo-500/10 border border-indigo-500/30 p-4 text-center mt-4">
            {Object.values(feedback).every(f => f === 'correct') ? (
              <>
                <p className="text-2xl mb-1">🎉</p>
                <p className="font-bold text-green-400">Perfect score! You've got the equation down.</p>
                <p className="text-slate-400 text-sm mt-1">Level 2 is now unlocked. Keep going!</p>
              </>
            ) : (
              <>
                <p className="text-2xl mb-1">📚</p>
                <p className="font-bold text-white">{Object.values(feedback).filter(f => f === 'correct').length} / {ITEMS.length} correct</p>
                <p className="text-slate-400 text-sm mt-1">Review the explanations above, then try again!</p>
              </>
            )}
          </div>
        </div>
      )}

      <div className="flex gap-3">
        {!submitted ? (
          <button
            onClick={handleSubmit}
            disabled={!allPlaced}
            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
          >
            {allPlaced ? 'Submit Answers' : `Place all ${unplacedItems.length} remaining item${unplacedItems.length !== 1 ? 's' : ''} first`}
          </button>
        ) : (
          <>
            <button onClick={resetLevel} className="flex-1 py-3 rounded-xl bg-white/10 text-white font-semibold hover:bg-white/20 transition-colors">
              Try Again
            </button>
            <button onClick={() => navigate('/level/2')} className="flex-1 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold hover:opacity-90 transition-opacity">
              Next Level →
            </button>
          </>
        )}
      </div>
    </div>
  )
}

function ItemChip({ item, feedback, onRemove }) {
  const colors = {
    correct: 'bg-green-900/50 border-green-600 text-green-300',
    wrong: 'bg-red-900/50 border-red-600 text-red-300',
    undefined: 'bg-slate-700 border-slate-500 text-white',
  }
  return (
    <div className={`flex items-center gap-1.5 rounded-lg px-2 py-1 text-xs font-medium border ${colors[feedback] || colors.undefined}`}>
      <span>{item.emoji}</span>
      <span>{item.label}</span>
      {onRemove && (
        <button onClick={onRemove} className="ml-1 opacity-50 hover:opacity-100 text-xs">✕</button>
      )}
      {feedback === 'correct' && <span>✓</span>}
      {feedback === 'wrong' && <span>✗</span>}
    </div>
  )
}

import { useState } from 'react'
import { useScrollTop } from '../../lib/useScrollTop'
import { useNavigate } from 'react-router-dom'
import { useProgress } from '../../context/ProgressContext'
import { useHints, HintToggle, HintPanel, hintTally } from '../../components/Hint'

const CARDS = [
  { id: 1, label: 'Office Supplies', emoji: '🖊️', correct: 'asset',
    hint: 'These are pens and paper still sitting in the closet, not yet used. The business owns them right now — which bucket holds things the business owns?' },
  { id: 2, label: 'Sales Revenue', emoji: '💰', correct: 'revenue',
    hint: 'This is money the business EARNED by doing what it does. Be careful not to file it with Cash — the cash itself and the earning of it are two different categories.' },
  { id: 3, label: 'Accounts Payable', emoji: '📄', correct: 'liability',
    hint: 'Pa-Y-able → the business will pa-Y a supplier. An amount owed to an outsider goes in which bucket?' },
  { id: 4, label: 'Retained Earnings', emoji: '🏦', correct: 'equity',
    hint: 'These are profits the business kept instead of paying out to owners. They are not owed to any outsider, so whose stake in the business are they part of?' },
  { id: 5, label: 'Utilities Expense', emoji: '💡', correct: 'expense',
    hint: 'The electric bill. Money spent to keep the lights on is a cost of operating — and costs have their own bucket, separate from the cash used to pay them.' },
  { id: 6, label: 'Cash', emoji: '💵', correct: 'asset',
    hint: 'The simplest card here. Something the business has and can spend belongs with everything else it owns.' },
  { id: 7, label: 'Bank Loan', emoji: '🏛️', correct: 'liability',
    hint: 'The bank gave the business money that has to be paid back. Owed to an outsider puts it in the same bucket as Accounts Payable.' },
  { id: 8, label: 'Common Stock', emoji: '📈', correct: 'equity',
    hint: 'This is what owners put in to get their shares. It is never repaid like a loan, so it is not owed to an outsider — it is the owners\u2019 own stake.' },
  { id: 9, label: 'Service Revenue', emoji: '🤝', correct: 'revenue',
    hint: 'Same family as Sales Revenue: money earned by doing work for customers. If you placed that one, this goes in the same bucket.' },
  { id: 10, label: 'Rent Expense', emoji: '🏠', correct: 'expense',
    hint: 'A cost of operating the business, just like the electric bill. Anything with \u201cExpense\u201d in the name is telling you the answer outright.' },
]

const BUCKETS = [
  { id: 'asset', label: 'Assets', icon: '🏠', color: 'indigo', desc: 'Things you own' },
  { id: 'liability', label: 'Liabilities', icon: '💳', color: 'red', desc: 'Things you owe' },
  { id: 'equity', label: 'Equity', icon: '👤', color: 'purple', desc: "Owner's stake" },
  { id: 'revenue', label: 'Revenue', icon: '💰', color: 'green', desc: 'Money earned' },
  { id: 'expense', label: 'Expenses', icon: '🧾', color: 'orange', desc: 'Costs incurred' },
]

const BUCKET_COLORS = {
  indigo: { border: 'border-indigo-600', bg: 'bg-indigo-900/30', hover: 'hover:border-indigo-400 hover:bg-indigo-900/50', text: 'text-indigo-400', badge: 'bg-indigo-900 border-indigo-600' },
  red: { border: 'border-red-600', bg: 'bg-red-900/30', hover: 'hover:border-red-400 hover:bg-red-900/50', text: 'text-red-400', badge: 'bg-red-900 border-red-600' },
  purple: { border: 'border-purple-600', bg: 'bg-purple-900/30', hover: 'hover:border-purple-400 hover:bg-purple-900/50', text: 'text-purple-400', badge: 'bg-purple-900 border-purple-600' },
  green: { border: 'border-green-600', bg: 'bg-green-900/30', hover: 'hover:border-green-400 hover:bg-green-900/50', text: 'text-green-400', badge: 'bg-green-900 border-green-600' },
  orange: { border: 'border-orange-600', bg: 'bg-orange-900/30', hover: 'hover:border-orange-400 hover:bg-orange-900/50', text: 'text-orange-400', badge: 'bg-orange-900 border-orange-600' },
}

export default function Level2() {
  const navigate = useNavigate()
  const { completeLevel, recordTask } = useProgress()
  const [phase, setPhase] = useState('learn')
  const [placed, setPlaced] = useState({})
  const [dragOver, setDragOver] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(0)
  useScrollTop([phase])
  const hints = useHints()

  function placeCard(cardId, bucketId) {
    if (submitted) return
    setPlaced(prev => ({ ...prev, [cardId]: bucketId }))
  }

  function handleDrop(bucketId, e) {
    e.preventDefault()
    const id = Number(e.dataTransfer.getData('cardId'))
    placeCard(id, bucketId)
    setDragOver(null)
  }

  function handleSubmit() {
    let correct = 0
    CARDS.forEach(card => {
      if (placed[card.id] === card.correct) correct++
      recordTask(`L2-${card.id}`, placed[card.id] === card.correct, `Which bucket? — ${card.label}`, 2)
    })
    const pct = Math.round((correct / CARDS.length) * 100)
    setScore(pct)
    setSubmitted(true)
    completeLevel(2, pct)
  }

  const placedCount = Object.keys(placed).length
  const unplaced = CARDS.filter(c => !placed[c.id])

  if (phase === 'learn') {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <div className="text-sm text-cyan-400 font-semibold mb-1">Level 2</div>
          <h1 className="text-3xl font-extrabold text-white mb-2">The Big 5 Account Types</h1>
          <p className="text-slate-300">Every account in accounting belongs to one of these five families.</p>
        </div>

        <div className="space-y-3 mb-8">
          {BUCKETS.map(b => {
            const c = BUCKET_COLORS[b.color]
            return (
              <div key={b.id} className={`rounded-xl border ${c.border} ${c.bg} p-4 flex items-start gap-4`}>
                <span className="text-3xl">{b.icon}</span>
                <div>
                  <h3 className={`font-bold text-lg ${c.text}`}>{b.label}</h3>
                  <p className="text-slate-300 text-sm mt-0.5">
                    {b.id === 'asset' && 'Resources the business owns or controls. Cash, equipment, buildings, receivables — anything valuable.'}
                    {b.id === 'liability' && "Obligations the business owes to outsiders. Bank loans, unpaid bills, taxes due — money you'll need to pay back."}
                    {b.id === 'equity' && "The owner's leftover claim on the business after all liabilities are paid. Also called 'net worth' or 'book value.'"}
                    {b.id === 'revenue' && 'Income earned from providing goods or services. Sales revenue, service fees, interest earned — money coming in from the core business.'}
                    {b.id === 'expense' && 'Costs consumed to generate revenue. Rent, salaries, utilities, supplies used up — money going out to run the business.'}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        <div className="rounded-xl bg-white/5 border border-white/10 p-5 mb-8">
          <p className="text-sm text-slate-300">
            <span className="text-white font-semibold">Quick memory trick:</span> Assets and Expenses go UP with debits. Liabilities, Equity, and Revenue go UP with credits. You'll learn why in Level 3!
          </p>
        </div>

        <button
          onClick={() => setPhase('play')}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold text-lg hover:opacity-90 transition-opacity"
        >
          Start the Card Sort →
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-4">
        <div className="text-sm text-cyan-400 font-semibold mb-1">Level 2 — Card Sort</div>
        <h1 className="text-2xl font-extrabold text-white mb-1">Sort 10 Cards into the Right Buckets</h1>
        <p className="text-slate-300 text-sm">Drag cards into their bucket, or use the quick-place buttons.</p>
      </div>

      {/* Score bar */}
      <div className="flex items-center gap-2 text-sm text-slate-300 mb-4">
        <div className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
          <div className="h-full bg-cyan-500 transition-all duration-300" style={{ width: `${(placedCount / CARDS.length) * 100}%` }} />
        </div>
        <span>{placedCount}/10 placed</span>
      </div>

      {/* Unplaced cards */}
      {!submitted && unplaced.length > 0 && (
        <div className="mb-5">
          <div className="flex flex-wrap gap-2 mb-3">
            {unplaced.map(card => (
              <div
                key={card.id}
                draggable
                onDragStart={e => e.dataTransfer.setData('cardId', card.id)}
                className="flex items-center gap-1.5 bg-slate-800 border border-slate-600 rounded-xl pl-3 pr-1.5 py-1.5 text-sm font-medium text-white cursor-grab active:cursor-grabbing hover:border-cyan-400 transition-colors"
              >
                <span>{card.emoji}</span>
                <span>{card.label}</span>
                <HintToggle open={hints.isOpen(card.id)} onClick={() => hints.toggle(card.id)} label={card.label} className="w-6 h-6" />
              </div>
            ))}
          </div>
          {unplaced.some(c => hints.isOpen(c.id)) && (
            <div className="space-y-2 mb-3">
              {unplaced.filter(c => hints.isOpen(c.id)).map(c => (
                <HintPanel key={c.id}>
                  <span className="text-white font-semibold">{c.label}: </span>{c.hint}
                </HintPanel>
              ))}
            </div>
          )}
          <p className="text-xs text-slate-300 mb-3">
            Tap a card&rsquo;s <span className="inline-flex items-center justify-center w-4 h-4 rounded-full border border-slate-600 text-[9px] font-bold text-dim align-middle">?</span> if you want a nudge on it. Hints never cost you points.
          </p>
        </div>
      )}

      {/* Buckets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        {BUCKETS.map(bucket => {
          const c = BUCKET_COLORS[bucket.color]
          const cardsHere = CARDS.filter(card => placed[card.id] === bucket.id)
          return (
            <div
              key={bucket.id}
              onDrop={e => handleDrop(bucket.id, e)}
              onDragOver={e => { e.preventDefault(); setDragOver(bucket.id) }}
              onDragLeave={() => setDragOver(null)}
              className={`rounded-xl border-2 border-dashed p-3 min-h-24 transition-colors ${
                dragOver === bucket.id ? `${c.border} ${c.bg}` : `border-slate-700 bg-slate-900/30 ${c.hover}`
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <span>{bucket.icon}</span>
                <span className={`text-xs font-bold uppercase tracking-wider ${c.text}`}>{bucket.label}</span>
                <span className="text-xs text-dim">{bucket.desc}</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {cardsHere.map(card => {
                  const isCorrect = submitted && placed[card.id] === card.correct
                  const isWrong = submitted && placed[card.id] !== card.correct
                  return (
                    <div
                      key={card.id}
                      className={`flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium border transition-colors ${
                        isCorrect ? 'bg-green-900/50 border-green-600 text-green-300' :
                        isWrong ? 'bg-red-900/50 border-red-600 text-red-300' :
                        `${c.badge} text-white border`
                      }`}
                    >
                      <span>{card.emoji}</span>
                      <span>{card.label}</span>
                      {!submitted && (
                        <button onClick={() => setPlaced(p => { const n = {...p}; delete n[card.id]; return n })} className="ml-1 opacity-40 hover:opacity-100">✕</button>
                      )}
                      {isCorrect && <span>✓</span>}
                      {isWrong && <span>✗</span>}
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      {/* Quick-place UI for mobile */}
      {!submitted && unplaced.length > 0 && (
        <details className="mb-4 rounded-xl bg-slate-900/50 border border-slate-700 overflow-hidden">
          <summary className="px-4 py-2 text-sm text-dim cursor-pointer hover:text-white">Quick-place (tap to expand)</summary>
          <div className="px-4 pb-4 space-y-2 mt-2">
            {unplaced.map(card => (
              <div key={card.id}>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm text-slate-300 w-40">{card.emoji} {card.label}</span>
                  {BUCKETS.map(b => (
                    <button key={b.id} onClick={() => placeCard(card.id, b.id)} className={`text-xs px-2 py-0.5 rounded border ${BUCKET_COLORS[b.color].badge} ${BUCKET_COLORS[b.color].text}`}>
                      {b.label}
                    </button>
                  ))}
                  <HintToggle open={hints.isOpen(card.id)} onClick={() => hints.toggle(card.id)} label={card.label} className="w-6 h-6" />
                </div>
                {hints.isOpen(card.id) && <HintPanel className="mt-2">{card.hint}</HintPanel>}
              </div>
            ))}
          </div>
        </details>
      )}

      {/* Results */}
      {submitted && (
        <div className="mb-4 rounded-xl border border-white/10 bg-white/5 p-5">
          <div className="text-center mb-4">
            <p className="text-4xl font-black text-white">{score}%</p>
            <p className="text-slate-300 text-sm">{Object.values(placed).filter((v, i) => v === CARDS[i]?.correct).length} / 10 correct</p>
          </div>
          {CARDS.filter(c => placed[c.id] !== c.correct).length > 0 && (
            <div>
              <p className="text-sm font-semibold text-slate-300 mb-2">Review these:</p>
              {CARDS.filter(c => placed[c.id] !== c.correct).map(card => {
                const correctBucket = BUCKETS.find(b => b.id === card.correct)
                return (
                  <div key={card.id} className="text-sm text-slate-300 mb-1">
                    <span className="text-white">{card.emoji} {card.label}</span> belongs in <span className="font-semibold text-white">{correctBucket?.label}</span>
                    {' '}<span className="text-dim">— you put it in {BUCKETS.find(b => b.id === placed[card.id])?.label || 'unplaced'}</span>
                  </div>
                )
              })}
            </div>
          )}
          {score === 100 && <p className="text-center text-green-400 font-bold mt-2">🎉 Perfect! You know your account types cold.</p>}
          {hints.usedCount > 0 && <p className="text-xs text-slate-300 mt-3">{hintTally(hints.usedCount)}</p>}
        </div>
      )}

      <div className="flex gap-3">
        {!submitted ? (
          <button
            onClick={handleSubmit}
            disabled={placedCount < CARDS.length}
            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
          >
            {placedCount < CARDS.length ? `Place ${CARDS.length - placedCount} more card${CARDS.length - placedCount !== 1 ? 's' : ''}` : 'Submit Answers'}
          </button>
        ) : (
          <>
            <button onClick={() => { setPlaced({}); setSubmitted(false) }} className="flex-1 py-3 rounded-xl bg-white/10 text-white font-semibold hover:bg-white/20 transition-colors">
              Try Again
            </button>
            <button onClick={() => navigate('/level/3')} className="flex-1 py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold hover:opacity-90 transition-opacity">
              Next Level →
            </button>
          </>
        )}
      </div>
    </div>
  )
}

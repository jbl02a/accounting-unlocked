import { useState, useMemo } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useProgress } from '../context/ProgressContext'
import { useScrollTop } from '../lib/useScrollTop'
import { shuffleOptions } from '../lib/shuffle'
import { PROBLEM_SETS, problemSetById, ACCOUNT_SETS, setWeight } from '../data/problemSets'

const money = n => '$' + Number(n).toLocaleString('en-US')
const parseAmount = v => {
  const n = Number(String(v).replace(/[$,\s]/g, ''))
  return Number.isFinite(n) ? n : null
}

// ── Index ───────────────────────────────────────────────────────────
export function ProblemSetsIndex() {
  useScrollTop([])
  const { progress } = useProgress()
  const misses = progress.misses || {}

  const statusOf = set => {
    const done = set.steps.filter(s => misses[s.id])
    const right = done.filter(s => misses[s.id]?.last === 'right').length
    return { attempted: done.length, right, total: set.steps.length }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-1.5 text-sm text-emerald-300 font-medium mb-4">
          <span>🗂️</span><span>Straight from your TA</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">Problem Sets</h1>
        <p className="text-dim">
          Your TA's practice problems, worked one step at a time. Every answer is marked instantly, with
          the reason it is right and the trap it was built around.
        </p>
        <p className="text-dim text-sm mt-2">
          These are separate from the levels and the practice exam — nothing here repeats work you have
          already done.
        </p>
      </div>

      <div className="space-y-3 mb-8">
        {PROBLEM_SETS.map(set => {
          const s = statusOf(set)
          const pct = s.total ? Math.round((s.right / s.total) * 100) : 0
          return (
            <Link
              key={set.id}
              to={`/problems/${set.id}`}
              className="block rounded-2xl border border-white/10 bg-white/5 p-5 hover:border-emerald-400 hover:bg-white/10 transition-colors"
            >
              <div className="flex items-start gap-4">
                <span className="text-3xl shrink-0">{set.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-white">{set.title}</p>
                  <p className="text-sm text-dim mt-0.5">{set.blurb}</p>
                  <div className="flex flex-wrap items-center gap-2 mt-2 text-[11px]">
                    <span className="rounded-full bg-black/30 border border-white/10 px-2 py-0.5 text-dim">{set.source}</span>
                    <span className="rounded-full bg-black/30 border border-white/10 px-2 py-0.5 text-dim">{set.steps.length} steps</span>
                    <span className="rounded-full bg-black/30 border border-white/10 px-2 py-0.5 text-dim">~{set.minutes} min</span>
                    {s.attempted === 0 ? (
                      <span className="rounded-full px-2 py-0.5 font-semibold border bg-emerald-500/15 border-emerald-500/40 text-emerald-300">
                        Not started
                      </span>
                    ) : s.attempted < s.total ? (
                      <span className="rounded-full px-2 py-0.5 font-semibold border bg-sky-500/15 border-sky-500/40 text-sky-300">
                        {s.attempted}/{s.total} worked · {s.right} right
                      </span>
                    ) : (
                      <span className={`rounded-full px-2 py-0.5 font-semibold border ${
                        pct >= 80 ? 'bg-green-500/15 border-green-500/40 text-green-300'
                          : pct >= 60 ? 'bg-amber-500/15 border-amber-500/40 text-amber-300'
                          : 'bg-red-500/15 border-red-500/40 text-red-300'
                      }`}>
                        Done · {s.right}/{s.total} right
                      </span>
                    )}
                  </div>
                </div>
                <span className="text-emerald-400 font-bold shrink-0">→</span>
              </div>
            </Link>
          )
        })}
      </div>

      <Link
        to="/problems/key"
        className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 mb-4 hover:border-emerald-400 hover:bg-white/10 transition-colors"
      >
        <span className="text-2xl">🖨️</span>
        <div className="flex-1">
          <p className="font-bold text-white text-sm">Printable answer key</p>
          <p className="text-xs text-dim">
            All four problems worked in full, with the reason and the trap for every step — for checking
            work done on paper.
          </p>
        </div>
        <span className="text-emerald-400 font-bold">→</span>
      </Link>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-dim">
        <p className="font-bold text-white text-sm mb-1">How these differ from the practice exam</p>
        <p>
          The exam asks one question at a time. These are whole problems — journalize, post, foot the
          trial balance — the shape your actual exam takes. Anything you miss here lands in the same
          review list as everything else, so the weak-topic focus test picks it up.
        </p>
      </div>
    </div>
  )
}

// ── Journal entry builder ───────────────────────────────────────────
function EntryBuilder({ step, accounts, value, onChange, disabled }) {
  const rows = (side) => step.answer[side].map((_, i) => i)
  const set = (side, i, field, v) => {
    const next = { ...value, [side]: { ...(value[side] || {}) } }
    next[side][i] = { ...(next[side][i] || {}), [field]: v }
    onChange(next)
  }
  const Row = ({ side, i }) => {
    const cur = value[side]?.[i] || {}
    return (
      <div className="flex gap-2 items-center">
        <select
          value={cur.account || ''}
          onChange={e => set(side, i, 'account', e.target.value)}
          disabled={disabled}
          className="flex-1 min-w-0 rounded-lg bg-black/40 border border-white/15 text-white text-sm px-2 py-2 disabled:opacity-60"
        >
          <option value="">— account —</option>
          {accounts.map(a => <option key={a} value={a}>{a}</option>)}
        </select>
        <input
          type="text"
          inputMode="decimal"
          value={cur.amount ?? ''}
          onChange={e => set(side, i, 'amount', e.target.value)}
          disabled={disabled}
          placeholder="amount"
          className="w-28 shrink-0 rounded-lg bg-black/40 border border-white/15 text-white text-sm px-2 py-2 disabled:opacity-60"
        />
      </div>
    )
  }
  return (
    <div className="space-y-3">
      <div>
        <p className="text-[11px] font-bold uppercase tracking-wider text-dim mb-1.5">Debit</p>
        <div className="space-y-2">{rows('debits').map(i => <Row key={`d${i}`} side="debits" i={i} />)}</div>
      </div>
      <div>
        <p className="text-[11px] font-bold uppercase tracking-wider text-dim mb-1.5 pl-6">Credit</p>
        <div className="space-y-2 pl-6">{rows('credits').map(i => <Row key={`c${i}`} side="credits" i={i} />)}</div>
      </div>
    </div>
  )
}

function gradeEntry(step, value) {
  const side = key => {
    const given = step.answer[key].map((_, i) => value[key]?.[i] || {})
    return given.map(g => ({ account: g.account || '', amount: parseAmount(g.amount) }))
  }
  const cmp = key => {
    const want = [...step.answer[key]].map(([a, n]) => `${a}|${n}`).sort()
    const got = [...side(key)].map(g => `${g.account}|${g.amount}`).sort()
    return JSON.stringify(want) === JSON.stringify(got)
  }
  return cmp('debits') && cmp('credits')
}

// What specifically went wrong, so the feedback is about his answer.
function diagnoseEntry(step, value) {
  const notes = []
  const flat = key => step.answer[key].map((_, i) => ({
    account: value[key]?.[i]?.account || '',
    amount: parseAmount(value[key]?.[i]?.amount),
  }))
  const givenD = flat('debits'), givenC = flat('credits')
  const wantD = step.answer.debits, wantC = step.answer.credits
  const names = arr => arr.map(x => (Array.isArray(x) ? x[0] : x.account)).filter(Boolean).sort()

  if ([...givenD, ...givenC].some(g => !g.account)) notes.push('Some lines are blank — every line needs an account and an amount.')
  if ([...givenD, ...givenC].some(g => g.account && g.amount === null)) notes.push('One of your amounts is not a number.')

  const sumD = givenD.reduce((s, g) => s + (g.amount || 0), 0)
  const sumC = givenC.reduce((s, g) => s + (g.amount || 0), 0)
  if (sumD && sumC && sumD !== sumC) notes.push(`Your debits total ${money(sumD)} and your credits ${money(sumC)} — an entry must balance before anything else is worth checking.`)

  const swapped = JSON.stringify(names(givenD)) === JSON.stringify(names(wantC)) &&
                  JSON.stringify(names(givenC)) === JSON.stringify(names(wantD))
  if (swapped) notes.push('You have the right two accounts on the wrong sides — the debit and the credit are reversed.')

  const wantAll = new Set([...wantD, ...wantC].map(l => l[0]))
  const strays = [...givenD, ...givenC].map(g => g.account).filter(a => a && !wantAll.has(a))
  if (!swapped && strays.length) notes.push(`${[...new Set(strays)].join(' and ')} ${strays.length > 1 ? 'do' : 'does'} not belong in this entry.`)

  return notes
}

// ── Runner ──────────────────────────────────────────────────────────
export function ProblemSetRunner() {
  const { setId } = useParams()
  const navigate = useNavigate()
  const set = problemSetById(setId)
  const { recordTask, progress } = useProgress()
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [checked, setChecked] = useState({})
  const [showHint, setShowHint] = useState(false)
  useScrollTop([setId, index])

  const step = set?.steps[index]
  // Multiple-choice options are permuted per visit, like everywhere else.
  const shown = useMemo(
    () => (step && step.kind === 'mc' ? shuffleOptions(step) : step),
    [step?.id] // eslint-disable-line react-hooks/exhaustive-deps
  )

  if (!set) {
    return (
      <div className="max-w-xl mx-auto text-center">
        <p className="text-white font-bold mb-3">That problem set does not exist.</p>
        <Link to="/problems" className="text-indigo-400 hover:text-indigo-300">← Back to problem sets</Link>
      </div>
    )
  }

  const result = checked[step.id]
  const value = answers[step.id]

  function grade() {
    let correct = false
    let detail = null
    if (step.kind === 'mc') {
      correct = value === shown.correctIndex
    } else if (step.kind === 'numeric') {
      correct = parseAmount(value) === step.answer
    } else if (step.kind === 'entry') {
      correct = gradeEntry(step, value || {})
      detail = correct ? [] : diagnoseEntry(step, value || {})
    } else if (step.kind === 'classify') {
      const wrong = step.items.filter((it, i) => (value?.[i] || '') !== it.answer)
      correct = wrong.length === 0
      detail = wrong.map(w => w.label)
    } else if (step.kind === 'classify2') {
      const wrong = step.items.filter((it, i) =>
        (value?.[i]?.statement || '') !== it.statement || (value?.[i]?.category || '') !== it.category)
      correct = wrong.length === 0
      detail = wrong.map(w => w.label)
    }
    setChecked(prev => ({ ...prev, [step.id]: { correct, detail } }))
    // Recorded as a task: these are worked problems, not re-servable multiple
    // choice, so they belong on the home review list rather than in the drill.
    recordTask(step.id, correct, `${set.title} — step ${index + 1}`, 100 + PROBLEM_SETS.indexOf(set))
  }

  function go(delta) {
    setShowHint(false)
    setIndex(i => Math.min(set.steps.length - 1, Math.max(0, i + delta)))
  }

  const answeredAll = set.steps.every(s => checked[s.id])
  const rightCount = set.steps.filter(s => checked[s.id]?.correct).length
  const isLast = index === set.steps.length - 1

  const ready = step.kind === 'mc' ? value !== undefined
    : step.kind === 'numeric' ? String(value ?? '').trim() !== ''
    : true

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-4">
        <Link to="/problems" className="text-xs text-dim hover:text-white">← All problem sets</Link>
        <div className="flex items-center justify-between text-sm mt-2 mb-2 gap-3">
          <span className="text-emerald-400 font-semibold truncate">{set.icon} {set.title}</span>
          <span className="text-dim shrink-0">Step {index + 1} of {set.steps.length}</span>
        </div>
        <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
          <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-300"
               style={{ width: `${((index + 1) / set.steps.length) * 100}%` }} />
        </div>
      </div>

      {index === 0 && set.intro && (
        <div className="rounded-xl border border-white/10 bg-white/5 p-4 mb-4">
          <p className="text-sm text-slate-300">{set.intro}</p>
        </div>
      )}

      <div className="rounded-xl bg-white/5 border border-white/10 p-5 mb-5">
        {step.group && <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 mb-1">{step.group}</p>}
        {step.date && <p className="text-xs text-dim mb-1">{step.date}</p>}
        <p className="font-semibold text-white">{step.prompt}</p>
      </div>

      {/* ── Answer area ── */}
      {step.kind === 'mc' && (
        <div className="space-y-3 mb-5">
          {shown.options.map((opt, i) => {
            const picked = value === i
            const isAnswer = result && i === shown.correctIndex
            const isWrongPick = result && picked && i !== shown.correctIndex
            const cls = isAnswer ? 'border-green-500 bg-green-900/30'
              : isWrongPick ? 'border-red-500 bg-red-900/30'
              : result ? 'border-white/10 bg-white/5 opacity-60'
              : picked ? 'border-emerald-500 bg-emerald-900/30'
              : 'border-white/10 bg-white/5 hover:border-emerald-400 hover:bg-white/10'
            return (
              <button key={i} disabled={Boolean(result)}
                onClick={() => setAnswers(p => ({ ...p, [step.id]: i }))}
                className={`w-full text-left rounded-xl border p-3 transition-colors ${cls}`}>
                <div className="flex items-start gap-3">
                  <span className="text-xs font-bold mt-0.5 shrink-0 text-dim">{'ABCD'[i]}</span>
                  <span className="text-sm text-white flex-1">{opt}</span>
                  {isAnswer && <span className="text-green-400">✓</span>}
                  {isWrongPick && <span className="text-red-400">✗</span>}
                </div>
              </button>
            )
          })}
        </div>
      )}

      {step.kind === 'numeric' && (
        <div className="mb-5">
          <input
            type="text" inputMode="decimal"
            value={value ?? ''}
            disabled={Boolean(result)}
            onChange={e => setAnswers(p => ({ ...p, [step.id]: e.target.value }))}
            placeholder="Enter the amount"
            className="w-full rounded-xl bg-black/40 border border-white/15 text-white px-4 py-3 text-lg font-semibold disabled:opacity-60"
          />
          {result && !result.correct && (
            <p className="text-sm text-red-300 mt-2">
              You answered {String(value).trim() === '' ? '(blank)' : money(parseAmount(value) ?? 0)} — the answer is {money(step.answer)}.
            </p>
          )}
        </div>
      )}

      {step.kind === 'entry' && (
        <div className="rounded-xl border border-white/10 bg-white/5 p-4 mb-5">
          <EntryBuilder
            step={step}
            accounts={ACCOUNT_SETS[set.accounts]}
            value={value || {}}
            onChange={v => setAnswers(p => ({ ...p, [step.id]: v }))}
            disabled={Boolean(result)}
          />
          {result && !result.correct && (
            <div className="mt-4 pt-3 border-t border-white/10">
              <p className="text-xs font-bold uppercase tracking-wider text-dim mb-1.5">The entry</p>
              {step.answer.debits.map(([a, n], i) => (
                <p key={`d${i}`} className="text-sm text-green-300">Dr {a} <span className="float-right">{money(n)}</span></p>
              ))}
              {step.answer.credits.map(([a, n], i) => (
                <p key={`c${i}`} className="text-sm text-green-300 pl-6">Cr {a} <span className="float-right">{money(n)}</span></p>
              ))}
            </div>
          )}
        </div>
      )}

      {step.kind === 'classify' && (
        <div className="space-y-2 mb-5">
          {step.items.map((it, i) => {
            const picked = value?.[i] || ''
            const wrong = result && picked !== it.answer
            return (
              <div key={i} className={`flex items-center gap-2 rounded-xl border p-2.5 ${
                !result ? 'border-white/10 bg-white/5'
                  : wrong ? 'border-red-600/50 bg-red-900/15' : 'border-green-700/40 bg-green-900/10'}`}>
                <span className="text-sm text-white flex-1 min-w-0">{it.label}</span>
                <select value={picked} disabled={Boolean(result)}
                  onChange={e => setAnswers(p => ({ ...p, [step.id]: { ...(p[step.id] || {}), [i]: e.target.value } }))}
                  className="rounded-lg bg-black/40 border border-white/15 text-white text-xs px-2 py-1.5 disabled:opacity-70">
                  <option value="">— pick —</option>
                  {step.buckets.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
                {wrong && <span className="text-[11px] text-green-300 shrink-0 w-24 text-right">{it.answer}</span>}
              </div>
            )
          })}
        </div>
      )}

      {step.kind === 'classify2' && (
        <div className="space-y-2 mb-5">
          {step.items.map((it, i) => {
            const cur = value?.[i] || {}
            const wrong = result && (cur.statement !== it.statement || cur.category !== it.category)
            const upd = (field, v) => setAnswers(p => ({
              ...p, [step.id]: { ...(p[step.id] || {}), [i]: { ...((p[step.id] || {})[i] || {}), [field]: v } },
            }))
            return (
              <div key={i} className={`rounded-xl border p-2.5 ${
                !result ? 'border-white/10 bg-white/5'
                  : wrong ? 'border-red-600/50 bg-red-900/15' : 'border-green-700/40 bg-green-900/10'}`}>
                <p className="text-sm text-white mb-2">{it.label}</p>
                <div className="flex flex-wrap gap-2">
                  <select value={cur.statement || ''} disabled={Boolean(result)}
                    onChange={e => upd('statement', e.target.value)}
                    className="flex-1 min-w-[9rem] rounded-lg bg-black/40 border border-white/15 text-white text-xs px-2 py-1.5 disabled:opacity-70">
                    <option value="">— statement —</option>
                    {step.axes[0].options.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                  <select value={cur.category || ''} disabled={Boolean(result)}
                    onChange={e => upd('category', e.target.value)}
                    className="flex-1 min-w-[9rem] rounded-lg bg-black/40 border border-white/15 text-white text-xs px-2 py-1.5 disabled:opacity-70">
                    <option value="">— classified as —</option>
                    {step.axes[1].options.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
                {wrong && <p className="text-[11px] text-green-300 mt-1.5">{it.statement} · {it.category}</p>}
              </div>
            )
          })}
        </div>
      )}

      {/* ── Hint (stops one step short) ── */}
      {!result && step.hint && (
        showHint ? (
          <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 mb-5">
            <p className="text-xs font-bold uppercase tracking-wider text-amber-300 mb-1">Hint</p>
            <p className="text-sm text-slate-300">{step.hint}</p>
          </div>
        ) : (
          <button onClick={() => setShowHint(true)}
            className="w-full mb-5 py-2 rounded-xl bg-white/5 border border-white/10 text-dim text-sm hover:bg-white/10 hover:text-slate-200">
            Stuck? Get a hint
          </button>
        )
      )}

      {/* ── Feedback ── */}
      {result && (
        <div className={`rounded-xl p-5 mb-5 border ${result.correct ? 'bg-green-900/30 border-green-700' : 'bg-amber-900/30 border-amber-700'}`}>
          <p className="font-bold text-white mb-2">{result.correct ? '✅ Correct' : '📖 Not quite'}</p>

          {!result.correct && Array.isArray(result.detail) && result.detail.length > 0 && (
            <div className="mb-3 rounded-lg bg-black/25 p-3">
              <p className="text-[11px] font-bold uppercase tracking-wider text-red-300 mb-1">What went wrong</p>
              {step.kind === 'classify' || step.kind === 'classify2' ? (
                <p className="text-sm text-slate-300">
                  {result.detail.length} to fix: <span className="text-white">{result.detail.join(', ')}</span>. The right answer is shown beside each.
                </p>
              ) : (
                <ul className="text-sm text-slate-300 space-y-1">
                  {result.detail.map((d, i) => <li key={i}>• {d}</li>)}
                </ul>
              )}
            </div>
          )}

          <p className="text-sm text-slate-300">{step.why}</p>

          {step.watchFor && (
            <div className="mt-3 pt-3 border-t border-white/10">
              <p className="text-[11px] font-bold uppercase tracking-wider text-amber-300 mb-1">👀 What to look out for</p>
              <p className="text-sm text-slate-300">{step.watchFor}</p>
            </div>
          )}

          {!result.correct && (
            <button
              onClick={() => {
                setChecked(p => { const n = { ...p }; delete n[step.id]; return n })
                setAnswers(p => { const n = { ...p }; delete n[step.id]; return n })
                setShowHint(false)
              }}
              className="mt-4 text-xs px-3 py-1.5 rounded-lg bg-white/10 text-slate-200 font-semibold hover:bg-white/20"
            >
              Try this one again
            </button>
          )}
        </div>
      )}

      {/* ── Controls ── */}
      <div className="flex gap-3">
        <button onClick={() => go(-1)} disabled={index === 0}
          className="px-4 py-3 rounded-xl bg-white/10 text-white font-semibold disabled:opacity-30 hover:bg-white/20">←</button>
        {!result ? (
          <button onClick={grade} disabled={!ready}
            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold hover:opacity-90 disabled:opacity-40">
            Check my answer
          </button>
        ) : !isLast ? (
          <button onClick={() => go(1)}
            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold hover:opacity-90">
            Next step →
          </button>
        ) : (
          <Link to="/problems"
            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold hover:opacity-90 text-center">
            Finish →
          </Link>
        )}
      </div>

      {answeredAll && (
        <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5 text-center">
          <p className="text-sm text-dim">You have worked every step of this problem.</p>
          <p className="text-2xl font-extrabold text-white my-1">{rightCount} of {set.steps.length} right first time</p>
          <div className="flex flex-col sm:flex-row gap-2 mt-3">
            <button onClick={() => { setAnswers({}); setChecked({}); setIndex(0) }}
              className="flex-1 py-2.5 rounded-xl bg-white/10 text-white font-semibold hover:bg-white/20">
              Work it again
            </button>
            <button onClick={() => navigate('/exam')}
              className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold hover:opacity-90">
              Go to the practice exam →
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useProgress } from '../context/ProgressContext'
import SourceCard from '../components/SourceCard'
import { QUESTIONS, SECTIONS, questionsFor, shuffle } from '../data/examQuestions'
import { LEVEL_QUESTIONS } from '../data/levelQuestions'
import { saveExamSession, loadExamSession, clearExamSession, describeAge } from '../lib/examSession'
import { shuffleOptions } from '../lib/shuffle'
import { useStagedHints, StagedHint, OptionAutopsy } from '../components/Hint'

const HARD_COUNT = QUESTIONS.filter(q => q.hard).length

const SCOPES = [
  { id: 'full', label: 'Full practice exam', icon: '📝', blurb: `All ${QUESTIONS.length} questions, every topic. The real rehearsal.` },
  { id: 'hard', label: 'Hard mode', icon: '🔥', blurb: `The ${HARD_COUNT} hardest questions — the ones where three options are true and only one answers what was asked.` },
  { id: 'quick', label: 'Quick 15', icon: '⚡', blurb: '15 questions pulled at random. Good for a five-minute review.' },
]

function OptionButton({ q, index, chosen, revealed, onPick }) {
  const isAnswer = revealed && index === q.correctIndex
  const isWrongPick = revealed && chosen === index && index !== q.correctIndex
  const selected = chosen === index
  const state = isAnswer ? 'border-green-500 bg-green-900/30'
    : isWrongPick ? 'border-red-500 bg-red-900/30'
    : revealed ? 'border-white/10 bg-white/5 opacity-60'
    : selected ? 'border-amber-500 bg-amber-900/30'
    : 'border-white/10 bg-white/5 hover:border-amber-400 hover:bg-white/10'
  return (
    <button
      onClick={() => onPick(index)}
      disabled={revealed}
      className={`w-full text-left rounded-xl border p-3 transition-colors ${state}`}
    >
      <div className="flex items-start gap-3">
        <span className={`text-xs font-bold mt-1 shrink-0 ${selected && !revealed ? 'text-amber-300' : 'text-slate-500'}`}>{'ABCD'[index]}</span>
        <div className="flex-1">
          <span className="text-sm text-white">{q.options[index]}</span>
        </div>
        {isAnswer && <span className="text-green-400">✓</span>}
        {isWrongPick && <span className="text-red-400">✗</span>}
      </div>
    </button>
  )
}

export default function PracticeExam() {
  const { progress, recordExam, needsWorkIds, clearMisses } = useProgress()
  const [stage, setStage] = useState('setup')
  const [mode, setMode] = useState('exam') // 'exam' = feedback at the end, 'practice' = instant
  const [scopeLabel, setScopeLabel] = useState('')
  const [questions, setQuestions] = useState([])
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [revealedIds, setRevealedIds] = useState([])
  const [saved, setSaved] = useState(() => loadExamSession([...QUESTIONS, ...LEVEL_QUESTIONS].map(q => q.id)))
  const hints = useStagedHints()

  const best = progress.exam?.best
  const attempts = progress.exam?.attempts || []
  const ALL_QUESTIONS = [...QUESTIONS, ...LEVEL_QUESTIONS]
  const weakIds = needsWorkIds().filter(id => ALL_QUESTIONS.some(q => q.id === id))
  // Group by exam topic, and by level for anything missed inside a level.
  const weakBySection = [
    ...SECTIONS.map(sec => ({
      ...sec,
      count: weakIds.filter(id => ALL_QUESTIONS.find(q => q.id === id)?.section === sec.id).length,
    })),
    ...[...new Set(LEVEL_QUESTIONS.map(q => q.section))].map(secId => {
      const first = LEVEL_QUESTIONS.find(q => q.section === secId)
      return {
        id: secId,
        icon: first.icon,
        label: `Level ${first.level}`,
        count: weakIds.filter(id => ALL_QUESTIONS.find(q => q.id === id)?.section === secId).length,
      }
    }),
  ].filter(w => w.count > 0)
  const weakFromLevels = weakIds.filter(id => id.startsWith('L')).length

  useEffect(() => {
    if (stage !== 'taking' || questions.length === 0) return
    saveExamSession({
      ids: questions.map(q => q.id),
      optionOrders: Object.fromEntries(questions.map(q => [q.id, q.optionOrder])),
      answers, revealedIds, index, mode, scopeLabel,
    })
  }, [stage, questions, answers, revealedIds, index, mode, scopeLabel])

  function resume() {
    // Both banks: a saved "questions I got wrong" round can contain level questions.
    const byId = Object.fromEntries(ALL_QUESTIONS.map(q => [q.id, q]))
    // Re-apply the stored option order; without it the saved answer indices
    // would point at different options than the student actually chose.
    setQuestions(saved.ids.map(id => shuffleOptions(byId[id], saved.optionOrders?.[id])))
    setAnswers(saved.answers)
    setRevealedIds(saved.revealedIds)
    setIndex(saved.index)
    setMode(saved.mode)
    setScopeLabel(saved.scopeLabel)
    setStage('taking')
  }

  function discardSaved() {
    clearExamSession()
    setSaved(null)
  }

  function startMisses() {
    const ids = needsWorkIds()
    const byId = Object.fromEntries(ALL_QUESTIONS.map(q => [q.id, q]))
    const picked = shuffle(ids.map(id => byId[id]).filter(Boolean)).map(q => shuffleOptions(q))
    if (picked.length === 0) return
    setQuestions(picked)
    setScopeLabel('Questions I got wrong')
    setIndex(0); setAnswers({}); setRevealedIds([]); setSaved(null); setStage('taking')
  }

  function start(scope, label) {
    const base = scope === 'quick' ? questionsFor('quick') : shuffle(questionsFor(scope))
    // Randomise which letter the answer sits behind, per attempt.
    const picked = base.map(q => shuffleOptions(q))
    setQuestions(picked)
    setScopeLabel(label)
    setIndex(0)
    setAnswers({})
    setRevealedIds([])
    setSaved(null)
    setStage('taking')
  }

  const q = questions[index]
  const revealed = mode === 'practice' && revealedIds.includes(q?.id)
  const answeredCount = Object.keys(answers).length
  const correctCount = questions.filter(item => answers[item.id] === item.correctIndex).length

  function pick(i) {
    setAnswers(prev => ({ ...prev, [q.id]: i }))
    if (mode === 'practice') setRevealedIds(prev => [...prev, q.id])
  }

  function submit() {
    const correct = questions.filter(item => answers[item.id] === item.correctIndex).length
    const score = Math.round((correct / questions.length) * 100)
    recordExam({
      score, correct, total: questions.length, label: scopeLabel,
      results: questions.map(item => ({ id: item.id, correct: answers[item.id] === item.correctIndex })),
    })
    clearExamSession()
    setSaved(null)
    setStage('results')
  }

  // ── Setup ───────────────────────────────────────────────────────────
  if (stage === 'setup') {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-4 py-1.5 text-sm text-amber-300 font-medium mb-4">
            <span>📝</span><span>Optional — but this is the one that matters</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">Practice Exam</h1>
          <p className="text-slate-400">
            Stimulus-based questions in the AP format — read the source, then answer. Every question tells you why afterward.
          </p>
          {best !== null && best !== undefined && (
            <p className="mt-4 inline-block rounded-full bg-green-500/10 border border-green-500/20 px-4 py-1.5 text-sm text-green-300 font-semibold">
              Best score so far: {best}%
            </p>
          )}
        </div>

        {weakIds.length > 0 && (
          <div className="rounded-2xl border border-rose-500/40 bg-rose-500/10 p-5 mb-6">
            <div className="flex items-start gap-3">
              <span className="text-2xl">🎯</span>
              <div className="flex-1">
                <p className="font-bold text-white">
                  {weakIds.length} question{weakIds.length === 1 ? '' : 's'} to work on
                </p>
                <p className="text-sm text-slate-300 mt-0.5">
                  Everything you missed last time you saw it — from the practice exam, the unit drills and the level quizzes alike.
                  {weakFromLevels > 0 && <> <span className="text-white font-semibold">{weakFromLevels}</span> came from level quizzes.</>}
                  {' '}Get one right and it drops off the list.
                </p>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {weakBySection.map(w => (
                    <span key={w.id} className="text-[11px] rounded-full bg-black/30 border border-white/10 px-2 py-1 text-slate-300">
                      {w.icon} {w.label} <span className="text-rose-300 font-semibold">{w.count}</span>
                    </span>
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row gap-2 mt-3">
                  <button onClick={startMisses} className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 text-white font-bold hover:opacity-90">
                    Drill these {weakIds.length} →
                  </button>
                  <button onClick={clearMisses} className="px-4 py-2.5 rounded-xl bg-white/10 text-slate-300 text-sm font-semibold hover:bg-white/20">
                    Clear list
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {saved && (
          <div className="rounded-2xl border border-amber-500/40 bg-amber-500/10 p-5 mb-6">
            <div className="flex items-start gap-3">
              <span className="text-2xl">⏸️</span>
              <div className="flex-1">
                <p className="font-bold text-white">You have an exam in progress</p>
                <p className="text-sm text-slate-300 mt-0.5">
                  {saved.scopeLabel} — {saved.answeredCount} of {saved.ids.length} answered, saved {describeAge(saved.savedAt)}.
                </p>
                <div className="flex flex-col sm:flex-row gap-2 mt-3">
                  <button onClick={resume} className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold hover:opacity-90">
                    Resume where I left off →
                  </button>
                  <button onClick={discardSaved} className="px-4 py-2.5 rounded-xl bg-white/10 text-slate-300 text-sm font-semibold hover:bg-white/20">
                    Discard it
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 mb-6">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">How do you want to take it?</p>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { id: 'exam', title: 'Exam mode', desc: 'No feedback until you submit. Closest to the real thing.' },
              { id: 'practice', title: 'Practice mode', desc: 'Shows the answer and the reason after every question.' },
            ].map(m => (
              <button
                key={m.id}
                onClick={() => setMode(m.id)}
                className={`text-left rounded-xl border p-4 transition-colors ${
                  mode === m.id ? 'border-amber-500 bg-amber-900/30' : 'border-white/10 bg-white/5 hover:border-amber-400'
                }`}
              >
                <p className="font-bold text-white text-sm mb-1">{m.title} {mode === m.id && <span className="text-amber-400">✓</span>}</p>
                <p className="text-xs text-slate-400">{m.desc}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3 mb-6">
          {SCOPES.map(s => (
            <button
              key={s.id}
              onClick={() => start(s.id, s.label)}
              className="w-full text-left rounded-2xl border border-white/10 bg-gradient-to-br from-amber-600/20 to-orange-600/20 p-5 hover:border-amber-400 transition-colors"
            >
              <div className="flex items-center gap-4">
                <span className="text-3xl">{s.icon}</span>
                <div className="flex-1">
                  <p className="font-bold text-white">{s.label}</p>
                  <p className="text-sm text-slate-400">{s.blurb}</p>
                </div>
                <span className="text-amber-400 font-bold">→</span>
              </div>
            </button>
          ))}
        </div>

        <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">Or drill one unit</p>
        <div className="grid sm:grid-cols-2 gap-3 mb-8">
          {SECTIONS.map(s => {
            const count = QUESTIONS.filter(qq => qq.section === s.id).length
            return (
              <button
                key={s.id}
                onClick={() => start(s.id, s.label)}
                className="text-left rounded-xl border border-white/10 bg-white/5 p-4 hover:border-amber-400 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xl">{s.icon}</span>
                  <p className="font-semibold text-white text-sm">{s.label}</p>
                  <span className="ml-auto text-xs text-slate-500">{count} Q</span>
                </div>
                <p className="text-xs text-slate-400">{s.blurb}</p>
              </button>
            )
          })}
        </div>

        {attempts.length > 0 && (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Recent attempts</p>
            <div className="divide-y divide-white/5">
              {attempts.slice(0, 5).map((a, i) => (
                <div key={i} className="py-2 flex items-center gap-3 text-sm">
                  <span className={`font-bold w-12 ${a.score >= 80 ? 'text-green-400' : a.score >= 60 ? 'text-amber-400' : 'text-red-400'}`}>{a.score}%</span>
                  <span className="text-slate-300 flex-1">{a.label}</span>
                  <span className="text-slate-500 text-xs">{a.correct}/{a.total}</span>
                  <span className="text-slate-600 text-xs hidden sm:inline">{new Date(a.date).toLocaleDateString()}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  // ── Results ─────────────────────────────────────────────────────────
  if (stage === 'results') {
    const score = Math.round((correctCount / questions.length) * 100)
    const presentSections = [...new Set(questions.map(q => q.section))]
    const bySection = presentSections.map(id => {
      const qs = questions.filter(item => item.section === id)
      const meta = SECTIONS.find(s => s.id === id) || { icon: qs[0]?.icon, label: qs[0]?.sectionLabel }
      return { id, ...meta, correct: qs.filter(item => answers[item.id] === item.correctIndex).length, total: qs.length }
    })

    return (
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">{score === 100 ? '🏆' : score >= 80 ? '🎉' : score >= 60 ? '📈' : '📚'}</div>
          <h1 className="text-3xl font-extrabold text-white mb-1">{scopeLabel}</h1>
          <p className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400 my-3">{score}%</p>
          <p className="text-slate-400">{correctCount} of {questions.length} correct</p>
          <p className="text-slate-400 text-sm mt-3 max-w-md mx-auto">
            {score === 100 ? 'Flawless. Walk into that exam.'
              : score >= 80 ? 'Exam-ready. Read the misses below and you are in great shape.'
              : score >= 60 ? 'Good foundation. The section breakdown shows exactly where to spend your time.'
              : 'Go back through the levels for your weakest section, then run this again — the questions come back in a new order.'}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 mb-6">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">By topic</p>
          <div className="space-y-3">
            {bySection.map(s => {
              const pct = Math.round((s.correct / s.total) * 100)
              return (
                <div key={s.id}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-300">{s.icon} {s.label}</span>
                    <span className={`font-semibold ${pct >= 80 ? 'text-green-400' : pct >= 60 ? 'text-amber-400' : 'text-red-400'}`}>
                      {s.correct}/{s.total}
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                    <div className={`h-full rounded-full ${pct >= 80 ? 'bg-green-500' : pct >= 60 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          {correctCount < questions.length && (
            <button onClick={startMisses} className="flex-1 py-3 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 text-white font-bold hover:opacity-90">
              Drill the {questions.length - correctCount} I missed →
            </button>
          )}
          <button onClick={() => setStage('setup')} className="flex-1 py-3 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold hover:opacity-90">
            Take Another →
          </button>
          <Link to="/cheatsheet" className="flex-1 py-3 rounded-xl bg-white/10 text-white font-semibold hover:bg-white/20 text-center">
            Open Cheat Sheet
          </Link>
        </div>

        <h2 className="font-bold text-white mb-3">Full review</h2>
        <div className="space-y-4">
          {questions.map((item, i) => {
            const chosen = answers[item.id]
            const right = chosen === item.correctIndex
            return (
              <div key={item.id} className={`rounded-xl border p-4 ${right ? 'border-green-700/50 bg-green-900/10' : 'border-red-700/50 bg-red-900/10'}`}>
                <div className="flex items-start gap-2 mb-2">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded ${right ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
                    {right ? '✓' : '✗'} {i + 1}
                  </span>
                  <p className="text-sm font-semibold text-white flex-1">{item.prompt}</p>
                </div>
                <div className="text-sm space-y-1 mb-2 pl-1">
                  <div className="flex gap-2">
                    <span className="text-slate-500 shrink-0 text-xs pt-0.5">Correct:</span>
                    <div className="flex-1">
                      <span className="text-green-300">{item.options[item.correctIndex]}</span>
                    </div>
                  </div>
                  {!right && (
                    <div className="flex gap-2">
                      <span className="text-slate-500 shrink-0 text-xs pt-0.5">You said:</span>
                      <div className="flex-1">
                        {chosen === undefined ? <span className="text-slate-500 italic">skipped</span>
                          : <span className="text-red-300">{item.options[chosen]}</span>}
                      </div>
                    </div>
                  )}
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">{item.explanation}</p>
                {!right && item.trap && (
                  <p className="text-xs text-amber-200/90 leading-relaxed mt-2">
                    <span className="font-semibold text-amber-300">Why people miss it: </span>{item.trap}
                  </p>
                )}
                {!right && Array.isArray(item.optionWhy) && chosen !== undefined && (
                  <p className="text-xs text-slate-300 leading-relaxed mt-2 rounded-lg bg-red-900/15 border border-red-600/30 p-2.5">
                    <span className="font-semibold text-red-300">Your answer: </span>{item.optionWhy[chosen]}
                  </p>
                )}
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  // ── Taking the exam ─────────────────────────────────────────────────
  const isLast = index === questions.length - 1
  const chosen = answers[q.id]
  const sectionMeta = SECTIONS.find(s => s.id === q.section) || { icon: q.icon, label: q.sectionLabel }

  return (
    <div className="max-w-xl mx-auto">
      <div className="mb-4">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-amber-400 font-semibold">Question {index + 1} of {questions.length}</span>
          <span className="text-slate-500">{answeredCount} answered</span>
        </div>
        <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
          <div className="h-full rounded-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-300" style={{ width: `${((index + 1) / questions.length) * 100}%` }} />
        </div>
      </div>

      {q.stimulus && (
        <div className="mb-4">
          <SourceCard {...q.stimulus} />
        </div>
      )}

      <div className="rounded-xl bg-white/5 border border-white/10 p-5 mb-5">
        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">
          {sectionMeta?.icon} {sectionMeta?.label}{q.skill && <span className="text-amber-500/70"> · {q.skill}</span>}
        </p>
        <p className="font-semibold text-white">{q.prompt}</p>
      </div>

      <div className="space-y-3 mb-5">
        {q.options.map((_, i) => (
          <OptionButton key={i} q={q} index={i} chosen={chosen} revealed={revealed} onPick={pick} />
        ))}
      </div>

      {mode === 'practice' && !revealed && (q.hints || q.hint) && (
        <StagedHint id={q.id} hints={q.hints || q.hint} shown={hints.revealed(q.id)}
          onReveal={() => hints.reveal(q.id)} onClose={() => hints.close(q.id)} className="mb-5" />
      )}

      {revealed && (
        <>
          <div className={`rounded-xl p-5 mb-4 ${chosen === q.correctIndex ? 'bg-green-900/30 border border-green-700' : 'bg-amber-900/30 border border-amber-700'}`}>
            <p className="font-bold text-white mb-2">{chosen === q.correctIndex ? '✅ Correct' : '📖 Not quite'}</p>
            <p className="text-sm text-slate-300">{q.explanation}</p>
          </div>
          {q.trap && (
            <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 mb-4">
              <p className="text-[10px] font-bold uppercase tracking-wider text-amber-300 mb-1">Why people miss this one</p>
              <p className="text-sm text-slate-300">{q.trap}</p>
            </div>
          )}
          <OptionAutopsy q={q} chosen={chosen} className="mb-5" />
        </>
      )}

      <div className="flex gap-3">
        <button
          onClick={() => setIndex(i => Math.max(0, i - 1))}
          disabled={index === 0}
          className="px-4 py-3 rounded-xl bg-white/10 text-white font-semibold disabled:opacity-30 hover:bg-white/20"
        >
          ←
        </button>
        {!isLast ? (
          <button
            onClick={() => setIndex(i => i + 1)}
            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold hover:opacity-90"
          >
            {chosen === undefined ? 'Skip for now →' : 'Next Question →'}
          </button>
        ) : (
          <button
            onClick={submit}
            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold hover:opacity-90"
          >
            Submit &amp; See Score →
          </button>
        )}
      </div>

      {answeredCount < questions.length && isLast && (
        <p className="text-xs text-amber-400 text-center mt-3">
          {questions.length - answeredCount} question{questions.length - answeredCount === 1 ? '' : 's'} still unanswered — use ← to go back.
        </p>
      )}
      <button
        onClick={() => { clearExamSession(); setSaved(null); setStage('setup') }}
        className="w-full mt-4 text-xs text-slate-600 hover:text-slate-400"
      >
        Quit and start over
      </button>
      <p className="text-[10px] text-slate-600 text-center mt-2">
        Your place is saved automatically — you can close this and come back to it.
      </p>
    </div>
  )
}

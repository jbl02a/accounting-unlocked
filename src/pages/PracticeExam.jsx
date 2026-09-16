import { useState, useEffect } from 'react'
import { useScrollTop } from '../lib/useScrollTop'
import { Link } from 'react-router-dom'
import { useProgress } from '../context/ProgressContext'
import EntryTable from '../components/EntryTable'
import { QUESTIONS, SECTIONS, questionsFor, shuffle } from '../data/examQuestions'
import { LEVEL_QUESTIONS } from '../data/levelQuestions'
import { ALL_EXAM_QUESTIONS, questionsForTopic, weakSections, buildFocusTest, dedupeByPrompt } from '../lib/focus'
import { saveExamSession, loadExamSession, clearExamSession, describeAge } from '../lib/examSession'
import { shuffleOptions } from '../lib/shuffle'

const SCOPES = [
  { id: 'full', label: 'Full practice exam', icon: '📝', blurb: `All ${QUESTIONS.length} questions, every topic. The real rehearsal.` },
  { id: 'quick', label: 'Quick 15', icon: '⚡', blurb: '15 questions pulled at random. Good for a five-minute review.' },
]

function OptionButton({ q, index, chosen, revealed, onPick }) {
  const isAnswer = revealed && index === q.correctIndex
  const isWrongPick = revealed && chosen === index && index !== q.correctIndex
  const selected = chosen === index
  const state = isAnswer ? 'border-green-500 bg-green-900/30'
    : isWrongPick ? 'border-red-500 bg-red-900/30'
    : revealed ? 'border-white/10 bg-white/5 opacity-60'
    : selected ? 'border-indigo-500 bg-indigo-900/30'
    : 'border-white/10 bg-white/5 hover:border-indigo-400 hover:bg-white/10'
  return (
    <button
      onClick={() => onPick(index)}
      disabled={revealed}
      className={`w-full text-left rounded-xl border p-3 transition-colors ${state}`}
    >
      <div className="flex items-start gap-3">
        <span className={`text-xs font-bold mt-1 shrink-0 ${selected && !revealed ? 'text-indigo-300' : 'text-dim'}`}>{'ABCD'[index]}</span>
        <div className="flex-1">
          {q.kind === 'entry' ? <EntryTable lines={q.options[index]} dense /> : <span className="text-sm text-white">{q.options[index]}</span>}
        </div>
        {isAnswer && <span className="text-green-400">✓</span>}
        {isWrongPick && <span className="text-red-400">✗</span>}
      </div>
    </button>
  )
}

export default function PracticeExam() {
  const { progress, recordExam, needsWorkIds, reviewedIds, setHold, isHeld, clearMisses } = useProgress()
  const [stage, setStage] = useState('setup')
  const [mode, setMode] = useState('exam') // 'exam' = feedback at the end, 'practice' = instant
  const [scopeLabel, setScopeLabel] = useState('')
  // 'exam' only for the full 79-question run — the one whose score is comparable
  // across attempts. Everything else is a drill and must not move the best score.
  const [scopeKind, setScopeKind] = useState('drill')
  const [questions, setQuestions] = useState([])
  const [index, setIndex] = useState(0)
  useScrollTop([stage, index])
  const [answers, setAnswers] = useState({})
  const [revealedIds, setRevealedIds] = useState([])
  const [saved, setSaved] = useState(() => loadExamSession([...ALL_EXAM_QUESTIONS, ...LEVEL_QUESTIONS].map(q => q.id)))

  const best = progress.exam?.best
  const attempts = progress.exam?.attempts || []
  const ALL_QUESTIONS = [...ALL_EXAM_QUESTIONS, ...LEVEL_QUESTIONS]
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
  const reviewed = reviewedIds().filter(id => ALL_QUESTIONS.some(q => q.id === id))
  const weakTopics = weakSections(progress.misses)
  const focusCount = weakTopics.length > 0 ? buildFocusTest(weakTopics.map(t => t.id), progress.misses).length : 0

  useEffect(() => {
    if (stage !== 'taking' || questions.length === 0) return
    saveExamSession({
      ids: questions.map(q => q.id),
      optionOrders: Object.fromEntries(questions.map(q => [q.id, q.optionOrder])),
      answers, revealedIds, index, mode, scopeLabel, scopeKind,
    })
  }, [stage, questions, answers, revealedIds, index, mode, scopeLabel, scopeKind])

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
    setScopeKind(saved.scopeKind)
    setStage('taking')
  }

  function discardSaved() {
    clearExamSession()
    setSaved(null)
  }

  function startMisses() {
    const ids = needsWorkIds()
    const byId = Object.fromEntries(ALL_QUESTIONS.map(q => [q.id, q]))
    const picked = dedupeByPrompt(shuffle(ids.map(id => byId[id]).filter(Boolean))).map(q => shuffleOptions(q))
    if (picked.length === 0) return
    setQuestions(picked)
    setScopeLabel('Questions I got wrong')
    setScopeKind('drill')
    // Always instant feedback. A drill exists to fix a misunderstanding, so the
    // reason has to arrive at the question that exposed it — not on a results
    // screen twenty questions later. The Exam/Practice toggle governs the graded
    // exam and the topic drills; it does not apply here.
    setMode('practice')
    setIndex(0); setAnswers({}); setRevealedIds([]); setSaved(null); setStage('taking')
  }

  function startReviewed() {
    const byId = Object.fromEntries(ALL_QUESTIONS.map(q => [q.id, q]))
    const picked = dedupeByPrompt(shuffle(reviewed.map(id => byId[id]).filter(Boolean))).map(q => shuffleOptions(q))
    if (picked.length === 0) return
    setQuestions(picked)
    setScopeLabel('Reviewed — a second look')
    setScopeKind('drill')
    setMode('practice')
    setIndex(0); setAnswers({}); setRevealedIds([]); setSaved(null); setStage('taking')
  }

  // Only the topics he is below 80% on, mostly questions he has not seen before.
  function startFocus() {
    const picked = buildFocusTest(weakTopics.map(t => t.id), progress.misses).map(q => shuffleOptions(q))
    if (picked.length === 0) return
    setQuestions(picked)
    setScopeLabel('Focus test — weak topics')
    setScopeKind('drill')
    setMode('practice')   // same reasoning as startMisses
    setIndex(0); setAnswers({}); setRevealedIds([]); setSaved(null); setStage('taking')
  }

  function start(scope, label) {
    // 'full' and 'quick' stay inside the 79-question exam so scores compare across
    // attempts; a single-topic drill gets the reinforcement questions as well.
    const base = scope === 'full' || scope === 'quick'
      ? (scope === 'quick' ? questionsFor('quick') : shuffle(questionsFor('full')))
      : shuffle(questionsForTopic(scope))
    // Randomise which letter the answer sits behind, per attempt.
    const picked = base.map(q => shuffleOptions(q))
    setQuestions(picked)
    setScopeLabel(label)
    setScopeKind(scope === 'full' ? 'exam' : 'drill')
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
      score, correct, total: questions.length, label: scopeLabel, kind: scopeKind,
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
          <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-4 py-1.5 text-sm text-indigo-300 font-medium mb-4">
            <span>📝</span><span>Optional — but this is the one that matters</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">Practice Exam</h1>
          <p className="text-dim">
            Transactions in plain English. You pick the right account, the right entry, the right column.
            Every question tells you why afterward.
          </p>
          {best !== null && best !== undefined && (
            <p className="mt-4 inline-block rounded-full bg-green-500/10 border border-green-500/20 px-4 py-1.5 text-sm text-green-300 font-semibold">
              Best on the full exam: {best}%
            </p>
          )}
        </div>

        {weakIds.length > 0 && (
          <div className="rounded-2xl border border-rose-500/40 bg-rose-500/10 p-5 mb-6">
            <div className="flex items-start gap-3">
              <span className="text-2xl">🎯</span>
              <div className="flex-1">
                {weakTopics.length > 0 && (
                  <p className="text-[10px] font-bold uppercase tracking-wider text-rose-300 mb-1">Start here</p>
                )}
                <p className="font-bold text-white">
                  {weakIds.length} question{weakIds.length === 1 ? '' : 's'} to work on
                </p>
                <p className="text-sm text-slate-300 mt-0.5">
                  Everything you missed last time you saw it — from the exam, the topic drills and the level quizzes alike.
                  {weakFromLevels > 0 && <> <span className="text-white font-semibold">{weakFromLevels}</span> came from level quizzes.</>}
                  {' '}You get the answer and the reason straight after each one. Get one right and it
                  moves to Reviewed — unless you tap “keep it on my list”, which holds it here until
                  you say you have it.
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

        {weakTopics.length > 0 && (
          <div className="rounded-2xl border border-cyan-500/40 bg-cyan-500/10 p-5 mb-6">
            <div className="flex items-start gap-3">
              <span className="text-2xl">🔬</span>
              <div className="flex-1">
                {weakIds.length > 0 && (
                  <p className="text-[10px] font-bold uppercase tracking-wider text-cyan-300 mb-1">Then this</p>
                )}
                <p className="font-bold text-white">Focus test — your weak topics</p>
                <p className="text-sm text-slate-300 mt-0.5">
                  {focusCount} questions drawn only from the topics you are scoring under 80% on, across everything
                  you have answered so far. Mostly examples you have not seen before, plus the ones you actually
                  missed — so it tests the idea, not your memory of one question. It gives you the
                  answer and the reason straight after every question.
                </p>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {weakTopics.map(t => (
                    <span
                      key={t.id}
                      className={`text-[11px] rounded-full px-2 py-1 border ${
                        t.band === 'red'
                          ? 'bg-red-500/15 border-red-500/40 text-red-200'
                          : 'bg-amber-500/15 border-amber-500/40 text-amber-200'
                      }`}
                    >
                      {t.icon} {t.label} <span className="font-semibold">{t.pct}%</span>
                    </span>
                  ))}
                </div>
                <button onClick={startFocus} className="w-full mt-3 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-sky-600 text-white font-bold hover:opacity-90">
                  Start focus test ({focusCount}) →
                </button>
                <p className="text-[11px] text-dim mt-2">
                  {weakIds.length > 0
                    ? `Worth doing after the ${weakIds.length} above — that drill fixes the ones you got wrong, this one checks the idea stuck on questions you have not seen.`
                    : `It does not replace the full exam — that one stays ${QUESTIONS.length} questions so your scores stay comparable.`}
                </p>
              </div>
            </div>
          </div>
        )}

        {reviewed.length > 0 && (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 mb-6">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-xl">✅</span>
              <div className="flex-1 min-w-[12rem]">
                <p className="font-bold text-white text-sm">
                  {reviewed.length} reviewed
                </p>
                <p className="text-xs text-dim">
                  Missed once, since answered right. Nothing is ever deleted — come back whenever you
                  want to check they stuck.
                </p>
              </div>
              <button
                onClick={startReviewed}
                className="px-4 py-2 rounded-xl bg-white/10 text-slate-200 text-sm font-semibold hover:bg-white/20"
              >
                Drill these {reviewed.length} again →
              </button>
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
          <p className="text-xs font-bold uppercase tracking-wider text-dim mb-1">How do you want to take it?</p>
          <p className="text-xs text-dim mb-3">
            This sets the full exam, the Quick 15 and the topic drills. The focus test and the
            “questions I got wrong” drill always explain as you go.
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { id: 'exam', title: 'Exam mode', desc: 'No feedback until you submit. Closest to the real thing.' },
              { id: 'practice', title: 'Practice mode', desc: 'Shows the answer and the reason after every question.' },
            ].map(m => (
              <button
                key={m.id}
                onClick={() => setMode(m.id)}
                className={`text-left rounded-xl border p-4 transition-colors ${
                  mode === m.id ? 'border-indigo-500 bg-indigo-900/30' : 'border-white/10 bg-white/5 hover:border-indigo-400'
                }`}
              >
                <p className="font-bold text-white text-sm mb-1">{m.title} {mode === m.id && <span className="text-indigo-400">✓</span>}</p>
                <p className="text-xs text-dim">{m.desc}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3 mb-6">
          {SCOPES.map(s => (
            <button
              key={s.id}
              onClick={() => start(s.id, s.label)}
              className="w-full text-left rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-600/20 to-purple-600/20 p-5 hover:border-indigo-400 transition-colors"
            >
              <div className="flex items-center gap-4">
                <span className="text-3xl">{s.icon}</span>
                <div className="flex-1">
                  <p className="font-bold text-white">{s.label}</p>
                  <p className="text-sm text-dim">{s.blurb}</p>
                </div>
                <span className="text-indigo-400 font-bold">→</span>
              </div>
            </button>
          ))}
        </div>

        <p className="text-xs font-bold uppercase tracking-wider text-dim mb-1">Or drill one topic</p>
        <p className="text-xs text-dim mb-3">
          These pull from the exam bank and the extra practice questions together, so a topic drill goes
          further than the exam does on that topic.
        </p>
        <div className="grid sm:grid-cols-2 gap-3 mb-8">
          {SECTIONS.map(s => {
            const count = questionsForTopic(s.id).length
            return (
              <button
                key={s.id}
                onClick={() => start(s.id, s.label)}
                className="text-left rounded-xl border border-white/10 bg-white/5 p-4 hover:border-indigo-400 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xl">{s.icon}</span>
                  <p className="font-semibold text-white text-sm">{s.label}</p>
                  <span className="ml-auto text-xs text-dim">{count} Q</span>
                </div>
                <p className="text-xs text-dim">{s.blurb}</p>
              </button>
            )
          })}
        </div>

        {attempts.length > 0 && (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-dim mb-3">Recent attempts</p>
            <div className="divide-y divide-white/5">
              {attempts.slice(0, 5).map((a, i) => (
                <div key={i} className="py-2 flex items-center gap-3 text-sm">
                  <span className={`font-bold w-12 ${a.score >= 80 ? 'text-green-400' : a.score >= 60 ? 'text-amber-400' : 'text-red-400'}`}>{a.score}%</span>
                  <span className="text-slate-300 flex-1">
                    {a.label}
                    {a.kind === 'exam' && <span className="ml-1.5 text-[10px] text-indigo-300 font-semibold">GRADED</span>}
                  </span>
                  <span className="text-dim text-xs">{a.correct}/{a.total}</span>
                  <span className="text-dim text-xs hidden sm:inline">{new Date(a.date).toLocaleDateString()}</span>
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
          <p className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 my-3">{score}%</p>
          <p className="text-dim">{correctCount} of {questions.length} correct</p>
          <p className="text-dim text-sm mt-3 max-w-md mx-auto">
            {score === 100 ? 'Flawless. Walk into that exam.'
              : score >= 80 ? 'Exam-ready. Read the misses below and you are in great shape.'
              : score >= 60 ? 'Good foundation. The section breakdown shows exactly where to spend your time.'
              : 'Go back through the levels for your weakest section, then run this again — the questions come back in a new order.'}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 mb-6">
          <p className="text-xs font-bold uppercase tracking-wider text-dim mb-3">By topic</p>
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
          {weakTopics.length > 0 && (
            <button onClick={startFocus} className="flex-1 py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-sky-600 text-white font-bold hover:opacity-90">
              Focus test on my weak topics ({focusCount}) →
            </button>
          )}
          <button onClick={() => setStage('setup')} className="flex-1 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold hover:opacity-90">
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
                    <span className="text-dim shrink-0 text-xs pt-0.5">Correct:</span>
                    <div className="flex-1">
                      {item.kind === 'entry'
                        ? <EntryTable lines={item.options[item.correctIndex]} dense />
                        : <span className="text-green-300">{item.options[item.correctIndex]}</span>}
                    </div>
                  </div>
                  {!right && (
                    <div className="flex gap-2">
                      <span className="text-dim shrink-0 text-xs pt-0.5">You said:</span>
                      <div className="flex-1">
                        {chosen === undefined ? <span className="text-dim italic">skipped</span>
                          : item.kind === 'entry'
                            ? <EntryTable lines={item.options[chosen]} dense />
                            : <span className="text-red-300">{item.options[chosen]}</span>}
                      </div>
                    </div>
                  )}
                </div>
                <p className="text-xs text-dim leading-relaxed">{item.explanation}</p>

                {/* In exam mode this review is the only place he sees the answers,
                    so the "I got that right but I guessed" escape hatch lives here too. */}
                {right && (
                  isHeld(item.id) ? (
                    <button
                      onClick={() => setHold(item.id, false)}
                      className="mt-2 text-[11px] px-2.5 py-1 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-200 font-semibold hover:bg-amber-500/30"
                    >
                      📌 Kept on your list — tap to retire
                    </button>
                  ) : (
                    <button
                      onClick={() => setHold(item.id, true)}
                      className="mt-2 text-[11px] px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-dim font-semibold hover:bg-white/10 hover:text-slate-200"
                    >
                      📌 Not sure — keep it on my list
                    </button>
                  )
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
          <span className="text-indigo-400 font-semibold">Question {index + 1} of {questions.length}</span>
          <span className="text-dim">{answeredCount} answered</span>
        </div>
        <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
          <div className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300" style={{ width: `${((index + 1) / questions.length) * 100}%` }} />
        </div>
      </div>

      <div className="rounded-xl bg-white/5 border border-white/10 p-5 mb-5">
        <p className="text-[10px] font-bold uppercase tracking-wider text-dim mb-2">{sectionMeta?.icon} {sectionMeta?.label}</p>
        <p className="font-semibold text-white">{q.prompt}</p>
      </div>

      <div className="space-y-3 mb-5">
        {q.options.map((_, i) => (
          <OptionButton key={i} q={q} index={i} chosen={chosen} revealed={revealed} onPick={pick} />
        ))}
      </div>

      {revealed && (
        <div className={`rounded-xl p-5 mb-5 ${chosen === q.correctIndex ? 'bg-green-900/30 border border-green-700' : 'bg-amber-900/30 border border-amber-700'}`}>
          <p className="font-bold text-white mb-2">{chosen === q.correctIndex ? '✅ Correct' : '📖 Not quite'}</p>
          <p className="text-sm text-slate-300">{q.explanation}</p>

          {/* Being right once is weak evidence of understanding. He decides whether
              it is retired, not the scoreboard. A wrong answer needs no control —
              it stays on the list either way. */}
          {chosen === q.correctIndex && (
            <div className="mt-4 pt-3 border-t border-white/10">
              {isHeld(q.id) ? (
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs text-amber-300 font-semibold">📌 Kept on your list</span>
                  <button
                    onClick={() => setHold(q.id, false)}
                    className="text-xs px-3 py-1.5 rounded-lg bg-white/10 text-slate-200 font-semibold hover:bg-white/20"
                  >
                    Actually, I've got this
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs text-dim">Sure about that one?</span>
                  <button
                    onClick={() => setHold(q.id, true)}
                    className="text-xs px-3 py-1.5 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-200 font-semibold hover:bg-amber-500/30"
                  >
                    📌 Not yet — keep it on my list
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
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
            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold hover:opacity-90"
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
        className="w-full mt-4 text-xs text-dim hover:text-white"
      >
        Quit and start over
      </button>
      <p className="text-[10px] text-dim text-center mt-2">
        Your place is saved automatically — you can close this and come back to it.
      </p>
    </div>
  )
}

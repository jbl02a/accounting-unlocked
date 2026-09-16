// An in-progress exam lives in React state, which dies with the tab. This keeps a
// lightweight snapshot in localStorage so a half-finished attempt can be resumed.
// Only question IDs are stored, not question objects, so edits to the bank never
// resurrect stale wording — anything that no longer exists is simply dropped.
const KEY = 'accounting-unlocked-exam-session'
const MAX_AGE_MS = 1000 * 60 * 60 * 24 * 14 // a fortnight; older than that, start fresh

export function saveExamSession(session) {
  try {
    localStorage.setItem(KEY, JSON.stringify({ ...session, savedAt: Date.now() }))
  } catch {
    /* storage full or blocked — resuming is a convenience, never a requirement */
  }
}

export function loadExamSession(validIds) {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return null
    const s = JSON.parse(raw)
    if (!s || !Array.isArray(s.ids) || s.ids.length === 0) return null
    if (typeof s.savedAt === 'number' && Date.now() - s.savedAt > MAX_AGE_MS) {
      clearExamSession()
      return null
    }
    // Drop any question that has since been removed or renamed.
    const ids = s.ids.filter(id => validIds.includes(id))
    if (ids.length === 0) { clearExamSession(); return null }
    const answers = {}
    for (const [id, v] of Object.entries(s.answers || {})) {
      if (ids.includes(id)) answers[id] = v
    }
    const optionOrders = {}
    for (const [id, order] of Object.entries(s.optionOrders || {})) {
      if (ids.includes(id) && Array.isArray(order)) optionOrders[id] = order
    }
    return {
      ids,
      optionOrders,
      answers,
      revealedIds: (s.revealedIds || []).filter(id => ids.includes(id)),
      index: Math.min(Math.max(0, Number(s.index) || 0), ids.length - 1),
      mode: s.mode === 'practice' ? 'practice' : 'exam',
      scopeLabel: typeof s.scopeLabel === 'string' ? s.scopeLabel : 'Practice exam',
      // Whether this attempt counts toward the best score. Anything unrecognized
      // is a drill: misclassifying a drill as an exam inflates the record, while
      // the reverse just means one exam does not raise it.
      scopeKind: s.scopeKind === 'exam' ? 'exam' : 'drill',
      answeredCount: Object.keys(answers).length,
      savedAt: s.savedAt,
    }
  } catch {
    return null
  }
}

export function clearExamSession() {
  try { localStorage.removeItem(KEY) } catch { /* nothing to do */ }
}

export function describeAge(savedAt) {
  if (!savedAt) return ''
  const mins = Math.round((Date.now() - savedAt) / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins} minute${mins === 1 ? '' : 's'} ago`
  const hrs = Math.round(mins / 60)
  if (hrs < 24) return `${hrs} hour${hrs === 1 ? '' : 's'} ago`
  const days = Math.round(hrs / 24)
  return `${days} day${days === 1 ? '' : 's'} ago`
}

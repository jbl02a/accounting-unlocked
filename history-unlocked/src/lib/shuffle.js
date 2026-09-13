// Every question in this app was authored with the correct answer written first,
// which made the answer position a giveaway. These helpers randomise option order
// at runtime and remap the answer index, so authoring order never leaks.

export function permutation(n, rand = Math.random) {
  const order = Array.from({ length: n }, (_, i) => i)
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1))
    ;[order[i], order[j]] = [order[j], order[i]]
  }
  return order
}

export function applyPermutation(arr, order) {
  return order.map(i => arr[i])
}

export function shuffled(arr, rand = Math.random) {
  return applyPermutation(arr, permutation(arr.length, rand))
}

// Multiple-choice: reorder options and move correctIndex to follow its option.
// Pass a stored `order` to reproduce an earlier layout (used when resuming an exam).
//
// `optionWhy` is index-aligned with `options` — the per-option rationale shown after
// answering — so it MUST be permuted with them. Forget that and every wrong answer
// gets explained as though it were a different wrong answer.
export function shuffleOptions(q, order) {
  const perm = order && order.length === q.options.length ? order : permutation(q.options.length)
  const out = {
    ...q,
    options: applyPermutation(q.options, perm),
    correctIndex: perm.indexOf(q.correctIndex),
    optionOrder: perm,
  }
  if (Array.isArray(q.optionWhy)) out.optionWhy = applyPermutation(q.optionWhy, perm)
  return out
}

// Dropdown lists and account pools are compared by NAME, not index, so they can be
// shuffled freely without touching the answer.
export function shuffleFields(obj, fields) {
  const out = { ...obj }
  for (const f of fields) if (Array.isArray(out[f])) out[f] = shuffled(out[f])
  return out
}

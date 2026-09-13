import { useEffect } from 'react'

// Several screens live behind one URL — a level runs lesson → drill → results, and
// the exam runs setup → taking → done. The browser keeps the scroll offset across
// those, so tapping "Practice" at the bottom of a long lesson used to drop you at the
// bottom of the drill. Call this with whatever state marks a new screen.
export function useScrollTop(deps) {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

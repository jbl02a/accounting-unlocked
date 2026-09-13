import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// A browser preserves scroll position when the URL changes, which is right for a
// document and wrong for an app: tapping a level card from the bottom of the home
// page used to land you at the bottom of the lesson.
export default function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname])
  return null
}

import { useEffect } from 'react'
import { useRegisterSW } from 'virtual:pwa-register/react'

// Shows a banner when a new version has been downloaded and is waiting. Nothing
// changes under the student's feet — the swap only happens when they tap Refresh.
export default function UpdatePrompt() {
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisteredSW(_url, registration) {
      // Check for a new version on load and hourly after that, so a long-lived
      // installed app still notices releases without being reopened.
      if (!registration) return
      setInterval(() => registration.update().catch(() => {}), 60 * 60 * 1000)
    },
  })

  // The offline notice is pure FYI and sits over the bottom of the page, where the
  // primary action button usually is — so it retires itself rather than blocking taps.
  useEffect(() => {
    if (!offlineReady || needRefresh) return
    const t = setTimeout(() => setOfflineReady(false), 5000)
    return () => clearTimeout(t)
  }, [offlineReady, needRefresh, setOfflineReady])

  if (!needRefresh && !offlineReady) return null

  if (needRefresh) {
    return (
      <div className="fixed inset-x-0 bottom-0 z-[60] p-3 sm:p-4 pointer-events-none">
        <div className="max-w-md mx-auto rounded-2xl border border-indigo-400/40 bg-[#161629] shadow-2xl shadow-black/60 p-4 pointer-events-auto">
          <div className="flex items-start gap-3">
            <span className="text-2xl">✨</span>
            <div className="flex-1">
              <p className="font-bold text-white text-sm">A new version is ready</p>
              <p className="text-xs text-slate-400 mt-0.5">
                Refresh to get the latest lessons and fixes. Your progress is kept.
              </p>
            </div>
          </div>
          <div className="flex gap-2 mt-3">
            <button
              onClick={() => updateServiceWorker(true)}
              className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-sm hover:opacity-90"
            >
              Refresh now
            </button>
            <button
              onClick={() => setNeedRefresh(false)}
              className="px-4 py-2.5 rounded-xl bg-white/10 text-slate-300 text-sm font-semibold hover:bg-white/20"
            >
              Later
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] p-3 sm:p-4 pointer-events-none">
      <div className="max-w-md mx-auto rounded-2xl border border-green-500/30 bg-[#161629] shadow-2xl shadow-black/60 px-4 py-3 flex items-center gap-3 pointer-events-auto">
        <span className="text-xl">📥</span>
        <p className="text-sm text-slate-200 flex-1">Ready to use offline.</p>
        <button onClick={() => setOfflineReady(false)} className="text-xs text-slate-500 hover:text-white">Dismiss</button>
      </div>
    </div>
  )
}

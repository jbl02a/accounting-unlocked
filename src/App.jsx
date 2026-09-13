import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import { ProgressProvider } from './context/ProgressContext'
import Navbar from './components/Navbar'
import ScrollToTop from './components/ScrollToTop'
import UpdatePrompt from './components/UpdatePrompt'
import Home from './pages/Home'
import CheatSheet from './pages/CheatSheet'
import CramSheet from './pages/CramSheet'
import Worksheet from './pages/Worksheet'
import PracticeExam from './pages/PracticeExam'
import Level1 from './pages/levels/Level1'
import Level2 from './pages/levels/Level2'
import Level3 from './pages/levels/Level3'
import Level4 from './pages/levels/Level4'
import Level5 from './pages/levels/Level5'
import Level6 from './pages/levels/Level6'
import Level7 from './pages/levels/Level7'
import Level8 from './pages/levels/Level8'
import Level9 from './pages/levels/Level9'
import Level10 from './pages/levels/Level10'
import Level11 from './pages/levels/Level11'
import Level12 from './pages/levels/Level12'
import Level13 from './pages/levels/Level13'
import Level14 from './pages/levels/Level14'
import Level15 from './pages/levels/Level15'
import Level16 from './pages/levels/Level16'
import Level17 from './pages/levels/Level17'

export default function App() {
  return (
    <ProgressProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen bg-gradient-to-br from-[#0f0f1a] via-[#141428] to-[#0f0f1a]">
          <Navbar />
          <UpdatePrompt />
          {/* Vercel Web Analytics. Cookieless and no personal data — visitors are
              counted with a daily-rotating hash, which matters because the people
              using this are children. It reports page views and unique visitors to
              the Vercel dashboard; it stores nothing in the app and shows nothing to
              the student. No-ops off Vercel, so local dev and preview are unaffected. */}
          <Analytics />
          <main className="max-w-5xl mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cheatsheet" element={<CheatSheet />} />
              <Route path="/cram" element={<CramSheet />} />
              <Route path="/worksheet" element={<Worksheet />} />
              <Route path="/exam" element={<PracticeExam />} />
              <Route path="/level/1" element={<Level1 />} />
              <Route path="/level/2" element={<Level2 />} />
              <Route path="/level/3" element={<Level3 />} />
              <Route path="/level/4" element={<Level4 />} />
              <Route path="/level/5" element={<Level5 />} />
              <Route path="/level/6" element={<Level6 />} />
              <Route path="/level/7" element={<Level7 />} />
              <Route path="/level/8" element={<Level8 />} />
              <Route path="/level/9" element={<Level9 />} />
              <Route path="/level/10" element={<Level10 />} />
              <Route path="/level/11" element={<Level11 />} />
              <Route path="/level/12" element={<Level12 />} />
              <Route path="/level/13" element={<Level13 />} />
              <Route path="/level/14" element={<Level14 />} />
              <Route path="/level/15" element={<Level15 />} />
              <Route path="/level/16" element={<Level16 />} />
              <Route path="/level/17" element={<Level17 />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </ProgressProvider>
  )
}

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ProgressProvider } from './context/ProgressContext'
import Navbar from './components/Navbar'
import UpdatePrompt from './components/UpdatePrompt'
import Home from './pages/Home'
import PracticeExam from './pages/PracticeExam'
import Timeline from './pages/Timeline'
import CramSheet from './pages/CramSheet'
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

export default function App() {
  return (
    <ProgressProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gradient-to-br from-[#14100c] via-[#1c1710] to-[#14100c]">
          <Navbar />
          <UpdatePrompt />
          <main className="max-w-5xl mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/exam" element={<PracticeExam />} />
              <Route path="/timeline" element={<Timeline />} />
              <Route path="/cram" element={<CramSheet />} />
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
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </ProgressProvider>
  )
}

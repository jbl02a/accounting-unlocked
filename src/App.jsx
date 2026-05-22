import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ProgressProvider } from './context/ProgressContext'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import CheatSheet from './pages/CheatSheet'
import Level1 from './pages/levels/Level1'
import Level2 from './pages/levels/Level2'
import Level3 from './pages/levels/Level3'
import Level4 from './pages/levels/Level4'
import Level5 from './pages/levels/Level5'

export default function App() {
  return (
    <ProgressProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gradient-to-br from-[#0f0f1a] via-[#141428] to-[#0f0f1a]">
          <Navbar />
          <main className="max-w-5xl mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cheatsheet" element={<CheatSheet />} />
              <Route path="/level/1" element={<Level1 />} />
              <Route path="/level/2" element={<Level2 />} />
              <Route path="/level/3" element={<Level3 />} />
              <Route path="/level/4" element={<Level4 />} />
              <Route path="/level/5" element={<Level5 />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </ProgressProvider>
  )
}

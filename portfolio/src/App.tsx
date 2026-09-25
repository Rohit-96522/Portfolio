import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { IntroAnimation } from './components/IntroAnimation'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { HeroPage } from './pages/HeroPage'
import { AboutPage } from './pages/AboutPage'
import { ProjectsPage } from './pages/ProjectsPage'
import { ArtPage } from './pages/ArtPage'
import { VisitorsPage } from './pages/VisitorsPage'
import { useTheme } from './hooks/useTheme'

export default function App() {
  const { themePreference, setTheme } = useTheme()
  const [introFinished, setIntroFinished] = useState(false)

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 selection:bg-neutral-900 selection:text-white dark:selection:bg-white dark:selection:text-neutral-900 transition-colors duration-200">
        {!introFinished && (
          <IntroAnimation onComplete={() => setIntroFinished(true)} />
        )}

        <div
          className={introFinished ? 'transition-all duration-700 ease-out flex flex-col min-h-screen opacity-100 translate-y-0' : 'transition-all duration-700 ease-out flex flex-col min-h-screen opacity-0 translate-y-2 pointer-events-none'}
        >
          <Navbar themePreference={themePreference} onSelectTheme={setTheme} />

          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HeroPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/art" element={<ArtPage />} />
              <Route path="/visitors" element={<VisitorsPage />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </div>
    </BrowserRouter>
  )
}
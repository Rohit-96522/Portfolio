import { useState } from 'react'
import { IntroAnimation } from './components/IntroAnimation'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { GitHubActivity } from './components/GitHubActivity'
import { Technologies } from './components/Technologies'
import { Projects } from './components/Projects'
import { Certifications } from './components/Certifications'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { useTheme } from './hooks/useTheme'

export default function App() {
  const { themePreference, setTheme } = useTheme()
  const [introFinished, setIntroFinished] = useState(false)

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 selection:bg-neutral-900 selection:text-white dark:selection:bg-white dark:selection:text-neutral-900 transition-colors duration-200">
      {/* Intro Animation Overlay */}
      {!introFinished && (
        <IntroAnimation onComplete={() => setIntroFinished(true)} />
      )}

      {/* Main Single-Page Portfolio Container */}
      <div
        className={`transition-all duration-700 ease-out flex flex-col min-h-screen ${
          introFinished
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-2 pointer-events-none'
        }`}
      >
        <Navbar
          themePreference={themePreference}
          onSelectTheme={setTheme}
        />

        <main className="flex-1">
          <Hero />
          <GitHubActivity />
          <Technologies />
          <Projects />
          <Certifications />
          <Contact />
        </main>

        <Footer />
      </div>
    </div>
  )
}

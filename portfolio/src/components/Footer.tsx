import { ArrowUp } from 'lucide-react'
import { portfolioData } from '../data/portfolioData'

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="border-t border-neutral-200/80 dark:border-neutral-800/80 py-8 bg-neutral-50 dark:bg-neutral-950 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-500 dark:text-neutral-400">
        <div>
          <span>© 2026 {portfolioData.personal.name}.</span>{' '}
          <span className="text-neutral-400 dark:text-neutral-600">Built with React & Tailwind CSS.</span>
        </div>

        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Scroll back to top"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors"
        >
          <span>Top</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>
    </footer>
  )
}

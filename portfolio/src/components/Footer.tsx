import { portfolioData } from '../data/portfolioData'

export function Footer() {

  return (
    <footer className="border-t border-neutral-200/80 dark:border-neutral-800/80 py-8 bg-neutral-50 dark:bg-neutral-950 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-4 text-xs font-mono text-neutral-500 dark:text-neutral-400">
        <div>
          <span>© 2026 {portfolioData.personal.name}.</span>{' '}
          <span className="text-neutral-400 dark:text-neutral-600">Built with React & Tailwind CSS.</span>
        </div>
      </div>
    </footer>
  )
}

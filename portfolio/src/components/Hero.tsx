import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { GithubIcon } from './Icons'
import { portfolioData } from '../data/portfolioData'

export function Hero() {
  const handleScrollToProjects = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const target = document.querySelector('#projects')
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      id="hero"
      className="relative pt-16 pb-24 md:pt-28 md:pb-36 flex flex-col justify-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
      aria-label="Introduction"
    >
      <div className="max-w-3xl space-y-6">
        {/* Academic / Specialization Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-200 dark:border-neutral-800 bg-white/60 dark:bg-neutral-900/60 text-xs font-mono text-neutral-600 dark:text-neutral-400">
          <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 dark:bg-neutral-100" aria-hidden="true" />
          <span>{portfolioData.personal.educationBadge}</span>
        </div>

        {/* Name */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-neutral-950 dark:text-white">
          {portfolioData.personal.name}
        </h1>

        {/* Primary Headline */}
        <h2 className="text-xl sm:text-2xl md:text-3xl font-medium tracking-tight text-neutral-800 dark:text-neutral-200 leading-snug">
          {portfolioData.personal.headline}
        </h2>

        {/* Supporting Bio */}
        <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-2xl">
          {portfolioData.personal.bio}
        </p>

        {/* Primary Actions */}
        <div className="pt-4 flex flex-wrap items-center gap-4">
          <a
            href="#projects"
            onClick={handleScrollToProjects}
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-md bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 font-medium text-sm transition-all duration-200 hover:bg-neutral-800 dark:hover:bg-neutral-200 hover:shadow-xs active:translate-y-0.5"
          >
            <span>View Projects</span>
            <ArrowDown className="w-4 h-4 transition-transform duration-200 group-hover:translate-y-0.5" />
          </a>

          <a
            href={portfolioData.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent text-neutral-900 dark:text-neutral-100 font-medium text-sm transition-all duration-200 hover:border-neutral-950 dark:hover:border-neutral-300 hover:bg-neutral-100/50 dark:hover:bg-neutral-900/50 active:translate-y-0.5"
          >
            <GithubIcon className="w-4 h-4" />
            <span>GitHub</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 dark:text-neutral-500 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </section>
  )
}

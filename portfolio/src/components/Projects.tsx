import { ArrowUpRight, FolderGit2, Globe } from 'lucide-react'
import { GithubIcon } from './Icons'
import { portfolioData, type Project } from '../data/portfolioData'

export function Projects() {
  return (
    <section
      id="projects"
      className="py-16 md:py-24 border-t border-neutral-200/80 dark:border-neutral-800/80 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
      aria-label="Projects"
    >
      <div className="max-w-3xl mb-12">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-2">
          <FolderGit2 className="w-4 h-4" />
          <span>Selected Work</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950 dark:text-white">
          Featured Projects
        </h2>
        <p className="mt-2 text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
          Architectural solutions focusing on practical utility, automated workflows, and reliable full-stack systems.
        </p>
      </div>

      <div className="space-y-8">
        {portfolioData.projects.map((project: Project) => (
          <article
            key={project.id}
            className="group relative rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/40 p-6 sm:p-8 transition-all duration-300 hover:border-neutral-400 dark:hover:border-neutral-600 hover:-translate-y-1 hover:bg-neutral-50/50 dark:hover:bg-neutral-900/70"
          >
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
              <div className="space-y-4 max-w-3xl">
                {/* Header: Project Index and Title */}
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-xs text-neutral-400 dark:text-neutral-500 font-semibold tracking-wider">
                    {project.number}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-neutral-950 dark:text-white tracking-tight">
                    {project.title}
                  </h3>
                </div>

                {/* Short Overview */}
                <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">
                  {project.description}
                </p>

                {/* Problem Solved */}
                <div className="p-4 rounded-lg border border-neutral-100 dark:border-neutral-800/80 bg-neutral-50/80 dark:bg-neutral-950/50 space-y-1">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 font-medium">
                    Problem Solved
                  </span>
                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {project.problemSolved}
                  </p>
                </div>

                {/* Technology Badges */}
                <div className="pt-2 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-xs font-mono text-neutral-700 dark:text-neutral-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Links */}
              <div className="flex lg:flex-col items-center lg:items-end gap-3 pt-2 lg:pt-0">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-neutral-200 dark:border-neutral-800 text-xs font-mono text-neutral-800 dark:text-neutral-200 hover:text-neutral-950 dark:hover:text-white hover:border-neutral-950 dark:hover:border-neutral-100 transition-colors"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span>Source</span>
                    <ArrowUpRight className="w-3 h-3 text-neutral-400 group-hover:text-neutral-950 dark:group-hover:text-white transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                )}

                {project.liveUrl ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs font-mono hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
                  >
                    <Globe className="w-3.5 h-3.5" />
                    <span>Live Demo</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                ) : null}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

import { ArrowUpRight, FolderGit2, Globe } from 'lucide-react'
import { GithubIcon } from '../components/Icons'
import { portfolioData, type Project } from '../data/portfolioData'
import { PageTitle } from '../components/PageTitle'

export function ProjectsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      {/* Header */}
      <div className="max-w-3xl mb-14">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-4">
          <FolderGit2 className="w-4 h-4" />
          <span>Selected Work</span>
        </div>
        <PageTitle 
          title="Featured Projects" 
          className="text-3xl sm:text-5xl font-bold tracking-tight text-neutral-950 dark:text-white mb-4" 
        />
        <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
          Architectural solutions focusing on practical utility, automated workflows, and reliable full-stack systems.
        </p>
      </div>

      {/* Projects list */}
      <div className="space-y-8">
        {portfolioData.projects.map((project: Project) => (
          <article
            key={project.id}
            className="group relative rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/40 p-6 sm:p-8 transition-all duration-300 hover:border-neutral-400 dark:hover:border-neutral-600 hover:-translate-y-1 hover:bg-neutral-50/50 dark:hover:bg-neutral-900/70"
          >
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
              <div className="space-y-4 max-w-3xl">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-xs text-neutral-400 dark:text-neutral-500 font-semibold tracking-wider">
                    {project.number}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-neutral-950 dark:text-white tracking-tight">
                    {project.title}
                  </h2>
                  {project.status && (
                    <span className={project.status === 'Active' ? 'ml-auto lg:ml-0 text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full border border-emerald-300 dark:border-emerald-700 text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40' : 'ml-auto lg:ml-0 text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full border border-neutral-200 dark:border-neutral-700 text-neutral-500 dark:text-neutral-400'}>
                      {project.status}
                    </span>
                  )}
                </div>

                <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">
                  {project.description}
                </p>

                <div className="p-4 rounded-lg border border-neutral-100 dark:border-neutral-800/80 bg-neutral-50/80 dark:bg-neutral-950/50 space-y-1">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 font-medium">
                    Problem Solved
                  </span>
                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {project.problemSolved}
                  </p>
                </div>

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

              <div className="flex lg:flex-col items-center lg:items-end gap-3 pt-2 lg:pt-0 shrink-0">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-neutral-200 dark:border-neutral-800 text-xs font-mono text-neutral-800 dark:text-neutral-200 hover:text-neutral-950 dark:hover:text-white hover:border-neutral-950 dark:hover:border-neutral-100 transition-colors"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span>Source</span>
                    <ArrowUpRight className="w-3 h-3 text-neutral-400" />
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
    </div>
  )
}

import { Layers } from 'lucide-react'
import {
  siC,
  siPython,
  siOpenjdk,
  siJavascript,
  siHtml5,
  siCss,
  siReact,
  siTailwindcss,
  siNodedotjs,
  siExpress,
  siMysql,
  siMongodb,
  siPostgresql,
  siGit,
  siGithub,
  siPostman,
} from 'simple-icons'

import { portfolioData } from '../data/portfolioData'

// Custom VS Code SVG path (not in simple-icons — using official Microsoft design)
const vscodeIcon = {
  path: 'M17.583 1.039l-9.96 9.116L2.682 6.27.284 8.003l2.696 2.997-2.696 2.997 2.398 1.733 4.941-3.885 9.96 9.117 3.934-1.901V2.94L17.583 1.04zM19.5 6.177v11.646l-7.76-5.823 7.76-5.823z',
  title: 'Visual Studio Code',
}

// Named map — only required icons bundled, nothing more
const iconMap: Record<string, { path: string; title: string }> = {
  c: siC,
  python: siPython,
  openjdk: siOpenjdk,
  javascript: siJavascript,
  html5: siHtml5,
  css: siCss,
  react: siReact,
  tailwindcss: siTailwindcss,
  nodedotjs: siNodedotjs,
  express: siExpress,
  mysql: siMysql,
  mongodb: siMongodb,
  postgresql: siPostgresql,
  git: siGit,
  github: siGithub,
  vscode: vscodeIcon,
  postman: siPostman,
}

interface TechIconProps {
  slug: string
}

function TechIcon({ slug }: TechIconProps) {
  const icon = iconMap[slug]
  if (!icon) {
    return (
      <svg viewBox="0 0 24 24" className="w-full h-full" fill="none" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 12h8M12 8v8" strokeWidth="1.5" stroke="currentColor" />
      </svg>
    )
  }
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-full h-full"
      fill="currentColor"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={icon.title}
    >
      <path d={icon.path} />
    </svg>
  )
}

export function Technologies() {
  return (
    <section
      id="technologies"
      className="py-16 md:py-24 border-t border-neutral-200/80 dark:border-neutral-800/80 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
      aria-label="Technologies"
    >
      <div className="max-w-3xl mb-12">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-2">
          <Layers className="w-4 h-4" />
          <span>Technical Stack</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950 dark:text-white">
          Technologies & Tools
        </h2>
        <p className="mt-2 text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
          Languages, frameworks, and developer workflows applied across full-stack applications, intelligent services, and backend systems.
        </p>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-3 sm:gap-4">
        {portfolioData.technologies.map((tech) => (
          <div
            key={tech.slug}
            className="group flex flex-col items-center gap-3 p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/40 hover:border-neutral-400 dark:hover:border-neutral-600 hover:bg-neutral-50 dark:hover:bg-neutral-800/60 transition-all duration-200 cursor-default"
            title={tech.name}
          >
            {/* Icon — monochromatic, adapts to light/dark theme via currentColor */}
            <div className="w-7 h-7 text-neutral-800 dark:text-neutral-200 group-hover:text-neutral-950 dark:group-hover:text-white transition-colors duration-200 flex-shrink-0">
              <TechIcon slug={tech.slug} />
            </div>

            {/* Technology name */}
            <span className="text-[11px] font-mono text-neutral-600 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors text-center leading-tight">
              {tech.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}

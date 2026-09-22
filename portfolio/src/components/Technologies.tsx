import {
  Code2,
  Database,
  Layers,
  Layout,
  Server,
  Terminal,
  Wrench,
} from 'lucide-react'
import { portfolioData } from '../data/portfolioData'

export function Technologies() {
  const categories = [
    {
      title: 'Languages',
      icon: Terminal,
      items: portfolioData.technologies.languages,
      description: 'Core programming languages for algorithmic problem solving and system development.',
    },
    {
      title: 'Frontend',
      icon: Layout,
      items: portfolioData.technologies.frontend,
      description: 'Modern component-driven web interfaces, responsive styling, and UI architectures.',
    },
    {
      title: 'Backend',
      icon: Server,
      items: portfolioData.technologies.backend,
      description: 'RESTful API construction, server architecture, and microservices.',
    },
    {
      title: 'Databases',
      icon: Database,
      items: portfolioData.technologies.databases,
      description: 'Relational data modeling, NoSQL document stores, and query optimization.',
    },
    {
      title: 'Tools',
      icon: Wrench,
      items: portfolioData.technologies.tools,
      description: 'Version control, developer toolchains, containerization, and API verification.',
    },
  ]

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => {
          const CategoryIcon = category.icon

          return (
            <div
              key={category.title}
              className="group p-6 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/40 hover:border-neutral-400 dark:hover:border-neutral-600 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
                    {category.title}
                  </span>
                  <CategoryIcon className="w-4 h-4 text-neutral-400 dark:text-neutral-500 group-hover:text-neutral-900 dark:group-hover:text-neutral-100 transition-colors" />
                </div>

                <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-6 leading-relaxed">
                  {category.description}
                </p>
              </div>

              {/* Technologies list */}
              <div className="flex flex-wrap gap-2">
                {category.items.map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 text-xs font-mono text-neutral-800 dark:text-neutral-200 group-hover:border-neutral-300 dark:group-hover:border-neutral-700 transition-colors"
                  >
                    <Code2 className="w-3 h-3 text-neutral-400 dark:text-neutral-500" />
                    <span>{tech}</span>
                  </span>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

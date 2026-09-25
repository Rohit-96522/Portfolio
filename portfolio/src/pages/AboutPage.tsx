import { GraduationCap, MapPin, Cpu, Code2, Heart, Zap } from 'lucide-react'
import { portfolioData } from '../data/portfolioData'
import { PageTitle } from '../components/PageTitle'

const highlights = [
  {
    icon: GraduationCap,
    label: 'Education',
    value: portfolioData.personal.educationBadge,
    sub: portfolioData.personal.institution,
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'India',
    sub: 'Open to remote and relocation',
  },
  {
    icon: Cpu,
    label: 'Focus',
    value: 'AI and Backend Systems',
    sub: 'Full-stack development',
  },
  {
    icon: Code2,
    label: 'Status',
    value: 'Open to Opportunities',
    sub: 'Internships and projects',
  },
]

const interests = [
  { icon: Zap, title: 'AI & Machine Learning', desc: 'Exploring LLMs, intelligent automation, and applied ML to build smarter software.' },
  { icon: Code2, title: 'Backend Engineering', desc: 'Designing scalable APIs, database architecture, and reliable server-side systems.' },
  { icon: Heart, title: 'Open Source', desc: 'Contributing to the community, learning from others, and building in public.' },
]

export function AboutPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 space-y-20">
      {/* Header */}
      <section aria-label="About introduction">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 dark:bg-neutral-100" aria-hidden="true" />
          <span>Who I am</span>
        </div>
        <PageTitle 
          title="About Me" 
          className="text-3xl sm:text-5xl font-bold tracking-tight text-neutral-950 dark:text-white mb-6" 
        />
        <div className="max-w-3xl space-y-4 text-base sm:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
          <p>
            I am{' '}
            <span className="text-neutral-950 dark:text-white font-semibold">{portfolioData.personal.name}</span> — a{' '}
            {portfolioData.personal.title.toLowerCase()} passionate about building intelligent, real-world software that makes a difference.
          </p>
          <p>
            I focus on clean architecture, meaningful user experiences, and impactful applications across AI, backend, and full-stack development.
            When I am not coding, I explore competitive programming, dive into research papers, or prototype new ideas.
          </p>
          <p>
            I believe in writing software that is not just functional, but thoughtfully engineered — code that solves real problems with elegance.
          </p>
        </div>
      </section>

      {/* Highlights */}
      <section aria-label="Quick facts">
        <h2 className="text-xl font-semibold text-neutral-950 dark:text-white mb-6 tracking-tight">Quick Facts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {highlights.map(({ icon: Icon, label, value, sub }) => (
            <div
              key={label}
              className="group p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/40 hover:border-neutral-400 dark:hover:border-neutral-600 hover:shadow-sm transition-all duration-200"
            >
              <div className="flex items-center gap-2 mb-3">
                <Icon className="w-4 h-4 text-neutral-500 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors" />
                <span className="text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400">{label}</span>
              </div>
              <p className="text-sm font-semibold text-neutral-900 dark:text-white leading-snug">{value}</p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">{sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Interests */}
      <section aria-label="Interests and passions">
        <h2 className="text-xl font-semibold text-neutral-950 dark:text-white mb-6 tracking-tight">What I care about</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {interests.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/40 hover:border-neutral-400 dark:hover:border-neutral-600 hover:shadow-sm transition-all duration-200 group"
            >
              <div className="w-10 h-10 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 flex items-center justify-center mb-4 group-hover:border-neutral-400 dark:group-hover:border-neutral-600 transition-colors">
                <Icon className="w-5 h-5 text-neutral-700 dark:text-neutral-300" />
              </div>
              <h3 className="text-base font-semibold text-neutral-900 dark:text-white mb-2">{title}</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

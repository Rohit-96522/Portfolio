import { ArrowUpRight, Code, Mail, MessageSquare } from 'lucide-react'
import { GithubIcon, LeetCodeIcon, LinkedinIcon } from './Icons'
import { portfolioData } from '../data/portfolioData'

export function Contact() {
  const { social } = portfolioData

  const contactLinks = [
    {
      label: 'GitHub',
      username: `@${social.githubUsername}`,
      url: social.github,
      icon: GithubIcon,
      enabled: Boolean(social.github),
    },
    {
      label: 'LinkedIn',
      username: 'Ponnana Rohit',
      url: social.linkedin,
      icon: LinkedinIcon,
      enabled: Boolean(social.linkedin),
    },
    {
      label: 'LeetCode',
      username: 'ponnanarohit',
      url: social.leetcode,
      icon: LeetCodeIcon,
      enabled: Boolean(social.leetcode),
    },
    {
      label: 'CodeChef',
      username: social.codechef ? 'CodeChef Profile' : 'Configurable in portfolioData',
      url: social.codechef || undefined,
      icon: Code,
      enabled: Boolean(social.codechef),
    },
    {
      label: 'Email',
      username: social.email ? social.email.replace('mailto:', '') : 'Direct Inquiries',
      url: social.email || undefined,
      icon: Mail,
      enabled: Boolean(social.email),
    },
  ]

  return (
    <section
      id="contact"
      className="py-20 md:py-32 border-t border-neutral-200/80 dark:border-neutral-800/80 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
      aria-label="Contact and Social Profiles"
    >
      <div className="max-w-2xl mb-12">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-2">
          <MessageSquare className="w-4 h-4" />
          <span>Get in touch</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-950 dark:text-white">
          Let's connect.
        </h2>
        <p className="mt-3 text-base sm:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
          Interested in building something useful? Let's talk.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {contactLinks.map((item) => {
          const Icon = item.icon

          if (!item.enabled && !item.url) {
            // Subtle placeholder card if optional field is not configured
            return (
              <div
                key={item.label}
                className="p-5 rounded-lg border border-dashed border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/20 text-neutral-400 dark:text-neutral-600 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5 opacity-60" />
                  <div>
                    <span className="text-xs font-mono block text-neutral-500 dark:text-neutral-500">
                      {item.label}
                    </span>
                    <span className="text-xs font-mono opacity-60">{item.username}</span>
                  </div>
                </div>
              </div>
            )
          }

          return (
            <a
              key={item.label}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/40 hover:border-neutral-400 dark:hover:border-neutral-600 hover:bg-neutral-50/60 dark:hover:bg-neutral-900/80 transition-all duration-200 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <Icon className="w-5 h-5 text-neutral-700 dark:text-neutral-300 group-hover:text-neutral-950 dark:group-hover:text-white transition-colors" />
                <div>
                  <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400 block">
                    {item.label}
                  </span>
                  <span className="text-sm font-medium text-neutral-900 dark:text-white">
                    {item.username}
                  </span>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-neutral-950 dark:group-hover:text-white transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          )
        })}
      </div>
    </section>
  )
}

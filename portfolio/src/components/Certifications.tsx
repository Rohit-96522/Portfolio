import { Award, ExternalLink } from 'lucide-react'
import { portfolioData, type Certification } from '../data/portfolioData'

export function Certifications() {
  return (
    <section
      id="certifications"
      className="py-16 md:py-24 border-t border-neutral-200/80 dark:border-neutral-800/80 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
      aria-label="Certifications"
    >
      <div className="max-w-3xl mb-12">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-2">
          <Award className="w-4 h-4" />
          <span>Accreditations</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950 dark:text-white">
          Certifications
        </h2>
        <p className="mt-2 text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
          Standardized academic and industry-recognized certifications across data science, modeling, and analytics.
        </p>
      </div>

      <div className="relative border-l border-neutral-200 dark:border-neutral-800 ml-3 sm:ml-4 pl-6 sm:pl-8 space-y-8">
        {portfolioData.certifications.map((cert: Certification) => (
          <div key={cert.id} className="relative group">
            {/* Timeline Node Dot */}
            <span
              className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-3 h-3 rounded-full border-2 border-neutral-50 dark:border-neutral-950 bg-neutral-400 dark:bg-neutral-600 group-hover:bg-neutral-950 dark:group-hover:bg-white transition-colors"
              aria-hidden="true"
            />

            <div className="p-5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/40 hover:border-neutral-400 dark:hover:border-neutral-600 transition-all duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                      {cert.issuer}
                    </span>
                    <span className="text-neutral-300 dark:text-neutral-700">·</span>
                    <span className="text-xs font-mono text-neutral-400 dark:text-neutral-500">
                      {cert.year}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-neutral-900 dark:text-white">
                    {cert.title}
                  </h3>
                </div>

                {cert.credentialUrl ? (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white transition-colors pt-1 sm:pt-0"
                  >
                    <span>Verify Credential</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <span className="text-[11px] font-mono text-neutral-400 dark:text-neutral-500 self-start sm:self-center">
                    Verified Coursework
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

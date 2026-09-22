import { useEffect, useState } from 'react'
import { ArrowUpRight, Calendar, Loader2 } from 'lucide-react'
import { GithubIcon } from './Icons'
import { portfolioData } from '../data/portfolioData'

interface ContributionDay {
  date: string
  count: number
  level: number // 0, 1, 2, 3, 4
}

interface ContributionResponse {
  total: Record<string, number>
  contributions: ContributionDay[]
}

export function GitHubActivity() {
  const username = portfolioData.social.githubUsername
  const [contributions, setContributions] = useState<ContributionDay[]>([])
  const [totalContributions, setTotalContributions] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [hoveredDay, setHoveredDay] = useState<{ day: ContributionDay; x: number; y: number } | null>(null)

  useEffect(() => {
    let isMounted = true

    // Fetch public contributions from verified GitHub contribution proxy
    fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to load contribution data (HTTP ${res.status})`)
        }
        return res.json() as Promise<ContributionResponse>
      })
      .then((data) => {
        if (!isMounted) return
        if (data && Array.isArray(data.contributions)) {
          setContributions(data.contributions)
          const totalLastYear = data.total?.lastYear ?? Object.values(data.total || {})[0] ?? null
          setTotalContributions(totalLastYear)
          setError(null)
        } else {
          setError('No contribution data returned')
        }
      })
      .catch((err) => {
        if (!isMounted) return
        setError(err instanceof Error ? err.message : 'Unable to connect to GitHub API')
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false)
        }
      })

    return () => {
      isMounted = false
    }
  }, [username])

  // Split contributions into 7-day columns (weeks)
  const weeks: ContributionDay[][] = []
  if (contributions.length > 0) {
    for (let i = 0; i < contributions.length; i += 7) {
      weeks.push(contributions.slice(i, i + 7))
    }
  }

  // Monochromatic grayscale cell styling based on activity level
  const getCellColor = (level: number) => {
    switch (level) {
      case 1:
        return 'bg-neutral-300 dark:bg-neutral-700 hover:ring-1 hover:ring-neutral-400'
      case 2:
        return 'bg-neutral-400 dark:bg-neutral-600 hover:ring-1 hover:ring-neutral-500'
      case 3:
        return 'bg-neutral-700 dark:bg-neutral-300 hover:ring-1 hover:ring-neutral-800'
      case 4:
        return 'bg-neutral-950 dark:bg-neutral-100 hover:ring-1 hover:ring-white'
      case 0:
      default:
        return 'bg-neutral-200/70 dark:bg-neutral-800/80 hover:bg-neutral-300 dark:hover:bg-neutral-700'
    }
  }

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr)
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    } catch {
      return dateStr
    }
  }

  return (
    <section
      id="github"
      className="py-16 md:py-24 border-t border-neutral-200/80 dark:border-neutral-800/80 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
      aria-label="GitHub Activity"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-2">
            <GithubIcon className="w-4 h-4" />
            <span>Open Source</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950 dark:text-white">
            GitHub Activity
          </h2>
          <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
            Contributions and code frequency for{' '}
            <span className="font-mono text-neutral-900 dark:text-neutral-200">@{username}</span>
          </p>
        </div>

        <div className="flex items-center gap-3 text-sm">
          {totalContributions !== null && !isLoading && (
            <div className="px-3 py-1.5 rounded border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-xs font-mono text-neutral-700 dark:text-neutral-300">
              <span className="font-semibold text-neutral-950 dark:text-white">{totalContributions}</span> contributions in the last year
            </div>
          )}

          <a
            href={portfolioData.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-neutral-300 dark:border-neutral-700 text-xs font-mono text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white hover:border-neutral-950 dark:hover:border-neutral-300 transition-colors"
          >
            <span>Profile</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Main Graph Card */}
      <div className="relative rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 p-4 sm:p-6 overflow-hidden">
        {isLoading ? (
          <div className="py-16 flex flex-col items-center justify-center text-neutral-500 dark:text-neutral-400">
            <Loader2 className="w-6 h-6 animate-spin mb-3 text-neutral-700 dark:text-neutral-300" />
            <p className="text-xs font-mono">Fetching GitHub contribution timeline...</p>
          </div>
        ) : error ? (
          <div className="py-12 px-4 text-center max-w-md mx-auto">
            <Calendar className="w-8 h-8 mx-auto mb-3 text-neutral-400 dark:text-neutral-600" />
            <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-200">
              Live GitHub data ready for connection
            </h3>
            <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
              Contributions are mapped directly to your GitHub handle. Check current activity and repositories on your GitHub profile.
            </p>
            <a
              href={portfolioData.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1 text-xs font-mono text-neutral-900 dark:text-neutral-100 underline underline-offset-4 hover:opacity-80"
            >
              <span>View @{username} on GitHub</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        ) : (
          <div className="relative">
            {/* Scrollable calendar view */}
            <div className="overflow-x-auto pb-2 scrollbar-thin">
              <div className="inline-flex gap-1 min-w-[700px]">
                {weeks.map((week, weekIndex) => (
                  <div key={weekIndex} className="flex flex-col gap-1">
                    {week.map((day) => (
                      <div
                        key={day.date}
                        onMouseEnter={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect()
                          setHoveredDay({
                            day,
                            x: rect.left + rect.width / 2,
                            y: rect.top,
                          })
                        }}
                        onMouseLeave={() => setHoveredDay(null)}
                        className={`w-3 h-3 rounded-[2px] transition-colors cursor-pointer ${getCellColor(
                          day.level
                        )}`}
                        aria-label={`${day.count} contributions on ${day.date}`}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Footer with Monochromatic Legend */}
            <div className="mt-4 pt-4 border-t border-neutral-100 dark:border-neutral-800/60 flex flex-wrap items-center justify-between text-xs text-neutral-500 dark:text-neutral-400 font-mono gap-2">
              <span className="text-[11px]">Last 12 Months Activity</span>
              <div className="flex items-center gap-1.5">
                <span className="text-[11px]">Less</span>
                <span className="w-2.5 h-2.5 rounded-[2px] bg-neutral-200/70 dark:bg-neutral-800/80" />
                <span className="w-2.5 h-2.5 rounded-[2px] bg-neutral-300 dark:bg-neutral-700" />
                <span className="w-2.5 h-2.5 rounded-[2px] bg-neutral-400 dark:bg-neutral-600" />
                <span className="w-2.5 h-2.5 rounded-[2px] bg-neutral-700 dark:bg-neutral-300" />
                <span className="w-2.5 h-2.5 rounded-[2px] bg-neutral-950 dark:bg-neutral-100" />
                <span className="text-[11px]">More</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Floating Monochromatic Tooltip */}
      {hoveredDay && (
        <div
          className="fixed pointer-events-none z-50 transform -translate-x-1/2 -translate-y-full mb-2 px-2.5 py-1 rounded bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 text-xs font-mono shadow-md border border-neutral-800 dark:border-neutral-200"
          style={{
            left: `${hoveredDay.x}px`,
            top: `${hoveredDay.y - 8}px`,
          }}
        >
          <span className="font-semibold">{hoveredDay.day.count}</span> {hoveredDay.day.count === 1 ? 'contribution' : 'contributions'} on{' '}
          {formatDate(hoveredDay.day.date)}
        </div>
      )}
    </section>
  )
}

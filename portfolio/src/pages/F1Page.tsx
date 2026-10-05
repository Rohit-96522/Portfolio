import { ArrowLeft, Car } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PageTitle } from '../components/PageTitle'

export function F1Page() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 space-y-12">
      <div className="flex items-center gap-4 mb-8">
        <Link to="/about" className="p-2 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors" aria-label="Back to About">
          <ArrowLeft className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
        </Link>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 flex items-center justify-center">
            <Car className="w-5 h-5 text-neutral-700 dark:text-neutral-300" />
          </div>
          <PageTitle title="Formula 1" className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950 dark:text-white" />
        </div>
      </div>

      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
          I am a huge fan of the fast-paced, high-stakes world of Formula 1 racing. The mix of cutting-edge engineering, split-second strategy, and pure driver talent is incredibly fascinating to me.
        </p>
        <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed mt-4">
          Watching a race is more than just entertainment; it's about analyzing the telemetry, understanding the pit strategies, and marveling at the technological advancements that push the boundaries of what's possible on track.
        </p>
      </div>
    </div>
  )
}

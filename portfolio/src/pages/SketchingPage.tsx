import { ArrowLeft, Palette } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PageTitle } from '../components/PageTitle'

export function SketchingPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 space-y-12">
      <div className="flex items-center gap-4 mb-8">
        <Link to="/about" className="p-2 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors" aria-label="Back to About">
          <ArrowLeft className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
        </Link>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 flex items-center justify-center">
            <Palette className="w-5 h-5 text-neutral-700 dark:text-neutral-300" />
          </div>
          <PageTitle title="Sketching & Drawing" className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950 dark:text-white" />
        </div>
      </div>

      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
          Sketching is my creative outlet. It allows me to step away from screens and express ideas directly onto paper.
        </p>
        <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed mt-4">
          Whether it's rough concept art, detailed portraits, or just doodling to clear my mind, I find drawing to be incredibly therapeutic. It helps me maintain a balance between logical problem-solving in code and creative expression in art.
        </p>
      </div>
    </div>
  )
}

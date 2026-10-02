import { useEffect, useState } from 'react'
import { Eye } from 'lucide-react'

// 7-segment display mapping for digits 0-9
// Segments: a(top), b(top-right), c(bottom-right), d(bottom), e(bottom-left), f(top-left), g(middle)
const SEGMENT_MAP: Record<string, boolean[]> = {
  //        a      b      c      d      e      f      g
  '0': [true, true, true, true, true, true, false],
  '1': [false, true, true, false, false, false, false],
  '2': [true, true, false, true, true, false, true],
  '3': [true, true, true, true, false, false, true],
  '4': [false, true, true, false, false, true, true],
  '5': [true, false, true, true, false, true, true],
  '6': [true, false, true, true, true, true, true],
  '7': [true, true, true, false, false, false, false],
  '8': [true, true, true, true, true, true, true],
  '9': [true, true, true, true, false, true, true],
}

interface SegmentDigitProps {
  digit: string
  size?: number
}

function SegmentDigit({ digit, size = 48 }: SegmentDigitProps) {
  const segments = SEGMENT_MAP[digit] || SEGMENT_MAP['0']
  const w = size * 0.6
  const h = size
  const t = Math.max(size * 0.08, 3) // segment thickness
  const gap = t * 0.35 // gap between segments
  const r = t * 0.2 // corner radius

  const onColor = 'rgba(255, 255, 255, 1)'    // emerald-500
  const offColor = 'rgba(251, 255, 254, 0.07)' // ghost segment
  const glowColor = 'rgba(100, 102, 102, 0.5)'

  // Segment path definitions (as polygons/rects)
  const segmentPaths = [
    // a - top horizontal
    <rect key="a" x={gap + t * 0.3} y={0} width={w - 2 * gap - t * 0.6} height={t} rx={r}
      fill={segments[0] ? onColor : offColor}
      filter={segments[0] ? 'url(#glow)' : undefined}
    />,
    // b - top-right vertical
    <rect key="b" x={w - t} y={gap + t * 0.3} width={t} height={h / 2 - 2 * gap - t * 0.3} rx={r}
      fill={segments[1] ? onColor : offColor}
      filter={segments[1] ? 'url(#glow)' : undefined}
    />,
    // c - bottom-right vertical
    <rect key="c" x={w - t} y={h / 2 + gap} width={t} height={h / 2 - 2 * gap - t * 0.3} rx={r}
      fill={segments[2] ? onColor : offColor}
      filter={segments[2] ? 'url(#glow)' : undefined}
    />,
    // d - bottom horizontal
    <rect key="d" x={gap + t * 0.3} y={h - t} width={w - 2 * gap - t * 0.6} height={t} rx={r}
      fill={segments[3] ? onColor : offColor}
      filter={segments[3] ? 'url(#glow)' : undefined}
    />,
    // e - bottom-left vertical
    <rect key="e" x={0} y={h / 2 + gap} width={t} height={h / 2 - 2 * gap - t * 0.3} rx={r}
      fill={segments[4] ? onColor : offColor}
      filter={segments[4] ? 'url(#glow)' : undefined}
    />,
    // f - top-left vertical
    <rect key="f" x={0} y={gap + t * 0.3} width={t} height={h / 2 - 2 * gap - t * 0.3} rx={r}
      fill={segments[5] ? onColor : offColor}
      filter={segments[5] ? 'url(#glow)' : undefined}
    />,
    // g - middle horizontal
    <rect key="g" x={gap + t * 0.3} y={h / 2 - t / 2} width={w - 2 * gap - t * 0.6} height={t} rx={r}
      fill={segments[6] ? onColor : offColor}
      filter={segments[6] ? 'url(#glow)' : undefined}
    />,
  ]

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feFlood floodColor={glowColor} result="color" />
          <feComposite in="color" in2="blur" operator="in" result="shadow" />
          <feMerge>
            <feMergeNode in="shadow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {segmentPaths}
    </svg>
  )
}

export function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [animatedDigits, setAnimatedDigits] = useState<string>('')

  useEffect(() => {
    // Use a free counter API to track real visitors
    const namespace = 'ponnana-rohit-portfolio'
    const key = 'visitors'

    // Check if this session already counted
    const sessionKey = 'visitor-counted'
    const alreadyCounted = sessionStorage.getItem(sessionKey)

    const fetchCount = async () => {
      try {
        if (!alreadyCounted) {
          // Increment and get count
          const res = await fetch(`https://api.counterapi.dev/v1/${namespace}/${key}/up`)
          const data = await res.json()
          sessionStorage.setItem(sessionKey, 'true')
          setCount(data.count ?? 0)
        } else {
          // Just get current count without incrementing
          const res = await fetch(`https://api.counterapi.dev/v1/${namespace}/${key}`)
          const data = await res.json()
          setCount(data.count ?? 0)
        }
      } catch {
        // Fallback: use localStorage-based count
        const stored = parseInt(localStorage.getItem('visitor-count') || '0', 10)
        const newCount = alreadyCounted ? stored : stored + 1
        if (!alreadyCounted) {
          localStorage.setItem('visitor-count', String(newCount))
          sessionStorage.setItem(sessionKey, 'true')
        }
        setCount(newCount)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCount()
  }, [])

  // Animate digits rolling up
  useEffect(() => {
    if (count === null) return

    const target = String(count).padStart(6, '0')
    let current = '000000'
    setAnimatedDigits(current)

    const duration = 1200 // ms
    const steps = 30
    const interval = duration / steps

    let step = 0
    const timer = setInterval(() => {
      step++
      const progress = Math.min(step / steps, 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      const currentNum = Math.round(eased * count)
      current = String(currentNum).padStart(6, '0')
      setAnimatedDigits(current)

      if (step >= steps) {
        clearInterval(timer)
        setAnimatedDigits(target)
      }
    }, interval)

    return () => clearInterval(timer)
  }, [count])

  const digits = animatedDigits || '000000'

  return (
    <div className="inline-flex flex-col items-center gap-3">
      {/* Label */}
      <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
        <Eye className="w-3.5 h-3.5" />
        <span>Visitors</span>
      </div>

      {/* 7-Segment Display Panel */}
      <div className="relative rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-950 dark:bg-neutral-950 px-5 py-4 sm:px-6 sm:py-5 shadow-lg">
        {/* Subtle scanline overlay */}
        <div
          className="absolute inset-0 rounded-xl pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)',
          }}
        />

        {/* Inner bezel */}
        <div className="relative rounded-lg bg-neutral-900/80 border border-neutral-800/50 px-4 py-3 sm:px-5 sm:py-4">
          {isLoading ? (
            <div className="flex items-center gap-2 sm:gap-3">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <SegmentDigit digit="-" size={36} />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center gap-1.5 sm:gap-2.5">
              {digits.split('').map((d, i) => (
                <div
                  key={i}
                  className="transition-all duration-150"
                  style={{
                    animationDelay: `${i * 60}ms`,
                  }}
                >
                  <SegmentDigit digit={d} size={36} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bottom accent line */}
        <div className="mt-2 h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />
      </div>
    </div>
  )
}

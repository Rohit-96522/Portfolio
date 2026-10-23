import { useEffect, useRef, useState, useCallback } from 'react'
import { RotateCcw } from 'lucide-react'

const COLS = 160
const ROWS = 200
const CW = 3
const CH = 3
const CHARS = "01{}</>#$%&*+=;:λπ∑"

interface Cell {
  l: number
  r: number
  g: number
  b: number
  a: boolean
}

interface Column {
  d: number
  v: number
}

function sample(img: HTMLImageElement | HTMLCanvasElement, alpha: boolean): Cell[] {
  const o = document.createElement("canvas")
  o.width = COLS
  o.height = ROWS
  const g = o.getContext("2d")
  if (!g) return []

  const iw = (img as HTMLImageElement).naturalWidth || img.width || 300
  const ih = (img as HTMLImageElement).naturalHeight || img.height || 375
  const s = alpha
    ? Math.min(COLS / iw, ROWS / ih) * 0.96
    : Math.max(COLS / iw, ROWS / ih)
  const w = iw * s
  const h = ih * s

  g.drawImage(img, (COLS - w) / 2, alpha ? (ROWS - h) / 2 : (ROWS - h) * 0.3, w, h)
  const d = g.getImageData(0, 0, COLS, ROWS).data
  const out: Cell[] = []
  let min = 1
  let max = 0

  for (let i = 0; i < d.length; i += 4) {
    const l = (0.2126 * d[i] + 0.7152 * d[i + 1] + 0.0722 * d[i + 2]) / 255
    if (l < min) min = l
    if (l > max) max = l
  }

  for (let i = 0; i < d.length; i += 4) {
    const rawL = (0.2126 * d[i] + 0.7152 * d[i + 1] + 0.0722 * d[i + 2]) / 255
    const l = alpha ? d[i + 3] / 255 : Math.pow((rawL - min) / Math.max(0.05, max - min), 1.1)
    out.push({ l, r: d[i], g: d[i + 1], b: d[i + 2], a: alpha })
  }

  return out
}

function createPlaceholder(): HTMLCanvasElement {
  const o = document.createElement("canvas")
  o.width = 240
  o.height = 300
  const g = o.getContext("2d")
  if (!g) return o

  const r = g.createRadialGradient(120, 110, 10, 120, 130, 150)
  r.addColorStop(0, "#404040")
  r.addColorStop(1, "#0a0a0a")
  g.fillStyle = r
  g.fillRect(0, 0, 240, 300)

  g.fillStyle = "#f5f5f5"
  g.beginPath()
  g.ellipse(120, 115, 52, 64, 0, 0, Math.PI * 2)
  g.fill()

  g.beginPath()
  g.ellipse(120, 300, 110, 95, 0, 0, Math.PI * 2)
  g.fill()

  g.fillStyle = "#262626"
  g.beginPath()
  g.ellipse(100, 110, 7, 5, 0, 0, Math.PI * 2)
  g.fill()

  g.beginPath()
  g.ellipse(140, 110, 7, 5, 0, 0, Math.PI * 2)
  g.fill()

  return o
}

function hash(a: number, b: number, c: number) {
  const x = Math.sin(a * 127.1 + b * 311.7 + c * 74.7) * 43758.5453
  return x - Math.floor(x)
}

function ease(x: number) {
  return 1 - Math.pow(1 - x, 3)
}

function drawFrame(
  ctx: CanvasRenderingContext2D,
  t: number,
  cells: Cell[],
  cols: Column[],
  dpr: number,
  W: number,
  H: number,
  reduce: boolean
): boolean {
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  ctx.clearRect(0, 0, W, H)
  ctx.font = "8px ui-monospace, Menlo, monospace"
  ctx.textAlign = "center"
  ctx.textBaseline = "middle"

  let done = true
  for (let c = 0; c < COLS; c++) {
    const col = cols[c]
    const el = t - col.d
    if (el < 0) {
      done = false
      continue
    }
    const head = el * col.v
    if (head < ROWS + 6) done = false

    const maxK = Math.min(ROWS - 1, Math.floor(head))
    for (let k = 0; k <= maxK; k++) {
      const cell = cells[(ROWS - 1 - k) * COLS + c]
      if (!cell || cell.l < 0.06) continue

      const age = (head - k) / col.v
      const p = reduce ? 1 : ease(Math.min(1, age * 5))
      const bw = Math.max(1, CW * (0.2 + 0.8 * cell.l)) * p
      const bh = (CH - 1) * p

      // Pure monochromatic values matching the portfolio design system
      if (cell.a) {
        // Gradient from silver-gray (190) at bottom to pure white (255) at top
        const q = k / ROWS
        const val = Math.min(255, Math.floor(190 + 65 * q))
        ctx.fillStyle = `rgb(${val}, ${val}, ${val})`
      } else {
        const mono = Math.min(255, Math.floor((cell.r * 0.299 + cell.g * 0.587 + cell.b * 0.114) * 1.25))
        ctx.fillStyle = `rgb(${mono}, ${mono}, ${mono})`
      }
      ctx.fillRect(c * CW + (CW - bw) / 2, (ROWS - 1 - k) * CH + (CH - bh) / 2, bw, bh)
    }

    // Monochromatic falling character stream at the head
    if (!reduce && head < ROWS + 6 && c % 2 === 0) {
      for (let j = 0; j < 6; j++) {
        const kk = Math.floor(head) - j * 3
        if (kk < 0 || kk >= ROWS) continue
        const alpha = j === 0 ? 0.95 : Math.max(0.12, 0.55 - j * 0.09)
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`
        const charIdx = Math.floor(hash(c, kk, Math.floor(t * 9)) * CHARS.length)
        ctx.fillText(CHARS[charIdx], c * CW + CW / 2, (ROWS - 1 - kk) * CH + CH / 2)
      }
    }
  }
  return done
}

export function PortraitAnimation({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const cellsRef = useRef<Cell[] | null>(null)
  const colsRef = useRef<Column[]>([])
  const rafRef = useRef<number>(0)
  const isMountedRef = useRef(true)

  const W = COLS * CW // 480
  const H = ROWS * CH // 600

  const startAnimation = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = W * dpr
    canvas.height = H * dpr

    // Generate new random delays & speeds for each column
    const newCols: Column[] = []
    for (let c = 0; c < COLS; c++) {
      newCols.push({
        d: Math.random() * 1.4,
        v: 68 + Math.random() * 52,
      })
    }
    colsRef.current = newCols

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    cancelAnimationFrame(rafRef.current)
    setIsAnimating(true)

    const t0 = performance.now()

    const loop = (now: number) => {
      if (!isMountedRef.current || !cellsRef.current) return
      const elapsed = reduce ? 99 : (now - t0) / 1000
      const done = drawFrame(ctx, elapsed, cellsRef.current, colsRef.current, dpr, W, H, reduce)
      if (!done) {
        rafRef.current = requestAnimationFrame(loop)
      } else {
        setIsAnimating(false)
      }
    }

    rafRef.current = requestAnimationFrame(loop)
  }, [W, H])

  const initAndRun = useCallback(() => {
    // If we already have sampled cells, start right away
    if (cellsRef.current) {
      startAnimation()
      return
    }

    // Temporary monochromatic placeholder while image loads
    const ph = createPlaceholder()
    cellsRef.current = sample(ph, false)
    startAnimation()

    // Load actual portrait SVG from public/favicon.svg
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.onload = () => {
      if (!isMountedRef.current) return
      cellsRef.current = sample(img, true)
      startAnimation()
    }
    img.onerror = () => {
      // Fallback: try fetching as text blob
      fetch("/favicon.svg")
        .then((res) => res.text())
        .then((svgText) => {
          if (!isMountedRef.current) return
          const blob = new Blob([svgText], { type: "image/svg+xml" })
          const url = URL.createObjectURL(blob)
          const fallbackImg = new Image()
          fallbackImg.onload = () => {
            if (!isMountedRef.current) return
            cellsRef.current = sample(fallbackImg, true)
            URL.revokeObjectURL(url)
            startAnimation()
          }
          fallbackImg.src = url
        })
        .catch(() => {
          // Keep placeholder on error
        })
    }
    img.src = "/favicon.svg"
  }, [startAnimation])

  useEffect(() => {
    isMountedRef.current = true
    initAndRun()

    return () => {
      isMountedRef.current = false
      cancelAnimationFrame(rafRef.current)
    }
  }, [initAndRun])

  const handleReplay = (e: React.MouseEvent) => {
    e.stopPropagation()
    startAnimation()
  }

  return (
    <div
      onClick={handleReplay}
      className={`relative w-full aspect-[4/5] rounded-2xl bg-neutral-950 border border-neutral-800 shadow-2xl shadow-black/80 p-2 sm:p-2.5 flex items-center justify-center group overflow-hidden transition-all duration-300 hover:border-neutral-600 cursor-pointer ${className}`}
      title="Click anywhere to replay animation"
    >
      {/* Monochromatic background glow */}
      <div
        className="absolute -inset-1 bg-gradient-to-tr from-white/5 via-transparent to-neutral-400/5 rounded-2xl blur-lg pointer-events-none opacity-40 group-hover:opacity-80 transition-opacity duration-500"
        aria-hidden="true"
      />

      {/* Main Canvas */}
      <canvas
        ref={canvasRef}
        className="relative z-10 w-full h-full object-contain rounded-xl block select-none pointer-events-none bg-neutral-950"
        aria-label="Interactive monochromatic digital matrix portrait animation of Ponnana Rohit"
        role="img"
      />

      {/* Replay button - Monochromatic */}
      <button
        type="button"
        onClick={handleReplay}
        className="absolute top-3 right-3 z-20 inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-neutral-900/90 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-700/70 hover:border-neutral-500 backdrop-blur-md transition-all duration-200 text-xs font-mono shadow-md hover:scale-105 active:scale-95 opacity-80 group-hover:opacity-100"
        title="Replay portrait matrix animation"
        aria-label="Replay portrait animation"
      >
        <RotateCcw className={`w-3.5 h-3.5 ${isAnimating ? 'animate-spin' : ''}`} />
        <span className="hidden sm:inline font-medium">Replay</span>
      </button>

      {/* Subtle indicator pill - Monochromatic */}
      <div className="absolute bottom-3 left-3 z-20 px-2.5 py-1 rounded-md bg-neutral-900/90 border border-neutral-800 text-[11px] font-mono text-neutral-300 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none flex items-center gap-1.5 shadow-sm">
        <span className="w-1.5 h-1.5 rounded-full bg-neutral-200 animate-pulse" />
        <span>Matrix Portrait</span>
      </div>
    </div>
  )
}

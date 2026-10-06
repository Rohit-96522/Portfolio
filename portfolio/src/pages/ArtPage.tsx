import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { PageTitle } from '../components/PageTitle'

const artworks = [
  { id: 1, title: 'SKETCH 01', url: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&q=80&w=400&h=500' },
  { id: 2, title: 'SKETCH 02', url: 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?auto=format&fit=crop&q=80&w=400&h=500' },
  { id: 3, title: 'SKETCH 03', url: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=400&h=500' },
  { id: 4, title: 'SKETCH 04', url: 'https://images.unsplash.com/photo-1578301978693-85fa9c026f33?auto=format&fit=crop&q=80&w=400&h=500' },
  { id: 5, title: 'SKETCH 05', url: 'https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?auto=format&fit=crop&q=80&w=400&h=500' },
  { id: 6, title: 'SKETCH 06', url: 'https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?auto=format&fit=crop&q=80&w=400&h=500' },
  { id: 7, title: 'SKETCH 07', url: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&q=80&w=400&h=500' },
]

export function ArtPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  
  const state = useRef({
    activeFloat: 0,
    targetFloat: 0,
    isDragging: false,
    startX: 0,
    startFloat: 0,
    autoPlay: true,
  })

  useEffect(() => {
    let animationFrameId: number;

    // A safe modulo function for negative numbers
    const wrap = (val: number, max: number) => ((val % max) + max) % max

    const render = () => {
      // Continuous auto-play
      if (state.current.autoPlay && !state.current.isDragging) {
        state.current.targetFloat += 0.003
      }
      
      // Lerp activeFloat towards targetFloat for smooth animation
      if (!state.current.isDragging) {
        state.current.activeFloat += (state.current.targetFloat - state.current.activeFloat) * 0.08
      }

      const N = artworks.length
      const activeFloat = state.current.activeFloat
      
      cardsRef.current.forEach((card, i) => {
        if (!card) return
        
        let dist = wrap(i - activeFloat, N)
        // Adjust distance so the shortest path is taken
        if (dist > N / 2) dist -= N
        
        const absDist = Math.abs(dist)
        
        // Settings for the 3D layout
        const xOffset = window.innerWidth < 640 ? 130 : 220 
        const x = dist * xOffset
        
        // Scale drops off the further it is from the center
        const scale = Math.max(0.5, 1 - absDist * 0.15)
        // Opacity drops off slightly faster to fade the edges
        const opacity = Math.max(0, 1 - absDist * 0.25)
        // Ensure center card is always on top
        const zIndex = Math.round(100 - absDist * 10)
        
        gsap.set(card, {
          x: x,
          scale: scale,
          opacity: opacity,
          zIndex: zIndex,
        })
      })
      
      animationFrameId = requestAnimationFrame(render)
    }
    
    render()
    return () => cancelAnimationFrame(animationFrameId)
  }, [])

  const handlePointerDown = (e: React.PointerEvent) => {
    state.current.isDragging = true
    state.current.startX = e.clientX
    state.current.startFloat = state.current.activeFloat
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!state.current.isDragging) return
    const dx = e.clientX - state.current.startX
    // Convert pixel drag to float index change
    const sensitivity = window.innerWidth < 640 ? 0.008 : 0.004
    state.current.activeFloat = state.current.startFloat - dx * sensitivity
    state.current.targetFloat = state.current.activeFloat // keep target in sync
  }

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!state.current.isDragging) return
    state.current.isDragging = false
    
    // Snap to nearest whole card when dragging stops
    state.current.targetFloat = Math.round(state.current.activeFloat)
    
    ;(e.target as HTMLElement).releasePointerCapture(e.pointerId)
  }
  
  const scrollTrack = (direction: 1 | -1) => {
    // Snap to the next or previous integer
    state.current.targetFloat = Math.round(state.current.targetFloat) + direction
  }

  return (
    <div className="w-full min-h-screen py-16 md:py-24 overflow-hidden flex flex-col">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full mb-12">
        <PageTitle 
          title="Art & Drawings" 
          className="text-3xl sm:text-5xl font-bold tracking-tight text-neutral-950 dark:text-white mb-4" 
        />
        <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl text-lg">
          A collection of my recent drawings and sketches.
        </p>
      </div>

      {/* 3D Slider Container */}
      <div 
        ref={containerRef}
        className="relative w-full h-[450px] sm:h-[600px] flex items-center justify-center cursor-grab active:cursor-grabbing touch-none perspective-1000"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onMouseEnter={() => { state.current.autoPlay = false }}
        onMouseLeave={() => { state.current.autoPlay = true }}
      >
        {artworks.map((art, index) => (
          <div 
            key={art.id}
            ref={(el) => { cardsRef.current[index] = el }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[400px] sm:w-[380px] sm:h-[520px] rounded-2xl overflow-hidden shadow-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 pointer-events-none select-none will-change-transform"
          >
            <img 
              src={art.url} 
              alt={art.title}
              className="w-full h-full object-cover pointer-events-none"
              draggable={false}
            />
            {/* Dark overlay for styling */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent flex items-end p-6 pointer-events-none">
              <span className="text-white font-mono tracking-wider font-semibold text-lg">
                {art.title}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons underneath */}
      <div className="flex items-center justify-center gap-6 mt-16 z-20">
        <button 
          onClick={() => scrollTrack(-1)}
          className="px-8 py-3 rounded-full border border-neutral-300 dark:border-neutral-700 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-md text-neutral-900 dark:text-white font-mono text-sm hover:bg-neutral-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition-all hover:scale-105 focus:outline-none shadow-md"
        >
          Prev
        </button>
        <button 
          onClick={() => scrollTrack(1)}
          className="px-8 py-3 rounded-full border border-neutral-300 dark:border-neutral-700 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-md text-neutral-900 dark:text-white font-mono text-sm hover:bg-neutral-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition-all hover:scale-105 focus:outline-none shadow-md"
        >
          Next
        </button>
      </div>
    </div>
  )
}
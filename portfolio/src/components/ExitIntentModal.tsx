import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { X, Grid } from 'lucide-react'

export function ExitIntentModal() {
  const [isVisible, setIsVisible] = useState(false)
  const [hasShown, setHasShown] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const hasTriggered = sessionStorage.getItem('exitIntentShown')
    if (hasTriggered) {
      setHasShown(true)
      return
    }

    const handleMouseLeave = (e: MouseEvent) => {
      // Trigger if mouse leaves from the top of the browser window
      if (e.clientY <= 0 && !hasShown) {
        setIsVisible(true)
        setHasShown(true)
        sessionStorage.setItem('exitIntentShown', 'true')
      }
    }

    document.addEventListener('mouseleave', handleMouseLeave)
    return () => document.removeEventListener('mouseleave', handleMouseLeave)
  }, [hasShown])

  // Don't show the modal if they are already on the visitors page
  if (!isVisible || location.pathname === '/visitors') return null

  return (
    <div className="fixed inset-0 z-[999999] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-neutral-950/40 backdrop-blur-sm transition-opacity" onClick={() => setIsVisible(false)} />
      <div className="relative w-full max-w-md bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-2xl overflow-hidden p-8 text-center animate-in zoom-in-95 duration-300">
        <button onClick={() => setIsVisible(false)} className="absolute top-4 right-4 p-1 text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors" aria-label="Close modal">
          <X className="w-5 h-5" />
        </button>
        
        <div className="w-16 h-16 mx-auto bg-neutral-100 dark:bg-neutral-800 rounded-full flex items-center justify-center mb-6">
          <Grid className="w-8 h-8 text-neutral-900 dark:text-white" />
        </div>
        
        <h2 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white mb-3">Wait! Before you go...</h2>
        <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-8">
          Leave your mark on this portfolio by drawing a small piece of pixel art in the community gallery!
        </p>
        
        <Link 
          to="/visitors" 
          onClick={() => setIsVisible(false)}
          className="inline-block w-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-mono text-sm uppercase tracking-widest py-4 rounded hover:opacity-90 transition-opacity"
        >
          Draw a Pixel Art
        </Link>
        <button 
          onClick={() => setIsVisible(false)}
          className="mt-4 text-xs font-mono uppercase tracking-widest text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
        >
          Maybe later
        </button>
      </div>
    </div>
  )
}

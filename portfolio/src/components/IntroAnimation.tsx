import { useEffect, useState } from 'react'

interface IntroAnimationProps {
  onComplete: () => void
}

export function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const fullText = 'Ponnana Rohit'
  const [displayedText, setDisplayedText] = useState('')
  const [showCursor, setShowCursor] = useState(true)
  const [isFadingOut, setIsFadingOut] = useState(false)

  useEffect(() => {
    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    // Allow session storage so repeated page refreshes aren't annoying
    const hasSeenIntro = sessionStorage.getItem('has_seen_portfolio_intro')

    if (prefersReducedMotion || hasSeenIntro) {
      onComplete()
      return
    }

    let currentIndex = 0
    let typewriterTimeout: number | undefined

    // Blink cursor initially
    const cursorInterval = window.setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 450)

    // Typewriter step function
    const typeNextChar = () => {
      if (currentIndex < fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex + 1))
        currentIndex++
        const delay = 45 + Math.random() * 35 // Natural, brisk cadence
        typewriterTimeout = window.setTimeout(typeNextChar, delay)
      } else {
        // Typing finished
        window.clearInterval(cursorInterval)
        setShowCursor(true)

        // Step 1: Brief pause (400ms)
        window.setTimeout(() => {
          // Step 2: Cursor disappears
          setShowCursor(false)

          // Step 3: Intro screen fades out (350ms)
          window.setTimeout(() => {
            setIsFadingOut(true)

            // Step 4 & 5: Fade complete, unveil portfolio
            window.setTimeout(() => {
              sessionStorage.setItem('has_seen_portfolio_intro', 'true')
              onComplete()
            }, 400)
          }, 250)
        }, 350)
      }
    }

    // Start typing after a short initial pause (200ms)
    const initialDelay = window.setTimeout(typeNextChar, 200)

    return () => {
      window.clearInterval(cursorInterval)
      window.clearTimeout(typewriterTimeout)
      window.clearTimeout(initialDelay)
    }
  }, [onComplete])

  const handleSkip = () => {
    sessionStorage.setItem('has_seen_portfolio_intro', 'true')
    onComplete()
  }

  return (
    <div
      onClick={handleSkip}
      role="status"
      aria-label="Loading portfolio intro"
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-neutral-950 text-neutral-100 transition-opacity duration-400 ease-out select-none cursor-pointer ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="font-mono text-2xl sm:text-3xl md:text-4xl tracking-tight font-medium flex items-center">
        <span>{displayedText}</span>
        <span
          className={`inline-block w-2.5 h-6 sm:h-8 ml-1.5 bg-neutral-200 transition-opacity duration-150 ${
            showCursor ? 'opacity-100' : 'opacity-0'
          }`}
          aria-hidden="true"
        />
      </div>
      <p className="mt-8 text-xs font-mono text-neutral-500 tracking-widest uppercase">
        Press anywhere to skip
      </p>
    </div>
  )
}

import { useState, useEffect } from 'react'

/**
 * Hook to detect whether the dark theme is active on the document.
 * Reactive to class changes on document.documentElement (e.g. 'dark' class)
 * and system preference changes.
 */
export function useIsDarkMode(): boolean {
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof document === 'undefined') return false
    return document.documentElement.classList.contains('dark')
  })

  useEffect(() => {
    const checkDark = () => {
      setIsDark(document.documentElement.classList.contains('dark'))
    }

    // Initial check
    checkDark()

    // Observe class attribute changes on <html>
    const observer = new MutationObserver(checkDark)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })

    // Also observe media query changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    mediaQuery.addEventListener('change', checkDark)

    return () => {
      observer.disconnect()
      mediaQuery.removeEventListener('change', checkDark)
    }
  }, [])

  return isDark
}

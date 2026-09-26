import { useEffect, useState } from 'react'

export type ThemePreference = 'system' | 'light' | 'dark'

export function useTheme() {
  const [themePreference, setThemePreference] = useState<ThemePreference>(() => {
    if (typeof window === 'undefined') return 'system'
    const stored = localStorage.getItem('theme-preference') as ThemePreference | null
    if (stored === 'system' || stored === 'light' || stored === 'dark') {
      return stored
    }
    return 'system'
  })

  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') return 'light'
    const stored = localStorage.getItem('theme-preference')
    if (stored === 'dark') return 'dark'
    if (stored === 'light') return 'light'
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const mobileQuery = window.matchMedia('(max-width: 767px)')

    const applyTheme = (pref: ThemePreference) => {
      let isDark =
        pref === 'dark' ? true : pref === 'light' ? false : mediaQuery.matches

      // Force light mode on mobile screens
      if (mobileQuery.matches) {
        isDark = false
      }

      setResolvedTheme(isDark ? 'dark' : 'light')

      if (isDark) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }

    applyTheme(themePreference)

    const handleChange = () => {
      applyTheme(themePreference)
    }

    mediaQuery.addEventListener('change', handleChange)
    mobileQuery.addEventListener('change', handleChange)
    
    return () => {
      mediaQuery.removeEventListener('change', handleChange)
      mobileQuery.removeEventListener('change', handleChange)
    }
  }, [themePreference])

  const setTheme = (pref: ThemePreference) => {
    setThemePreference(pref)
    try {
      localStorage.setItem('theme-preference', pref)
    } catch {
      // Ignore localStorage exceptions in private browsing
    }
  }

  return {
    themePreference,
    resolvedTheme,
    setTheme,
  }
}

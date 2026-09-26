import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { ThemeToggle } from "./ThemeToggle"
import type { ThemePreference } from "../hooks/useTheme"
import { portfolioData } from "../data/portfolioData"

interface NavbarProps {
  themePreference: ThemePreference
  onSelectTheme: (theme: ThemePreference) => void
}

const NAV_LINKS = [
  { label: "Hero", to: "/" },
  { label: "About", to: "/about" },
  { label: "Projects", to: "/projects" },
  { label: "Art", to: "/art" },
  { label: "Visitors", to: "/visitors" },
]

export function Navbar({ themePreference, onSelectTheme }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [location.pathname])

  const isActive = (to: string) => to === "/" ? location.pathname === "/" : location.pathname.startsWith(to)

  return (
    <header
      className={isScrolled ? "sticky top-0 z-40 w-full transition-all duration-300 bg-neutral-50/90 dark:bg-neutral-950/90 backdrop-blur-md border-b border-neutral-200/70 dark:border-neutral-800/70 py-3 shadow-xs" : "sticky top-0 z-40 w-full transition-all duration-300 bg-transparent border-b border-transparent py-5"}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <Link
          to="/"
          className="group flex items-center gap-2 font-mono text-sm tracking-widest uppercase font-semibold text-neutral-900 dark:text-neutral-100 hover:text-neutral-500 dark:hover:text-neutral-400 transition-colors"
          aria-label="Back to home"
        >
          <span className="border border-neutral-300 dark:border-neutral-700 rounded px-1.5 py-0.5 group-hover:border-neutral-900 dark:group-hover:border-neutral-100 transition-colors">
            {portfolioData.personal.shortName}
          </span>
          <span className="hidden sm:inline tracking-normal font-sans font-medium text-xs text-neutral-500 dark:text-neutral-400">
            / {portfolioData.personal.name}
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm" aria-label="Main Navigation">
          {NAV_LINKS.map((link) => {
            const active = isActive(link.to)
            return (
              <Link
                key={link.to}
                to={link.to}
                className={active ? "relative py-1 transition-colors duration-200 text-neutral-950 dark:text-white font-medium" : "relative py-1 transition-colors duration-200 text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200"}
              >
                {link.label}
                {active && (
                  <span
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-neutral-900 dark:bg-neutral-100 rounded-full"
                    aria-hidden="true"
                  />
                )}
              </Link>
            )
          })}
        </nav>

        <div className="hidden sm:flex items-center gap-3">
          <ThemeToggle themePreference={themePreference} onSelectTheme={onSelectTheme} />
        </div>
      </div>
    </header>
  )
}

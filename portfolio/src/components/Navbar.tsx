import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { ThemeToggle } from './ThemeToggle'
import type { ThemePreference } from '../hooks/useTheme'
import { portfolioData } from '../data/portfolioData'

interface NavbarProps {
  themePreference: ThemePreference
  onSelectTheme: (theme: ThemePreference) => void
}

const NAV_LINKS = [
  { label: 'Hero', href: '#hero', id: 'hero' },
  { label: 'GitHub', href: '#github', id: 'github' },
  { label: 'Technologies', href: '#technologies', id: 'technologies' },
  { label: 'Projects', href: '#projects', id: 'projects' },
  { label: 'Certifications', href: '#certifications', id: 'certifications' },
  { label: 'Contact', href: '#contact', id: 'contact' },
]

export function Navbar({ themePreference, onSelectTheme }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)

      // Section visibility calculation
      const sections = NAV_LINKS.map((link) => document.getElementById(link.id))
      const scrollPosition = window.scrollY + 200

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        if (section) {
          const top = section.offsetTop
          if (scrollPosition >= top) {
            setActiveSection(NAV_LINKS[i].id)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on escape or resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false)
      }
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setMobileMenuOpen(false)
    const targetElement = document.querySelector(href)
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-neutral-50/90 dark:bg-neutral-950/90 backdrop-blur-md border-b border-neutral-200/70 dark:border-neutral-800/70 py-3 shadow-xs'
          : 'bg-transparent border-b border-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand / Logo */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, '#hero')}
          className="group flex items-center gap-2 font-mono text-sm tracking-widest uppercase font-semibold text-neutral-900 dark:text-neutral-100 hover:text-neutral-500 dark:hover:text-neutral-400 transition-colors"
          aria-label="Back to top"
        >
          <span className="border border-neutral-300 dark:border-neutral-700 rounded px-1.5 py-0.5 group-hover:border-neutral-900 dark:group-hover:border-neutral-100 transition-colors">
            {portfolioData.personal.shortName}
          </span>
          <span className="hidden sm:inline tracking-normal font-sans font-medium text-xs text-neutral-500 dark:text-neutral-400">
            / {portfolioData.personal.name}
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm" aria-label="Main Navigation">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.id
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`relative py-1 transition-colors duration-200 ${
                  isActive
                    ? 'text-neutral-950 dark:text-white font-medium'
                    : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200'
                }`}
              >
                {link.label}
                {isActive && (
                  <span
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-neutral-900 dark:bg-neutral-100 rounded-full"
                    aria-hidden="true"
                  />
                )}
              </a>
            )
          })}
        </nav>

        {/* Right side: Theme toggle and mobile menu trigger */}
        <div className="flex items-center gap-3">
          <ThemeToggle
            themePreference={themePreference}
            onSelectTheme={onSelectTheme}
          />

          {/* Mobile hamburger button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="md:hidden p-2 rounded-md border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50/98 dark:bg-neutral-950/98 backdrop-blur-md px-6 py-5 animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-3" aria-label="Mobile Navigation">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`text-base py-2 transition-colors flex items-center justify-between ${
                    isActive
                      ? 'text-neutral-950 dark:text-white font-medium pl-2 border-l-2 border-neutral-900 dark:border-neutral-100'
                      : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && <span className="text-xs font-mono text-neutral-400">●</span>}
                </a>
              )
            })}
          </nav>
        </div>
      )}
    </header>
  )
}

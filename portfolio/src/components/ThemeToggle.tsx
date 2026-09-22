import { Monitor, Moon, Sun } from 'lucide-react'
import type { ThemePreference } from '../hooks/useTheme'

interface ThemeToggleProps {
  themePreference: ThemePreference
  onSelectTheme: (theme: ThemePreference) => void
}

export function ThemeToggle({ themePreference, onSelectTheme }: ThemeToggleProps) {
  const options: { value: ThemePreference; label: string; icon: typeof Monitor }[] = [
    { value: 'system', label: 'System theme', icon: Monitor },
    { value: 'light', label: 'Light theme', icon: Sun },
    { value: 'dark', label: 'Dark theme', icon: Moon },
  ]

  return (
    <div
      role="radiogroup"
      aria-label="Color theme switcher"
      className="inline-flex items-center rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-100/80 dark:bg-neutral-900/80 p-0.5 text-neutral-600 dark:text-neutral-400"
    >
      {options.map((option) => {
        const Icon = option.icon
        const isActive = themePreference === option.value

        return (
          <button
            key={option.value}
            role="radio"
            aria-checked={isActive}
            aria-label={option.label}
            title={option.label}
            onClick={() => onSelectTheme(option.value)}
            className={`relative p-1.5 rounded-full transition-all duration-200 ease-out focus-visible:outline-2 focus-visible:outline-neutral-900 dark:focus-visible:outline-neutral-100 ${
              isActive
                ? 'bg-white dark:bg-neutral-800 text-neutral-950 dark:text-white shadow-xs'
                : 'hover:text-neutral-900 dark:hover:text-neutral-200 opacity-70 hover:opacity-100'
            }`}
          >
            <Icon className="w-3.5 h-3.5" aria-hidden="true" />
            <span className="sr-only">{option.label}</span>
          </button>
        )
      })}
    </div>
  )
}

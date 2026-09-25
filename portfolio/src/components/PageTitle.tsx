import { useEffect, useState } from 'react'

const CODING_SYMBOLS = [
  ['<', ' />'],
  ['{ ', ' }'],
  ['( ', ' )'],
  ['[ ', ' ]'],
  ['/* ', ' */'],
  ['', '_']
]

interface PageTitleProps {
  title: string
  className?: string
}

export function PageTitle({ title, className = '' }: PageTitleProps) {
  const [symbolIndex, setSymbolIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setSymbolIndex((prev) => (prev + 1) % CODING_SYMBOLS.length)
    }, 800)
    return () => clearInterval(interval)
  }, [])

  const [leftSymbol, rightSymbol] = CODING_SYMBOLS[symbolIndex]

  return (
    <h1 className={`flex items-center flex-wrap gap-1 sm:gap-2 ${className}`}>
      <span className="text-emerald-500 dark:text-emerald-400 font-mono font-normal animate-pulse text-[0.8em] opacity-80">
        {leftSymbol}
      </span>
      <span>{title}</span>
      <span className="text-emerald-500 dark:text-emerald-400 font-mono font-normal animate-pulse text-[0.8em] opacity-80">
        {rightSymbol}
      </span>
    </h1>
  )
}


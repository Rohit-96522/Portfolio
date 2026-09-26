import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Contact, Laptop, Paintbrush, Palette, Menu, X, Moon, Sun } from 'lucide-react'


export function MobileNavBubble() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])

  const navItems = [
    {
      to: "/art",
      label: "Art",
      content: (
        <div className="relative w-full h-full flex items-center justify-center">
          <Palette className="w-4 h-4 absolute -translate-x-1.5" />
          <Paintbrush className="w-3.5 h-3.5 absolute translate-x-1.5 translate-y-1.5 text-emerald-500" />
        </div>
      )
    },
    {
      to: "/projects",
      label: "Projects",
      content: (
        <div className="relative w-full h-full flex items-center justify-center">
          <Laptop className="w-5 h-5" />
          <span className="absolute text-[8px] font-mono font-bold mt-1 text-emerald-500">{"</>"}</span>
        </div>
      )
    },
    {
      to: "/about",
      label: "About",
      content: <Contact className="w-5 h-5" />
    },
    {
      to: "/",
      label: "Hero",
      content: <span className="font-bold font-mono tracking-tighter">PR</span>
    }
  ]

  return (
    <>
      {/* Backdrop to close when clicking outside */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[99998] bg-neutral-950/20 dark:bg-neutral-950/40 backdrop-blur-sm transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div className="fixed bottom-8 right-8 w-16 h-16 z-[99999]">
        {/* Speed Dial Items */}
        <div className="absolute inset-0 z-[99998] pointer-events-none">
          {navItems.map((item, index) => {
            const isActive = item.to === '/' ? location.pathname === '/' : location.pathname.startsWith(item.to)
            
            // Distribute items across a 90-degree arc (Quarter circle)
            const totalItems = navItems.length
            // index 0 -> 0 radians (straight up)
            // index max -> PI/2 radians (straight left)
            const angle = (index / (totalItems - 1)) * (Math.PI / 2)
            const radius = 130 // Expansion distance in pixels

            // x is negative (left), y is negative (up)
            const x = -Math.sin(angle) * radius
            const y = -Math.cos(angle) * radius

            return (
              <div
                key={item.label}
                className="absolute top-0 left-0 w-full h-full flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
                style={{
                  transform: isOpen ? `translate(${x}px, ${y}px) scale(1)` : `translate(0px, 0px) scale(0)`,
                  opacity: isOpen ? 1 : 0,
                  transitionDelay: isOpen ? `${index * 40}ms` : '0ms'
                }}
              >
                <Link
                  to={item.to}
                  className={`w-14 h-14 rounded-full border shadow-sm flex items-center justify-center transition-all duration-200 relative group pointer-events-auto hover:scale-110
                    ${isActive 
                      ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 border-neutral-900 dark:border-white z-10' 
                      : 'bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 active:bg-neutral-50 dark:active:bg-neutral-700'
                    }`}
                  aria-label={item.label}
                  onClick={() => setIsOpen(false)}
                >
                  {item.content}
                </Link>
              </div>
            )
          })}
        </div>

        {/* Main Bubble */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-16 h-16 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 flex items-center justify-center shadow-xl shadow-neutral-900/20 transition-transform active:scale-90 absolute inset-0 z-[99999]"
          aria-label="Toggle navigation menu"
        >
          {isOpen ? (
            <X className="w-7 h-7 transition-transform duration-300 rotate-90" />
          ) : (
            <Menu className="w-7 h-7 transition-transform duration-300" />
          )}
        </button>
      </div>
    </>
  )
}
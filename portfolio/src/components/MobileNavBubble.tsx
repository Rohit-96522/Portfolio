import { Link, useLocation } from 'react-router-dom'
import { User, Laptop, Palette, Users } from 'lucide-react'

const PrIcon = ({ className }: { className?: string; strokeWidth?: number | string }) => (
  <span className={`font-mono font-bold flex items-center justify-center tracking-tighter ${className}`} style={{ fontSize: '14px', lineHeight: 1 }}>
    PR
  </span>
)

export function MobileNavBubble() {
  const location = useLocation()

  const navItems = [
    { to: "/", label: "Rohit", icon: PrIcon },
    { to: "/about", label: "About", icon: User },
    { to: "/projects", label: "Projects", icon: Laptop },
    { to: "/art", label: "Art", icon: Palette },
    { to: "/visitors", label: "Visitors", icon: Users },
  ]

  return (
    <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-[99999] w-max">
      <div className="flex items-center gap-1.5 p-2 bg-[#1A1A1A] rounded-full shadow-2xl border border-white/10 backdrop-blur-xl">
        {navItems.map((item) => {
          const isActive = item.to === '/' ? location.pathname === '/' : location.pathname.startsWith(item.to)
          const Icon = item.icon
          
          return (
            <Link
              key={item.to}
              to={item.to}
              aria-label={item.label}
              className={`flex items-center justify-center rounded-full transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                isActive 
                  ? 'bg-white/15 text-white px-4 py-2.5 shadow-inner' 
                  : 'text-neutral-400 hover:text-white hover:bg-white/5 px-3 py-2.5'
              }`}
            >
              <Icon className={`w-5 h-5 shrink-0 transition-all duration-300 ${isActive ? 'scale-110' : 'scale-100'}`} strokeWidth={isActive ? 2.5 : 2} />
              
              <div 
                className={`overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] flex items-center ${
                  isActive ? 'max-w-36 ml-2 opacity-100' : 'max-w-0 ml-0 opacity-0'
                }`}
              >
                <span className="text-sm font-semibold whitespace-nowrap">
                  {item.label}
                </span>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
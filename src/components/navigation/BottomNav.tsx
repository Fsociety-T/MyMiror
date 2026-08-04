import { NavLink } from 'react-router-dom'
import { CalendarRange, ClipboardCheck, Home, Timer, Vault } from 'lucide-react'
import { NAV_ITEMS, type NavItemId } from '@/lib/constants'
import { cn } from '@/utils/cn'

const icons: Record<NavItemId, typeof Home> = {
  home: Home,
  plan: CalendarRange,
  focus: Timer,
  review: ClipboardCheck,
  vault: Vault,
}

export function BottomNav() {
  return (
    <nav
      aria-label="Main navigation"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-surface/90 backdrop-blur-lg"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="mx-auto flex h-[64px] max-w-[430px] items-stretch">
        {NAV_ITEMS.map((item) => {
          const Icon = icons[item.id]
          return (
            <NavLink
              key={item.id}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  'relative flex min-w-0 flex-1 flex-col items-center justify-center gap-1',
                  'outline-none focus-visible:bg-surface',
                  isActive && 'text-accent',
                )
              }
            >
              {({ isActive }) => (
                <>
                  {isActive ? (
                    <span className="absolute top-0 h-[3px] w-8 rounded-b-full bg-accent" />
                  ) : null}
                  <Icon
                    className={cn(
                      'h-[22px] w-[22px] transition-colors duration-150',
                      isActive ? 'text-accent' : 'text-muted',
                    )}
                    strokeWidth={isActive ? 2.2 : 1.8}
                  />
                  <span
                    className={cn(
                      'text-[11px] font-medium transition-colors duration-150',
                      isActive ? 'text-accent' : 'text-muted',
                    )}
                  >
                    {item.label}
                  </span>
                </>
              )}
            </NavLink>
          )
        })}
      </div>
    </nav>
  )
}

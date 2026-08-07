import { NavLink, useLocation } from 'react-router'
import { motion } from 'motion/react'
import { CalendarCheck, FolderKanban, Plus, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

const TABS = [
  { to: '/', label: 'Today', Icon: CalendarCheck },
  { to: '/insights', label: 'Insights', Icon: Sparkles },
  { to: '/projects', label: 'Projects', Icon: FolderKanban },
] as const

export function TabBar({ onAdd }: { onAdd: () => void }) {
  const { pathname } = useLocation()

  return (
    <>
      {/* FAB sits fully above the bar so it never covers the middle tab's label */}
      <motion.button
        onClick={onAdd}
        aria-label="Log something"
        whileTap={{ scale: 0.94 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        className="fixed bottom-[calc(72px+env(safe-area-inset-bottom))] left-1/2 z-30 flex size-14 -translate-x-1/2 items-center justify-center rounded-full bg-accent text-white ring-8 ring-bg"
      >
        <Plus size={26} strokeWidth={2.5} />
      </motion.button>

      <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-line bg-bg/85 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl">
        <div className="mx-auto flex h-[64px] max-w-md items-stretch">
          {TABS.map(({ to, label, Icon }) => {
            const active = pathname === to
            return (
              <NavLink
                key={to}
                to={to}
                className="relative flex flex-1 flex-col items-center justify-center gap-1"
              >
                {active && (
                  <motion.span
                    layoutId="tab-indicator"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    className="absolute top-0 h-[2px] w-10 rounded-full bg-accent"
                  />
                )}
                <Icon
                  size={21}
                  strokeWidth={active ? 2.4 : 2}
                  className={cn('transition-colors', active ? 'text-accent' : 'text-dim')}
                />
                <span
                  className={cn(
                    'text-[10px] font-medium transition-colors',
                    active ? 'text-text' : 'text-dim',
                  )}
                >
                  {label}
                </span>
              </NavLink>
            )
          })}
        </div>
      </nav>
    </>
  )
}

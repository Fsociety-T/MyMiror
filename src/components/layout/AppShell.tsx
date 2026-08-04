import { Link, Outlet, useLocation } from 'react-router-dom'
import { Settings, Sparkles } from 'lucide-react'
import { APP_NAME, MOBILE_MAX_WIDTH } from '@/lib/constants'
import { BottomNav } from '@/components/navigation/BottomNav'
import { cn } from '@/utils/cn'

const settingsRoutes = ['/settings']

export function AppShell() {
  const location = useLocation()
  const isSettingsPage = settingsRoutes.includes(location.pathname)

  return (
    <div className="min-h-dvh bg-app">
      <div
        className="mx-auto flex min-h-dvh w-full flex-col bg-app"
        style={{ maxWidth: MOBILE_MAX_WIDTH }}
      >
        <header
          className={cn(
            'flex h-14 shrink-0 items-center justify-between px-4',
            'border-b border-line/60',
          )}
        >
          <Link to="/" className="flex items-center gap-2 outline-none">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-accent/15">
              <Sparkles className="h-4 w-4 text-accent" />
            </span>
            <span className="text-[15px] font-semibold tracking-tight text-primary">
              {APP_NAME}
            </span>
          </Link>

          <Link
            to="/settings"
            aria-label="Profile and settings"
            className={cn(
              'flex h-11 w-11 items-center justify-center rounded-xl text-secondary',
              'transition-colors outline-none active:bg-surface active:text-primary',
              'focus-visible:ring-2 focus-visible:ring-accent/50',
              isSettingsPage && 'text-accent bg-accent/10',
            )}
          >
            <Settings className="h-5 w-5" />
          </Link>
        </header>

        <main className="flex-1 px-4 pb-32 pt-4">{<Outlet />}</main>

        <BottomNav />
      </div>
    </div>
  )
}

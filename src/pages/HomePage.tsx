import { useState } from 'react'
import { CalendarDays, Compass, Hourglass, ListTodo, Plus, Sparkles } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import { QUICK_ADD_OPTIONS } from '@/lib/constants'
import { useProfile } from '@/features/auth/useProfile'

function getGreeting(): string {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 18) return 'Good afternoon'
  return 'Good evening'
}

function formatToday(): string {
  return new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })
}

export function HomePage() {
  const [quickAddOpen, setQuickAddOpen] = useState(false)
  const { data: profile } = useProfile()
  const displayName = profile?.display_name?.trim() || 'friend'

  return (
    <div>
      <section className="mb-5">
        <h1 className="text-[28px] font-semibold leading-tight tracking-tight text-primary">
          {getGreeting()}, {displayName}.
        </h1>
        <p className="mt-1 flex items-center gap-1.5 text-[13px] text-muted">
          <CalendarDays className="h-3.5 w-3.5" />
          {formatToday()}
        </p>
      </section>

      <section
        className="animate-fade-up relative mb-4 overflow-hidden rounded-[24px] border border-accent/25 p-5"
        style={{ animationDelay: '0.06s' }}
      >
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-br from-accent/25 via-card to-surface"
        />
        <div
          aria-hidden
          className="animate-pulse-soft absolute -top-16 -right-10 h-40 w-40 rounded-full bg-accent/20 blur-3xl"
        />
        <div className="relative">
          <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-accent-soft">
            <Compass className="h-3.5 w-3.5" />
            Your future
          </p>
          <p className="mt-3 text-[17px] font-medium leading-snug text-primary">
            Your vision, yearly objective and current focus will live here.
          </p>
          <p className="mt-2 text-[13px] text-secondary">
            Complete onboarding in Phase 3 to shape your Future Card.
          </p>
        </div>
      </section>

      <Card
        className="animate-fade-up mb-4"
        elevated
        style={{ animationDelay: '0.12s' }}
      >
        <div className="mb-3 flex items-center gap-1.5">
          <Hourglass className="h-4 w-4 text-accent" />
          <h2 className="text-[14px] font-semibold uppercase tracking-[0.08em] text-secondary">
            Today&apos;s focus
          </h2>
        </div>
        <p className="text-[15px] text-primary">No focus session set yet.</p>
        <p className="mt-1 text-[13px] text-muted">
          Pick one important task and protect time for it.
        </p>
        <Button variant="secondary" size="md" className="mt-4" disabled>
          Start focus
        </Button>
      </Card>

      <Card className="animate-fade-up mb-4" style={{ animationDelay: '0.18s' }}>
        <h2 className="mb-3 text-[14px] font-semibold uppercase tracking-[0.08em] text-secondary">
          Today
        </h2>
        <ul className="space-y-3">
          {['Your three important tasks will appear here'].map((placeholder) => (
            <li key={placeholder} className="flex items-center gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-line" />
              <span className="text-[14px] text-muted">{placeholder}</span>
            </li>
          ))}
        </ul>
        <Button variant="ghost" size="md" className="mt-2 -ml-2" disabled>
          <ListTodo className="h-4 w-4" />
          View all tasks
        </Button>
      </Card>

      <Card className="animate-fade-up mb-4" style={{ animationDelay: '0.24s' }}>
        <h2 className="mb-3 text-[14px] font-semibold uppercase tracking-[0.08em] text-secondary">
          Day progress
        </h2>
        <div className="grid grid-cols-3 gap-3 text-center">
          {[
            { label: 'Tasks', value: '0 of 0' },
            { label: 'Focus', value: '0 min' },
            { label: 'Review', value: '—' },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl border border-line bg-surface py-3">
              <p className="text-[15px] font-semibold text-primary">{stat.value}</p>
              <p className="mt-0.5 text-[11px] font-medium uppercase tracking-wide text-muted">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </Card>

      <button
        type="button"
        onClick={() => setQuickAddOpen(true)}
        aria-label="Quick add"
        className="fixed bottom-24 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white shadow-[0_10px_28px_-6px_rgba(139,124,255,0.55)] transition-transform duration-150 active:scale-90 sm:right-[calc(50%-215px+16px)]"
      >
        <span
          aria-hidden
          className="animate-ping absolute inset-0 rounded-full bg-accent/40 [animation-duration:2.5s]"
        />
        <Plus className="h-6 w-6" />
      </button>

      <Modal
        open={quickAddOpen}
        onClose={() => setQuickAddOpen(false)}
        title="Quick add"
      >
        <div className="grid gap-2">
          {QUICK_ADD_OPTIONS.map((option) => (
            <button
              key={option.id}
              type="button"
              disabled
              className="flex h-12 items-center gap-3 rounded-xl border border-line bg-surface px-4 text-left text-[15px] font-medium text-secondary disabled:opacity-60"
            >
              <Sparkles className="h-4 w-4 text-accent" />
              {option.label}
              <span className="ml-auto text-[11px] font-semibold uppercase tracking-wide text-muted">
                Phase 3
              </span>
            </button>
          ))}
        </div>
      </Modal>
    </div>
  )
}

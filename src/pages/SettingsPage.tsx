import { CircleUserRound, LockKeyhole, LogOut, Moon } from 'lucide-react'
import { PageHeader } from '@/components/layout/PageHeader'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { APP_NAME, APP_TAGLINE } from '@/lib/constants'

const items = [
  {
    icon: CircleUserRound,
    title: 'Profile',
    description: 'Your name, avatar and timezone.',
    phase: 'Phase 2',
  },
  {
    icon: LockKeyhole,
    title: 'Security',
    description: 'Password and account security.',
    phase: 'Phase 2',
  },
  {
    icon: Moon,
    title: 'Appearance',
    description: 'The calm dark theme is always on.',
    phase: 'Ready',
  },
]

export function SettingsPage() {
  return (
    <div>
      <PageHeader title="Settings" subtitle="Your profile, security and preferences." />

      <div
        className="animate-fade-up mb-5 flex items-center gap-4 rounded-[20px] border border-line bg-card p-4"
        style={{ animationDelay: '0.05s' }}
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-full border border-line bg-surface">
          <CircleUserRound className="h-6 w-6 text-muted" strokeWidth={1.5} />
        </span>
        <div>
          <p className="text-[16px] font-semibold text-primary">Friend</p>
          <p className="text-[13px] text-muted">Signed out — authentication arrives in Phase 2</p>
        </div>
      </div>

      <div className="grid gap-3">
        {items.map(({ icon: Icon, title, description, phase }, index) => (
          <Card
            key={title}
            className="animate-fade-up flex items-center gap-4"
            style={{ animationDelay: `${0.1 + index * 0.06}s` }}
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-line bg-surface">
              <Icon className="h-5 w-5 text-accent" strokeWidth={1.8} />
            </span>
            <div className="min-w-0 flex-1">
              <h2 className="text-[15px] font-semibold text-primary">{title}</h2>
              <p className="mt-0.5 text-[12px] text-muted">{description}</p>
            </div>
            <span className="shrink-0 rounded-full border border-line px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-muted">
              {phase}
            </span>
          </Card>
        ))}
      </div>

      <Card className="mt-4 flex items-center gap-3 border-danger/20">
        <LogOut className="h-5 w-5 text-danger" strokeWidth={1.8} />
        <p className="flex-1 text-[13px] text-muted">Sign out of your private mirror.</p>
        <Button variant="danger" size="md" disabled>
          Sign out
        </Button>
      </Card>

      <p className="mt-6 text-center text-[12px] text-muted">
        {APP_NAME} — {APP_TAGLINE}
      </p>
    </div>
  )
}

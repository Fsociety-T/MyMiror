import { BarChart3, History, Timer } from 'lucide-react'
import { PageHeader } from '@/components/layout/PageHeader'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

export function FocusPage() {
  return (
    <div>
      <PageHeader
        title="Focus"
        subtitle="Protect your time and execute one important task."
      />

      <Card className="mb-4 flex flex-col items-center py-8 text-center" elevated>
        <span className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-accent/15">
          <Timer className="h-6 w-6 text-accent" />
        </span>
        <p className="text-[13px] font-medium text-muted">Select a task to begin</p>
        <p className="mt-3 font-mono text-[56px] font-semibold leading-none tracking-tight text-primary tabular-nums">
          25:00
        </p>
        <p className="mt-3 text-[13px] text-secondary">Pick a duration to customize the timer.</p>
        <Button className="mt-6" disabled>
          Start focus
        </Button>
      </Card>

      <div className="grid grid-cols-2 gap-3">
        <Card>
          <History className="mb-2 h-5 w-5 text-accent" strokeWidth={1.8} />
          <h2 className="text-[15px] font-semibold text-primary">Session history</h2>
          <p className="mt-0.5 text-[12px] text-muted">Your completed focus sessions.</p>
        </Card>
        <Card>
          <BarChart3 className="mb-2 h-5 w-5 text-accent" strokeWidth={1.8} />
          <h2 className="text-[15px] font-semibold text-primary">Time statistics</h2>
          <p className="mt-0.5 text-[12px] text-muted">Minutes focused by project.</p>
        </Card>
      </div>
    </div>
  )
}

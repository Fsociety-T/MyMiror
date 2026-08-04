import { CalendarCheck, CalendarRange, MessageSquareText, TrendingUp } from 'lucide-react'
import { PageHeader } from '@/components/layout/PageHeader'
import { Card } from '@/components/ui/Card'

const sections = [
  {
    icon: CalendarCheck,
    title: 'Daily review',
    description: 'What did you complete, what distracted you, what did you learn?',
    phase: 'Phase 7',
  },
  {
    icon: CalendarRange,
    title: 'Weekly review',
    description: 'Main achievement, lessons, and next week\u2019s focus.',
    phase: 'Phase 7',
  },
  {
    icon: TrendingUp,
    title: 'Goal progress',
    description: 'Progress across your active goals and projects.',
    phase: 'Phase 7',
  },
  {
    icon: MessageSquareText,
    title: 'AI insights',
    description: 'Summaries and patterns detected by the assistant.',
    phase: 'Phase 8',
  },
]

export function ReviewPage() {
  return (
    <div>
      <PageHeader
        title="Review"
        subtitle="Turn activity into learning. What worked, what should change?"
      />
      <div className="grid gap-3">
        {sections.map(({ icon: Icon, title, description, phase }) => (
          <Card key={title} className="flex items-center gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-line bg-surface">
              <Icon className="h-5 w-5 text-accent" strokeWidth={1.8} />
            </span>
            <div className="min-w-0 flex-1">
              <h2 className="text-[15px] font-semibold text-primary">{title}</h2>
              <p className="mt-0.5 text-[12px] leading-snug text-muted">{description}</p>
            </div>
            <span className="shrink-0 rounded-full border border-line px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-muted">
              {phase}
            </span>
          </Card>
        ))}
      </div>
    </div>
  )
}

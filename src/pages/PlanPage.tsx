import { CalendarRange, Compass, Flag, Layers, ListTodo } from 'lucide-react'
import { PageHeader } from '@/components/layout/PageHeader'
import { Card } from '@/components/ui/Card'

const sections = [
  {
    icon: Compass,
    title: 'Vision',
    description: 'Who you want to become — identity, mission, yearly objective.',
    phase: 'Phase 3',
  },
  {
    icon: Flag,
    title: 'Goals',
    description: 'Important results you want to reach.',
    phase: 'Phase 4',
  },
  {
    icon: Layers,
    title: 'Projects',
    description: 'Work that must be completed to reach your goals.',
    phase: 'Phase 4',
  },
  {
    icon: CalendarRange,
    title: 'Milestones',
    description: 'Major stages inside each project.',
    phase: 'Phase 4',
  },
  {
    icon: ListTodo,
    title: 'All tasks',
    description: 'Every action across all projects.',
    phase: 'Phase 5',
  },
]

export function PlanPage() {
  return (
    <div>
      <PageHeader
        title="Plan"
        subtitle="Define direction, organize work, and know what to do next."
      />
      <div className="grid gap-3">
        {sections.map(({ icon: Icon, title, description, phase }, index) => (
          <Card
            key={title}
            className="animate-fade-up flex items-center gap-4"
            style={{ animationDelay: `${0.05 + index * 0.06}s` }}
          >
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

import { Archive, BookOpen, Lightbulb, NotebookPen, Scale, Vault } from 'lucide-react'
import { PageHeader } from '@/components/layout/PageHeader'
import { Card } from '@/components/ui/Card'
import { EmptyState } from '@/components/ui/EmptyState'

const noteTypes = [
  { icon: NotebookPen, label: 'Notes' },
  { icon: Lightbulb, label: 'Ideas' },
  { icon: BookOpen, label: 'Learning' },
  { icon: Scale, label: 'Decisions' },
  { icon: Archive, label: 'Reflections' },
]

export function VaultPage() {
  return (
    <div>
      <PageHeader
        title="Vault"
        subtitle="Your private knowledge — notes, ideas, decisions and reflections."
      />
      <div className="mb-4 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {noteTypes.map(({ icon: Icon, label }) => (
          <span
            key={label}
            className="flex shrink-0 items-center gap-1.5 rounded-full border border-line bg-card px-3.5 py-2 text-[12px] font-medium text-secondary"
          >
            <Icon className="h-3.5 w-3.5 text-accent" strokeWidth={1.8} />
            {label}
          </span>
        ))}
      </div>
      <Card>
        <EmptyState
          icon={Vault}
          title="Your vault is empty"
          description="Notes, ideas and decisions you save will appear here. Notes arrive in Phase 7."
        />
      </Card>
    </div>
  )
}

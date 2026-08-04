import type { LucideIcon } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { cn } from '@/utils/cn'

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description?: string
  actionLabel?: string
  onAction?: () => void
  className?: string
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  className,
}: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center px-6 py-10 text-center', className)}>
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-[20px] border border-line bg-surface">
        <Icon className="h-7 w-7 text-muted" strokeWidth={1.5} />
      </div>
      <h3 className="text-[16px] font-semibold text-primary">{title}</h3>
      {description ? <p className="mt-1.5 max-w-[260px] text-[13px] text-muted">{description}</p> : null}
      {actionLabel && onAction ? (
        <Button variant="secondary" size="md" onClick={onAction} className="mt-5">
          {actionLabel}
        </Button>
      ) : null}
    </div>
  )
}

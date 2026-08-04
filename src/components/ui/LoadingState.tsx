import { Loader2 } from 'lucide-react'

interface LoadingStateProps {
  label?: string
}

export function LoadingState({ label = 'Loading…' }: LoadingStateProps) {
  return (
    <div className="flex flex-col items-center gap-3 py-12" role="status" aria-live="polite">
      <Loader2 className="h-7 w-7 animate-spin text-accent" />
      <p className="text-[13px] font-medium text-muted">{label}</p>
    </div>
  )
}

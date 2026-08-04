import { TriangleAlert } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface ErrorStateProps {
  title?: string
  message?: string
  onRetry?: () => void
}

export function ErrorState({
  title = 'Something went wrong',
  message = 'An unexpected error occurred. Please try again.',
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center px-6 py-10 text-center" role="alert">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-[20px] border border-danger/20 bg-danger/10">
        <TriangleAlert className="h-7 w-7 text-danger" strokeWidth={1.5} />
      </div>
      <h3 className="text-[16px] font-semibold text-primary">{title}</h3>
      <p className="mt-1.5 max-w-[280px] text-[13px] text-muted">{message}</p>
      {onRetry ? (
        <Button variant="secondary" size="md" onClick={onRetry} className="mt-5">
          Try again
        </Button>
      ) : null}
    </div>
  )
}

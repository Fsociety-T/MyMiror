import type { HTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  elevated?: boolean
  padded?: boolean
}

export function Card({ className, elevated, padded = true, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-[20px] border border-line bg-card',
        elevated && 'border-transparent bg-card-elevated shadow-[0_12px_32px_-12px_rgba(0,0,0,0.6)]',
        padded && 'p-4',
        className,
      )}
      {...props}
    />
  )
}

export function CardTitle({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn('text-[16px] font-semibold tracking-tight text-primary', className)}
      {...props}
    />
  )
}

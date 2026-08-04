import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/utils/cn'

interface PageHeaderProps extends HTMLAttributes<HTMLDivElement> {
  title: string
  subtitle?: ReactNode
}

export function PageHeader({ title, subtitle, className, ...props }: PageHeaderProps) {
  return (
    <div className={cn('mb-5', className)} {...props}>
      <h1 className="text-[28px] font-semibold leading-tight tracking-tight text-primary">
        {title}
      </h1>
      {subtitle ? <p className="mt-1 text-[13px] text-muted">{subtitle}</p> : null}
    </div>
  )
}

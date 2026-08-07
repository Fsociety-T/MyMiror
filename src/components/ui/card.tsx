import { motion } from 'motion/react'
import type { ComponentProps } from 'react'
import { cn } from '@/lib/utils'

type Props = ComponentProps<typeof motion.div> & {
  /** Position in the stack — drives the 40ms entrance stagger. */
  index?: number
}

/**
 * Depth comes from the 1px border, never a shadow (PLAN §4).
 * Entrance runs once per mount and never on re-render, because `initial`
 * only applies when the node first appears.
 */
export function Card({ className, index = 0, ...props }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, ease: 'easeOut', delay: index * 0.04 }}
      className={cn(
        'rounded-[20px] border border-line bg-surface p-4',
        className,
      )}
      {...props}
    />
  )
}

export function CardLabel({ className, ...props }: ComponentProps<'div'>) {
  return <div className={cn('label', className)} {...props} />
}

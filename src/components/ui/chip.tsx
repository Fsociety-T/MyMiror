import { motion } from 'motion/react'
import type { ComponentProps } from 'react'
import { cn } from '@/lib/utils'

type Props = ComponentProps<typeof motion.button> & { active?: boolean }

export function Chip({ active, className, ...props }: Props) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={cn(
        'h-10 rounded-full border px-4 text-[14px] font-medium transition-colors',
        active
          ? 'border-accent bg-accent text-white'
          : 'border-line bg-surface-2 text-dim',
        className,
      )}
      {...props}
    />
  )
}

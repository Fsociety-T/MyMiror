import { cva, type VariantProps } from 'class-variance-authority'
import { motion } from 'motion/react'
import type { ComponentProps } from 'react'
import { cn } from '@/lib/utils'

const button = cva(
  'inline-flex items-center justify-center gap-2 rounded-[14px] font-medium transition-colors disabled:opacity-40 disabled:pointer-events-none select-none',
  {
    variants: {
      variant: {
        primary: 'bg-accent text-white hover:bg-accent/90',
        surface: 'bg-surface-2 text-text border border-line hover:bg-surface-2/70',
        ghost: 'text-dim hover:text-text',
        danger: 'bg-bad/15 text-bad border border-bad/30',
      },
      size: {
        sm: 'h-9 px-3 text-sm',
        md: 'h-11 px-4 text-[15px]',
        lg: 'h-14 px-5 text-base w-full',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  },
)

type Props = ComponentProps<typeof motion.button> & VariantProps<typeof button>

export function Button({ className, variant, size, ...props }: Props) {
  return (
    <motion.button
      // Tap feedback is the whole reason this wraps motion.button — PLAN §4
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={cn(button({ variant, size }), className)}
      {...props}
    />
  )
}

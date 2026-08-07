import { motion } from 'motion/react'
import { Card } from '@/components/ui/card'

const PRAYERS = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'] as const

type Props = {
  done: boolean[]
  onToggle: (i: number) => void
  index?: number
}

/** Tap a dot. That is the entire interaction — no sheet, no confirm (PLAN §6.1). */
export function PrayerRow({ done, onToggle, index }: Props) {
  const count = done.filter(Boolean).length

  return (
    <Card index={index} className="flex items-center justify-between">
      <div className="flex gap-2.5">
        {PRAYERS.map((name, i) => (
          <motion.button
            key={name}
            onClick={() => onToggle(i)}
            aria-label={name}
            aria-pressed={done[i]}
            whileTap={{ scale: 0.88 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="flex flex-col items-center gap-1.5"
          >
            <motion.span
              animate={{
                backgroundColor: done[i] ? 'var(--color-faith)' : 'transparent',
                borderColor: done[i] ? 'var(--color-faith)' : 'var(--color-line)',
              }}
              transition={{ duration: 0.18 }}
              className="size-6 rounded-full border-2"
            />
            <span className="text-[9px] text-dim">{name}</span>
          </motion.button>
        ))}
      </div>

      <div className="text-right">
        <div className="label">Prayer</div>
        <div className="nums mt-0.5 text-[18px]">
          {count}
          <span className="text-dim">/5</span>
        </div>
      </div>
    </Card>
  )
}

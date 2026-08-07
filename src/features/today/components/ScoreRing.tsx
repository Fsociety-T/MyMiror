import { motion } from 'motion/react'
import { Card } from '@/components/ui/card'
import { useCountUp } from '@/lib/useCountUp'
import type { Pillars } from '@/lib/score'

const R = 52
const CIRC = 2 * Math.PI * R

const BARS = [
  { key: 'faith', label: 'Faith', color: 'bg-faith' },
  { key: 'body', label: 'Body', color: 'bg-body' },
  { key: 'mind', label: 'Mind', color: 'bg-mind' },
  { key: 'exec', label: 'Exec', color: 'bg-accent' },
] as const

export function ScoreRing({
  score,
  pillars,
  index,
}: {
  score: number
  pillars: Pillars
  index?: number
}) {
  const shown = useCountUp(score)

  return (
    <Card index={index} className="flex flex-col items-center gap-5">
      <div className="relative grid place-items-center">
        <svg width={128} height={128} className="-rotate-90">
          <circle cx={64} cy={64} r={R} fill="none" stroke="var(--color-line)" strokeWidth={8} />
          <motion.circle
            cx={64}
            cy={64}
            r={R}
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth={8}
            strokeLinecap="round"
            strokeDasharray={CIRC}
            initial={{ strokeDashoffset: CIRC }}
            animate={{ strokeDashoffset: CIRC * (1 - score / 100) }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        </svg>

        <div className="absolute flex flex-col items-center">
          <span className="nums text-[40px] leading-none">{shown}</span>
          <span className="label mt-1">Life score</span>
        </div>
      </div>

      <div className="grid w-full grid-cols-2 gap-x-4 gap-y-2.5">
        {BARS.map(({ key, label, color }) => {
          const value = pillars[key]
          return (
            <div key={key} className="flex items-center gap-2">
              <span className="w-9 text-[11px] font-medium text-dim">{label}</span>
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-surface-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(value ?? 0) * 100}%` }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className={`h-full rounded-full ${color}`}
                />
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}

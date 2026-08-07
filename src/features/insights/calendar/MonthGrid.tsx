import { useMemo, useState } from 'react'
import { motion } from 'motion/react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isAfter,
  isSameDay,
  startOfMonth,
} from 'date-fns'
import { Card } from '@/components/ui/card'
import { dayKey } from '@/lib/date'
import { cn } from '@/lib/utils'
import type { VDay } from '@/types/database'
import { useMonthDays } from '../hooks'

const WEEKDAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

/** Opacity ramp of the single accent — a heatmap, not a rainbow (PLAN §4). */
function tintFor(score: number | null) {
  if (score === null) return 'bg-surface-2 text-dim'
  if (score >= 80) return 'bg-accent text-white'
  if (score >= 50) return 'bg-accent/55 text-white'
  return 'bg-accent/20 text-text'
}

export function MonthGrid({ onPickDay }: { onPickDay: (date: string, day?: VDay) => void }) {
  const [month, setMonth] = useState(() => startOfMonth(new Date()))
  const { data: days } = useMonthDays(month)
  const today = new Date()

  const byDate = useMemo(
    () => new Map((days ?? []).map((d) => [d.log_date, d])),
    [days],
  )

  const cells = useMemo(() => {
    const start = startOfMonth(month)
    const all = eachDayOfInterval({ start, end: endOfMonth(month) })
    // getDay is Sunday-0; shift so Monday starts the week.
    const lead = (getDay(start) + 6) % 7
    return [...Array.from({ length: lead }, () => null), ...all]
  }, [month])

  const atCurrentMonth = isSameDay(month, startOfMonth(today))

  return (
    <Card index={0} className="p-3">
      <div className="mb-3 flex items-center justify-between px-1">
        <button
          onClick={() => setMonth((m) => addMonths(m, -1))}
          aria-label="Previous month"
          className="p-1.5 text-dim"
        >
          <ChevronLeft size={18} />
        </button>

        <span className="nums text-[15px]">{format(month, 'MMMM yyyy')}</span>

        <button
          onClick={() => setMonth((m) => addMonths(m, 1))}
          aria-label="Next month"
          disabled={atCurrentMonth}
          className={cn('p-1.5 text-dim', atCurrentMonth && 'opacity-25')}
        >
          <ChevronRight size={18} />
        </button>
      </div>

      <div className="mb-1 grid grid-cols-7">
        {WEEKDAYS.map((d, i) => (
          <span key={i} className="label text-center">
            {d}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {cells.map((date, i) => {
          if (!date) return <span key={`pad-${i}`} />

          const key = dayKey(date)
          const day = byDate.get(key)
          const score = day?.life_score ?? null
          const future = isAfter(date, today)
          const isToday = isSameDay(date, today)

          return (
            <motion.button
              key={key}
              whileTap={{ scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              disabled={future}
              onClick={() => onPickDay(key, day)}
              className={cn(
                'nums flex aspect-square items-center justify-center rounded-[10px] text-[13px]',
                future ? 'text-dim/30' : tintFor(score),
                isToday && 'ring-2 ring-accent ring-offset-2 ring-offset-surface',
              )}
            >
              {format(date, 'd')}
            </motion.button>
          )
        })}
      </div>

      <div className="mt-3 flex items-center justify-center gap-3 text-[10px] text-dim">
        <Legend className="bg-accent" label="80+" />
        <Legend className="bg-accent/55" label="50–79" />
        <Legend className="bg-accent/20" label="<50" />
        <Legend className="bg-surface-2" label="none" />
      </div>
    </Card>
  )
}

function Legend({ className, label }: { className: string; label: string }) {
  return (
    <span className="flex items-center gap-1">
      <span className={cn('size-2.5 rounded-[3px]', className)} />
      {label}
    </span>
  )
}

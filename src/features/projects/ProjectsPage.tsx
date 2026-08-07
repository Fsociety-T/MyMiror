import { motion } from 'motion/react'
import { ChevronRight } from 'lucide-react'
import { PageHeader } from '@/components/layout/PageHeader'
import { Card } from '@/components/ui/card'
import { hm } from '@/lib/date'

/** Phase 1 mock. Slim by design — name, progress, tasks, focus, next milestone. */
const PROJECTS = [
  {
    id: '1',
    name: 'Personal OS',
    color: 'var(--color-accent)',
    done: 12,
    total: 28,
    focusMinutes: 1840,
    next: 'Ship Phase 2 logging',
  },
  {
    id: '2',
    name: 'English fluency',
    color: 'var(--color-body)',
    done: 40,
    total: 90,
    focusMinutes: 920,
    next: 'Finish B2 unit 6',
  },
  {
    id: '3',
    name: 'Trading system',
    color: 'var(--color-money)',
    done: 5,
    total: 22,
    focusMinutes: 460,
    next: 'Backtest the breakout rule',
  },
]

export function ProjectsPage() {
  return (
    <>
      <PageHeader title="Projects" subtitle={`${PROJECTS.length} active`} />

      <div className="flex flex-col gap-3">
        {PROJECTS.map((p, i) => {
          const pct = Math.round((p.done / p.total) * 100)
          return (
            <Card key={p.id} index={i} className="p-0">
              <motion.button
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className="flex w-full items-center gap-3 p-4 text-left"
              >
                <span
                  className="h-10 w-[2px] shrink-0 rounded-full"
                  style={{ background: p.color }}
                />

                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="truncate text-[15px] font-medium">{p.name}</span>
                    <span className="nums shrink-0 text-[13px] text-dim">{pct}%</span>
                  </div>

                  <div className="mt-2 h-1 overflow-hidden rounded-full bg-surface-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.6, ease: 'easeOut', delay: i * 0.04 }}
                      className="h-full rounded-full"
                      style={{ background: p.color }}
                    />
                  </div>

                  <p className="mt-2 text-[12px] text-dim">
                    {p.done}/{p.total} tasks · {hm(p.focusMinutes)} focus
                  </p>
                  <p className="mt-1 truncate text-[12px] text-dim">Next: {p.next}</p>
                </div>

                <ChevronRight size={17} className="shrink-0 text-dim" />
              </motion.button>
            </Card>
          )
        })}
      </div>
    </>
  )
}

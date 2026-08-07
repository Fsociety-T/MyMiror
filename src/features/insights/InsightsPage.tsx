import { ArrowUpRight, Zap } from 'lucide-react'
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { PageHeader } from '@/components/layout/PageHeader'
import { Card } from '@/components/ui/card'

/** Phase 1 mock. Phase 4 generates these from `v_day` — see PLAN §9. */
const PATTERNS = [
  { text: 'You complete 31% more tasks after 7h+ sleep.', sample: 34 },
  { text: 'Tuesday is your strongest day. Sunday your weakest.', sample: 61 },
  { text: 'Every streak reset so far followed a night under 6 hours.', sample: 19 },
]

const TREND = Array.from({ length: 30 }, (_, i) => ({
  day: i + 1,
  score: Math.round(62 + 18 * Math.sin(i / 4.5) + (i % 5) * 1.6),
}))

export function InsightsPage() {
  return (
    <>
      <PageHeader title="Insights" subtitle="Last 30 days" />

      <div className="flex flex-col gap-3">
        <Card index={0} className="flex items-center justify-between">
          <div>
            <div className="label">This week</div>
            <div className="nums mt-1 text-[26px]">
              76 <span className="text-dim">→</span> 82
            </div>
          </div>
          <div className="flex items-center gap-1 rounded-full bg-good/10 px-2.5 py-1 text-[12px] font-medium text-good">
            <ArrowUpRight size={14} />6
          </div>
        </Card>

        {/* Pattern Feed sits ABOVE the charts. It is the product; charts support it. */}
        <div className="label mt-2 px-1">Patterns</div>

        {PATTERNS.map((p, i) => (
          <Card key={p.text} index={i + 1} className="flex gap-3">
            <Zap size={16} className="mt-0.5 shrink-0 text-warn" />
            <div>
              <p className="text-[15px] leading-snug">{p.text}</p>
              <p className="mt-1.5 text-[12px] text-dim">based on {p.sample} days</p>
            </div>
          </Card>
        ))}

        {/* Never invent a pattern under 14 matching days — a wrong insight
            destroys trust permanently (PLAN §6.3). */}
        <Card index={4} className="border-dashed">
          <p className="text-[13px] text-dim">
            Keep logging — <span className="text-text">9 more days</span> until the next pattern
            unlocks.
          </p>
        </Card>

        <div className="label mt-2 px-1">Life score</div>

        <Card index={5} className="h-[180px] px-1 py-3">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={TREND} margin={{ top: 4, right: 8, bottom: 0, left: -20 }}>
              <XAxis
                dataKey="day"
                tick={{ fill: 'var(--color-dim)', fontSize: 10 }}
                axisLine={false}
                tickLine={false}
                interval={6}
              />
              <YAxis
                domain={[0, 100]}
                tick={{ fill: 'var(--color-dim)', fontSize: 10 }}
                axisLine={false}
                tickLine={false}
                width={34}
              />
              <Tooltip
                contentStyle={{
                  background: 'var(--color-surface-2)',
                  border: '1px solid var(--color-line)',
                  borderRadius: 12,
                  fontSize: 12,
                }}
                labelStyle={{ color: 'var(--color-dim)' }}
              />
              <Line
                type="monotone"
                dataKey="score"
                stroke="var(--color-accent)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </>
  )
}

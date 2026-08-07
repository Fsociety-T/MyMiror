import { useState } from 'react'
import { Zap } from 'lucide-react'
import { format, parseISO, subDays } from 'date-fns'
import { useQuery } from '@tanstack/react-query'
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { PageHeader } from '@/components/layout/PageHeader'
import { Card } from '@/components/ui/card'
import { useUserId } from '@/features/today/hooks'
import type { VDay } from '@/types/database'
import { DayDetail } from './calendar/DayDetail'
import { MonthGrid } from './calendar/MonthGrid'
import { getDaysBetween } from './api'
import { useFreezePastScores } from './hooks'

export function InsightsPage() {
  const userId = useUserId()
  const [picked, setPicked] = useState<{ date: string; day?: VDay } | null>(null)

  // Backfill scores for finished days so the calendar isn't blank.
  useFreezePastScores()

  const { data: recent } = useQuery({
    queryKey: ['recent', userId],
    enabled: Boolean(userId),
    queryFn: () => getDaysBetween(userId!, subDays(new Date(), 29), new Date()),
  })

  const trend = (recent ?? [])
    .filter((d) => d.life_score !== null)
    .map((d) => ({ day: format(parseISO(d.log_date), 'd MMM'), score: Number(d.life_score) }))

  return (
    <>
      <PageHeader title="Insights" subtitle="Your history" />

      <div className="flex flex-col gap-3">
        <MonthGrid onPickDay={(date, day) => setPicked({ date, day })} />

        {/* The Pattern Feed lands in Phase 4 — it needs 14+ days of real data
            before it can say anything true. */}
        <div className="label mt-2 px-1">Patterns</div>

        <Card index={1} className="flex gap-3 border-dashed">
          <Zap size={16} className="mt-0.5 shrink-0 text-dim" />
          <div>
            <p className="text-[15px] leading-snug text-dim">
              Patterns unlock once there are 14 days to compare.
            </p>
            <p className="mt-1.5 text-[12px] text-dim">
              {recent?.length ?? 0} days logged so far.
            </p>
          </div>
        </Card>

        <div className="label mt-2 px-1">Life score · 30 days</div>

        <Card index={2} className="h-[180px] px-1 py-3">
          {trend.length < 2 ? (
            <div className="grid h-full place-items-center px-4 text-center text-[13px] text-dim">
              Two days of history and this becomes a chart.
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trend} margin={{ top: 4, right: 8, bottom: 0, left: -20 }}>
                <XAxis
                  dataKey="day"
                  tick={{ fill: 'var(--color-dim)', fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                  minTickGap={24}
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
          )}
        </Card>
      </div>

      <DayDetail
        date={picked?.date ?? null}
        day={picked?.day}
        onClose={() => setPicked(null)}
      />
    </>
  )
}

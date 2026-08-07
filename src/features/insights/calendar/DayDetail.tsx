import { useQuery } from '@tanstack/react-query'
import { format, parseISO } from 'date-fns'
import { Sheet } from '@/components/ui/sheet'
import { hm } from '@/lib/date'
import { getDailyLog } from '@/features/today/api'
import { useUserId } from '@/features/today/hooks'
import type { VDay } from '@/types/database'

const MOOD_FACES = ['', '😞', '🙁', '😐', '🙂', '😄']

type Props = {
  date: string | null
  day?: VDay
  onClose: () => void
}

export function DayDetail({ date, day, onClose }: Props) {
  const userId = useUserId()

  // v_day has no `note` column — the reflection lives on daily_logs.
  const { data: log } = useQuery({
    queryKey: ['log', userId, date],
    enabled: Boolean(userId && date),
    queryFn: () => getDailyLog(userId!, date!),
  })

  const stats = [
    { label: 'Prayer', value: `${day?.prayers_done ?? 0}/5` },
    { label: 'Sleep', value: hm(day?.sleep_minutes ?? 0) },
    { label: 'Focus', value: hm(day?.focus_minutes ?? 0) },
    { label: 'Gym', value: hm(day?.sport_minutes ?? 0) },
    { label: 'Skill', value: hm(day?.skill_minutes ?? 0) },
    { label: 'Tasks', value: `${day?.tasks_done ?? 0}/${day?.tasks_total ?? 0}` },
  ]

  return (
    <Sheet open={Boolean(date)} onClose={onClose}>
      <div className="px-4 pt-2 pb-1">
        <div className="flex items-baseline justify-between">
          <div>
            <div className="label">
              {date ? format(parseISO(date), 'EEEE') : ''}
            </div>
            <p className="nums mt-1 text-[20px]">
              {date ? format(parseISO(date), 'd MMMM yyyy') : ''}
            </p>
          </div>

          <div className="text-right">
            <div className="nums text-[34px] leading-none">
              {day?.life_score === null || day?.life_score === undefined
                ? '—'
                : Math.round(day.life_score)}
            </div>
            <div className="label mt-1">Score</div>
          </div>
        </div>

        {!day ? (
          <p className="mt-6 mb-2 text-[14px] text-dim">Nothing logged this day.</p>
        ) : (
          <>
            <div className="mt-5 grid grid-cols-3 gap-y-4">
              {stats.map(({ label, value }) => (
                <div key={label}>
                  <div className="label">{label}</div>
                  <div className="nums mt-1 text-[17px]">{value}</div>
                </div>
              ))}
            </div>

            {(day.mood || log?.note) && (
              <div className="mt-5 border-t border-line pt-4">
                {day.mood && (
                  <p className="text-[15px]">
                    {MOOD_FACES[day.mood]}{' '}
                    <span className="text-dim">mood {day.mood}/5</span>
                  </p>
                )}
                {log?.note && (
                  <p className="mt-2 text-[14px] leading-snug text-dim">{log.note}</p>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </Sheet>
  )
}

import { useEffect } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { endOfMonth, startOfMonth } from 'date-fns'
import { dayKey } from '@/lib/date'
import { goalsOf, weightsOf } from '@/features/profile/api'
import { useProfile, useUserId } from '@/features/today/hooks'
import { freezePastScores, getDaysBetween } from './api'

export function useMonthDays(month: Date) {
  const userId = useUserId()
  const key = dayKey(startOfMonth(month))

  return useQuery({
    queryKey: ['month', userId, key],
    enabled: Boolean(userId),
    queryFn: () => getDaysBetween(userId!, startOfMonth(month), endOfMonth(month)),
  })
}

/**
 * Freezes any unscored finished days once per app open. Without this the whole
 * calendar renders blank, because v_day.life_score mirrors a column nothing
 * else ever writes.
 */
export function useFreezePastScores() {
  const userId = useUserId()
  const { data: profile } = useProfile()
  const qc = useQueryClient()

  useEffect(() => {
    if (!userId || !profile) return
    let alive = true

    freezePastScores(userId, goalsOf(profile), weightsOf(profile))
      .then((n) => {
        if (alive && n > 0) qc.invalidateQueries({ queryKey: ['month', userId] })
      })
      // A failed backfill must never block the UI — it retries next open.
      .catch(() => {})

    return () => {
      alive = false
    }
  }, [userId, profile, qc])
}

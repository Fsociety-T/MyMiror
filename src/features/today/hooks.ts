import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useAuth } from '@/features/auth/AuthProvider'
import { getProfile } from '@/features/profile/api'
import { dayKey } from '@/lib/date'
import type { DailyLog, DailyLogWrite, SessionKind, VDay } from '@/types/database'
import { addFinance, addSession, ensureDay, getDailyLog, getVDay, saveDay } from './api'

export const PRAYER_COLUMNS = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'] as const
export type PrayerColumn = (typeof PRAYER_COLUMNS)[number]

type TodayData = { log: DailyLog | null; day: VDay | null }

export function useUserId(): string | null {
  return useAuth().session?.user.id ?? null
}

export function useToday(date = dayKey()) {
  const userId = useUserId()

  return useQuery({
    queryKey: ['today', userId, date],
    enabled: Boolean(userId),
    queryFn: async (): Promise<TodayData> => {
      // Must run first — v_day has no row until daily_logs does.
      await ensureDay(userId!, date)
      const [log, day] = await Promise.all([
        getDailyLog(userId!, date),
        getVDay(userId!, date),
      ])
      return { log, day }
    },
  })
}

export function useProfile() {
  const userId = useUserId()
  return useQuery({
    queryKey: ['profile', userId],
    enabled: Boolean(userId),
    queryFn: () => getProfile(userId!),
    staleTime: 5 * 60_000,
  })
}

/**
 * Prayer dots must respond on the same frame as the tap — a spinner here would
 * break the "3-tap day". The write is fire-and-forget with rollback on failure.
 */
export function useTogglePrayer(date = dayKey()) {
  const userId = useUserId()
  const qc = useQueryClient()
  const key = ['today', userId, date]

  return useMutation({
    mutationFn: (vars: { column: PrayerColumn; next: boolean }) =>
      saveDay(userId!, { [vars.column]: vars.next }, date),

    onMutate: async ({ column, next }) => {
      await qc.cancelQueries({ queryKey: key })
      const previous = qc.getQueryData<TodayData>(key)

      qc.setQueryData<TodayData>(key, (old) => {
        if (!old?.log) return old
        const log = { ...old.log, [column]: next }
        log.prayers_done = PRAYER_COLUMNS.filter((c) => log[c]).length
        return { ...old, log }
      })

      return { previous }
    },

    onError: (_err, _vars, ctx) => {
      if (ctx?.previous) qc.setQueryData(key, ctx.previous)
    },

    onSettled: () => qc.invalidateQueries({ queryKey: key }),
  })
}

export function useSaveDay(date = dayKey()) {
  const userId = useUserId()
  const qc = useQueryClient()

  return useMutation({
    mutationFn: (patch: DailyLogWrite) => saveDay(userId!, patch, date),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['today', userId, date] }),
  })
}

export function useAddSession(date = dayKey()) {
  const userId = useUserId()
  const qc = useQueryClient()

  return useMutation({
    mutationFn: (input: {
      kind: SessionKind
      category: string
      minutes: number
      projectId?: string | null
      note?: string | null
      startedAt?: string
    }) => addSession({ userId: userId!, date, ...input }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['today', userId, date] }),
  })
}

export function useAddFinance() {
  const userId = useUserId()
  return useMutation({
    mutationFn: (input: {
      kind: 'in' | 'out'
      amount: number
      category: string
      note?: string | null
    }) => addFinance({ userId: userId!, ...input }),
  })
}

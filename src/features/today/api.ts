import { supabase } from '@/lib/supabase'
import { dayKey } from '@/lib/date'
import type { DailyLog, DailyLogWrite, SessionKind, VDay } from '@/types/database'

/**
 * v_day only has a row for a date once daily_logs does. Creating the row on
 * first open is what makes the rollup — and the whole dashboard — work.
 * ignoreDuplicates leaves an existing day untouched, so this is safe to call
 * on every mount.
 */
export async function ensureDay(userId: string, date = dayKey()): Promise<void> {
  const { error } = await supabase
    .from('daily_logs')
    .upsert({ user_id: userId, log_date: date }, { onConflict: 'user_id,log_date', ignoreDuplicates: true })
  if (error) throw error
}

export async function getDailyLog(userId: string, date = dayKey()): Promise<DailyLog | null> {
  const { data, error } = await supabase
    .from('daily_logs')
    .select('*')
    .eq('user_id', userId)
    .eq('log_date', date)
    .maybeSingle()

  if (error) throw error
  return data
}

export async function getVDay(userId: string, date = dayKey()): Promise<VDay | null> {
  const { data, error } = await supabase
    .from('v_day')
    .select('*')
    .eq('user_id', userId)
    .eq('log_date', date)
    .maybeSingle()

  if (error) throw error
  return data
}

/** Last `days` days of rollups, oldest first — feeds charts and the Pattern Feed. */
export async function getRecentDays(userId: string, days = 60): Promise<VDay[]> {
  const from = new Date()
  from.setDate(from.getDate() - days)

  const { data, error } = await supabase
    .from('v_day')
    .select('*')
    .eq('user_id', userId)
    .gte('log_date', dayKey(from))
    .order('log_date', { ascending: true })

  if (error) throw error
  return data ?? []
}

/** Patch today's row. Only the columns you pass are touched. */
export async function saveDay(
  userId: string,
  patch: DailyLogWrite,
  date = dayKey(),
): Promise<void> {
  const { error } = await supabase
    .from('daily_logs')
    .upsert({ user_id: userId, log_date: date, ...patch }, { onConflict: 'user_id,log_date' })
  if (error) throw error
}

export async function addSession(input: {
  userId: string
  kind: SessionKind
  category: string
  minutes: number
  projectId?: string | null
  note?: string | null
  startedAt?: string
  date?: string
}): Promise<void> {
  const { error } = await supabase.from('sessions').insert({
    user_id: input.userId,
    kind: input.kind,
    category: input.category,
    minutes: input.minutes,
    project_id: input.projectId ?? null,
    note: input.note ?? null,
    started_at: input.startedAt ?? new Date().toISOString(),
    ended_at: new Date().toISOString(),
    log_date: input.date ?? dayKey(),
  })
  if (error) throw error
}

export async function addFinance(input: {
  userId: string
  kind: 'in' | 'out'
  amount: number
  category: string
  note?: string | null
}): Promise<void> {
  const { error } = await supabase.from('finance_logs').insert({
    user_id: input.userId,
    kind: input.kind,
    amount: input.amount,
    category: input.category,
    note: input.note ?? null,
    log_date: dayKey(),
  })
  if (error) throw error
}

/** The last category used for a kind — every sheet pre-fills from this. */
export async function lastCategory(
  userId: string,
  kind: SessionKind,
): Promise<string | null> {
  const { data, error } = await supabase
    .from('sessions')
    .select('category')
    .eq('user_id', userId)
    .eq('kind', kind)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  if (error) throw error
  return data?.category ?? null
}

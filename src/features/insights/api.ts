import { supabase } from '@/lib/supabase'
import { dayKey } from '@/lib/date'
import { scoreFinishedDay, type Goals, type Weights } from '@/lib/score'
import type { VDay } from '@/types/database'

export async function getDaysBetween(
  userId: string,
  from: Date,
  to: Date,
): Promise<VDay[]> {
  const { data, error } = await supabase
    .from('v_day')
    .select('*')
    .eq('user_id', userId)
    .gte('log_date', dayKey(from))
    .lte('log_date', dayKey(to))
    .order('log_date', { ascending: true })

  if (error) throw error
  return data ?? []
}

/**
 * Freeze the Life Score of every finished day that doesn't have one yet.
 *
 * The score is computed live on the client, so without this step
 * daily_logs.life_score stays null forever and history renders blank. Runs on
 * app open and only ever touches days strictly before today — a past score is
 * never recomputed once written (PLAN §8).
 */
export async function freezePastScores(
  userId: string,
  goals: Goals,
  weights: Weights,
): Promise<number> {
  const today = dayKey()

  const { data, error } = await supabase
    .from('v_day')
    .select('*')
    .eq('user_id', userId)
    .is('life_score', null)
    .lt('log_date', today)
    .order('log_date', { ascending: false })
    .limit(90)

  if (error) throw error
  if (!data?.length) return 0

  const writes = data.map((d) => {
    const { score, pillars } = scoreFinishedDay(
      {
        prayersDone: d.prayers_done ?? 0,
        sleepMinutes: d.sleep_minutes ?? 0,
        sportMinutes: d.sport_minutes ?? 0,
        focusMinutes: d.focus_minutes ?? 0,
        skillMinutes: d.skill_minutes ?? 0,
        tasksDone: d.tasks_done ?? 0,
        tasksTotal: d.tasks_total ?? 0,
      },
      goals,
      weights,
    )

    return supabase
      .from('daily_logs')
      .update({
        life_score: score,
        score_faith: Math.round(pillars.faith * 100),
        score_body: Math.round(pillars.body * 100),
        score_mind: Math.round(pillars.mind * 100),
        score_exec: pillars.exec === null ? null : Math.round(pillars.exec * 100),
      })
      .eq('user_id', userId)
      .eq('log_date', d.log_date)
  })

  await Promise.all(writes)
  return writes.length
}

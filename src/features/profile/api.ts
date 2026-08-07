import { supabase } from '@/lib/supabase'
import type { Profile, ProfileWrite } from '@/types/database'
import type { Goals, Weights } from '@/lib/score'

export async function getProfile(userId: string): Promise<Profile | null> {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .maybeSingle()

  if (error) throw error
  return data
}

export async function updateProfile(userId: string, patch: ProfileWrite) {
  const { error } = await supabase.from('profiles').update(patch).eq('id', userId)
  if (error) throw error
}

export function goalsOf(p: Profile | null | undefined): Goals {
  return {
    sleepMin: p?.goal_sleep_min ?? 450,
    focusMin: p?.goal_focus_min ?? 180,
    sportMin: p?.goal_sport_min ?? 45,
    skillMin: p?.goal_skill_min ?? 30,
  }
}

export function weightsOf(p: Profile | null | undefined): Weights {
  return {
    faith: p?.w_faith ?? 20,
    body: p?.w_body ?? 20,
    mind: p?.w_mind ?? 30,
    exec: p?.w_exec ?? 30,
  }
}

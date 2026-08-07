import type { DayInput } from '@/lib/score'

/** Phase 1 renders from this. Phase 2 replaces it with `v_day` via TanStack Query. */
export const MOCK_DAY: DayInput = {
  prayersDone: 4,
  sleepMinutes: 433,
  sportMinutes: 58,
  focusMinutes: 220,
  skillMinutes: 25,
  tasksDone: 8,
  tasksTotal: 10,
}

export const MOCK_VISION = {
  title: 'MY 2026 VISION',
  lines: ['Disciplined every single day', 'Fluent in English and French', 'Shipping my own product'],
  quote: 'Discipline is choosing what you want most over what you want now.',
}

export const MOCK_MISSION = 'Build Supabase auth'

export const MOCK_STREAK = {
  name: 'Freedom',
  days: 18,
  best: 42,
  shieldsUsed: 0,
  shieldsTotal: 2,
}

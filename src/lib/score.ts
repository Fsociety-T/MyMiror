/**
 * Life Score — four pillars, each 0–1, weighted by the user's profile.
 * Pure functions only. No React, no Supabase. See PLAN §8.
 */

export type Goals = {
  sleepMin: number
  focusMin: number
  sportMin: number
  skillMin: number
}

export type Weights = {
  faith: number
  body: number
  mind: number
  exec: number
}

export type DayInput = {
  prayersDone: number
  sleepMinutes: number
  sportMinutes: number
  focusMinutes: number
  skillMinutes: number
  tasksDone: number
  tasksTotal: number
}

export type Pillars = {
  /** null = not applicable today, excluded from the weighted average. */
  faith: number
  body: number
  mind: number
  exec: number | null
}

export const DEFAULT_GOALS: Goals = {
  sleepMin: 450,
  focusMin: 180,
  sportMin: 45,
  skillMin: 30,
}

export const DEFAULT_WEIGHTS: Weights = { faith: 20, body: 20, mind: 30, exec: 30 }

/** The waking day the on-pace adjustment measures against. */
const WAKE_HOUR = 7
const WIND_DOWN_HOUR = 22

const clamp01 = (n: number) => Math.min(Math.max(n, 0), 1)

/**
 * Fraction of the waking day elapsed, 0–1.
 *
 * At 8am you have not failed. Scoring against midnight-to-midnight opens every
 * morning on a red 12/100, and the user quits in week one. Floored at 0.1 so a
 * single 10-minute session at 07:05 doesn't read as a perfect day.
 */
export function dayPace(now: Date = new Date()): number {
  const hours = now.getHours() + now.getMinutes() / 60
  if (hours >= WIND_DOWN_HOUR) return 1
  const elapsed = (hours - WAKE_HOUR) / (WIND_DOWN_HOUR - WAKE_HOUR)
  return Math.min(Math.max(elapsed, 0.1), 1)
}

/** Progress toward a goal, scaled by how much of the day has actually passed. */
function onPace(actual: number, goal: number, pace: number): number {
  if (goal <= 0) return 1
  return clamp01(actual / goal / pace)
}

export function pillars(d: DayInput, goals: Goals, pace: number): Pillars {
  // Prayers have their own times — never pace-adjusted.
  const faith = clamp01(d.prayersDone / 5)

  const body =
    0.6 * onPace(d.sleepMinutes, goals.sleepMin, pace) +
    0.4 * onPace(d.sportMinutes, goals.sportMin, pace)

  const mind =
    0.7 * onPace(d.focusMinutes, goals.focusMin, pace) +
    0.3 * onPace(d.skillMinutes, goals.skillMin, pace)

  // No tasks today is not a zero — it's an absent pillar.
  const exec = d.tasksTotal === 0 ? null : clamp01(d.tasksDone / d.tasksTotal / pace)

  return { faith, body, mind, exec }
}

/** Weighted average of the non-null pillars, 0–100. */
export function lifeScore(p: Pillars, w: Weights = DEFAULT_WEIGHTS): number {
  const parts: Array<[number | null, number]> = [
    [p.faith, w.faith],
    [p.body, w.body],
    [p.mind, w.mind],
    [p.exec, w.exec],
  ]

  let sum = 0
  let weight = 0
  for (const [value, weightOf] of parts) {
    if (value === null) continue
    sum += value * weightOf
    weight += weightOf
  }

  if (weight === 0) return 0
  return Math.round((sum / weight) * 100)
}

/** One call for the UI: raw day in, score + pillars out. */
export function scoreDay(
  d: DayInput,
  goals: Goals = DEFAULT_GOALS,
  weights: Weights = DEFAULT_WEIGHTS,
  now: Date = new Date(),
) {
  const p = pillars(d, goals, dayPace(now))
  return { pillars: p, score: lifeScore(p, weights) }
}

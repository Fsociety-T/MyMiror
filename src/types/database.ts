/**
 * Mirrors supabase/migrations/0001_init.sql.
 *
 * Hand-written to match what `supabase gen types typescript` would emit.
 * Regenerate any time the schema changes:
 *   npx supabase gen types typescript --project-id xbkyxmyawbysvjovgnml > src/types/database.ts
 */

export type TaskStatus = 'todo' | 'doing' | 'done' | 'cancelled'
export type TaskPriority = 'low' | 'medium' | 'high' | 'critical'
export type SessionKind = 'focus' | 'sport' | 'skill'
export type StreakKind = 'build' | 'quit'
export type StreakEventKind = 'start' | 'reset' | 'shield' | 'urge_surf'
export type MoneyKind = 'in' | 'out'

export type Profile = {
  id: string
  display_name: string | null
  timezone: string
  vision_title: string | null
  vision_lines: string[] | null
  vision_quote: string | null
  goal_sleep_min: number
  goal_focus_min: number
  goal_sport_min: number
  goal_skill_min: number
  w_faith: number
  w_body: number
  w_mind: number
  w_exec: number
  created_at: string
  updated_at: string
}

export type Project = {
  id: string
  user_id: string
  name: string
  description: string | null
  color: string | null
  status: string
  next_milestone: string | null
  deadline: string | null
  archived_at: string | null
  created_at: string
  updated_at: string
}

export type Task = {
  id: string
  user_id: string
  project_id: string | null
  title: string
  notes: string | null
  status: TaskStatus
  priority: TaskPriority
  is_main_mission: boolean
  est_minutes: number | null
  act_minutes: number | null
  due_date: string
  completed_at: string | null
  created_at: string
  updated_at: string
}

export type DailyLog = {
  id: string
  user_id: string
  log_date: string
  fajr: boolean
  dhuhr: boolean
  asr: boolean
  maghrib: boolean
  isha: boolean
  /** GENERATED ALWAYS — never write to this column. */
  prayers_done: number
  sleep_start: string | null
  sleep_end: string | null
  sleep_minutes: number | null
  sleep_quality: number | null
  mood: number | null
  note: string | null
  life_score: number | null
  score_faith: number | null
  score_body: number | null
  score_mind: number | null
  score_exec: number | null
  created_at: string
  updated_at: string
}

export type SessionRow = {
  id: string
  user_id: string
  kind: SessionKind
  category: string
  project_id: string | null
  started_at: string
  ended_at: string | null
  minutes: number
  note: string | null
  log_date: string
  created_at: string
}

export type Streak = {
  id: string
  user_id: string
  name: string
  kind: StreakKind
  started_on: string
  best_days: number
  shields_total: number
  shields_used: number
  shields_reset_on: string
  is_active: boolean
  created_at: string
}

export type StreakEvent = {
  id: string
  user_id: string
  streak_id: string
  event: StreakEventKind
  days_at_event: number | null
  note: string | null
  ctx_sleep_minutes: number | null
  ctx_life_score: number | null
  ctx_weekday: number | null
  occurred_at: string
}

export type FinanceLog = {
  id: string
  user_id: string
  kind: MoneyKind
  amount: number
  category: string
  note: string | null
  log_date: string
  created_at: string
}

/** The rollup view that drives the whole dashboard. Read-only. */
export type VDay = {
  user_id: string
  log_date: string
  prayers_done: number
  sleep_minutes: number | null
  mood: number | null
  life_score: number | null
  focus_minutes: number
  sport_minutes: number
  skill_minutes: number
  tasks_done: number
  tasks_total: number
}

/** Profile columns the user can edit from settings. */
export type ProfileWrite = Partial<
  Omit<Profile, 'id' | 'created_at' | 'updated_at'>
>

/** Columns the client is allowed to write. Generated + server-owned columns excluded. */
export type DailyLogWrite = Partial<
  Pick<
    DailyLog,
    | 'fajr'
    | 'dhuhr'
    | 'asr'
    | 'maghrib'
    | 'isha'
    | 'sleep_start'
    | 'sleep_end'
    | 'sleep_minutes'
    | 'sleep_quality'
    | 'mood'
    | 'note'
  >
>

/** `Relationships` is required by supabase-js's GenericTable constraint — without
 *  it the whole schema silently degrades to `never` and every query loses types. */
type Table<Row, Insert = Row, Update = Partial<Insert>> = {
  Row: Row
  Insert: Insert
  Update: Update
  Relationships: []
}

/** Columns Postgres owns on every table — never sent by the client. */
type ServerOwned = 'id' | 'created_at' | 'updated_at'

/**
 * `Required` must be supplied; everything else is optional because the column
 * has a DEFAULT. `Generated` columns are omitted entirely so a write to one
 * fails at compile time rather than at the database.
 */
type WithDefaults<T, Required extends keyof T, Generated extends keyof T = never> = Pick<
  T,
  Required
> &
  Partial<Omit<T, Required | Generated | Extract<ServerOwned, keyof T>>>

export type Database = {
  public: {
    Tables: {
      // profiles.id is the auth.users FK, supplied by the trigger — not a default.
      profiles: Table<Profile, Pick<Profile, 'id'> & Partial<Omit<Profile, 'id' | 'created_at' | 'updated_at'>>>
      projects: Table<Project, WithDefaults<Project, 'user_id' | 'name'>>
      tasks: Table<Task, WithDefaults<Task, 'user_id' | 'title'>>
      daily_logs: Table<DailyLog, WithDefaults<DailyLog, 'user_id', 'prayers_done'>>
      sessions: Table<
        SessionRow,
        WithDefaults<SessionRow, 'user_id' | 'kind' | 'category' | 'minutes'>
      >
      streaks: Table<Streak, WithDefaults<Streak, 'user_id' | 'name' | 'kind'>>
      streak_events: Table<
        StreakEvent,
        WithDefaults<StreakEvent, 'user_id' | 'streak_id' | 'event'>
      >
      finance_logs: Table<
        FinanceLog,
        WithDefaults<FinanceLog, 'user_id' | 'kind' | 'amount'>
      >
    }
    Views: {
      // Read-only: no Insert/Update, so writes to it fail to compile.
      v_day: { Row: VDay; Relationships: [] }
    }
    Functions: Record<never, never>
    Enums: {
      task_status: TaskStatus
      task_priority: TaskPriority
      session_kind: SessionKind
      streak_kind: StreakKind
      streak_event: StreakEventKind
      money_kind: MoneyKind
    }
    CompositeTypes: Record<never, never>
  }
}

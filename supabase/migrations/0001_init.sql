-- Personal OS — initial schema. See PLAN §7.
-- Nine tables. Every timed activity (focus, gym, English, French) is ONE
-- `sessions` row with a kind + category. That collapse is what makes
-- cross-domain correlation in the Pattern Feed a single query.

-- ============ EXTENSIONS ============
create extension if not exists "pgcrypto";

-- ============ ENUMS ============
create type task_status   as enum ('todo','doing','done','cancelled');
create type task_priority as enum ('low','medium','high','critical');
create type session_kind  as enum ('focus','sport','skill');
create type streak_kind   as enum ('build','quit');
create type streak_event  as enum ('start','reset','shield','urge_surf');
create type money_kind    as enum ('in','out');

-- ============ PROFILES ============
create table profiles (
  id            uuid primary key references auth.users on delete cascade,
  display_name  text,
  timezone      text    not null default 'Africa/Casablanca',
  vision_title  text    default 'MY 2026 VISION',
  vision_lines  text[]  default '{}',
  vision_quote  text,
  -- daily targets, used by the Life Score
  goal_sleep_min    int not null default 450,
  goal_focus_min    int not null default 180,
  goal_sport_min    int not null default 45,
  goal_skill_min    int not null default 30,
  -- score weights, must sum to 100
  w_faith int not null default 20,
  w_body  int not null default 20,
  w_mind  int not null default 30,
  w_exec  int not null default 30,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ============ PROJECTS ============
create table projects (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users on delete cascade,
  name        text not null,
  description text,
  color       text default '#6366f1',
  status      text not null default 'active',   -- active | paused | done
  next_milestone text,
  deadline    date,
  archived_at timestamptz,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
create index on projects (user_id, status);

-- ============ TASKS ============
create table tasks (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users on delete cascade,
  project_id  uuid references projects on delete set null,
  title       text not null,
  notes       text,
  status      task_status   not null default 'todo',
  priority    task_priority not null default 'medium',
  is_main_mission boolean not null default false,
  est_minutes int,
  act_minutes int,
  due_date    date not null default current_date,
  completed_at timestamptz,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
create index on tasks (user_id, due_date, status);
create index on tasks (user_id, project_id);

-- ============ DAILY LOGS  (one row per user per day) ============
create table daily_logs (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users on delete cascade,
  log_date    date not null default current_date,

  fajr boolean not null default false,
  dhuhr boolean not null default false,
  asr boolean not null default false,
  maghrib boolean not null default false,
  isha boolean not null default false,
  prayers_done int generated always as (
    fajr::int + dhuhr::int + asr::int + maghrib::int + isha::int
  ) stored,

  sleep_start   timestamptz,
  sleep_end     timestamptz,
  sleep_minutes int,
  sleep_quality smallint check (sleep_quality between 1 and 5),

  mood  smallint check (mood between 1 and 5),
  note  text,

  life_score  numeric(5,2),   -- frozen at day rollover
  score_faith numeric(5,2),
  score_body  numeric(5,2),
  score_mind  numeric(5,2),
  score_exec  numeric(5,2),

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, log_date)
);
create index on daily_logs (user_id, log_date desc);

-- ============ SESSIONS  (focus / gym / skill — all of them) ============
create table sessions (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references auth.users on delete cascade,
  kind       session_kind not null,
  category   text not null,          -- 'coding','trading','english','gym','running'
  project_id uuid references projects on delete set null,
  started_at timestamptz not null default now(),
  ended_at   timestamptz,
  minutes    int not null check (minutes >= 0),
  note       text,
  log_date   date not null default current_date,
  created_at timestamptz not null default now()
);
create index on sessions (user_id, log_date desc);
create index on sessions (user_id, kind, category);

-- ============ STREAKS ============
create table streaks (
  id             uuid primary key default gen_random_uuid(),
  user_id        uuid not null references auth.users on delete cascade,
  name           text not null,
  kind           streak_kind not null,
  started_on     date not null default current_date,
  best_days      int  not null default 0,
  shields_total  int  not null default 2,   -- per calendar month
  shields_used   int  not null default 0,
  shields_reset_on date not null default date_trunc('month', now())::date,
  is_active      boolean not null default true,
  created_at     timestamptz not null default now()
);

-- history is append-only. NEVER delete from this table.
create table streak_events (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users on delete cascade,
  streak_id   uuid not null references streaks on delete cascade,
  event       streak_event not null,
  days_at_event int,
  note        text,
  -- snapshot of context, this is what powers trigger detection
  ctx_sleep_minutes int,
  ctx_life_score    numeric(5,2),
  ctx_weekday       smallint,
  occurred_at timestamptz not null default now()
);
create index on streak_events (user_id, occurred_at desc);

-- ============ FINANCE ============
create table finance_logs (
  id        uuid primary key default gen_random_uuid(),
  user_id   uuid not null references auth.users on delete cascade,
  kind      money_kind not null,
  amount    numeric(12,2) not null check (amount > 0),
  category  text not null default 'other',
  note      text,
  log_date  date not null default current_date,
  created_at timestamptz not null default now()
);
create index on finance_logs (user_id, log_date desc);

-- ============ RLS ============
alter table profiles      enable row level security;
alter table projects      enable row level security;
alter table tasks         enable row level security;
alter table daily_logs    enable row level security;
alter table sessions      enable row level security;
alter table streaks       enable row level security;
alter table streak_events enable row level security;
alter table finance_logs  enable row level security;

create policy "own profile" on profiles
  for all using (auth.uid() = id) with check (auth.uid() = id);

do $$
declare t text;
begin
  foreach t in array array[
    'projects','tasks','daily_logs','sessions',
    'streaks','streak_events','finance_logs'
  ] loop
    execute format(
      'create policy "own rows" on %I for all
         using (auth.uid() = user_id)
         with check (auth.uid() = user_id);', t);
  end loop;
end $$;

-- ============ AUTO-CREATE PROFILE ============
create or replace function handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'name', 'Friend'));
  return new;
end $$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();

-- ============ ROLLUP VIEW (drives the whole dashboard) ============
-- security_invoker is REQUIRED. Without it the view executes as its owner and
-- silently bypasses RLS on every table below, exposing all users' rows to any
-- authenticated caller.
create or replace view v_day with (security_invoker = true) as
select
  d.user_id,
  d.log_date,
  d.prayers_done,
  d.sleep_minutes,
  d.mood,
  d.life_score,
  coalesce(f.min, 0) as focus_minutes,
  coalesce(s.min, 0) as sport_minutes,
  coalesce(k.min, 0) as skill_minutes,
  coalesce(t.done, 0) as tasks_done,
  coalesce(t.total, 0) as tasks_total
from daily_logs d
left join lateral (
  select sum(minutes) min from sessions
  where user_id = d.user_id and log_date = d.log_date and kind = 'focus') f on true
left join lateral (
  select sum(minutes) min from sessions
  where user_id = d.user_id and log_date = d.log_date and kind = 'sport') s on true
left join lateral (
  select sum(minutes) min from sessions
  where user_id = d.user_id and log_date = d.log_date and kind = 'skill') k on true
left join lateral (
  select count(*) filter (where status = 'done') done, count(*) total
  from tasks where user_id = d.user_id and due_date = d.log_date) t on true;

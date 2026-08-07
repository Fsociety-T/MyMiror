import { useState } from 'react'
import { PageHeader } from '@/components/layout/PageHeader'
import { greeting, longDate } from '@/lib/date'
import { scoreDay } from '@/lib/score'
import { goalsOf, weightsOf } from '@/features/profile/api'
import { StreakCard } from '@/features/streaks/StreakCard'
import { UrgeSurf } from '@/features/streaks/UrgeSurf'
import { MainMission } from './components/MainMission'
import { PrayerRow } from './components/PrayerRow'
import { ScoreRing } from './components/ScoreRing'
import { VisionCard } from './components/VisionCard'
import { VitalGrid } from './components/VitalGrid'
import { useTasks } from '@/features/tasks/hooks'
import { PRAYER_COLUMNS, useProfile, useToday, useTogglePrayer } from './hooks'
import { MOCK_STREAK, MOCK_VISION } from './mock'

export function TodayPage() {
  const [surfing, setSurfing] = useState(false)

  const { data, isPending, error } = useToday()
  const { data: profile } = useProfile()
  const { data: tasks } = useTasks()
  const togglePrayer = useTogglePrayer()

  // The starred task, else the first one still open.
  const mission =
    tasks?.find((t) => t.is_main_mission) ?? tasks?.find((t) => t.status !== 'done')

  const log = data?.log
  const day = data?.day

  const prayers = PRAYER_COLUMNS.map((c) => Boolean(log?.[c]))

  const { score, pillars } = scoreDay(
    {
      prayersDone: prayers.filter(Boolean).length,
      sleepMinutes: day?.sleep_minutes ?? 0,
      sportMinutes: day?.sport_minutes ?? 0,
      focusMinutes: day?.focus_minutes ?? 0,
      skillMinutes: day?.skill_minutes ?? 0,
      tasksDone: day?.tasks_done ?? 0,
      tasksTotal: day?.tasks_total ?? 0,
    },
    goalsOf(profile),
    weightsOf(profile),
  )

  const vision = {
    title: profile?.vision_title || MOCK_VISION.title,
    lines: profile?.vision_lines?.length ? profile.vision_lines : MOCK_VISION.lines,
    quote: profile?.vision_quote ?? MOCK_VISION.quote,
  }

  return (
    <>
      <PageHeader
        title={greeting()}
        subtitle={longDate()}
        initials={(profile?.display_name ?? 'T').charAt(0).toUpperCase()}
      />

      {error && (
        <div className="mb-3 rounded-[14px] border border-bad/30 bg-bad/10 p-3 text-[13px] text-bad">
          {error instanceof Error ? error.message : "Couldn't load today."}
        </div>
      )}

      <div className="flex flex-col gap-3">
        <VisionCard {...vision} index={0} />
        <ScoreRing score={isPending ? 0 : score} pillars={pillars} index={1} />
        <PrayerRow
          done={prayers}
          onToggle={(i) =>
            togglePrayer.mutate({ column: PRAYER_COLUMNS[i], next: !prayers[i] })
          }
          index={2}
        />
        <MainMission
          title={mission?.title ?? 'No task yet — add one with +'}
          index={3}
        />
        <VitalGrid
          sleepMinutes={day?.sleep_minutes ?? 0}
          focusMinutes={day?.focus_minutes ?? 0}
          sportMinutes={day?.sport_minutes ?? 0}
          tasksDone={day?.tasks_done ?? 0}
          tasksTotal={day?.tasks_total ?? 0}
          index={4}
        />
        {/* Streaks are Phase 3 — still mock. */}
        <StreakCard {...MOCK_STREAK} onUrgeSurf={() => setSurfing(true)} index={5} />
      </div>

      <UrgeSurf open={surfing} onClose={() => setSurfing(false)} />
    </>
  )
}

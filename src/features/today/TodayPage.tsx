import { useMemo, useState } from 'react'
import { PageHeader } from '@/components/layout/PageHeader'
import { greeting, longDate } from '@/lib/date'
import { scoreDay } from '@/lib/score'
import { StreakCard } from '@/features/streaks/StreakCard'
import { UrgeSurf } from '@/features/streaks/UrgeSurf'
import { MainMission } from './components/MainMission'
import { PrayerRow } from './components/PrayerRow'
import { ScoreRing } from './components/ScoreRing'
import { VisionCard } from './components/VisionCard'
import { VitalGrid } from './components/VitalGrid'
import { MOCK_DAY, MOCK_MISSION, MOCK_STREAK, MOCK_VISION } from './mock'

export function TodayPage() {
  const [prayers, setPrayers] = useState<boolean[]>(() =>
    Array.from({ length: 5 }, (_, i) => i < MOCK_DAY.prayersDone),
  )
  const [surfing, setSurfing] = useState(false)

  const prayersDone = prayers.filter(Boolean).length

  const { score, pillars } = useMemo(
    () => scoreDay({ ...MOCK_DAY, prayersDone }),
    [prayersDone],
  )

  return (
    <>
      <PageHeader title={greeting()} subtitle={longDate()} />

      <div className="flex flex-col gap-3">
        <VisionCard {...MOCK_VISION} index={0} />
        <ScoreRing score={score} pillars={pillars} index={1} />
        <PrayerRow
          done={prayers}
          onToggle={(i) => setPrayers((p) => p.map((v, j) => (j === i ? !v : v)))}
          index={2}
        />
        <MainMission title={MOCK_MISSION} index={3} />
        <VitalGrid
          sleepMinutes={MOCK_DAY.sleepMinutes}
          focusMinutes={MOCK_DAY.focusMinutes}
          sportMinutes={MOCK_DAY.sportMinutes}
          tasksDone={MOCK_DAY.tasksDone}
          tasksTotal={MOCK_DAY.tasksTotal}
          index={4}
        />
        <StreakCard {...MOCK_STREAK} onUrgeSurf={() => setSurfing(true)} index={5} />
      </div>

      <UrgeSurf open={surfing} onClose={() => setSurfing(false)} />
    </>
  )
}

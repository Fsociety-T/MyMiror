import { Card } from '@/components/ui/card'
import { hm } from '@/lib/date'

type Props = {
  sleepMinutes: number
  focusMinutes: number
  sportMinutes: number
  tasksDone: number
  tasksTotal: number
  index?: number
}

export function VitalGrid({
  sleepMinutes,
  focusMinutes,
  sportMinutes,
  tasksDone,
  tasksTotal,
  index,
}: Props) {
  const vitals = [
    { label: 'Sleep', value: hm(sleepMinutes), tint: 'text-accent' },
    { label: 'Focus', value: hm(focusMinutes), tint: 'text-mind' },
    { label: 'Gym', value: hm(sportMinutes), tint: 'text-body' },
    { label: 'Tasks', value: `${tasksDone}/${tasksTotal}`, tint: 'text-text' },
  ]

  return (
    <Card index={index} className="grid grid-cols-2 gap-y-4">
      {vitals.map(({ label, value, tint }) => (
        <div key={label}>
          <div className="label">{label}</div>
          <div className={`nums mt-1 text-[22px] ${tint}`}>{value}</div>
        </div>
      ))}
    </Card>
  )
}

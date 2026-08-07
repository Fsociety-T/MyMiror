import { useState } from 'react'
import { Sheet } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Chip } from '@/components/ui/chip'
import { useAddSession } from '@/features/today/hooks'

const TYPES = ['gym', 'running', 'football', 'swim', 'walk'] as const
const DURATIONS = [30, 45, 60, 90] as const

export function GymSheet({
  open,
  onClose,
  lastType,
}: {
  open: boolean
  onClose: () => void
  lastType?: string | null
}) {
  const [type, setType] = useState<string>(lastType ?? 'gym')
  const [minutes, setMinutes] = useState<number>(60)
  const add = useAddSession()

  function submit() {
    add.mutate({ kind: 'sport', category: type, minutes }, { onSuccess: onClose })
  }

  return (
    <Sheet open={open} onClose={onClose}>
      <div className="px-4 pt-2">
        <div className="label mb-3">Gym</div>

        <div className="flex flex-wrap gap-2">
          {TYPES.map((t) => (
            <Chip key={t} active={type === t} onClick={() => setType(t)}>
              {t}
            </Chip>
          ))}
        </div>

        <div className="label mt-5 mb-3">Duration</div>
        <div className="flex flex-wrap gap-2">
          {DURATIONS.map((d) => (
            <Chip key={d} active={minutes === d} onClick={() => setMinutes(d)}>
              {d}m
            </Chip>
          ))}
        </div>

        {add.error && (
          <p className="mt-3 text-[13px] text-bad">
            {add.error instanceof Error ? add.error.message : 'Save failed.'}
          </p>
        )}

        <Button size="lg" className="mt-5" onClick={submit} disabled={add.isPending}>
          {add.isPending ? 'Saving…' : 'Save'}
        </Button>
      </div>
    </Sheet>
  )
}

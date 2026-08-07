import { useMemo, useState } from 'react'
import { Sheet } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Wheel } from '@/components/ui/wheel'
import { hm } from '@/lib/date'
import { useSaveDay } from '@/features/today/hooks'

/** Quarter-hour resolution — nobody knows they slept 7h07m. */
const TIMES = Array.from({ length: 96 }, (_, i) => {
  const h = Math.floor(i / 4)
  const m = (i % 4) * 15
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
})

const idxOf = (time: string) => Math.max(0, TIMES.indexOf(time))

type Props = {
  open: boolean
  onClose: () => void
  /** Yesterday's values, so the common case is open → save. */
  initial?: { start: string; end: string }
}

export function SleepSheet({ open, onClose, initial }: Props) {
  const [start, setStart] = useState(() => idxOf(initial?.start ?? '23:30'))
  const [end, setEnd] = useState(() => idxOf(initial?.end ?? '07:00'))
  const save = useSaveDay()

  const minutes = useMemo(() => {
    const raw = (end - start) * 15
    // Crossing midnight is the normal case, not the exception.
    return raw <= 0 ? raw + 24 * 60 : raw
  }, [start, end])

  function submit() {
    const now = new Date()
    const [eh, em] = TIMES[end].split(':').map(Number)
    const wake = new Date(now)
    wake.setHours(eh, em, 0, 0)
    const bed = new Date(wake.getTime() - minutes * 60_000)

    save.mutate(
      {
        sleep_start: bed.toISOString(),
        sleep_end: wake.toISOString(),
        sleep_minutes: minutes,
      },
      { onSuccess: onClose },
    )
  }

  return (
    <Sheet open={open} onClose={onClose}>
      <div className="px-4 pt-2">
        <div className="label mb-4">Sleep</div>

        <div className="flex gap-3">
          <Wheel values={TIMES} index={start} onIndexChange={setStart} label="Bed" />
          <Wheel values={TIMES} index={end} onIndexChange={setEnd} label="Wake" />
        </div>

        <p className="nums mt-4 text-center text-[26px]">{hm(minutes)}</p>

        {save.error && (
          <p className="mt-2 text-center text-[13px] text-bad">
            {save.error instanceof Error ? save.error.message : 'Save failed.'}
          </p>
        )}

        <Button size="lg" className="mt-4" onClick={submit} disabled={save.isPending}>
          {save.isPending ? 'Saving…' : 'Save'}
        </Button>
      </div>
    </Sheet>
  )
}

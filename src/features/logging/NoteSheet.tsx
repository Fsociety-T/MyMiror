import { useState } from 'react'
import { Sheet } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Chip } from '@/components/ui/chip'
import { useSaveDay } from '@/features/today/hooks'

const MOODS = [
  { value: 1, face: '😞' },
  { value: 2, face: '🙁' },
  { value: 3, face: '😐' },
  { value: 4, face: '🙂' },
  { value: 5, face: '😄' },
]

type Props = {
  open: boolean
  onClose: () => void
  initial?: { mood: number | null; note: string | null }
}

/** One note field on the day — reflections are never a separate table (PLAN §2). */
export function NoteSheet({ open, onClose, initial }: Props) {
  const [mood, setMood] = useState<number | null>(initial?.mood ?? null)
  const [note, setNote] = useState(initial?.note ?? '')
  const save = useSaveDay()

  function submit() {
    save.mutate({ mood, note: note.trim() || null }, { onSuccess: onClose })
  }

  return (
    <Sheet open={open} onClose={onClose}>
      <div className="px-4 pt-2">
        <div className="label mb-3">How was today?</div>

        <div className="flex justify-between gap-2">
          {MOODS.map((m) => (
            <Chip
              key={m.value}
              active={mood === m.value}
              onClick={() => setMood(m.value)}
              className="flex-1 text-[19px]"
            >
              {m.face}
            </Chip>
          ))}
        </div>

        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={3}
          placeholder="Anything worth remembering? (optional)"
          className="mt-4 w-full resize-none rounded-[14px] border border-line bg-surface-2 p-3 text-[15px] text-text outline-none placeholder:text-dim focus:border-accent"
        />

        {save.error && (
          <p className="text-[13px] text-bad">
            {save.error instanceof Error ? save.error.message : 'Save failed.'}
          </p>
        )}

        <Button size="lg" className="mt-3" onClick={submit} disabled={save.isPending}>
          {save.isPending ? 'Saving…' : 'Save'}
        </Button>
      </div>
    </Sheet>
  )
}

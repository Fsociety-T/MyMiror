import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Chip } from '@/components/ui/chip'
import { useAddSession } from '@/features/today/hooks'
import { elapsedMinutes, useFocusStore } from './store'

const CATEGORIES = ['coding', 'trading', 'english', 'french', 'reading', 'study']

/** Pick a category, then nothing else. Full screen, one job (PLAN §6.2). */
export function FocusTimer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { category, startedAt, start, stop } = useFocusStore()
  const [pick, setPick] = useState(CATEGORIES[0])
  const [, tick] = useState(0)
  const add = useAddSession()

  // Re-render once a second so the clock advances; the value itself is derived
  // from startedAt, so a missed tick never loses time.
  useEffect(() => {
    if (!startedAt) return
    const id = setInterval(() => tick((n) => n + 1), 1000)
    return () => clearInterval(id)
  }, [startedAt])

  if (!open) return null

  const seconds = startedAt ? Math.floor((Date.now() - startedAt) / 1000) : 0
  const mm = String(Math.floor(seconds / 60)).padStart(2, '0')
  const ss = String(seconds % 60).padStart(2, '0')

  function finish() {
    if (!startedAt || !category) return
    const minutes = elapsedMinutes(startedAt)
    if (minutes < 1) {
      // Nothing worth recording — don't pollute the data with 0-minute rows.
      stop()
      onClose()
      return
    }
    add.mutate(
      {
        kind: 'focus',
        category,
        minutes,
        startedAt: new Date(startedAt).toISOString(),
      },
      {
        onSuccess: () => {
          stop()
          onClose()
        },
      },
    )
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-bg px-6"
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-[calc(16px+env(safe-area-inset-top))] right-4 p-2 text-dim"
        >
          <X size={22} />
        </button>

        {!startedAt ? (
          <>
            <div className="label mb-4">Focus on</div>
            <div className="flex max-w-xs flex-wrap justify-center gap-2">
              {CATEGORIES.map((c) => (
                <Chip key={c} active={pick === c} onClick={() => setPick(c)}>
                  {c}
                </Chip>
              ))}
            </div>
            <Button size="lg" className="mt-8 max-w-xs" onClick={() => start(pick)}>
              Start
            </Button>
          </>
        ) : (
          <>
            <div className="label mb-3">{category}</div>
            <p className="nums text-[64px] leading-none">
              {mm}:{ss}
            </p>

            {add.error && (
              <p className="mt-4 text-[13px] text-bad">
                {add.error instanceof Error ? add.error.message : 'Save failed.'}
              </p>
            )}

            <Button
              size="lg"
              variant="surface"
              className="mt-10 max-w-xs"
              onClick={finish}
              disabled={add.isPending}
            >
              {add.isPending ? 'Saving…' : 'Finish'}
            </Button>
          </>
        )}
      </motion.div>
    </AnimatePresence>
  )
}

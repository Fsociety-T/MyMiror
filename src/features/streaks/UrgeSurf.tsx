import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { X } from 'lucide-react'

const TOTAL = 180 // 3 minutes
const CYCLE = 19 // 4 in · 7 hold · 8 out

/**
 * The only ambient looping animation in the app (PLAN §4).
 * Every press is logged as data — in Phase 3 this writes a `urge_surf`
 * streak_event so the Pattern Feed can later tell you *when* urges hit.
 */
export function UrgeSurf({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [left, setLeft] = useState(TOTAL)

  useEffect(() => {
    if (!open) return
    setLeft(TOTAL)
    const id = setInterval(() => {
      setLeft((n) => {
        if (n <= 1) {
          clearInterval(id)
          return 0
        }
        return n - 1
      })
    }, 1000)
    return () => clearInterval(id)
  }, [open])

  const elapsed = TOTAL - left
  const phase = elapsed % CYCLE
  const label = phase < 4 ? 'Breathe in' : phase < 11 ? 'Hold' : 'Breathe out'

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-bg"
        >
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-[calc(16px+env(safe-area-inset-top))] right-4 p-2 text-dim"
          >
            <X size={22} />
          </button>

          <motion.div
            animate={{ scale: [1, 1.35, 1.35, 1] }}
            transition={{
              duration: CYCLE,
              times: [0, 4 / CYCLE, 11 / CYCLE, 1],
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="grid size-44 place-items-center rounded-full border border-accent/40 bg-accent/10"
          >
            <span className="size-24 rounded-full bg-accent/20" />
          </motion.div>

          <motion.p
            key={label}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-14 text-[17px] font-medium"
          >
            {label}
          </motion.p>

          <p className="nums mt-2 text-[15px] text-dim">
            {String(Math.floor(left / 60)).padStart(2, '0')}:
            {String(left % 60).padStart(2, '0')}
          </p>

          <p className="mt-10 max-w-[240px] text-center text-[13px] text-dim">
            The urge peaks and passes. You only have to outlast it.
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

import { AnimatePresence, motion } from 'motion/react'
import { useEffect, type ReactNode } from 'react'

type Props = {
  open: boolean
  onClose: () => void
  children: ReactNode
}

/** Bottom sheet: tap the scrim or drag the handle down to dismiss. */
export function Sheet({ open, onClose, children }: Props) {
  // The sheet owns the viewport while open — the page behind must not scroll.
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-[2px]"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 380, damping: 36 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.4 }}
            onDragEnd={(_, info) => {
              if (info.offset.y > 90 || info.velocity.y > 500) onClose()
            }}
            className="fixed inset-x-0 bottom-0 z-50 rounded-t-[24px] border-t border-line bg-surface pb-[calc(20px+env(safe-area-inset-bottom))]"
          >
            <div className="flex justify-center pt-3 pb-1">
              <span className="h-1 w-9 rounded-full bg-line" />
            </div>
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

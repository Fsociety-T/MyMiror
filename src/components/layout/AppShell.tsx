import { useState } from 'react'
import { Outlet, useLocation } from 'react-router'
import { AnimatePresence, motion } from 'motion/react'
import { TabBar } from './TabBar'
import { LogSheet } from '@/features/logging/LogSheet'

export function AppShell() {
  const { pathname } = useLocation()
  const [logOpen, setLogOpen] = useState(false)

  return (
    <div className="min-h-dvh">
      {/* mode="wait" so the outgoing page is gone before the next fades in —
          crossfading two full pages reads as a flicker on a phone. */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.main
          key={pathname}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          className="mx-auto max-w-md px-4 pt-[env(safe-area-inset-top)] pb-[calc(120px+env(safe-area-inset-bottom))]"
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>

      <TabBar onAdd={() => setLogOpen(true)} />
      <LogSheet open={logOpen} onClose={() => setLogOpen(false)} />
    </div>
  )
}

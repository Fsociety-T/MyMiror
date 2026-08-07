import { useState } from 'react'
import { motion } from 'motion/react'
import { Banknote, Brain, Dumbbell, ListTodo, Moon, PenLine } from 'lucide-react'
import { Sheet } from '@/components/ui/sheet'
import { FocusTimer } from '@/features/focus/FocusTimer'
import { useToday } from '@/features/today/hooks'
import { GymSheet } from './GymSheet'
import { MoneySheet } from './MoneySheet'
import { NoteSheet } from './NoteSheet'
import { SleepSheet } from './SleepSheet'
import { TaskSheet } from './TaskSheet'

/** The most important 200 lines in the app (PLAN §6.2).
 *  One tap to open, one tap to save. If a log takes more than 3 taps, redesign it. */
const TILES = [
  { key: 'focus', label: 'Focus', Icon: Brain, tint: 'text-mind' },
  { key: 'sleep', label: 'Sleep', Icon: Moon, tint: 'text-accent' },
  { key: 'gym', label: 'Gym', Icon: Dumbbell, tint: 'text-body' },
  { key: 'task', label: 'Task', Icon: ListTodo, tint: 'text-text' },
  { key: 'money', label: 'Money', Icon: Banknote, tint: 'text-money' },
  { key: 'note', label: 'Note', Icon: PenLine, tint: 'text-dim' },
] as const

type Tile = (typeof TILES)[number]['key']

export function LogSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [active, setActive] = useState<Tile | null>(null)
  const { data } = useToday()

  function pick(key: Tile) {
    onClose()
    setActive(key)
  }

  const close = () => setActive(null)

  return (
    <>
      <Sheet open={open} onClose={onClose}>
        <div className="px-4 pt-2">
          <div className="label mb-3">Log</div>
          <div className="grid grid-cols-2 gap-3">
            {TILES.map(({ key, label, Icon, tint }, i) => (
              <motion.button
                key={key}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.22, ease: 'easeOut', delay: i * 0.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => pick(key)}
                className="flex h-[84px] flex-col items-start justify-between rounded-[20px] border border-line bg-surface-2 p-4"
              >
                <Icon size={20} className={tint} />
                <span className="text-[15px] font-medium">{label}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </Sheet>

      <FocusTimer open={active === 'focus'} onClose={close} />
      <SleepSheet open={active === 'sleep'} onClose={close} />
      <GymSheet open={active === 'gym'} onClose={close} />
      <TaskSheet open={active === 'task'} onClose={close} />
      <MoneySheet open={active === 'money'} onClose={close} />
      <NoteSheet
        open={active === 'note'}
        onClose={close}
        initial={{ mood: data?.log?.mood ?? null, note: data?.log?.note ?? null }}
      />
    </>
  )
}

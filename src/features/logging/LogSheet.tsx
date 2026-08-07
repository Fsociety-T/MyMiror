import { motion } from 'motion/react'
import { Banknote, Brain, Dumbbell, ListTodo, Moon, PenLine } from 'lucide-react'
import { Sheet } from '@/components/ui/sheet'

/**
 * The most important 200 lines in the app (PLAN §6.2).
 * Six tiles. One tap to open, one tap to save. Phase 1 renders the grid only —
 * the sub-sheets and their writes land in Phase 2.
 */
const TILES = [
  { key: 'focus', label: 'Focus', Icon: Brain, tint: 'text-mind' },
  { key: 'sleep', label: 'Sleep', Icon: Moon, tint: 'text-accent' },
  { key: 'gym', label: 'Gym', Icon: Dumbbell, tint: 'text-body' },
  { key: 'task', label: 'Task', Icon: ListTodo, tint: 'text-text' },
  { key: 'money', label: 'Money', Icon: Banknote, tint: 'text-money' },
  { key: 'note', label: 'Note', Icon: PenLine, tint: 'text-dim' },
] as const

export function LogSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
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
              className="flex h-[84px] flex-col items-start justify-between rounded-[20px] border border-line bg-surface-2 p-4"
            >
              <Icon size={20} className={tint} />
              <span className="text-[15px] font-medium">{label}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </Sheet>
  )
}

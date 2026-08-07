import { ChevronRight } from 'lucide-react'
import { motion } from 'motion/react'
import { Card } from '@/components/ui/card'

export function MainMission({ title, index }: { title: string; index?: number }) {
  return (
    <Card index={index} className="p-0">
      <motion.button
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        className="flex w-full items-center gap-3 px-4 py-3.5 text-left"
      >
        {/* Category color as a 2px bar only — never a card fill (PLAN §4) */}
        <span className="h-8 w-[2px] shrink-0 rounded-full bg-accent" />
        <div className="min-w-0 flex-1">
          <div className="label">Main mission</div>
          <p className="mt-1 truncate text-[15px] font-medium">{title}</p>
        </div>
        <ChevronRight size={17} className="shrink-0 text-dim" />
      </motion.button>
    </Card>
  )
}

import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ChevronDown } from 'lucide-react'
import { Card } from '@/components/ui/card'

type Props = {
  title: string
  lines: string[]
  quote?: string
  index?: number
}

/** Collapsed to one line after 9am — by then you've read it. Tap to expand. */
export function VisionCard({ title, lines, quote, index }: Props) {
  const [open, setOpen] = useState(() => new Date().getHours() < 9)

  return (
    <Card index={index} className="overflow-hidden p-0">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left"
      >
        <div className="min-w-0">
          <div className="label text-faith">{title}</div>
          {!open && (
            <p className="mt-1 truncate text-[14px] text-dim">{lines.join('. ')}</p>
          )}
        </div>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={17} className="text-dim" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
          >
            <div className="border-t border-line px-4 py-3.5">
              <ul className="flex flex-col gap-1.5">
                {lines.map((line) => (
                  <li key={line} className="flex gap-2.5 text-[15px]">
                    <span className="mt-[7px] size-1 shrink-0 rounded-full bg-faith" />
                    {line}
                  </li>
                ))}
              </ul>
              {quote && <p className="mt-3 text-[13px] text-dim italic">“{quote}”</p>}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  )
}

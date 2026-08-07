import { useState } from 'react'
import { Delete } from 'lucide-react'
import { motion } from 'motion/react'
import { Sheet } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Chip } from '@/components/ui/chip'
import { useAddFinance } from '@/features/today/hooks'

const CATEGORIES = ['food', 'transport', 'bills', 'fun', 'salary', 'other']
const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', 'del']

export function MoneySheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [raw, setRaw] = useState('')
  const [kind, setKind] = useState<'in' | 'out'>('out')
  const [category, setCategory] = useState('food')
  const add = useAddFinance()

  const amount = Number(raw || '0')

  function press(k: string) {
    setRaw((v) => {
      if (k === 'del') return v.slice(0, -1)
      if (k === '.') return v.includes('.') ? v : (v || '0') + '.'
      // Two decimal places max — money has no third.
      if (v.includes('.') && v.split('.')[1].length >= 2) return v
      return v === '0' ? k : v + k
    })
  }

  function submit() {
    if (amount <= 0) return
    add.mutate(
      { kind, amount, category },
      {
        onSuccess: () => {
          setRaw('')
          onClose()
        },
      },
    )
  }

  return (
    <Sheet open={open} onClose={onClose}>
      <div className="px-4 pt-2">
        <div className="flex items-center justify-between">
          <div className="label">Money</div>
          <div className="flex gap-2">
            <Chip active={kind === 'out'} onClick={() => setKind('out')}>
              Out
            </Chip>
            <Chip active={kind === 'in'} onClick={() => setKind('in')}>
              In
            </Chip>
          </div>
        </div>

        <p
          className={`nums mt-4 text-center text-[40px] ${
            kind === 'in' ? 'text-good' : 'text-text'
          }`}
        >
          {kind === 'in' ? '+' : '−'}
          {raw || '0'}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <Chip key={c} active={category === c} onClick={() => setCategory(c)}>
              {c}
            </Chip>
          ))}
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2">
          {KEYS.map((k) => (
            <motion.button
              key={k}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              onClick={() => press(k)}
              className="nums flex h-12 items-center justify-center rounded-[14px] border border-line bg-surface-2 text-[19px]"
            >
              {k === 'del' ? <Delete size={18} className="text-dim" /> : k}
            </motion.button>
          ))}
        </div>

        {add.error && (
          <p className="mt-3 text-[13px] text-bad">
            {add.error instanceof Error ? add.error.message : 'Save failed.'}
          </p>
        )}

        <Button
          size="lg"
          className="mt-4"
          onClick={submit}
          disabled={amount <= 0 || add.isPending}
        >
          {add.isPending ? 'Saving…' : 'Save'}
        </Button>
      </div>
    </Sheet>
  )
}

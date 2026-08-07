import { Shield } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useCountUp } from '@/lib/useCountUp'

type Props = {
  name: string
  days: number
  best: number
  shieldsUsed: number
  shieldsTotal: number
  onUrgeSurf: () => void
  index?: number
}

export function StreakCard({
  name,
  days,
  best,
  shieldsUsed,
  shieldsTotal,
  onUrgeSurf,
  index,
}: Props) {
  const shown = useCountUp(days)
  const shieldsLeft = shieldsTotal - shieldsUsed

  return (
    <Card index={index} className="flex flex-col gap-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <Shield size={16} className={shieldsLeft > 0 ? 'text-good' : 'text-warn'} />
          <span className="text-[15px] font-medium">{name}</span>
        </div>
        <div className="text-right">
          <div className="nums text-[28px] leading-none text-good">{shown}</div>
          <div className="label mt-1">Days</div>
        </div>
      </div>

      <p className="text-[12px] text-dim">
        best {best} · shields {shieldsUsed}/{shieldsTotal}
      </p>

      <Button variant="surface" size="md" className="w-full" onClick={onUrgeSurf}>
        Urge surf
      </Button>
    </Card>
  )
}

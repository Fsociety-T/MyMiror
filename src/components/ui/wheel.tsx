import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

const ITEM = 40 // px per row — must match the h-10 below

type Props = {
  values: string[]
  index: number
  onIndexChange: (i: number) => void
  label?: string
}

/**
 * Scroll-snap wheel picker. Native scrolling means real momentum and no drag
 * maths — on a phone this beats any JS-driven wheel.
 */
export function Wheel({ values, index, onIndexChange, label }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const settle = useRef<ReturnType<typeof setTimeout> | null>(null)
  // Guard against the programmatic scroll below echoing back as user input.
  const syncing = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const top = index * ITEM
    if (Math.abs(el.scrollTop - top) < 2) return
    syncing.current = true
    el.scrollTo({ top, behavior: 'auto' })
    requestAnimationFrame(() => (syncing.current = false))
  }, [index])

  function onScroll() {
    if (syncing.current) return
    if (settle.current) clearTimeout(settle.current)
    settle.current = setTimeout(() => {
      const el = ref.current
      if (!el) return
      const next = Math.round(el.scrollTop / ITEM)
      const clamped = Math.min(Math.max(next, 0), values.length - 1)
      if (clamped !== index) onIndexChange(clamped)
    }, 90)
  }

  return (
    <div className="flex-1">
      {label && <div className="label mb-2 text-center">{label}</div>}
      <div className="relative h-[120px]">
        {/* the selection window */}
        <div className="pointer-events-none absolute inset-x-0 top-10 h-10 rounded-[10px] border border-line bg-surface-2" />
        <div
          ref={ref}
          onScroll={onScroll}
          className="h-full snap-y snap-mandatory overflow-y-scroll [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {/* spacers centre the first and last value in the window */}
          <div className="h-10" />
          {values.map((v, i) => (
            <div
              key={v}
              className={cn(
                'flex h-10 snap-center items-center justify-center text-[17px] transition-colors',
                i === index ? 'nums text-text' : 'text-dim',
              )}
            >
              {v}
            </div>
          ))}
          <div className="h-10" />
        </div>
      </div>
    </div>
  )
}

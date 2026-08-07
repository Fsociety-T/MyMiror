import { useEffect, useRef, useState } from 'react'

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)

/**
 * Counts from 0 to `target` on first paint only. Re-renders with the same
 * target do not replay it — numbers that re-animate on every keystroke are
 * the fastest way to make an app feel broken (PLAN §4).
 */
export function useCountUp(target: number, duration = 600): number {
  const [value, setValue] = useState(0)
  const played = useRef(false)

  useEffect(() => {
    if (played.current) {
      setValue(target)
      return
    }
    played.current = true

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(target)
      return
    }

    let frame = 0
    let start: number | null = null

    const tick = (now: number) => {
      start ??= now
      const t = Math.min((now - start) / duration, 1)
      setValue(Math.round(target * easeOut(t)))
      if (t < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [target, duration])

  return value
}

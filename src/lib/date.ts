import { format } from 'date-fns'

/** The app's day key. Always local time — never toISOString(), which is UTC
 *  and silently shifts your day boundary by hours. */
export function dayKey(d: Date = new Date()): string {
  return format(d, 'yyyy-MM-dd')
}

export function greeting(d: Date = new Date()): string {
  const h = d.getHours()
  if (h < 12) return 'Good morning'
  if (h < 18) return 'Good afternoon'
  return 'Good evening'
}

export function longDate(d: Date = new Date()): string {
  return format(d, 'EEEE, MMMM d')
}

export function hm(minutes: number): string {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  if (h === 0) return `${m}m`
  if (m === 0) return `${h}h`
  return `${h}h${String(m).padStart(2, '0')}m`
}

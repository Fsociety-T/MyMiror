import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type FocusState = {
  category: string | null
  /** Epoch ms. Elapsed is always derived from this, never accumulated. */
  startedAt: number | null
  start: (category: string) => void
  stop: () => void
}

/**
 * The ONLY Zustand store in the app — timer state is the one thing the server
 * doesn't own (PLAN §3).
 *
 * Persisted because a phone will background or kill this tab mid-session, and
 * elapsed time is computed from `startedAt` rather than ticked into a counter,
 * so a suspended timer resumes at the correct value instead of losing minutes.
 */
export const useFocusStore = create<FocusState>()(
  persist(
    (set) => ({
      category: null,
      startedAt: null,
      start: (category) => set({ category, startedAt: Date.now() }),
      stop: () => set({ category: null, startedAt: null }),
    }),
    { name: 'personal-os:focus' },
  ),
)

export const elapsedMinutes = (startedAt: number, now = Date.now()) =>
  Math.floor((now - startedAt) / 60_000)

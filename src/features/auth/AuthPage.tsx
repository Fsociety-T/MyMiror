import { useState, type FormEvent } from 'react'
import { motion } from 'motion/react'
import { Button } from '@/components/ui/button'
import { isSupabaseConfigured } from '@/lib/supabase'
import { resetPassword, signIn, signUp } from './api'

type Mode = 'in' | 'up' | 'reset'

const COPY: Record<Mode, { title: string; sub: string; cta: string }> = {
  in: { title: 'Welcome back', sub: 'Pick up where you left off.', cta: 'Sign in' },
  up: { title: 'Start today', sub: 'One minute now. Fifteen seconds a day after.', cta: 'Create account' },
  reset: { title: 'Reset password', sub: "We'll email you a link.", cta: 'Send link' },
}

const field =
  'h-12 w-full rounded-[14px] border border-line bg-surface px-4 text-[15px] text-text placeholder:text-dim outline-none focus:border-accent transition-colors'

export function AuthPage() {
  const [mode, setMode] = useState<Mode>('in')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [sent, setSent] = useState(false)

  const copy = COPY[mode]

  function switchTo(next: Mode) {
    setMode(next)
    setError(null)
    setSent(false)
  }

  async function submit(e: FormEvent) {
    e.preventDefault()
    setBusy(true)
    setError(null)
    try {
      if (mode === 'in') await signIn(email, password)
      else if (mode === 'up') await signUp(email, password, name.trim() || 'Friend')
      else {
        await resetPassword(email)
        setSent(true)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="flex min-h-dvh flex-col justify-center px-6 pb-[env(safe-area-inset-bottom)]">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
        className="mx-auto w-full max-w-sm"
      >
        <div className="mb-8">
          <div className="label mb-3">Personal OS</div>
          <h1 className="nums text-[32px] leading-tight">{copy.title}</h1>
          <p className="mt-1 text-[15px] text-dim">{copy.sub}</p>
        </div>

        {!isSupabaseConfigured && (
          <div className="mb-4 rounded-[14px] border border-warn/30 bg-warn/10 p-3 text-[13px] text-warn">
            No Supabase keys found. Add <code>VITE_SUPABASE_URL</code> and{' '}
            <code>VITE_SUPABASE_ANON_KEY</code> to <code>.env.local</code>, then restart the dev
            server.
          </div>
        )}

        <form onSubmit={submit} className="flex flex-col gap-3">
          {mode === 'up' && (
            <input
              className={field}
              placeholder="Your name"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}

          <input
            className={field}
            type="email"
            inputMode="email"
            placeholder="Email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {mode !== 'reset' && (
            <input
              className={field}
              type="password"
              placeholder="Password"
              autoComplete={mode === 'up' ? 'new-password' : 'current-password'}
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          )}

          {error && <p className="text-[13px] text-bad">{error}</p>}
          {sent && <p className="text-[13px] text-good">Check your inbox for the link.</p>}

          <Button type="submit" size="lg" disabled={busy} className="mt-1">
            {busy ? 'Working…' : copy.cta}
          </Button>
        </form>

        <div className="mt-6 flex flex-col items-center gap-2 text-[13px] text-dim">
          {mode === 'in' && (
            <>
              <button onClick={() => switchTo('up')}>
                No account? <span className="text-text">Create one</span>
              </button>
              <button onClick={() => switchTo('reset')}>Forgot password?</button>
            </>
          )}
          {mode === 'up' && (
            <button onClick={() => switchTo('in')}>
              Already have an account? <span className="text-text">Sign in</span>
            </button>
          )}
          {mode === 'reset' && <button onClick={() => switchTo('in')}>Back to sign in</button>}
        </div>
      </motion.div>
    </div>
  )
}

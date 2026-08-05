import { Link } from 'react-router-dom'
import { Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { APP_NAME, APP_TAGLINE } from '@/lib/constants'

export function SplashPage() {
  return (
    <div className="relative min-h-dvh overflow-hidden bg-app">
      <div
        aria-hidden
        className="animate-pulse-soft absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-accent/15 blur-3xl [animation-duration:5s]"
      />
      <div
        aria-hidden
        className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-accent/10 to-transparent"
      />

      <div className="relative mx-auto flex min-h-dvh w-full max-w-[430px] flex-col items-center justify-center px-6 pb-12 text-center">
        <span className="mb-6 flex h-20 w-20 items-center justify-center rounded-[24px] bg-accent/15 shadow-[0_0_40px_-8px_rgba(139,124,255,0.4)]">
          <Sparkles className="h-9 w-9 text-accent" strokeWidth={1.6} />
        </span>

        <h1 className="text-[32px] font-semibold tracking-tight text-primary">{APP_NAME}</h1>
        <p className="mt-3 max-w-[280px] text-[15px] leading-relaxed text-secondary">
          {APP_TAGLINE}
        </p>

        <div className="mt-10 w-full">
          <Button fullWidth asChild>
            <Link to="/sign-in">Enter My Mirror</Link>
          </Button>
          <p className="mt-4 text-[13px] text-muted">
            New here?{' '}
            <Link
              to="/sign-up"
              className="font-semibold text-accent-soft underline-offset-4 outline-none focus-visible:underline"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Sparkles } from 'lucide-react'
import { APP_NAME, APP_TAGLINE } from '@/lib/constants'

interface AuthLayoutProps {
  title: string
  subtitle: string
  children: ReactNode
}

export function AuthLayout({ title, subtitle, children }: AuthLayoutProps) {
  return (
    <div className="min-h-dvh bg-app">
      <div className="mx-auto flex min-h-dvh w-full max-w-[430px] flex-col justify-center px-5 pb-10 pt-10">
        <Link to="/welcome" className="mb-6 inline-flex items-center gap-2 outline-none">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent/15">
            <Sparkles className="h-4.5 w-4.5 text-accent" />
          </span>
          <span className="text-[16px] font-semibold tracking-tight text-primary">
            {APP_NAME}
          </span>
        </Link>

        <h1 className="text-[24px] font-semibold leading-tight tracking-tight text-primary">
          {title}
        </h1>
        <p className="mb-6 mt-1.5 text-[14px] text-muted">{subtitle}</p>

        {children}

        <p className="mt-8 text-center text-[12px] text-muted">{APP_TAGLINE}</p>
      </div>
    </div>
  )
}

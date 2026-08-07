import { createContext, use, useEffect, useState, type ReactNode } from 'react'
import type { Session } from '@supabase/supabase-js'
import { getSession, onAuthChange } from './api'

type AuthState = {
  session: Session | null
  loading: boolean
}

const AuthContext = createContext<AuthState>({ session: null, loading: true })

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let alive = true

    getSession()
      .then((s) => alive && setSession(s))
      .catch(() => alive && setSession(null))
      .finally(() => alive && setLoading(false))

    const unsubscribe = onAuthChange((s) => {
      if (!alive) return
      setSession(s)
      setLoading(false)
    })

    return () => {
      alive = false
      unsubscribe()
    }
  }, [])

  return <AuthContext value={{ session, loading }}>{children}</AuthContext>
}

export function useAuth() {
  return use(AuthContext)
}

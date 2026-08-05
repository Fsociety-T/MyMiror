import { useEffect, useMemo, useState, type ReactNode } from 'react'
import type { Session } from '@supabase/supabase-js'
import { isSupabaseConfigured, supabase } from '@/lib/supabase'
import { AuthContext, type AuthContextValue } from '@/features/auth/auth-context'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(!isSupabaseConfigured || !supabase ? false : true)
  const [isRecovery, setIsRecovery] = useState(false)

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) return

    let mounted = true

    void supabase.auth.getSession().then(({ data }) => {
      if (mounted) setSession(data.session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, newSession) => {
      setSession(newSession)
      if (event === 'PASSWORD_RECOVERY') {
        setIsRecovery(true)
      } else if (event === 'SIGNED_IN' && !isRecovery) {
        setIsRecovery(false)
      }
      setLoading(false)
    })

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [isRecovery])

  const value = useMemo<AuthContextValue>(
    () => ({
      session,
      user: session?.user ?? null,
      loading,
      configured: isSupabaseConfigured,
      isRecovery,
      clearRecovery: () => setIsRecovery(false),
    }),
    [session, loading, isRecovery],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

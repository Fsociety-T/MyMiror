import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/features/auth/useAuth'
import { LoadingState } from '@/components/ui/LoadingState'

export function RootGate() {
  const { loading } = useAuth()

  if (loading) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-app">
        <LoadingState label="Opening My Mirror…" />
      </div>
    )
  }

  return <Outlet />
}

export function PublicOnly() {
  const { user } = useAuth()
  if (user) return <Navigate to="/" replace />
  return <Outlet />
}

export function Protected() {
  const { user } = useAuth()
  if (!user) return <Navigate to="/welcome" replace />
  return <Outlet />
}

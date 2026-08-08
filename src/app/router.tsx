import { Suspense, lazy } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import { AppShell } from '@/components/layout/AppShell'
import { AuthPage } from '@/features/auth/AuthPage'
import { useAuth } from '@/features/auth/AuthProvider'
import { ProjectsPage } from '@/features/projects/ProjectsPage'
import { TodayPage } from '@/features/today/TodayPage'

// Recharts is ~400kB and only Insights needs it. Splitting it out keeps the
// cold start — which is always Today — fast on mobile data.
const InsightsPage = lazy(() =>
  import('@/features/insights/InsightsPage').then((m) => ({ default: m.InsightsPage })),
)

function Splash() {
  return (
    <div className="grid min-h-dvh place-items-center">
      <span className="size-6 animate-spin rounded-full border-2 border-line border-t-accent" />
    </div>
  )
}

function Gate() {
  const { session, loading } = useAuth()

  // Without this the app flashes the sign-in screen for ~200ms on every cold
  // start while Supabase rehydrates the session from storage.
  if (loading) return <Splash />
  if (!session) return <AuthPage />

  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<TodayPage />} />
        <Route
          path="insights"
          element={
            <Suspense fallback={<Splash />}>
              <InsightsPage />
            </Suspense>
          }
        />
        <Route path="projects" element={<ProjectsPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export function Router() {
  return (
    // GitHub Pages serves the app from /<repo>/, so every route has to be
    // resolved against Vite's base rather than the domain root.
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Gate />
    </BrowserRouter>
  )
}

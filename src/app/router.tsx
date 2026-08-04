import { createBrowserRouter, Navigate } from 'react-router-dom'
import { AppShell } from '@/components/layout/AppShell'
import { HomePage } from '@/pages/HomePage'
import { PlanPage } from '@/pages/PlanPage'
import { FocusPage } from '@/pages/FocusPage'
import { ReviewPage } from '@/pages/ReviewPage'
import { VaultPage } from '@/pages/VaultPage'
import { SettingsPage } from '@/pages/SettingsPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'plan', element: <PlanPage /> },
      { path: 'focus', element: <FocusPage /> },
      { path: 'review', element: <ReviewPage /> },
      { path: 'vault', element: <VaultPage /> },
      { path: 'settings', element: <SettingsPage /> },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
])

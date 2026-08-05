import { createBrowserRouter, Navigate } from 'react-router-dom'
import { RootGate, PublicOnly, Protected } from '@/features/auth/AuthGuards'
import { SplashPage } from '@/features/auth/SplashPage'
import { SignInPage } from '@/features/auth/SignInPage'
import { SignUpPage } from '@/features/auth/SignUpPage'
import { ForgotPasswordPage } from '@/features/auth/ForgotPasswordPage'
import { ResetPasswordPage } from '@/features/auth/ResetPasswordPage'
import { AppShell } from '@/components/layout/AppShell'
import { HomePage } from '@/pages/HomePage'
import { PlanPage } from '@/pages/PlanPage'
import { FocusPage } from '@/pages/FocusPage'
import { ReviewPage } from '@/pages/ReviewPage'
import { VaultPage } from '@/pages/VaultPage'
import { SettingsPage } from '@/pages/SettingsPage'

export const router = createBrowserRouter([
  {
    element: <RootGate />,
    children: [
      {
        element: <PublicOnly />,
        children: [
          { path: '/welcome', element: <SplashPage /> },
          { path: '/sign-in', element: <SignInPage /> },
          { path: '/sign-up', element: <SignUpPage /> },
          { path: '/forgot-password', element: <ForgotPasswordPage /> },
          { path: '/reset-password', element: <ResetPasswordPage /> },
        ],
      },
      {
        element: <Protected />,
        children: [
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
        ],
      },
    ],
  },
])

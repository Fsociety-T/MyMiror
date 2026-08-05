import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { CircleUserRound, Moon } from 'lucide-react'
import { PageHeader } from '@/components/layout/PageHeader'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useProfile, useUpdateProfile } from '@/features/auth/useProfile'
import { signOut } from '@/features/auth/auth-actions'
import { useAuth } from '@/features/auth/useAuth'
import { APP_NAME, APP_TAGLINE } from '@/lib/constants'

const displayNameSchema = z.object({
  displayName: z
    .string()
    .trim()
    .min(1, 'Enter your name')
    .max(40, 'Maximum 40 characters'),
})

type DisplayNameValues = z.infer<typeof displayNameSchema>

export function SettingsPage() {
  const { user } = useAuth()
  const { data: profile, isLoading: profileLoading } = useProfile()
  const updateProfile = useUpdateProfile()

  const [signOutError, setSignOutError] = useState<string | null>(null)
  const [signingOut, setSigningOut] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<DisplayNameValues>({
    resolver: zodResolver(displayNameSchema),
    defaultValues: { displayName: profile?.display_name ?? '' },
    values: { displayName: profile?.display_name ?? '' },
  })

  const onSaveName = async (values: DisplayNameValues) => {
    try {
      await updateProfile.mutateAsync({ display_name: values.displayName })
    } catch {
      // error surfaces through the mutation; keep form usable
    }
  }

  const onSignOut = async () => {
    setSignOutError(null)
    setSigningOut(true)
    try {
      await signOut()
    } catch (error) {
      setSignOutError(error instanceof Error ? error.message : 'Sign out failed.')
      setSigningOut(false)
    }
  }

  return (
    <div>
      <PageHeader title="Settings" subtitle="Your profile, security and preferences." />

      <Card className="animate-fade-up mb-5" style={{ animationDelay: '0.05s' }}>
        <div className="flex items-center gap-4">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-line bg-surface">
            <CircleUserRound className="h-6 w-6 text-muted" strokeWidth={1.5} />
          </span>
          <div className="min-w-0">
            <p className="truncate text-[16px] font-semibold text-primary">
              {profile?.display_name?.trim() || 'Your name'}
            </p>
            <p className="truncate text-[13px] text-muted">{user?.email ?? 'Signed out'}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSaveName)} className="mt-4 flex flex-col gap-3">
          <Input
            label="Display name"
            placeholder="How should My Mirror greet you?"
            error={errors.displayName?.message}
            disabled={profileLoading}
            {...register('displayName')}
          />
          <Button type="submit" size="md" loading={isSubmitting} disabled={profileLoading}>
            Save name
          </Button>
        </form>
      </Card>

      <Card
        className="animate-fade-up flex items-center gap-4"
        style={{ animationDelay: '0.12s' }}
      >
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-line bg-surface">
          <Moon className="h-5 w-5 text-accent" strokeWidth={1.8} />
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="text-[15px] font-semibold text-primary">Appearance</h2>
          <p className="mt-0.5 text-[12px] text-muted">
            The calm dark theme is always on.
          </p>
        </div>
        <span className="shrink-0 rounded-full border border-line px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-muted">
          Ready
        </span>
      </Card>

      <Card className="animate-fade-up mt-4" style={{ animationDelay: '0.18s' }}>
        <div className="flex items-center gap-3 border-b border-line pb-4">
          <p className="flex-1 text-[14px] font-medium text-primary">Sign out</p>
          <Button variant="danger" size="md" loading={signingOut} onClick={onSignOut}>
            Sign out
          </Button>
        </div>
        <p className="pt-4 text-[12px] leading-relaxed text-muted">
          Signing out protects your private space on shared devices.
        </p>
        {signOutError ? (
          <p role="alert" className="mt-2 text-[12px] font-medium text-danger">
            {signOutError}
          </p>
        ) : null}
      </Card>

      <p className="mt-6 text-center text-[12px] text-muted">
        {APP_NAME} — {APP_TAGLINE}
      </p>
    </div>
  )
}

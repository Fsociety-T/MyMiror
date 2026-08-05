import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { CheckCircle2 } from 'lucide-react'
import { AuthLayout } from '@/features/auth/AuthLayout'
import { PasswordInput } from '@/features/auth/PasswordInput'
import { updatePassword } from '@/features/auth/auth-actions'
import { useAuth } from '@/features/auth/useAuth'
import { Button } from '@/components/ui/Button'

const resetSchema = z
  .object({
    password: z.string().min(8, 'At least 8 characters').max(72, 'Maximum 72 characters'),
    confirmPassword: z.string().min(1, 'Repeat your new password'),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

type ResetValues = z.infer<typeof resetSchema>

export function ResetPasswordPage() {
  const { isRecovery, clearRecovery } = useAuth()
  const [serverError, setServerError] = useState<string | null>(null)
  const [done, setDone] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetValues>({
    resolver: zodResolver(resetSchema),
    defaultValues: { password: '', confirmPassword: '' },
  })

  const onSubmit = async (values: ResetValues) => {
    setServerError(null)
    try {
      await updatePassword(values.password)
      clearRecovery()
      setDone(true)
    } catch (error) {
      setServerError(
        error instanceof Error ? error.message : 'Could not update your password. Please try again.',
      )
    }
  }

  if (done) {
    return (
      <AuthLayout title="Password updated" subtitle="You're all set.">
        <div className="flex flex-col items-center rounded-xl border border-line bg-card p-5 text-center">
          <CheckCircle2 className="mb-3 h-9 w-9 text-success" strokeWidth={1.6} />
          <p className="text-[14px] leading-relaxed text-secondary">
            Your password has been changed. Sign in with your new password.
          </p>
        </div>
        <Button fullWidth asChild className="mt-6">
          <Link to="/sign-in">Go to sign in</Link>
        </Button>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout title="Choose a new password" subtitle="Make it strong and unique.">
      {!isRecovery ? (
        <p className="mb-4 rounded-xl border border-line bg-card p-4 text-[13px] leading-relaxed text-secondary">
          This page works when you arrive from the reset link in your email. You can still set a
          new password below if you are signed in.
        </p>
      ) : null}

      <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col gap-4" noValidate>
        <PasswordInput
          label="New password"
          autoComplete="new-password"
          placeholder="At least 8 characters"
          error={errors.password?.message}
          {...register('password')}
        />
        <PasswordInput
          label="Confirm new password"
          autoComplete="new-password"
          placeholder="Repeat your new password"
          error={errors.confirmPassword?.message}
          {...register('confirmPassword')}
        />

        {serverError ? (
          <p
            role="alert"
            className="rounded-xl border border-danger/25 bg-danger/10 px-4 py-3 text-[13px] font-medium text-danger"
          >
            {serverError}
          </p>
        ) : null}

        <Button type="submit" fullWidth loading={isSubmitting}>
          Update password
        </Button>
      </form>
    </AuthLayout>
  )
}

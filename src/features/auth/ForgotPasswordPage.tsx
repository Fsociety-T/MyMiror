import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { CheckCircle2 } from 'lucide-react'
import { AuthLayout } from '@/features/auth/AuthLayout'
import { sendPasswordReset } from '@/features/auth/auth-actions'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

const forgotSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Enter a valid email'),
})

type ForgotValues = z.infer<typeof forgotSchema>

export function ForgotPasswordPage() {
  const [serverError, setServerError] = useState<string | null>(null)
  const [sent, setSent] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotValues>({
    resolver: zodResolver(forgotSchema),
    defaultValues: { email: '' },
  })

  const onSubmit = async (values: ForgotValues) => {
    setServerError(null)
    try {
      await sendPasswordReset(values.email)
      setSent(true)
    } catch (error) {
      setServerError(
        error instanceof Error ? error.message : 'Could not send the reset link. Please try again.',
      )
    }
  }

  if (sent) {
    return (
      <AuthLayout title="Check your email" subtitle="Reset link sent.">
        <div className="flex flex-col items-center rounded-xl border border-line bg-card p-5 text-center">
          <CheckCircle2 className="mb-3 h-9 w-9 text-success" strokeWidth={1.6} />
          <p className="text-[14px] leading-relaxed text-secondary">
            If an account exists for that email, a password reset link is on its way. Follow the
            link to choose a new password.
          </p>
        </div>
        <Button fullWidth asChild className="mt-6">
          <Link to="/sign-in">Back to sign in</Link>
        </Button>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout title="Reset your password" subtitle="We'll send you a secure reset link.">
      <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col gap-4" noValidate>
        <Input
          label="Email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          error={errors.email?.message}
          {...register('email')}
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
          Send reset link
        </Button>
      </form>

      <p className="mt-5 text-center text-[13px] text-muted">
        Remembered it?{' '}
        <Link
          to="/sign-in"
          className="font-semibold text-accent-soft underline-offset-4 outline-none focus-visible:underline"
        >
          Sign in
        </Link>
      </p>
    </AuthLayout>
  )
}

import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { AuthLayout } from '@/features/auth/AuthLayout'
import { PasswordInput } from '@/features/auth/PasswordInput'
import { signUpWithEmail } from '@/features/auth/auth-actions'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

const signUpSchema = z
  .object({
    email: z.string().min(1, 'Email is required').email('Enter a valid email'),
    password: z
      .string()
      .min(8, 'At least 8 characters')
      .max(72, 'Maximum 72 characters'),
    confirmPassword: z.string().min(1, 'Repeat your password'),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

type SignUpValues = z.infer<typeof signUpSchema>

export function SignUpPage() {
  const [serverError, setServerError] = useState<string | null>(null)
  const [checkYourEmail, setCheckYourEmail] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { email: '', password: '', confirmPassword: '' },
  })

  const onSubmit = async (values: SignUpValues) => {
    setServerError(null)
    try {
      await signUpWithEmail(values.email, values.password)
      setCheckYourEmail(true)
    } catch (error) {
      setServerError(
        error instanceof Error ? error.message : 'Registration failed. Please try again.',
      )
    }
  }

  if (checkYourEmail) {
    return (
      <AuthLayout title="Check your email" subtitle="Almost there.">
        <p className="rounded-xl border border-line bg-card p-4 text-[14px] leading-relaxed text-secondary">
          We sent a confirmation link to your email. Open it to activate your account, then come
          back and sign in.
        </p>
        <Button fullWidth asChild className="mt-6">
          <Link to="/sign-in">Go to sign in</Link>
        </Button>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout title="Create your account" subtitle="Your private space to reflect and build.">
      <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col gap-4" noValidate>
        <Input
          label="Email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          error={errors.email?.message}
          {...register('email')}
        />
        <PasswordInput
          label="Password"
          autoComplete="new-password"
          placeholder="At least 8 characters"
          error={errors.password?.message}
          {...register('password')}
        />
        <PasswordInput
          label="Confirm password"
          autoComplete="new-password"
          placeholder="Repeat your password"
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
          Create account
        </Button>
      </form>

      <p className="mt-5 text-center text-[13px] text-muted">
        Already have an account?{' '}
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

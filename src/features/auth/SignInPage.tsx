import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { AuthLayout } from '@/features/auth/AuthLayout'
import { PasswordInput } from '@/features/auth/PasswordInput'
import { signInWithPassword } from '@/features/auth/auth-actions'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

const signInSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Enter a valid email'),
  password: z.string().min(1, 'Password is required'),
})

type SignInValues = z.infer<typeof signInSchema>

export function SignInPage() {
  const [serverError, setServerError] = useState<string | null>(null)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: '', password: '' },
  })

  const onSubmit = async (values: SignInValues) => {
    setServerError(null)
    try {
      await signInWithPassword(values.email, values.password)
    } catch (error) {
      setServerError(error instanceof Error ? error.message : 'Sign in failed. Please try again.')
    }
  }

  return (
    <AuthLayout
      title="Welcome back."
      subtitle="Continue building your future."
    >
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
          autoComplete="current-password"
          placeholder="Your password"
          error={errors.password?.message}
          {...register('password')}
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
          Sign in
        </Button>
      </form>

      <div className="mt-5 flex flex-col items-center gap-3 text-[13px]">
        <Link
          to="/forgot-password"
          className="font-medium text-secondary underline-offset-4 outline-none focus-visible:underline"
        >
          Forgot password?
        </Link>
        <p className="text-muted">
          New to My Mirror?{' '}
          <Link
            to="/sign-up"
            className="font-semibold text-accent-soft underline-offset-4 outline-none focus-visible:underline"
          >
            Create an account
          </Link>
        </p>
      </div>
    </AuthLayout>
  )
}

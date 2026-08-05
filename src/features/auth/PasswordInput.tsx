import { forwardRef, useState, type InputHTMLAttributes } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { Input } from '@/components/ui/Input'
import { cn } from '@/utils/cn'

interface PasswordInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ label, error, hint, className, ...props }, ref) => {
    const [visible, setVisible] = useState(false)

    return (
      <div className="flex w-full flex-col gap-1.5">
        {label ? (
          <label className="text-[13px] font-medium text-secondary">{label}</label>
        ) : null}
        <div className="relative">
          <Input
            ref={ref}
            type={visible ? 'text' : 'password'}
            aria-invalid={Boolean(error)}
            className={cn('pr-12', className)}
            {...props}
          />
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            aria-label={visible ? 'Hide password' : 'Show password'}
            className="absolute right-1 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-lg text-muted transition-colors active:text-primary"
          >
            {visible ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>
        {error ? (
          <p className="text-[12px] font-medium text-danger">{error}</p>
        ) : hint ? (
          <p className="text-[12px] text-muted">{hint}</p>
        ) : null}
      </div>
    )
  },
)

PasswordInput.displayName = 'PasswordInput'

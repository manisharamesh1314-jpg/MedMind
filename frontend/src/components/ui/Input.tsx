import { forwardRef, type InputHTMLAttributes } from 'react'
import { cn } from '../../utils/cn'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  hint?: string
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, hint, error, id, ...props }, ref) => {
    const inputId = id ?? props.name

    return (
      <div className="space-y-1.5">
        {label ? (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-[var(--color-text-primary)]"
          >
            {label}
          </label>
        ) : null}

        <input
          ref={ref}
          id={inputId}
          className={cn(
            'h-11 w-full rounded-[var(--radius-md)] border bg-[var(--color-surface)] px-3.5 text-sm text-[var(--color-text-primary)] transition-colors placeholder:text-[var(--color-text-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-500)] focus-visible:ring-offset-2',
            error
              ? 'border-[var(--color-danger)]'
              : 'border-[var(--color-border)] hover:border-[var(--color-border-strong)] focus:border-[var(--color-brand-500)]',
            className,
          )}
          aria-invalid={Boolean(error)}
          aria-describedby={
            error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined
          }
          {...props}
        />

        {error ? (
          <p id={`${inputId}-error`} className="text-sm text-[var(--color-danger)]">
            {error}
          </p>
        ) : hint ? (
          <p id={`${inputId}-hint`} className="text-sm text-[var(--color-text-muted)]">
            {hint}
          </p>
        ) : null}
      </div>
    )
  },
)

Input.displayName = 'Input'

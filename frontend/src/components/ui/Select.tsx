import { forwardRef, type SelectHTMLAttributes } from 'react'
import { cn } from '../../utils/cn'

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  hint?: string
  error?: string
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, hint, error, id, children, ...props }, ref) => {
    const selectId = id ?? props.name

    return (
      <div className="space-y-1.5">
        {label ? (
          <label
            htmlFor={selectId}
            className="block text-sm font-medium text-[var(--color-text-primary)]"
          >
            {label}
          </label>
        ) : null}

        <select
          ref={ref}
          id={selectId}
          className={cn(
            'h-11 w-full rounded-[var(--radius-md)] border bg-[var(--color-surface)] px-3.5 text-sm text-[var(--color-text-primary)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-500)] focus-visible:ring-offset-2',
            error
              ? 'border-[var(--color-danger)]'
              : 'border-[var(--color-border)] hover:border-[var(--color-border-strong)] focus:border-[var(--color-brand-500)]',
            className,
          )}
          aria-invalid={Boolean(error)}
          aria-describedby={
            error ? `${selectId}-error` : hint ? `${selectId}-hint` : undefined
          }
          {...props}
        >
          {children}
        </select>

        {error ? (
          <p id={`${selectId}-error`} className="text-sm text-[var(--color-danger)]">{error}</p>
        ) : hint ? (
          <p id={`${selectId}-hint`} className="text-sm text-[var(--color-text-muted)]">{hint}</p>
        ) : null}
      </div>
    )
  },
)

Select.displayName = 'Select'

import { forwardRef, type TextareaHTMLAttributes } from 'react'
import { cn } from '../../utils/cn'

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  hint?: string
  error?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, hint, error, id, ...props }, ref) => {
    const textareaId = id ?? props.name

    return (
      <div className="space-y-1.5">
        {label ? (
          <label
            htmlFor={textareaId}
            className="block text-sm font-medium text-[var(--color-text-primary)]"
          >
            {label}
          </label>
        ) : null}

        <textarea
          ref={ref}
          id={textareaId}
          className={cn(
            'min-h-28 w-full rounded-[var(--radius-md)] border bg-[var(--color-surface)] px-3.5 py-3 text-sm text-[var(--color-text-primary)] transition-colors placeholder:text-[var(--color-text-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-500)] focus-visible:ring-offset-2',
            error
              ? 'border-[var(--color-danger)]'
              : 'border-[var(--color-border)] hover:border-[var(--color-border-strong)] focus:border-[var(--color-brand-500)]',
            className,
          )}
          aria-invalid={Boolean(error)}
          aria-describedby={
            error ? `${textareaId}-error` : hint ? `${textareaId}-hint` : undefined
          }
          {...props}
        />

        {error ? (
          <p id={`${textareaId}-error`} className="text-sm text-[var(--color-danger)]">{error}</p>
        ) : hint ? (
          <p id={`${textareaId}-hint`} className="text-sm text-[var(--color-text-muted)]">{hint}</p>
        ) : null}
      </div>
    )
  },
)

Textarea.displayName = 'Textarea'

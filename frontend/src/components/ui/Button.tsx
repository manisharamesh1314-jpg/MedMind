import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { cn } from '../../utils/cn'
import { Spinner } from './Spinner'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline'
type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  isLoading?: boolean
  fullWidth?: boolean
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-[var(--color-brand-600)] text-white hover:bg-[var(--color-brand-700)] border border-transparent shadow-sm',
  secondary:
    'bg-[var(--color-surface-muted)] text-[var(--color-text-primary)] hover:bg-[var(--color-background-subtle)] border border-[var(--color-border)]',
  ghost:
    'bg-transparent text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-muted)] border border-transparent',
  danger:
    'bg-[var(--color-danger)] text-white hover:opacity-90 border border-transparent shadow-sm',
  outline:
    'bg-transparent text-[var(--color-brand-700)] hover:bg-[var(--color-brand-50)] border border-[var(--color-brand-300)]',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-9 px-3 text-sm gap-1.5',
  md: 'h-10 px-4 text-sm gap-2',
  lg: 'h-11 px-5 text-base gap-2',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      fullWidth = false,
      disabled,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-[var(--radius-md)] font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-500)] focus-visible:ring-offset-2',
          variantClasses[variant],
          sizeClasses[size],
          fullWidth && 'w-full',
          className,
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? <Spinner size="sm" className="text-current" /> : null}
        {children}
      </button>
    )
  },
)

Button.displayName = 'Button'

import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '../../utils/cn'

type BadgeVariant = 'default' | 'brand' | 'success' | 'warning' | 'danger' | 'info'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode
  variant?: BadgeVariant
}

const variantClasses: Record<BadgeVariant, string> = {
  default:
    'bg-[var(--color-surface-muted)] text-[var(--color-text-secondary)] border-[var(--color-border)]',
  brand:
    'bg-[var(--color-brand-50)] text-[var(--color-brand-700)] border-[var(--color-brand-200)]',
  success:
    'bg-[var(--color-success-soft)] text-[var(--color-success)] border-transparent',
  warning:
    'bg-[var(--color-warning-soft)] text-[var(--color-warning)] border-transparent',
  danger:
    'bg-[var(--color-danger-soft)] text-[var(--color-danger)] border-transparent',
  info: 'bg-[var(--color-info-soft)] text-[var(--color-info)] border-transparent',
}

export function Badge({
  children,
  variant = 'default',
  className,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium',
        variantClasses[variant],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  )
}

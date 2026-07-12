import type { ReactNode } from 'react'
import { cn } from '../../utils/cn'
import { Button } from '../ui/Button'

interface EmptyStateProps {
  icon?: ReactNode
  title: string
  description: string
  actionLabel?: string
  onAction?: () => void
  className?: string
}

export function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center rounded-[var(--radius-lg)] border border-dashed border-[var(--color-border)] bg-[var(--color-surface-muted)] px-6 py-12 text-center',
        className,
      )}
    >
      {icon ? (
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-brand-50)] text-[var(--color-brand-700)]">
          {icon}
        </div>
      ) : null}

      <h3 className="text-base font-semibold text-[var(--color-text-primary)]">{title}</h3>
      <p className="mt-2 max-w-md text-sm text-[var(--color-text-muted)]">{description}</p>

      {actionLabel && onAction ? (
        <Button className="mt-5" onClick={onAction}>
          {actionLabel}
        </Button>
      ) : null}
    </div>
  )
}

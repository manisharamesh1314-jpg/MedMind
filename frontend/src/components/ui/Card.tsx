import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '../../utils/cn'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  padding?: 'none' | 'sm' | 'md' | 'lg'
  elevated?: boolean
}

const paddingClasses = {
  none: '',
  sm: 'p-4',
  md: 'p-5',
  lg: 'p-6',
}

export function Card({
  children,
  className,
  padding = 'md',
  elevated = false,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        'rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)]',
        elevated ? 'shadow-[var(--shadow-card)]' : 'shadow-[var(--shadow-soft)]',
        paddingClasses[padding],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

interface CardHeaderProps {
  title: string
  description?: string
  action?: ReactNode
}

export function CardHeader({ title, description, action }: CardHeaderProps) {
  return (
    <div className="mb-4 flex items-start justify-between gap-4">
      <div>
        <h3 className="text-base font-semibold text-[var(--color-text-primary)]">
          {title}
        </h3>
        {description ? (
          <p className="mt-1 text-sm text-[var(--color-text-muted)]">{description}</p>
        ) : null}
      </div>
      {action}
    </div>
  )
}

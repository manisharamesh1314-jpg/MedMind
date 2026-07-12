import type { HTMLAttributes, TdHTMLAttributes, ThHTMLAttributes } from 'react'
import { cn } from '../../utils/cn'

export function Table({ className, ...props }: HTMLAttributes<HTMLTableElement>) {
  return (
    <div className="w-full overflow-x-auto rounded-[var(--radius-lg)] border border-[var(--color-border)]">
      <table
        className={cn('w-full min-w-[640px] border-collapse text-left text-sm', className)}
        {...props}
      />
    </div>
  )
}

export function TableHead({ className, ...props }: HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <thead
      className={cn(
        'bg-[var(--color-surface-muted)] text-[var(--color-text-secondary)]',
        className,
      )}
      {...props}
    />
  )
}

export function TableBody({ className, ...props }: HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody className={cn('divide-y divide-[var(--color-border)]', className)} {...props} />
}

export function TableRow({ className, ...props }: HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr
      className={cn(
        'transition-colors hover:bg-[var(--color-surface-muted)]/70',
        className,
      )}
      {...props}
    />
  )
}

export function TableHeader({ className, ...props }: ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      className={cn(
        'px-4 py-3 text-xs font-semibold uppercase tracking-wide',
        className,
      )}
      {...props}
    />
  )
}

export function TableCell({ className, ...props }: TdHTMLAttributes<HTMLTableCellElement>) {
  return (
    <td
      className={cn('px-4 py-3.5 text-[var(--color-text-primary)]', className)}
      {...props}
    />
  )
}

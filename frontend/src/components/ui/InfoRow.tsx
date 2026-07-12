import type { ReactNode } from 'react'

interface InfoRowProps {
  label: string
  value: string | ReactNode
}

export function InfoRow({ label, value }: InfoRowProps) {
  return (
    <div className="flex justify-between border-b border-[var(--color-border)] pb-3 last:border-0 last:pb-0">
      <span className="text-sm text-[var(--color-text-muted)]">{label}</span>
      <span className="text-sm font-medium text-[var(--color-text-primary)]">{value}</span>
    </div>
  )
}

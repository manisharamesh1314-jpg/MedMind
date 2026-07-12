import { cn } from '../../utils/cn'
import { Button } from '../ui/Button'

interface ErrorStateProps {
  title?: string
  message: string
  onRetry?: () => void
  className?: string
}

export function ErrorState({
  title = 'Something went wrong',
  message,
  onRetry,
  className,
}: ErrorStateProps) {
  return (
    <div
      className={cn(
        'rounded-[var(--radius-lg)] border border-[var(--color-danger)]/20 bg-[var(--color-danger-soft)] px-6 py-8 text-center',
        className,
      )}
      role="alert"
    >
      <h3 className="text-base font-semibold text-[var(--color-danger)]">{title}</h3>
      <p className="mt-2 text-sm text-[var(--color-text-secondary)]">{message}</p>

      {onRetry ? (
        <Button variant="outline" className="mt-5" onClick={onRetry}>
          Try again
        </Button>
      ) : null}
    </div>
  )
}

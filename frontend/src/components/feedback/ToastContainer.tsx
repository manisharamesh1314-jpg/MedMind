import { useToast, type ToastVariant } from '../../context/ToastContext'
import { cn } from '../../utils/cn'

const variantClasses: Record<ToastVariant, string> = {
  success: 'border-[var(--color-success)]/20 bg-[var(--color-success-soft)]',
  error: 'border-[var(--color-danger)]/20 bg-[var(--color-danger-soft)]',
  warning: 'border-[var(--color-warning)]/20 bg-[var(--color-warning-soft)]',
  info: 'border-[var(--color-info)]/20 bg-[var(--color-info-soft)]',
}

export function ToastContainer() {
  const { toasts, dismissToast } = useToast()

  if (toasts.length === 0) {
    return null
  }

  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed right-4 top-4 z-[100] flex w-full max-w-sm flex-col gap-3"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={cn(
            'animate-slide-in-right pointer-events-auto rounded-[var(--radius-lg)] border px-4 py-3 shadow-[var(--shadow-card)]',
            variantClasses[toast.variant],
          )}
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-[var(--color-text-primary)]">
                {toast.title}
              </p>
              {toast.description ? (
                <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                  {toast.description}
                </p>
              ) : null}
            </div>
            <button
              type="button"
              onClick={() => dismissToast(toast.id)}
              className="text-sm text-[var(--color-text-muted)] transition hover:text-[var(--color-text-primary)]"
              aria-label="Dismiss notification"
            >
              ✕
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

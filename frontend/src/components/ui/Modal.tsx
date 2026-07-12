import { useEffect, type ReactNode } from 'react'
import { cn } from '../../utils/cn'
import { Button } from './Button'

interface ModalProps {
  open: boolean
  onClose: () => void
  title: string
  description?: string
  children: ReactNode
  footer?: ReactNode
  size?: 'sm' | 'md' | 'lg'
}

const sizeClasses = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
}

export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  size = 'md',
}: ModalProps) {
  useEffect(() => {
    if (!open) {
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Close modal overlay"
        className="absolute inset-0 bg-[#020617]/55 backdrop-blur-[2px]"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className={cn(
          'relative z-10 w-full animate-fade-in rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-elevated)]',
          sizeClasses[size],
        )}
      >
        <div className="border-b border-[var(--color-border)] px-6 py-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2
                id="modal-title"
                className="text-lg font-semibold text-[var(--color-text-primary)]"
              >
                {title}
              </h2>
              {description ? (
                <p className="mt-1 text-sm text-[var(--color-text-muted)]">{description}</p>
              ) : null}
            </div>
            <Button variant="ghost" size="sm" onClick={onClose} aria-label="Close">
              ✕
            </Button>
          </div>
        </div>

        <div className="px-6 py-5">{children}</div>

        {footer ? (
          <div className="flex items-center justify-end gap-3 border-t border-[var(--color-border)] px-6 py-4">
            {footer}
          </div>
        ) : null}
      </div>
    </div>
  )
}

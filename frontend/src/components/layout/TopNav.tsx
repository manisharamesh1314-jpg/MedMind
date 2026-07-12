import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'
import { useToast } from '../../context/ToastContext'
import { useProfile } from '../../hooks/useProfile'
import { useRecords } from '../../hooks/useRecords'
import { Button } from '../ui/Button'
import { cn } from '../../utils/cn'

interface Notification {
  id: string
  title: string
  message: string
  read: boolean
}

interface TopNavProps {
  onMenuClick: () => void
  title: string
  subtitle?: string
}

export function TopNav({ onMenuClick, title, subtitle }: TopNavProps) {
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const { showToast } = useToast()
  const navigate = useNavigate()
  const { profile } = useProfile()
  const { records } = useRecords()
  const [menuOpen, setMenuOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const notificationsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false)
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Generate sample notifications
  const notifications: Notification[] = [
    {
      id: '1',
      title: 'Welcome to MedMind',
      message: 'Get started by creating your health profile.',
      read: false,
    },
    ...(profile
      ? []
      : [
          {
            id: '2',
            title: 'Profile incomplete',
            message: 'Complete your health profile to get personalized insights.',
            read: false,
          },
        ]),
    {
      id: '3',
      title: `You have ${records.length} medical records`,
      message: records.length === 0
        ? 'Add your first medical record to get started.'
        : 'Keep your medical records up to date.',
      read: false,
    },
    {
      id: '4',
      title: 'Remember to update your health profile',
      message: 'Keep your information current for better care.',
      read: false,
    },
  ]

  const unreadCount = notifications.filter((n) => !n.read).length

  const handleMarkAllAsRead = () => {
    // In a real app, this would update the backend
    setNotificationsOpen(false)
  }

  const handleNotificationClick = () => {
    setNotificationsOpen((open) => !open)
    // Mark as read when opened
  }

  const initials = user?.full_name
    ?.split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <header className="sticky top-0 z-30 border-b border-[var(--color-border)] bg-[var(--color-surface)]/90 backdrop-blur-md">
      <div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={onMenuClick}
            aria-label="Open navigation menu"
          >
            <MenuIcon />
          </Button>

          <div>
            <h1 className="text-base font-semibold text-[var(--color-text-primary)] sm:text-lg">
              {title}
            </h1>
            {subtitle ? (
              <p className="text-xs text-[var(--color-text-muted)] sm:text-sm">{subtitle}</p>
            ) : null}
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="relative" ref={notificationsRef}>
            <Button
              variant="ghost"
              size="sm"
              aria-label="Notifications"
              className="relative"
              onClick={handleNotificationClick}
              aria-expanded={notificationsOpen}
            >
              <BellIcon />
              {unreadCount > 0 && (
                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[var(--color-brand-500)]" />
              )}
            </Button>

            {notificationsOpen ? (
              <div
                className="absolute right-0 mt-2 w-80 overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-card)] sm:w-96"
              >
                <div className="flex items-center justify-between border-b border-[var(--color-border)] px-4 py-3">
                  <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">
                    Notifications
                  </h3>
                  {unreadCount > 0 && (
                    <button
                      type="button"
                      onClick={handleMarkAllAsRead}
                      className="text-xs text-[var(--color-brand-600)] hover:text-[var(--color-brand-700)]"
                    >
                      Mark all as read
                    </button>
                  )}
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="px-4 py-8 text-center">
                      <p className="text-sm text-[var(--color-text-muted)]">No notifications</p>
                    </div>
                  ) : (
                    <div className="divide-y divide-[var(--color-border)]">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`px-4 py-3 transition hover:bg-[var(--color-surface-muted)] ${
                            !notification.read ? 'bg-[var(--color-brand-50)]' : ''
                          }`}
                        >
                          <p className="text-sm font-medium text-[var(--color-text-primary)]">
                            {notification.title}
                          </p>
                          <p className="mt-1 text-xs text-[var(--color-text-muted)]">
                            {notification.message}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ) : null}
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </Button>

          <div className="relative" ref={menuRef}>
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              className={cn(
                'flex items-center gap-2 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-muted)] px-2 py-1.5 transition hover:bg-[var(--color-background-subtle)]',
              )}
              aria-haspopup="menu"
              aria-expanded={menuOpen}
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-brand-500)] text-xs font-semibold text-white">
                {initials ?? 'U'}
              </span>
              <span className="hidden text-left sm:block">
                <span className="block text-sm font-medium text-[var(--color-text-primary)]">
                  {user?.full_name ?? 'User'}
                </span>
                <span className="block text-xs text-[var(--color-text-muted)]">
                  {user?.email ?? ''}
                </span>
              </span>
            </button>

            {menuOpen ? (
              <div
                role="menu"
                className="absolute right-0 mt-2 w-48 overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-card)]"
              >
                <button
                  type="button"
                  role="menuitem"
                  className="block w-full px-4 py-2.5 text-left text-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-muted)]"
                  onClick={() => {
                    setMenuOpen(false)
                    navigate('/profile')
                  }}
                >
                  View profile
                </button>
                <button
                  type="button"
                  role="menuitem"
                  className="block w-full px-4 py-2.5 text-left text-sm text-[var(--color-danger)] hover:bg-[var(--color-danger-soft)]"
                  onClick={() => {
                    setMenuOpen(false)
                    logout()
                    showToast({
                      title: 'Signed out',
                      description: 'You have been successfully signed out.',
                      variant: 'success',
                    })
                    navigate('/login')
                  }}
                >
                  Sign out
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  )
}

function MenuIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

function BellIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 4a4.5 4.5 0 0 0-4.5 4.5c0 4.5-1.5 6-1.5 6h12s-1.5-1.5-1.5-6A4.5 4.5 0 0 0 12 4z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path d="M10 18a2 2 0 0 0 4 0" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  )
}

function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.7" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M20 14.5A7.5 7.5 0 0 1 9.5 4 6.5 6.5 0 1 0 20 14.5z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  )
}

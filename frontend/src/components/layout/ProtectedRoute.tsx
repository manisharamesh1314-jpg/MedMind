import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { Spinner } from '../ui/Spinner'
import { useAuth } from '../../context/AuthContext'

export function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--color-background)]">
        <div className="flex flex-col items-center gap-3">
          <Spinner size="lg" className="text-[var(--color-brand-600)]" />
          <p className="text-sm text-[var(--color-text-muted)]">Loading your workspace…</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }

  return <Outlet />
}

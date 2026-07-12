import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface AuthLayoutProps {
  children: ReactNode
  title: string
  subtitle: string
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <div className="grid min-h-screen lg:grid-cols-2">
        <section className="relative hidden overflow-hidden bg-[var(--color-sidebar)] px-10 py-12 lg:flex lg:flex-col lg:justify-between">
          <div>
            <div className="mb-8 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-brand-500)] text-white">
                <span className="text-lg font-bold">M</span>
              </div>
              <div>
                <p className="text-lg font-semibold text-white">MedMind</p>
                <p className="text-sm text-[var(--color-sidebar-text)]">
                  Clinical intelligence platform
                </p>
              </div>
            </div>

            <h1 className="max-w-md text-4xl font-semibold leading-tight text-white">
              Modern healthcare operations, built for clinical teams.
            </h1>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-[var(--color-sidebar-text)]">
              Manage patient profiles, medical records, and care workflows in a secure,
              enterprise-ready environment.
            </p>
          </div>

          <div className="rounded-[var(--radius-xl)] border border-[var(--color-sidebar-border)] bg-[var(--color-sidebar-hover)] p-6">
            <p className="text-sm font-medium text-white">Trusted by care teams</p>
            <p className="mt-2 text-sm text-[var(--color-sidebar-text)]">
              HIPAA-conscious design patterns with role-based access and audit-friendly
              record management.
            </p>
          </div>

          <div className="pointer-events-none absolute -right-16 top-16 h-56 w-56 rounded-full bg-[var(--color-brand-500)]/20 blur-3xl" />
          <div className="pointer-events-none absolute bottom-10 right-10 h-40 w-40 rounded-full bg-[var(--color-accent)]/20 blur-3xl" />
        </section>

        <section className="flex items-center justify-center px-4 py-10 sm:px-8">
          <div className="w-full max-w-md animate-fade-in">
            <div className="mb-8 lg:hidden">
              <Link to="/login" className="inline-flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-brand-500)] text-white">
                  <span className="font-bold">M</span>
                </div>
                <span className="text-lg font-semibold text-[var(--color-text-primary)]">
                  MedMind
                </span>
              </Link>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-[var(--color-text-primary)]">
                {title}
              </h2>
              <p className="mt-2 text-sm text-[var(--color-text-muted)]">{subtitle}</p>
            </div>

            {children}
          </div>
        </section>
      </div>
    </div>
  )
}

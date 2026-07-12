import { useState, type ReactNode } from 'react'
import { Sidebar } from './Sidebar'
import { TopNav } from './TopNav'

interface AppLayoutProps {
  children: ReactNode
  title: string
  subtitle?: string
}

export function AppLayout({ children, title, subtitle }: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-[var(--color-background)]">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex min-h-screen flex-1 flex-col lg:pl-0">
        <TopNav
          title={title}
          subtitle={subtitle}
          onMenuClick={() => setSidebarOpen(true)}
        />

        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl animate-fade-in">{children}</div>
        </main>
      </div>
    </div>
  )
}

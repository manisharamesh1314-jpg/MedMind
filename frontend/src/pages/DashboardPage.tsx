import { Link } from 'react-router-dom'
import { AppLayout } from '../components/layout/AppLayout'
import { Button, Card, CardHeader, InfoRow, Skeleton } from '../components/ui'
import { useAuth } from '../context/AuthContext'
import { useProfile } from '../hooks/useProfile'
import { useRecords } from '../hooks/useRecords'
import type { ReactElement } from 'react'

export function DashboardPage() {
  const { user } = useAuth()
  const { profile, isLoading: profileLoading } = useProfile()
  const { records, isLoading: recordsLoading } = useRecords()

  const calculateProfileCompletion = () => {
    if (!profile) return 0
    const fields = [
      profile.date_of_birth,
      profile.gender,
      profile.blood_group,
      profile.height,
      profile.weight,
      profile.allergies,
      profile.chronic_diseases,
      profile.emergency_contact,
      profile.insurance_provider,
      profile.insurance_number,
    ]
    const filled = fields.filter((f) => f !== null && f !== undefined && f !== '').length
    return Math.round((filled / fields.length) * 100)
  }

  const profileCompletion = calculateProfileCompletion()
  const recentRecords = records.slice(0, 5)
  const recordStats = {
    total: records.length,
    byType: records.reduce(
      (acc, r) => {
        acc[r.record_type] = (acc[r.record_type] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    ),
  }

  return (
    <AppLayout
      title="Dashboard"
      subtitle={`Welcome back, ${user?.full_name?.split(' ')[0] || 'User'}`}
    >
      <div className="space-y-6">
        {/* Welcome Section */}
        <Card elevated>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">
                Your Health Overview
              </h2>
              <p className="mt-1 text-sm text-[var(--color-text-muted)]">
                Manage your health profile and medical records in one place
              </p>
            </div>
            <div className="flex gap-2">
              <Link to="/profile">
                <Button variant="secondary" size="sm">
                  Update Profile
                </Button>
              </Link>
              <Link to="/records">
                <Button size="sm">Add Record</Button>
              </Link>
            </div>
          </div>
        </Card>

        {/* Stats Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            label="Profile Completion"
            value={`${profileCompletion}%`}
            isLoading={profileLoading}
            color="brand"
          />
          <StatCard
            label="Total Records"
            value={recordStats.total.toString()}
            isLoading={recordsLoading}
            color="accent"
          />
          <StatCard
            label="Recent Visits"
            value={recentRecords.length.toString()}
            isLoading={recordsLoading}
            color="success"
          />
          <StatCard
            label="Active Alerts"
            value="0"
            isLoading={false}
            color="warning"
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Profile Status */}
          <Card elevated>
            <CardHeader
              title="Health Profile"
              description="Your personal health information"
            />
            {profileLoading ? (
              <div className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ) : profile ? (
              <div className="space-y-3">
                <InfoRow label="Blood Group" value={profile.blood_group} />
                <InfoRow label="Gender" value={profile.gender} />
                <InfoRow
                  label="Date of Birth"
                  value={new Date(profile.date_of_birth).toLocaleDateString()}
                />
                {profile.emergency_contact && (
                  <InfoRow label="Emergency Contact" value={profile.emergency_contact} />
                )}
                <div className="pt-3">
                  <Link to="/profile">
                    <Button variant="outline" size="sm" fullWidth>
                      View Full Profile
                    </Button>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="py-4">
                <p className="text-sm text-[var(--color-text-muted)]">
                  No health profile created yet
                </p>
                <Link to="/profile" className="mt-3 inline-block">
                  <Button size="sm" fullWidth>
                    Create Profile
                  </Button>
                </Link>
              </div>
            )}
          </Card>

          {/* Recent Records */}
          <Card className="lg:col-span-2" elevated>
            <CardHeader
              title="Recent Medical Records"
              description="Your latest healthcare visits and documents"
            />
            {recordsLoading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-3 w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : recentRecords.length > 0 ? (
              <div className="space-y-3">
                {recentRecords.map((record) => (
                  <div
                    key={record.id}
                    className="flex items-start gap-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-3 transition hover:border-[var(--color-border-strong)]"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-brand-50)] text-[var(--color-brand-600)]">
                      <RecordTypeIcon type={record.record_type} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[var(--color-text-primary)]">
                        {record.title}
                      </p>
                      <p className="text-xs text-[var(--color-text-muted)]">
                        {record.record_type}
                        {record.visit_date && (
                          <> • {new Date(record.visit_date).toLocaleDateString()}</>
                        )}
                      </p>
                      {record.hospital_name && (
                        <p className="text-xs text-[var(--color-text-secondary)]">
                          {record.hospital_name}
                        </p>
                      )}
                    </div>
                    <Link to={`/records`} className="shrink-0">
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </Link>
                  </div>
                ))}
                {records.length > 5 && (
                  <Link to="/records" className="block">
                    <Button variant="outline" size="sm" fullWidth>
                      View All Records ({records.length})
                    </Button>
                  </Link>
                )}
              </div>
            ) : (
              <div className="py-8 text-center">
                <p className="text-sm text-[var(--color-text-muted)]">
                  No medical records yet
                </p>
                <Link to="/records" className="mt-3 inline-block">
                  <Button size="sm">Add Your First Record</Button>
                </Link>
              </div>
            )}
          </Card>
        </div>

        {/* Quick Actions */}
        <Card elevated>
          <CardHeader title="Quick Actions" description="Common tasks and shortcuts" />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <QuickAction
              to="/profile"
              label="Update Profile"
              description="Edit your health information"
              icon="profile"
            />
            <QuickAction
              to="/records"
              label="Add Record"
              description="Upload medical documents"
              icon="add"
            />
            <QuickAction
              to="/records"
              label="View Records"
              description="Browse your medical history"
              icon="view"
            />
            <QuickAction
              to="/insights"
              label="AI Insights"
              description="View health analysis"
              icon="insights"
            />
          </div>
        </Card>

        {/* AI Insights - Demo/Preview */}
        <Card elevated>
          <CardHeader
            title="AI Health Insights"
            description="Demo preview of AI-powered health analysis"
          />
          <div className="space-y-4">
            <div className="flex items-center gap-2 rounded-lg bg-[var(--color-brand-50)] px-3 py-2">
              <span className="inline-flex items-center rounded-full bg-[var(--color-brand-500)] px-2 py-0.5 text-xs font-semibold text-white">
                DEMO
              </span>
              <span className="text-xs text-[var(--color-brand-700)]">
                This is a preview of future AI capabilities
              </span>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <InsightCard
                title="Health Trend Analysis"
                description="AI-powered analysis of your health patterns over time"
                status="Coming Soon"
                icon="trend"
              />
              <InsightCard
                title="Medication Interactions"
                description="Automatic detection of potential drug interactions"
                status="Coming Soon"
                icon="pill"
              />
              <InsightCard
                title="Preventive Care Alerts"
                description="Personalized recommendations based on your profile"
                status="Coming Soon"
                icon="shield"
              />
              <InsightCard
                title="Lab Result Insights"
                description="AI interpretation of laboratory test results"
                status="Coming Soon"
                icon="lab"
              />
            </div>

            <p className="text-xs text-[var(--color-text-muted)]">
              These features are in development and will be available once backend AI endpoints are implemented.
            </p>
          </div>
        </Card>
      </div>
    </AppLayout>
  )
}

function StatCard({
  label,
  value,
  isLoading,
  color,
}: {
  label: string
  value: string
  isLoading: boolean
  color: 'brand' | 'accent' | 'success' | 'warning'
}) {
  const colorClasses = {
    brand: 'text-[var(--color-brand-600)] bg-[var(--color-brand-50)]',
    accent: 'text-[var(--color-accent)] bg-[var(--color-accent-soft)]',
    success: 'text-[var(--color-success)] bg-[var(--color-success-soft)]',
    warning: 'text-[var(--color-warning)] bg-[var(--color-warning-soft)]',
  }

  return (
    <Card>
      <div className="space-y-2">
        <p className="text-sm text-[var(--color-text-muted)]">{label}</p>
        {isLoading ? (
          <Skeleton className="h-8 w-20" />
        ) : (
          <p className={`text-2xl font-semibold ${colorClasses[color]} rounded-lg px-2 py-1`}>
            {value}
          </p>
        )}
      </div>
    </Card>
  )
}

function RecordTypeIcon({ type }: { type: string }) {
  const icons: Record<string, ReactElement> = {
    'Check-up': (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 4a4 4 0 0 0-4 4v6a4 4 0 0 0 8 0V8a4 4 0 0 0-4-4z"
          stroke="currentColor"
          strokeWidth="1.7"
        />
        <path d="M12 16v4M8 20h8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    ),
    'Lab Result': (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M9 17v-6m3 6v-4m3 4V9M4 21h16M4 3v18M20 3v18"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
      </svg>
    ),
    'Prescription': (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M8 4h8a2 2 0 0 1 2 2v14l-4-2-4 2-4-2-4 2V6a2 2 0 0 1 2-2z"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
        <path d="M10 9h4M10 13h4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    ),
    'Imaging': (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.7" />
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.7" />
      </svg>
    ),
  }

  return icons[type] || icons['Check-up']
}

function QuickAction({
  to,
  label,
  description,
  icon,
}: {
  to: string
  label: string
  description: string
  icon: string
}) {
  const icons: Record<string, ReactElement> = {
    profile: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM5 20a7 7 0 0 1 14 0"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
      </svg>
    ),
    add: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    ),
    view: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="1.7" />
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.7" />
      </svg>
    ),
    emergency: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 2L4 7v10l8 5 8-5V7l-8-5z"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
        <path d="M12 8v4M12 15h.01" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    ),
    insights: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 2L4 7v10l8 5 8-5V7l-8-5z"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
        <path d="M12 8v8M9 10.5h6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    ),
  }

  return (
    <Link to={to}>
      <div className="flex items-start gap-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-4 transition hover:border-[var(--color-border-strong)] hover:bg-[var(--color-surface)]">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--color-brand-50)] text-[var(--color-brand-600)]">
          {icons[icon]}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-[var(--color-text-primary)]">{label}</p>
          <p className="text-xs text-[var(--color-text-muted)]">{description}</p>
        </div>
      </div>
    </Link>
  )
}

function InsightCard({
  title,
  description,
  status,
  icon,
}: {
  title: string
  description: string
  status: string
  icon: string
}) {
  const icons: Record<string, ReactElement> = {
    trend: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M3 17l6-6 4 4 8-8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    pill: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M10.5 20.5l10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    shield: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    lab: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M9 17v-6m3 6v-4m3 4V9M4 21h16M4 3v18M20 3v18" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    ),
  }

  return (
    <div className="flex items-start gap-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--color-accent-soft)] text-[var(--color-accent)]">
        {icons[icon]}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium text-[var(--color-text-primary)]">{title}</p>
          <span className="inline-flex items-center rounded-full bg-[var(--color-surface)] px-2 py-0.5 text-xs font-medium text-[var(--color-text-muted)]">
            {status}
          </span>
        </div>
        <p className="mt-1 text-xs text-[var(--color-text-muted)]">{description}</p>
      </div>
    </div>
  )
}

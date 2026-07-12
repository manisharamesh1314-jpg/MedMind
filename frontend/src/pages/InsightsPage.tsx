import { useState } from 'react'
import { AppLayout } from '../components/layout/AppLayout'
import { Button, Card, CardHeader, Skeleton } from '../components/ui'
import { useProfile } from '../hooks/useProfile'
import { useRecords } from '../hooks/useRecords'

export function InsightsPage() {
  const { profile, isLoading: profileLoading } = useProfile()
  const { records, isLoading: recordsLoading } = useRecords()
  const [hydrationCount, setHydrationCount] = useState(5)

  if (profileLoading || recordsLoading) {
    return (
      <AppLayout
        title="AI Health Insights"
        subtitle="Demo preview of AI-powered health analysis"
      >
        <div className="space-y-6">
          <Card elevated>
            <div className="p-6 space-y-3">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-32" />
            </div>
          </Card>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} elevated>
                <div className="p-6 space-y-3">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-8 w-16" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </AppLayout>
    )
  }

  // Calculate BMI from profile data
  const calculateBMI = () => {
    if (profile?.height && profile?.weight) {
      const heightInMeters = profile.height / 100
      const bmi = profile.weight / (heightInMeters * heightInMeters)
      return bmi.toFixed(1)
    }
    return null
  }

  const bmi = calculateBMI()
  const bmiCategory = bmi ? getBMICategory(parseFloat(bmi)) : null

  function getBMICategory(bmi: number): string {
    if (bmi < 18.5) return 'Underweight'
    if (bmi < 25) return 'Normal'
    if (bmi < 30) return 'Overweight'
    return 'Obese'
  }

  const healthScore = 78

  return (
    <AppLayout
      title="AI Health Insights"
      subtitle="Demo preview of AI-powered health analysis"
    >
      <div className="space-y-6">
        {/* Demo Banner */}
        <Card elevated>
          <div className="flex items-center gap-3 rounded-lg bg-[var(--color-brand-50)] px-4 py-3">
            <span className="inline-flex items-center rounded-full bg-[var(--color-brand-500)] px-3 py-1 text-xs font-semibold text-white">
              DEMO
            </span>
            <span className="text-sm text-[var(--color-brand-700)]">
              This is a preview of AI capabilities. All insights are simulated for demonstration purposes.
            </span>
          </div>
        </Card>

        {/* Health Score */}
        <Card elevated>
          <CardHeader title="Health Score" description="Overall wellness assessment" />
          <div className="p-6">
            <div className="flex items-center gap-8">
              <div className="relative">
                <svg width="120" height="120" viewBox="0 0 120 120">
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    fill="none"
                    stroke="var(--color-border)"
                    strokeWidth="8"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    fill="none"
                    stroke="var(--color-brand-500)"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={314}
                    strokeDashoffset={314 - (314 * healthScore) / 100}
                    transform="rotate(-90 60 60)"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-bold text-[var(--color-text-primary)]">
                    {healthScore}
                  </span>
                </div>
              </div>
              <div className="flex-1">
                <p className="text-lg font-medium text-[var(--color-text-primary)]">Good Health</p>
                <p className="mt-1 text-sm text-[var(--color-text-muted)]">
                  Your health score is based on your profile completeness, medical records, and preventive care status.
                </p>
                <div className="mt-3 flex gap-2">
                  <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                    Profile: 100%
                  </span>
                  <span className="inline-flex items-center rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">
                    Records: {records.length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Health Risk Summary */}
        <Card elevated>
          <CardHeader title="Health Risk Summary" description="AI-assisted risk assessment" />
          <div className="p-6">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <RiskCard
                label="Cardiovascular"
                level="Low"
                color="green"
                value="12%"
              />
              <RiskCard
                label="Diabetes"
                level="Low"
                color="green"
                value="8%"
              />
              <RiskCard
                label="Respiratory"
                level="Moderate"
                color="yellow"
                value="24%"
              />
              <RiskCard
                label="Mental Health"
                level="Low"
                color="green"
                value="15%"
              />
            </div>
          </div>
        </Card>

        {/* Heart Health Card */}
        <Card elevated>
          <CardHeader title="Heart Health" description="Cardiovascular wellness metrics" />
          <div className="p-6">
            <div className="grid gap-6 sm:grid-cols-3">
              <HeartMetric
                label="Resting Heart Rate"
                value="72 bpm"
                status="Normal"
                color="green"
              />
              <HeartMetric
                label="Blood Pressure"
                value="120/80"
                status="Optimal"
                color="green"
              />
              <HeartMetric
                label="Cholesterol"
                value="185 mg/dL"
                status="Normal"
                color="green"
              />
            </div>
            <div className="mt-4 p-4 rounded-lg bg-[var(--color-success-soft)] border border-[var(--color-success)]">
              <p className="text-sm font-medium text-[var(--color-success)]">
                ✓ Your heart health indicators are within healthy ranges
              </p>
            </div>
          </div>
        </Card>

        {/* Preventive Care Recommendations */}
        <Card elevated>
          <CardHeader
            title="Preventive Care Recommendations"
            description="AI-suggested health actions"
          />
          <div className="p-6">
            <div className="space-y-3">
              <RecommendationCard
                title="Annual Health Check-up"
                description="Schedule your yearly physical examination"
                priority="high"
              />
              <RecommendationCard
                title="Blood Pressure Monitoring"
                description="Check your blood pressure weekly"
                priority="medium"
              />
              <RecommendationCard
                title="Vaccination Update"
                description="Review your immunization status"
                priority="low"
              />
              <RecommendationCard
                title="Dental Check-up"
                description="Visit your dentist every 6 months"
                priority="medium"
              />
            </div>
          </div>
        </Card>

        {/* Exercise Recommendation */}
        <Card elevated>
          <CardHeader title="Exercise Recommendation" description="Personalized activity suggestions" />
          <div className="p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[var(--color-brand-50)] text-[var(--color-brand-600)]">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">30 Minutes Daily</h3>
                <p className="mt-1 text-sm text-[var(--color-text-muted)]">
                  Based on your profile, aim for 150 minutes of moderate exercise per week. Start with brisk walking and gradually increase intensity.
                </p>
                <div className="mt-3 flex gap-2">
                  <span className="inline-flex items-center rounded-full bg-[var(--color-brand-50)] px-3 py-1 text-xs font-medium text-[var(--color-brand-700)]">
                    Walking
                  </span>
                  <span className="inline-flex items-center rounded-full bg-[var(--color-brand-50)] px-3 py-1 text-xs font-medium text-[var(--color-brand-700)]">
                    Swimming
                  </span>
                  <span className="inline-flex items-center rounded-full bg-[var(--color-brand-50)] px-3 py-1 text-xs font-medium text-[var(--color-brand-700)]">
                    Cycling
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Nutrition Recommendation */}
        <Card elevated>
          <CardHeader title="Nutrition Recommendation" description="Dietary guidance for optimal health" />
          <div className="p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2a5 5 0 0 1 5 5v1a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5h5z" stroke="currentColor" strokeWidth="1.7" />
                  <path d="M12 13v9M8 17h8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">Balanced Diet Focus</h3>
                <p className="mt-1 text-sm text-[var(--color-text-muted)]">
                  Increase intake of vegetables, fruits, and whole grains. Limit processed foods and added sugars. Stay hydrated with 8 glasses of water daily.
                </p>
                <div className="mt-3 grid grid-cols-4 gap-2">
                  <div className="text-center">
                    <div className="h-2 w-full rounded-full bg-green-500"></div>
                    <p className="mt-1 text-xs text-[var(--color-text-muted)]">Vegetables</p>
                  </div>
                  <div className="text-center">
                    <div className="h-2 w-full rounded-full bg-orange-500"></div>
                    <p className="mt-1 text-xs text-[var(--color-text-muted)]">Fruits</p>
                  </div>
                  <div className="text-center">
                    <div className="h-2 w-full rounded-full bg-amber-500"></div>
                    <p className="mt-1 text-xs text-[var(--color-text-muted)]">Grains</p>
                  </div>
                  <div className="text-center">
                    <div className="h-2 w-full rounded-full bg-red-500"></div>
                    <p className="mt-1 text-xs text-[var(--color-text-muted)]">Protein</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Sleep Recommendation */}
        <Card elevated>
          <CardHeader title="Sleep Recommendation" description="Sleep quality and duration guidance" />
          <div className="p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" strokeWidth="1.7" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">7-9 Hours Nightly</h3>
                <p className="mt-1 text-sm text-[var(--color-text-muted)]">
                  Maintain a consistent sleep schedule. Avoid screens 1 hour before bed and create a dark, quiet sleep environment.
                </p>
                <div className="mt-3 flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-[var(--color-success)]">
                      <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="text-xs text-[var(--color-text-muted)]">Consistent bedtime</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-[var(--color-success)]">
                      <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="text-xs text-[var(--color-text-muted)]">Dark room</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-[var(--color-success)]">
                      <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="text-xs text-[var(--color-text-muted)]">No caffeine after 2pm</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* BMI Card */}
        {bmi && (
          <Card elevated>
            <CardHeader title="Body Mass Index" description="Based on your profile data" />
            <div className="p-6">
              <div className="flex items-center gap-6">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[var(--color-brand-50)]">
                  <span className="text-2xl font-bold text-[var(--color-brand-600)]">{bmi}</span>
                </div>
                <div>
                  <p className="text-lg font-medium text-[var(--color-text-primary)]">{bmiCategory}</p>
                  <p className="mt-1 text-sm text-[var(--color-text-muted)]">
                    Height: {profile?.height} cm | Weight: {profile?.weight} kg
                  </p>
                </div>
              </div>
              <div className="mt-4 h-2 rounded-full bg-[var(--color-border)]">
                <div
                  className="h-2 rounded-full bg-gradient-to-r from-blue-400 via-green-400 via-yellow-400 to-red-400"
                  style={{ width: '100%' }}
                />
              </div>
              <div className="mt-2 flex justify-between text-xs text-[var(--color-text-muted)]">
                <span>Underweight</span>
                <span>Normal</span>
                <span>Overweight</span>
                <span>Obese</span>
              </div>
            </div>
          </Card>
        )}

        {/* Hydration Tracker */}
        <Card elevated>
          <CardHeader title="Hydration Tracker" description="Daily water intake" />
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-blue-600">
                    <path d="M12 2.5L4 9v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9l-8-6.5z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <p className="text-lg font-medium text-[var(--color-text-primary)]">
                    {hydrationCount} / 8 glasses
                  </p>
                  <p className="text-sm text-[var(--color-text-muted)]">Daily goal: 8 glasses</p>
                </div>
              </div>
              <Button
                size="sm"
                onClick={() => setHydrationCount((prev) => Math.min(prev + 1, 8))}
                disabled={hydrationCount >= 8}
              >
                + Add Glass
              </Button>
            </div>
            <div className="mt-4 flex gap-1">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className={`h-2 flex-1 rounded-full transition ${
                    i < hydrationCount ? 'bg-blue-500' : 'bg-[var(--color-border)]'
                  }`}
                />
              ))}
            </div>
          </div>
        </Card>

        {/* Medication Reminders */}
        <Card elevated>
          <CardHeader title="Medication Reminders" description="Upcoming medications" />
          <div className="p-6">
            <div className="space-y-3">
              <MedicationCard
                name="Vitamin D3"
                dosage="1000 IU"
                time="8:00 AM"
                taken
              />
              <MedicationCard
                name="Omega-3"
                dosage="1000mg"
                time="12:00 PM"
                taken
              />
              <MedicationCard
                name="Multivitamin"
                dosage="1 tablet"
                time="6:00 PM"
              />
            </div>
          </div>
        </Card>

        {/* Upcoming Appointments */}
        <Card elevated>
          <CardHeader title="Upcoming Appointments" description="Scheduled visits" />
          <div className="p-6">
            <div className="space-y-3">
              <AppointmentCard
                doctor="Dr. Sarah Johnson"
                specialty="General Physician"
                date="July 15, 2026"
                time="10:00 AM"
              />
              <AppointmentCard
                doctor="Dr. Michael Chen"
                specialty="Cardiologist"
                date="August 2, 2026"
                time="2:30 PM"
              />
            </div>
          </div>
        </Card>

        {/* Health Trends */}
        <Card elevated>
          <CardHeader title="Health Trends" description="Your health metrics over time" />
          <div className="p-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <TrendCard
                title="Weight Trend"
                data={[70, 69, 70, 69, 68, 69, 68]}
                color="var(--color-brand-500)"
              />
              <TrendCard
                title="Activity Level"
                data={[60, 75, 80, 70, 85, 90, 75]}
                color="var(--color-accent)"
              />
            </div>
          </div>
        </Card>
      </div>
    </AppLayout>
  )
}

function RiskCard({ label, level, color, value }: { label: string; level: string; color: string; value?: string }) {
  const colorClasses = {
    green: 'bg-green-100 text-green-700 border-green-200',
    yellow: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    red: 'bg-red-100 text-red-700 border-red-200',
  }

  return (
    <div className={`rounded-lg border p-4 ${colorClasses[color as keyof typeof colorClasses]}`}>
      <p className="text-xs font-medium uppercase opacity-70">{label}</p>
      <p className="mt-1 text-lg font-semibold">{level}</p>
      {value && <p className="mt-1 text-xs opacity-70">{value}</p>}
    </div>
  )
}

function HeartMetric({ label, value, status, color }: { label: string; value: string; status: string; color: string }) {
  const colorClasses = {
    green: 'text-[var(--color-success)]',
    yellow: 'text-[var(--color-warning)]',
    red: 'text-[var(--color-danger)]',
  }

  return (
    <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-4">
      <p className="text-xs text-[var(--color-text-muted)]">{label}</p>
      <p className="mt-2 text-xl font-semibold text-[var(--color-text-primary)]">{value}</p>
      <p className={`mt-1 text-xs font-medium ${colorClasses[color as keyof typeof colorClasses]}`}>{status}</p>
    </div>
  )
}

function RecommendationCard({
  title,
  description,
  priority,
}: {
  title: string
  description: string
  priority: string
}) {
  const priorityColors = {
    high: 'bg-red-100 text-red-700',
    medium: 'bg-yellow-100 text-yellow-700',
    low: 'bg-green-100 text-green-700',
  }

  return (
    <div className="flex items-start gap-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--color-brand-50)] text-[var(--color-brand-600)]">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium text-[var(--color-text-primary)]">{title}</p>
          <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${priorityColors[priority as keyof typeof priorityColors]}`}>
            {priority}
          </span>
        </div>
        <p className="mt-1 text-xs text-[var(--color-text-muted)]">{description}</p>
      </div>
    </div>
  )
}

function MedicationCard({
  name,
  dosage,
  time,
  taken,
}: {
  name: string
  dosage: string
  time: string
  taken?: boolean
}) {
  return (
    <div className={`flex items-center justify-between rounded-lg border p-3 ${taken ? 'border-green-200 bg-green-50' : 'border-[var(--color-border)] bg-[var(--color-surface-muted)]'}`}>
      <div>
        <p className="text-sm font-medium text-[var(--color-text-primary)]">{name}</p>
        <p className="text-xs text-[var(--color-text-muted)]">
          {dosage} • {time}
        </p>
      </div>
      {taken ? (
        <span className="inline-flex items-center rounded-full bg-green-500 px-2 py-1 text-xs font-medium text-white">
          Taken
        </span>
      ) : (
        <Button size="sm" variant="outline">
          Mark Taken
        </Button>
      )}
    </div>
  )
}

function AppointmentCard({
  doctor,
  specialty,
  date,
  time,
}: {
  doctor: string
  specialty: string
  date: string
  time: string
}) {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--color-accent-soft)] text-[var(--color-accent)]">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.7" />
          <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        </svg>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-[var(--color-text-primary)]">{doctor}</p>
        <p className="text-xs text-[var(--color-text-muted)]">{specialty}</p>
        <p className="mt-1 text-xs text-[var(--color-text-secondary)]">
          {date} at {time}
        </p>
      </div>
    </div>
  )
}

function TrendCard({
  title,
  data,
  color,
}: {
  title: string
  data: number[]
  color: string
}) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1

  const points = data
    .map((value, index) => {
      const x = (index / (data.length - 1)) * 100
      const y = 100 - ((value - min) / range) * 80 - 10
      return `${x},${y}`
    })
    .join(' ')

  return (
    <div>
      <p className="text-sm font-medium text-[var(--color-text-primary)]">{title}</p>
      <div className="mt-3 h-32">
        <svg viewBox="0 0 100 100" className="h-full w-full">
          <polyline
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={points}
          />
          {data.map((value, index) => {
            const x = (index / (data.length - 1)) * 100
            const y = 100 - ((value - min) / range) * 80 - 10
            return (
              <circle
                key={index}
                cx={x}
                cy={y}
                r="3"
                fill={color}
              />
            )
          })}
        </svg>
      </div>
      <div className="mt-2 flex justify-between text-xs text-[var(--color-text-muted)]">
        <span>Mon</span>
        <span>Tue</span>
        <span>Wed</span>
        <span>Thu</span>
        <span>Fri</span>
        <span>Sat</span>
        <span>Sun</span>
      </div>
    </div>
  )
}

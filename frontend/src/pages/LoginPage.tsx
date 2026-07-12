import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { AuthLayout } from '../components/layout/AuthLayout'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { Input } from '../components/ui/Input'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import type { UserLogin } from '../types'

export function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()
  const { showToast } = useToast()

  const [formData, setFormData] = useState<UserLogin>({
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState<Partial<Record<keyof UserLogin, string>>>({})
  const [isLoading, setIsLoading] = useState(false)

  const from = (location.state as { from?: string })?.from || '/dashboard'

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof UserLogin, string>> = {}

    if (!formData.email) {
      newErrors.email = 'Please enter your email address'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.password) {
      newErrors.password = 'Please enter your password'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    try {
      await login(formData)
      showToast({
        title: 'Welcome back!',
        description: 'You have successfully signed in.',
        variant: 'success',
      })
      navigate(from, { replace: true })
    } catch (error) {
      showToast({
        title: 'Sign in failed',
        description: 'Please check your credentials and try again.',
        variant: 'error',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (field: keyof UserLogin) => (value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  return (
    <AuthLayout
      title="Sign in to MedMind"
      subtitle="Enter your credentials to access your healthcare dashboard"
    >
      <Card>
        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Email address"
            type="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={(e) => handleChange('email')(e.target.value)}
            error={errors.email}
            autoComplete="email"
            required
          />

          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={(e) => handleChange('password')(e.target.value)}
            error={errors.password}
            autoComplete="current-password"
            required
          />

          <Button
            type="submit"
            fullWidth
            isLoading={isLoading}
            className="mt-6"
          >
            Sign in
          </Button>

          <p className="text-center text-sm text-[var(--color-text-muted)]">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="font-medium text-[var(--color-brand-600)] hover:text-[var(--color-brand-700)]"
            >
              Create account
            </Link>
          </p>
        </form>
      </Card>
    </AuthLayout>
  )
}

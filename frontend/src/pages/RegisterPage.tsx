import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthLayout } from '../components/layout/AuthLayout'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { Input } from '../components/ui/Input'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import type { UserCreate } from '../types'

export function RegisterPage() {
  const navigate = useNavigate()
  const { register } = useAuth()
  const { showToast } = useToast()

  const [formData, setFormData] = useState<UserCreate>({
    full_name: '',
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState<Partial<Record<keyof UserCreate, string>>>({})
  const [isLoading, setIsLoading] = useState(false)

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof UserCreate, string>> = {}

    if (!formData.full_name.trim()) {
      newErrors.full_name = 'Please enter your full name'
    } else if (formData.full_name.trim().length < 2) {
      newErrors.full_name = 'Full name must be at least 2 characters'
    }

    if (!formData.email) {
      newErrors.email = 'Please enter your email address'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.password) {
      newErrors.password = 'Please enter a password'
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
      await register(formData)
      showToast({
        title: 'Account created!',
        description: 'Please sign in with your new account.',
        variant: 'success',
      })
      navigate('/login', { replace: true })
    } catch (error) {
      showToast({
        title: 'Registration failed',
        description: 'Please check your information and try again.',
        variant: 'error',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (field: keyof UserCreate) => (value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Join MedMind to manage your healthcare information"
    >
      <Card>
        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Full name"
            type="text"
            placeholder="John Doe"
            value={formData.full_name}
            onChange={(e) => handleChange('full_name')(e.target.value)}
            error={errors.full_name}
            autoComplete="name"
            required
          />

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
            autoComplete="new-password"
            hint="Must be at least 6 characters"
            required
          />

          <Button
            type="submit"
            fullWidth
            isLoading={isLoading}
            className="mt-6"
          >
            Create account
          </Button>

          <p className="text-center text-sm text-[var(--color-text-muted)]">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-medium text-[var(--color-brand-600)] hover:text-[var(--color-brand-700)]"
            >
              Sign in
            </Link>
          </p>
        </form>
      </Card>
    </AuthLayout>
  )
}

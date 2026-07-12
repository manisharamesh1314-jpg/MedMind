import { useEffect, useState } from 'react'
import { AppLayout } from '../components/layout/AppLayout'
import { Button, Card, CardHeader, InfoRow, Input, Select, Skeleton, Textarea } from '../components/ui'
import { useProfile } from '../hooks/useProfile'
import { profileApi } from '../api'
import { useToast } from '../context/ToastContext'
import type { HealthProfileCreate } from '../types'

export function ProfilePage() {
  const { profile, isLoading, error, isNotFound, refetch } = useProfile()
  const { showToast } = useToast()
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState<HealthProfileCreate>({
    date_of_birth: '',
    gender: '',
    blood_group: '',
    height: null,
    weight: null,
    allergies: '',
    chronic_diseases: '',
    emergency_contact: '',
    insurance_provider: '',
    insurance_number: '',
  })
  const [errors, setErrors] = useState<Partial<Record<keyof HealthProfileCreate, string>>>({})

  const isCreating = isNotFound || (!profile && !isLoading && !error)

  // Auto-show create form when profile doesn't exist
  useEffect(() => {
    if (isCreating) {
      setIsEditing(true)
    }
  }, [isCreating])

  const initializeForm = () => {
    if (profile) {
      setFormData({
        date_of_birth: profile.date_of_birth,
        gender: profile.gender,
        blood_group: profile.blood_group,
        height: profile.height,
        weight: profile.weight,
        allergies: profile.allergies || '',
        chronic_diseases: profile.chronic_diseases || '',
        emergency_contact: profile.emergency_contact || '',
        insurance_provider: profile.insurance_provider || '',
        insurance_number: profile.insurance_number || '',
      })
    }
  }

  const handleEdit = () => {
    initializeForm()
    setIsEditing(true)
    setErrors({})
  }

  const handleCancel = () => {
    setIsEditing(false)
    setErrors({})
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof HealthProfileCreate, string>> = {}

    if (!formData.date_of_birth) {
      newErrors.date_of_birth = 'Please enter your date of birth'
    } else {
      const dob = new Date(formData.date_of_birth)
      const today = new Date()
      const minDate = new Date(today.getFullYear() - 120, today.getMonth(), today.getDate())
      
      if (dob > today) {
        newErrors.date_of_birth = 'Date of birth cannot be in the future'
      } else if (dob < minDate) {
        newErrors.date_of_birth = 'Please enter a valid date of birth'
      }
    }

    if (!formData.gender) {
      newErrors.gender = 'Please select your gender'
    }

    if (!formData.blood_group) {
      newErrors.blood_group = 'Please select your blood group'
    }

    if (formData.height !== null && formData.height !== undefined) {
      if (formData.height <= 0) {
        newErrors.height = 'Height must be greater than 0'
      } else if (formData.height > 300) {
        newErrors.height = 'Please enter a valid height (cm)'
      }
    }

    if (formData.weight !== null && formData.weight !== undefined) {
      if (formData.weight <= 0) {
        newErrors.weight = 'Weight must be greater than 0'
      } else if (formData.weight > 500) {
        newErrors.weight = 'Please enter a valid weight (kg)'
      }
    }

    if (formData.emergency_contact && formData.emergency_contact.length < 5) {
      newErrors.emergency_contact = 'Please provide a valid emergency contact'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSaving(true)
    try {
      const submitData = {
        ...formData,
        height: formData.height || null,
        weight: formData.weight || null,
        allergies: formData.allergies || null,
        chronic_diseases: formData.chronic_diseases || null,
        emergency_contact: formData.emergency_contact || null,
        insurance_provider: formData.insurance_provider || null,
        insurance_number: formData.insurance_number || null,
      }

      if (profile) {
        await profileApi.update(submitData)
        showToast({
          title: 'Profile updated',
          description: 'Your health profile has been updated successfully.',
          variant: 'success',
        })
      } else {
        await profileApi.create(submitData)
        showToast({
          title: 'Profile created',
          description: 'Your health profile has been created successfully.',
          variant: 'success',
        })
      }

      await refetch()
      setIsEditing(false)
      setErrors({})
    } catch (err) {
      const axiosError = err as any
      let errorMessage = 'Please check your information and try again.'
      
      if (axiosError?.response?.status === 401) {
        errorMessage = 'Your session has expired. Please sign in again.'
      } else if (axiosError?.response?.status === 403) {
        errorMessage = 'You do not have permission to perform this action.'
      } else if (!axiosError?.response) {
        errorMessage = 'Network error. Please check your connection and try again.'
      }
      
      showToast({
        title: profile ? 'Update failed' : 'Creation failed',
        description: errorMessage,
        variant: 'error',
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleChange = (field: keyof HealthProfileCreate) => (value: string | number | null) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  if (isLoading) {
    return (
      <AppLayout title="Health Profile" subtitle="Loading your health information">
        <div className="grid gap-6 lg:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} elevated>
              <div className="space-y-4 p-6">
                <Skeleton className="h-6 w-1/3" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </Card>
          ))}
        </div>
      </AppLayout>
    )
  }

  if (error && !isNotFound) {
    return (
      <AppLayout title="Health Profile" subtitle="Unable to load your profile">
        <Card elevated>
          <div className="p-6 text-center">
            <p className="text-sm text-[var(--color-text-muted)]">
              Failed to load your health profile. Please try again.
            </p>
            <Button onClick={() => refetch()} className="mt-4">
              Retry
            </Button>
          </div>
        </Card>
      </AppLayout>
    )
  }

  return (
    <AppLayout
      title="Health Profile"
      subtitle={isCreating ? 'Create your health profile' : 'Manage your health information'}
    >
      <div className="space-y-6">
        {/* Personal Information */}
        <Card elevated>
          <CardHeader
            title="Personal Information"
            description="Basic demographic information"
          />
          <div className="p-6">
            {isEditing || isCreating ? (
              <div className="grid gap-4 sm:grid-cols-2">
                <Input
                  label="Date of Birth"
                  type="date"
                  value={formData.date_of_birth}
                  onChange={(e) => handleChange('date_of_birth')(e.target.value)}
                  error={errors.date_of_birth}
                  required
                />
                <Select
                  label="Gender"
                  value={formData.gender}
                  onChange={(e) => handleChange('gender')(e.target.value)}
                  error={errors.gender}
                  required
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </Select>
                <Select
                  label="Blood Group"
                  value={formData.blood_group}
                  onChange={(e) => handleChange('blood_group')(e.target.value)}
                  error={errors.blood_group}
                  required
                >
                  <option value="">Select blood group</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </Select>
              </div>
            ) : profile ? (
              <div className="grid gap-4 sm:grid-cols-3">
                <InfoRow label="Date of Birth" value={new Date(profile.date_of_birth).toLocaleDateString()} />
                <InfoRow label="Gender" value={profile.gender} />
                <InfoRow label="Blood Group" value={profile.blood_group} />
              </div>
            ) : null}
          </div>
        </Card>

        {/* Health Information */}
        <Card elevated>
          <CardHeader
            title="Health Information"
            description="Physical measurements and health conditions"
          />
          <div className="p-6">
            {isEditing || isCreating ? (
              <div className="grid gap-4 sm:grid-cols-2">
                <Input
                  label="Height (cm)"
                  type="number"
                  placeholder="175"
                  value={formData.height || ''}
                  onChange={(e) => handleChange('height')(e.target.value ? Number(e.target.value) : null)}
                  error={errors.height}
                />
                <Input
                  label="Weight (kg)"
                  type="number"
                  placeholder="70"
                  value={formData.weight || ''}
                  onChange={(e) => handleChange('weight')(e.target.value ? Number(e.target.value) : null)}
                  error={errors.weight}
                />
                <Textarea
                  label="Allergies"
                  placeholder="List any known allergies..."
                  value={formData.allergies || ''}
                  onChange={(e) => handleChange('allergies')(e.target.value)}
                  className="sm:col-span-2"
                />
                <Textarea
                  label="Chronic Diseases"
                  placeholder="List any chronic conditions..."
                  value={formData.chronic_diseases || ''}
                  onChange={(e) => handleChange('chronic_diseases')(e.target.value)}
                  className="sm:col-span-2"
                />
              </div>
            ) : profile ? (
              <div className="grid gap-4 sm:grid-cols-2">
                <InfoRow label="Height" value={profile.height ? `${profile.height} cm` : 'Not specified'} />
                <InfoRow label="Weight" value={profile.weight ? `${profile.weight} kg` : 'Not specified'} />
                <div className="sm:col-span-2">
                  <InfoRow label="Allergies" value={profile.allergies || 'None specified'} />
                </div>
                <div className="sm:col-span-2">
                  <InfoRow label="Chronic Diseases" value={profile.chronic_diseases || 'None specified'} />
                </div>
              </div>
            ) : null}
          </div>
        </Card>

        {/* Emergency Contact */}
        <Card elevated>
          <CardHeader
            title="Emergency Contact"
            description="Contact information for emergencies"
          />
          <div className="p-6">
            {isEditing || isCreating ? (
              <Input
                label="Emergency Contact"
                type="text"
                placeholder="Name and phone number"
                value={formData.emergency_contact || ''}
                onChange={(e) => handleChange('emergency_contact')(e.target.value)}
                hint="Include name and phone number"
              />
            ) : profile ? (
              <InfoRow label="Emergency Contact" value={profile.emergency_contact || 'Not specified'} />
            ) : null}
          </div>
        </Card>

        {/* Insurance Information */}
        <Card elevated>
          <CardHeader
            title="Insurance Information"
            description="Health insurance details"
          />
          <div className="p-6">
            {isEditing || isCreating ? (
              <div className="grid gap-4 sm:grid-cols-2">
                <Input
                  label="Insurance Provider"
                  type="text"
                  placeholder="Insurance company name"
                  value={formData.insurance_provider || ''}
                  onChange={(e) => handleChange('insurance_provider')(e.target.value)}
                />
                <Input
                  label="Insurance Number"
                  type="text"
                  placeholder="Policy or member number"
                  value={formData.insurance_number || ''}
                  onChange={(e) => handleChange('insurance_number')(e.target.value)}
                />
              </div>
            ) : profile ? (
              <div className="grid gap-4 sm:grid-cols-2">
                <InfoRow label="Provider" value={profile.insurance_provider || 'Not specified'} />
                <InfoRow label="Number" value={profile.insurance_number || 'Not specified'} />
              </div>
            ) : null}
          </div>
        </Card>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          {isEditing || isCreating ? (
            <>
              <Button variant="outline" onClick={handleCancel} disabled={isSaving}>
                Cancel
              </Button>
              <Button onClick={handleSubmit} isLoading={isSaving}>
                {isCreating ? 'Create Profile' : 'Save Changes'}
              </Button>
            </>
          ) : (
            <Button onClick={handleEdit}>Edit Profile</Button>
          )}
        </div>
      </div>
    </AppLayout>
  )
}

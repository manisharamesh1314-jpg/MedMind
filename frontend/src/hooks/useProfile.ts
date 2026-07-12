import { useEffect, useState } from 'react'
import { profileApi } from '../api'
import type { HealthProfile } from '../types'

export function useProfile() {
  const [profile, setProfile] = useState<HealthProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [isNotFound, setIsNotFound] = useState(false)

  const fetchProfile = async () => {
    setIsLoading(true)
    setError(null)
    setIsNotFound(false)
    try {
      const response = await profileApi.get()
      setProfile(response.data)
    } catch (err) {
      const axiosError = err as any
      if (axiosError?.response?.status === 404) {
        setIsNotFound(true)
        setProfile(null)
      } else {
        setError(err as Error)
      }
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    void fetchProfile()
  }, [])

  return { profile, isLoading, error, isNotFound, refetch: fetchProfile }
}

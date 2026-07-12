import { useEffect, useState } from 'react'
import { recordsApi } from '../api'
import type { MedicalRecord } from '../types'

export function useRecords() {
  const [records, setRecords] = useState<MedicalRecord[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchRecords = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await recordsApi.getAll()
      setRecords(response.data)
    } catch (err) {
      setError(err as Error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    void fetchRecords()
  }, [])

  return { records, isLoading, error, refetch: fetchRecords }
}

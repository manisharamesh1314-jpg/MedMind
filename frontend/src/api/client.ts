import axios from 'axios'
import { storage } from '../utils/storage'

export const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.request.use((config) => {
  const token = storage.getToken()

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      storage.removeToken()
      window.dispatchEvent(new CustomEvent('medmind:unauthorized'))
    }

    return Promise.reject(error)
  },
)

export function getErrorMessage(error: unknown, fallback = 'Something went wrong'): string {
  if (axios.isAxiosError(error)) {
    const detail = error.response?.data?.detail

    if (typeof detail === 'string') {
      return detail
    }

    if (Array.isArray(detail)) {
      return detail.map((item) => item.msg ?? String(item)).join(', ')
    }
  }

  if (error instanceof Error) {
    return error.message
  }

  return fallback
}

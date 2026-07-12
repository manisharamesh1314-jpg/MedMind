import { apiClient } from './client'
import type {
  HealthProfile,
  HealthProfileCreate,
  HealthProfileUpdate,
} from '../types'

export const profileApi = {
  create(data: HealthProfileCreate) {
    return apiClient.post<HealthProfile>('/profile', data)
  },

  get() {
    return apiClient.get<HealthProfile>('/profile')
  },

  update(data: HealthProfileUpdate) {
    return apiClient.put<HealthProfile>('/profile', data)
  },
}

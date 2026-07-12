import { apiClient } from './client'
import type {
  MedicalRecord,
  MedicalRecordCreate,
  MedicalRecordUpdate,
} from '../types'

export const recordsApi = {
  create(data: MedicalRecordCreate) {
    return apiClient.post<MedicalRecord>('/records', data)
  },

  getAll() {
    return apiClient.get<MedicalRecord[]>('/records')
  },

  getById(recordId: number) {
    return apiClient.get<MedicalRecord>(`/records/${recordId}`)
  },

  update(recordId: number, data: MedicalRecordUpdate) {
    return apiClient.put<MedicalRecord>(`/records/${recordId}`, data)
  },

  delete(recordId: number) {
    return apiClient.delete<{ message: string }>(`/records/${recordId}`)
  },
}

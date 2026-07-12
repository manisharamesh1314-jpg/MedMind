export interface HealthProfile {
  id: number
  user_id: number
  date_of_birth: string
  gender: string
  blood_group: string
  height?: number | null
  weight?: number | null
  allergies?: string | null
  chronic_diseases?: string | null
  emergency_contact?: string | null
  insurance_provider?: string | null
  insurance_number?: string | null
}

export interface HealthProfileCreate {
  date_of_birth: string
  gender: string
  blood_group: string
  height?: number | null
  weight?: number | null
  allergies?: string | null
  chronic_diseases?: string | null
  emergency_contact?: string | null
  insurance_provider?: string | null
  insurance_number?: string | null
}

export type HealthProfileUpdate = Partial<HealthProfileCreate>

export interface MedicalRecord {
  id: number
  user_id: number
  title: string
  record_type: string
  hospital_name?: string | null
  doctor_name?: string | null
  visit_date?: string | null
  notes?: string | null
  file_name?: string | null
}

export interface MedicalRecordCreate {
  title: string
  record_type: string
  hospital_name?: string | null
  doctor_name?: string | null
  visit_date?: string | null
  notes?: string | null
  file_name?: string | null
}

export type MedicalRecordUpdate = Partial<MedicalRecordCreate>

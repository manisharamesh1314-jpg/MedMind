import { useState, type ReactElement } from 'react'
import { AppLayout } from '../components/layout/AppLayout'
import { Button, Card, InfoRow, Input, Modal, Select, Skeleton, Table, TableCell, TableHeader } from '../components/ui'
import { useRecords } from '../hooks/useRecords'
import { recordsApi } from '../api'
import { useToast } from '../context/ToastContext'
import type { MedicalRecord, MedicalRecordCreate } from '../types'

export function RecordsPage() {
  const { records, isLoading, error, refetch } = useRecords()
  const { showToast } = useToast()
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'view'>('create')
  const [selectedRecord, setSelectedRecord] = useState<MedicalRecord | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState<MedicalRecordCreate>({
    title: '',
    record_type: 'Check-up',
    hospital_name: '',
    doctor_name: '',
    visit_date: '',
    notes: '',
    file_name: '',
  })
  const [errors, setErrors] = useState<Partial<Record<keyof MedicalRecordCreate, string>>>({})

  const recordTypes = ['Check-up', 'Lab Result', 'Prescription', 'Imaging', 'Surgery', 'Vaccination']

  const filteredRecords = records.filter((record) => {
    const trimmedQuery = searchQuery.trim().toLowerCase()
    
    if (!trimmedQuery) {
      return filterType === 'all' || record.record_type === filterType
    }

    const searchableFields: string[] = [
      record.title,
      record.record_type,
      record.hospital_name,
      record.doctor_name,
      record.notes,
      record.file_name,
      record.visit_date ? new Date(record.visit_date).toLocaleDateString() : '',
    ].filter((field): field is string => field !== null && field !== undefined && field !== '')

    const matchesSearch = searchableFields.some((field) =>
      field.toLowerCase().includes(trimmedQuery)
    )
    
    const matchesFilter = filterType === 'all' || record.record_type === filterType
    return matchesSearch && matchesFilter
  })

  const handleCreate = () => {
    setModalMode('create')
    setFormData({
      title: '',
      record_type: 'Check-up',
      hospital_name: '',
      doctor_name: '',
      visit_date: '',
      notes: '',
      file_name: '',
    })
    setErrors({})
    setIsModalOpen(true)
  }

  const handleEdit = (record: MedicalRecord) => {
    setModalMode('edit')
    setSelectedRecord(record)
    setFormData({
      title: record.title,
      record_type: record.record_type,
      hospital_name: record.hospital_name || '',
      doctor_name: record.doctor_name || '',
      visit_date: record.visit_date || '',
      notes: record.notes || '',
      file_name: record.file_name || '',
    })
    setErrors({})
    setIsModalOpen(true)
  }

  const handleView = (record: MedicalRecord) => {
    setModalMode('view')
    setSelectedRecord(record)
    setIsModalOpen(true)
  }

  const handleDelete = async (recordId: number) => {
    if (!confirm('Are you sure you want to delete this record? This action cannot be undone.')) {
      return
    }

    try {
      await recordsApi.delete(recordId)
      showToast({
        title: 'Record deleted',
        description: 'The medical record has been deleted successfully.',
        variant: 'success',
      })
      await refetch()
    } catch (err) {
      const axiosError = err as any
      let errorMessage = 'Please try again.'
      
      if (axiosError?.response?.status === 404) {
        errorMessage = 'Record not found. It may have been already deleted.'
      } else if (axiosError?.response?.status === 401) {
        errorMessage = 'Your session has expired. Please sign in again.'
      } else if (!axiosError?.response) {
        errorMessage = 'Network error. Please check your connection and try again.'
      }
      
      showToast({
        title: 'Delete failed',
        description: errorMessage,
        variant: 'error',
      })
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof MedicalRecordCreate, string>> = {}

    if (!formData.title.trim()) {
      newErrors.title = 'Please enter a title for this record'
    }

    if (!formData.record_type) {
      newErrors.record_type = 'Please select a record type'
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
      const submitData: MedicalRecordCreate = {
        ...formData,
        title: formData.title.trim(),
        hospital_name: formData.hospital_name?.trim() || null,
        doctor_name: formData.doctor_name?.trim() || null,
        visit_date: formData.visit_date || null,
        notes: formData.notes?.trim() || null,
        file_name: formData.file_name?.trim() || null,
      }

      if (modalMode === 'edit' && selectedRecord) {
        await recordsApi.update(selectedRecord.id, submitData)
        showToast({
          title: 'Record updated',
          description: 'Your medical record has been updated successfully.',
          variant: 'success',
        })
      } else {
        await recordsApi.create(submitData)
        showToast({
          title: 'Record created',
          description: 'Your medical record has been added successfully.',
          variant: 'success',
        })
      }

      await refetch()
      setIsModalOpen(false)
      setSelectedRecord(null)
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
        title: modalMode === 'edit' ? 'Update failed' : 'Creation failed',
        description: errorMessage,
        variant: 'error',
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleChange = (field: keyof MedicalRecordCreate) => (value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  if (isLoading) {
    return (
      <AppLayout title="Medical Records" subtitle="Loading your medical records">
        <Card elevated>
          <div className="p-6 space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </Card>
      </AppLayout>
    )
  }

  if (error) {
    return (
      <AppLayout title="Medical Records" subtitle="Unable to load your records">
        <Card elevated>
          <div className="p-6 text-center">
            <p className="text-sm text-[var(--color-text-muted)]">
              Failed to load your medical records. Please try again.
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
    <AppLayout title="Medical Records" subtitle="Manage your healthcare documentation">
      <div className="space-y-6">
        {/* Search and Filter */}
        <Card elevated>
          <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-1 gap-3">
              <Input
                placeholder="Search records..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-xs"
              />
              <Select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="max-w-xs"
              >
                <option value="all">All Types</option>
                {recordTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </Select>
            </div>
            <Button onClick={handleCreate}>Add Record</Button>
          </div>
        </Card>

        {/* Records Table */}
        <Card elevated>
          <div className="overflow-x-auto">
            <Table>
              <thead>
                <tr>
                  <TableHeader>Title</TableHeader>
                  <TableHeader>Type</TableHeader>
                  <TableHeader>Date</TableHeader>
                  <TableHeader>Hospital</TableHeader>
                  <TableHeader className="hidden sm:table-cell">Doctor</TableHeader>
                  <TableHeader className="text-right">Actions</TableHeader>
                </tr>
              </thead>
              <tbody>
                {filteredRecords.length === 0 ? (
                  <tr>
                    <TableCell colSpan={6} className="py-12 text-center">
                      <p className="text-sm text-[var(--color-text-muted)]">
                        {records.length === 0
                          ? 'No medical records yet. Add your first record to get started.'
                          : 'No records match your search.'}
                      </p>
                      {records.length === 0 && (
                        <Button onClick={handleCreate} className="mt-4">
                          Add Your First Record
                        </Button>
                      )}
                    </TableCell>
                  </tr>
                ) : (
                  filteredRecords.map((record) => (
                    <tr key={record.id}>
                      <TableCell>
                        <span className="font-medium text-[var(--color-text-primary)]">
                          {record.title}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="inline-flex rounded-full bg-[var(--color-brand-50)] px-2.5 py-1 text-xs font-medium text-[var(--color-brand-600)]">
                          {record.record_type}
                        </span>
                      </TableCell>
                      <TableCell>
                        {record.visit_date
                          ? new Date(record.visit_date).toLocaleDateString()
                          : '—'}
                      </TableCell>
                      <TableCell>{record.hospital_name || '—'}</TableCell>
                      <TableCell className="hidden sm:table-cell">
                        {record.doctor_name || '—'}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleView(record)}
                          >
                            View
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(record)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(record.id)}
                            className="text-[var(--color-danger)] hover:bg-[var(--color-danger-soft)]"
                          >
                            Delete
                          </Button>
                        </div>
                      </TableCell>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </div>
        </Card>

        {/* Mobile Card View */}
        <div className="lg:hidden space-y-4">
          {filteredRecords.length === 0 ? (
            <Card elevated>
              <div className="py-12 text-center">
                <p className="text-sm text-[var(--color-text-muted)]">
                  {records.length === 0
                    ? 'No medical records yet.'
                    : 'No records match your search.'}
                </p>
              </div>
            </Card>
          ) : (
            filteredRecords.map((record) => (
              <Card key={record.id} elevated>
                <div className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-[var(--color-text-primary)]">
                        {record.title}
                      </p>
                      <p className="mt-1 text-xs text-[var(--color-text-muted)]">
                        {record.record_type}
                        {record.visit_date && (
                          <> • {new Date(record.visit_date).toLocaleDateString()}</>
                        )}
                      </p>
                      {record.hospital_name && (
                        <p className="mt-1 text-xs text-[var(--color-text-secondary)]">
                          {record.hospital_name}
                        </p>
                      )}
                    </div>
                    <div className="flex gap-1 shrink-0">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleView(record)}
                      >
                        View
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(record)}
                      >
                        Edit
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>

      {/* Modal */}
      <Modal
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedRecord(null)
          setErrors({})
        }}
        title={modalMode === 'view' ? 'Record Details' : modalMode === 'create' ? 'Add Record' : 'Edit Record'}
      >
        {modalMode === 'view' && selectedRecord ? (
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[var(--color-brand-50)] text-[var(--color-brand-600)]">
                <RecordTypeIcon type={selectedRecord.record_type} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">{selectedRecord.title}</h3>
                <p className="mt-1 text-sm text-[var(--color-text-muted)]">{selectedRecord.record_type}</p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <InfoRow label="Visit Date" value={selectedRecord.visit_date ? new Date(selectedRecord.visit_date).toLocaleDateString() : '—'} />
              <InfoRow label="Hospital" value={selectedRecord.hospital_name || '—'} />
              <InfoRow label="Doctor" value={selectedRecord.doctor_name || '—'} />
              {selectedRecord.file_name && <InfoRow label="File" value={selectedRecord.file_name} />}
            </div>

            {selectedRecord.notes && (
              <div>
                <p className="text-sm font-medium text-[var(--color-text-primary)] mb-2">Notes</p>
                <p className="text-sm text-[var(--color-text-secondary)] bg-[var(--color-surface-muted)] rounded-lg p-3">
                  {selectedRecord.notes}
                </p>
              </div>
            )}

            <div className="flex justify-end gap-3 pt-4 border-t border-[var(--color-border)]">
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                Close
              </Button>
              <Button onClick={() => {
                setModalMode('edit')
              }}>
                Edit Record
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Title"
              placeholder="Annual check-up"
              value={formData.title}
              onChange={(e) => handleChange('title')(e.target.value)}
              error={errors.title}
              required
            />
            <Select
              label="Record Type"
              value={formData.record_type}
              onChange={(e) => handleChange('record_type')(e.target.value)}
              error={errors.record_type}
              required
            >
              {recordTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </Select>
            <Input
              label="Hospital Name"
              placeholder="City General Hospital"
              value={formData.hospital_name || ''}
              onChange={(e) => handleChange('hospital_name')(e.target.value)}
            />
            <Input
              label="Doctor Name"
              placeholder="Dr. Smith"
              value={formData.doctor_name || ''}
              onChange={(e) => handleChange('doctor_name')(e.target.value)}
            />
            <Input
              label="Visit Date"
              type="date"
              value={formData.visit_date || ''}
              onChange={(e) => handleChange('visit_date')(e.target.value)}
            />
            <Input
              label="File Name"
              placeholder="lab_report.pdf"
              value={formData.file_name || ''}
              onChange={(e) => handleChange('file_name')(e.target.value)}
            />
            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsModalOpen(false)
                  setSelectedRecord(null)
                  setErrors({})
                }}
              >
                Cancel
              </Button>
              <Button type="submit" isLoading={isSaving}>
                {modalMode === 'create' ? 'Create Record' : 'Save Changes'}
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </AppLayout>
  )
}

function RecordTypeIcon({ type }: { type: string }) {
  const icons: Record<string, ReactElement> = {
    'Check-up': (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 4a4 4 0 0 0-4 4v6a4 4 0 0 0 8 0V8a4 4 0 0 0-4-4z"
          stroke="currentColor"
          strokeWidth="1.7"
        />
        <path d="M12 16v4M8 20h8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    ),
    'Lab Result': (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M9 17v-6m3 6v-4m3 4V9M4 21h16M4 3v18M20 3v18"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
      </svg>
    ),
    'Prescription': (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M8 4h8a2 2 0 0 1 2 2v14l-4-2-4 2-4-2-4 2V6a2 2 0 0 1 2-2z"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
        <path d="M10 9h4M10 13h4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    ),
    'Imaging': (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.7" />
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.7" />
      </svg>
    ),
    'Surgery': (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 2L4 7v10l8 5 8-5V7l-8-5z"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
        <path d="M12 8v8M9 10.5h6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    ),
    'Vaccination': (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 4a4 4 0 0 0-4 4v6a4 4 0 0 0 8 0V8a4 4 0 0 0-4-4z"
          stroke="currentColor"
          strokeWidth="1.7"
        />
        <path d="M12 16v4M8 20h8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        <path d="M12 8v4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    ),
  }

  return icons[type] || icons['Check-up']
}

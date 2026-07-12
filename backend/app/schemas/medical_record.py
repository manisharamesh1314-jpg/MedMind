from datetime import date
from typing import Optional

from pydantic import BaseModel


class MedicalRecordBase(BaseModel):
    title: str
    record_type: str

    hospital_name: Optional[str] = None
    doctor_name: Optional[str] = None

    visit_date: Optional[date] = None

    notes: Optional[str] = None

    file_name: Optional[str] = None


class MedicalRecordCreate(MedicalRecordBase):
    pass


class MedicalRecordUpdate(BaseModel):
    title: Optional[str] = None
    record_type: Optional[str] = None

    hospital_name: Optional[str] = None
    doctor_name: Optional[str] = None

    visit_date: Optional[date] = None

    notes: Optional[str] = None

    file_name: Optional[str] = None


class MedicalRecordResponse(MedicalRecordBase):
    id: int
    user_id: int

    model_config = {
        "from_attributes": True
    }
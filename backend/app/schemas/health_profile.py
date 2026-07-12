from datetime import date
from typing import Optional

from pydantic import BaseModel


class HealthProfileBase(BaseModel):
    date_of_birth: date
    gender: str
    blood_group: str

    height: Optional[float] = None
    weight: Optional[float] = None

    allergies: Optional[str] = None
    chronic_diseases: Optional[str] = None

    emergency_contact: Optional[str] = None

    insurance_provider: Optional[str] = None
    insurance_number: Optional[str] = None


class HealthProfileCreate(HealthProfileBase):
    pass


class HealthProfileUpdate(BaseModel):
    date_of_birth: Optional[date] = None
    gender: Optional[str] = None
    blood_group: Optional[str] = None

    height: Optional[float] = None
    weight: Optional[float] = None

    allergies: Optional[str] = None
    chronic_diseases: Optional[str] = None

    emergency_contact: Optional[str] = None

    insurance_provider: Optional[str] = None
    insurance_number: Optional[str] = None


class HealthProfileResponse(HealthProfileBase):
    id: int
    user_id: int

    model_config = {
        "from_attributes": True
    }
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.database.database import get_db
from app.auth.dependencies import get_current_user

from app.models.user import User

from app.schemas.medical_record import (
    MedicalRecordCreate,
    MedicalRecordUpdate,
    MedicalRecordResponse,
)

from app.services.medical_record_service import (
    create_record,
    get_all_records,
    get_record,
    update_record,
    delete_record,
)

router = APIRouter(
    prefix="/records",
    tags=["Medical Records"]
)


@router.post("", response_model=MedicalRecordResponse)
def create_medical_record(
    record: MedicalRecordCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return create_record(
        db,
        current_user.id,
        record,
    )


@router.get("", response_model=List[MedicalRecordResponse])
def read_all_records(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return get_all_records(
        db,
        current_user.id,
    )


@router.get("/{record_id}", response_model=MedicalRecordResponse)
def read_record(
    record_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    record = get_record(
        db,
        record_id,
        current_user.id,
    )

    if not record:
        raise HTTPException(
            status_code=404,
            detail="Medical record not found",
        )

    return record


@router.put("/{record_id}", response_model=MedicalRecordResponse)
def edit_record(
    record_id: int,
    updated_record: MedicalRecordUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    record = get_record(
        db,
        record_id,
        current_user.id,
    )

    if not record:
        raise HTTPException(
            status_code=404,
            detail="Medical record not found",
        )

    return update_record(
        db,
        record,
        updated_record,
    )


@router.delete("/{record_id}")
def remove_record(
    record_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    record = get_record(
        db,
        record_id,
        current_user.id,
    )

    if not record:
        raise HTTPException(
            status_code=404,
            detail="Medical record not found",
        )

    delete_record(
        db,
        record,
    )

    return {
        "message": "Medical record deleted successfully"
    }
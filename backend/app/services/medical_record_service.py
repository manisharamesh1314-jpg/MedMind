from sqlalchemy.orm import Session

from app.models.medical_record import MedicalRecord

from app.schemas.medical_record import (
    MedicalRecordCreate,
    MedicalRecordUpdate,
)


def create_record(
    db: Session,
    user_id: int,
    record: MedicalRecordCreate,
):
    db_record = MedicalRecord(
        user_id=user_id,
        **record.model_dump()
    )

    db.add(db_record)
    db.commit()
    db.refresh(db_record)

    return db_record


def get_all_records(
    db: Session,
    user_id: int,
):
    return (
        db.query(MedicalRecord)
        .filter(MedicalRecord.user_id == user_id)
        .order_by(MedicalRecord.visit_date.desc())
        .all()
    )


def get_record(
    db: Session,
    record_id: int,
    user_id: int,
):
    return (
        db.query(MedicalRecord)
        .filter(
            MedicalRecord.id == record_id,
            MedicalRecord.user_id == user_id,
        )
        .first()
    )


def update_record(
    db: Session,
    db_record: MedicalRecord,
    record: MedicalRecordUpdate,
):
    update_data = record.model_dump(exclude_unset=True)

    for key, value in update_data.items():
        setattr(db_record, key, value)

    db.commit()
    db.refresh(db_record)

    return db_record


def delete_record(
    db: Session,
    db_record: MedicalRecord,
):
    db.delete(db_record)
    db.commit()
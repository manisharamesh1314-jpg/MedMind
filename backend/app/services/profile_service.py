from sqlalchemy.orm import Session

from app.models.health_profile import HealthProfile
from app.schemas.health_profile import (
    HealthProfileCreate,
    HealthProfileUpdate,
)


def create_profile(
    db: Session,
    user_id: int,
    profile: HealthProfileCreate
):
    db_profile = HealthProfile(
        user_id=user_id,
        **profile.model_dump()
    )

    db.add(db_profile)
    db.commit()
    db.refresh(db_profile)

    return db_profile


def get_profile(
    db: Session,
    user_id: int
):
    return (
        db.query(HealthProfile)
        .filter(HealthProfile.user_id == user_id)
        .first()
    )


def update_profile(
    db: Session,
    db_profile: HealthProfile,
    profile: HealthProfileUpdate
):
    update_data = profile.model_dump(exclude_unset=True)

    for key, value in update_data.items():
        setattr(db_profile, key, value)

    db.commit()
    db.refresh(db_profile)

    return db_profile
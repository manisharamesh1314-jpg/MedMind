from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.auth.dependencies import get_current_user

from app.models.user import User

from app.schemas.health_profile import (
    HealthProfileCreate,
    HealthProfileUpdate,
    HealthProfileResponse,
)

from app.services.profile_service import (
    create_profile,
    get_profile,
    update_profile,
)

router = APIRouter(
    prefix="/profile",
    tags=["Health Profile"]
)


@router.post("", response_model=HealthProfileResponse)
def create_health_profile(
    profile: HealthProfileCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    existing_profile = get_profile(db, current_user.id)

    if existing_profile:
        raise HTTPException(
            status_code=400,
            detail="Health profile already exists"
        )

    return create_profile(
        db,
        current_user.id,
        profile,
    )


@router.get("", response_model=HealthProfileResponse)
def read_health_profile(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    profile = get_profile(db, current_user.id)

    if not profile:
        raise HTTPException(
            status_code=404,
            detail="Health profile not found"
        )

    return profile


@router.put("", response_model=HealthProfileResponse)
def edit_health_profile(
    profile: HealthProfileUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    db_profile = get_profile(db, current_user.id)

    if not db_profile:
        raise HTTPException(
            status_code=404,
            detail="Health profile not found"
        )

    return update_profile(
        db,
        db_profile,
        profile,
    )
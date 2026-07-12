from sqlalchemy.orm import Session

from app.models.user import User
from sqlalchemy.orm import Session

from app.models.user import User
from app.schemas.user import UserCreate
from app.auth.hashing import hash_password, verify_password


def create_user(db: Session, user: UserCreate):
    db_user = User(
        full_name=user.full_name,
        email=user.email,
        password_hash=hash_password(user.password)
    )

    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    return db_user


def authenticate_user(db: Session, email: str, password: str):
    user = db.query(User).filter(User.email == email).first()

    if user is None:
        return None

    if not verify_password(password, user.password_hash):
        return None

    return user
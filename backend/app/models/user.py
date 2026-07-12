from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime, UTC
from app.database.database import Base
from sqlalchemy.orm import relationship


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String(100), nullable=False)
    email = Column(String(150), unique=True, nullable=False, index=True)
    password_hash = Column(String(255), nullable=False)
    created_at = Column(DateTime, default=lambda: datetime.now(UTC))
    health_profile = relationship(
    "HealthProfile",
    back_populates="user",
    uselist=False,
    cascade="all, delete-orphan"
    
)
    medical_records = relationship(
    "MedicalRecord",
    back_populates="user",
    cascade="all, delete-orphan"
)
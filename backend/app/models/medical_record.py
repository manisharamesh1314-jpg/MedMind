from sqlalchemy import (
    Column,
    Integer,
    String,
    Date,
    DateTime,
    ForeignKey,
)
from sqlalchemy.orm import relationship
from datetime import datetime, UTC

from app.database.database import Base


class MedicalRecord(Base):
    __tablename__ = "medical_records"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )

    title = Column(String(200), nullable=False)

    record_type = Column(
        String(50),
        nullable=False
    )

    hospital_name = Column(String(200))

    doctor_name = Column(String(200))

    visit_date = Column(Date)

    notes = Column(String)

    file_name = Column(String(255))

    created_at = Column(
        DateTime,
        default=lambda: datetime.now(UTC)
    )

    user = relationship(
        "User",
        back_populates="medical_records"
    )
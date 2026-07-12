from sqlalchemy import Column, Integer, String, Float, Date, ForeignKey
from sqlalchemy.orm import relationship

from app.database.database import Base


class HealthProfile(Base):
    __tablename__ = "health_profiles"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        unique=True,
        nullable=False
    )

    date_of_birth = Column(Date, nullable=False)
    gender = Column(String, nullable=False)
    blood_group = Column(String, nullable=False)

    height = Column(Float)
    weight = Column(Float)

    allergies = Column(String)
    chronic_diseases = Column(String)

    emergency_contact = Column(String)

    insurance_provider = Column(String)
    insurance_number = Column(String)

    user = relationship(
        "User",
        back_populates="health_profile"
    )
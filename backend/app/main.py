from fastapi import FastAPI
from app.database.database import Base, engine
from app.models.user import User
from app.models.health_profile import HealthProfile
from app.models.medical_record import MedicalRecord
from app.api.auth import router as auth_router
from app.api.profile import router as profile_router
from app.api.medical_record import router as medical_record_router
Base.metadata.create_all(bind=engine)

app = FastAPI(title="MedMind API")

app.include_router(auth_router)
app.include_router(profile_router)
app.include_router(medical_record_router)


@app.get("/")
def root():
    return {"message": "Welcome to MedMind API"}
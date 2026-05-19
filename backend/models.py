from sqlalchemy import Column, Integer, String, Float
from database import Base

class ClinicCharge(Base):
    __tablename__ = "clinic_charges"

    id = Column(Integer, primary_key=True, index=True)
    medical_centre_name = Column(String, nullable=False)
    patient_visit_type = Column(String, nullable=False)
    charge_type = Column(String, nullable=False)
    amount = Column(Float, nullable=False)
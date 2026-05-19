from pydantic import BaseModel, Field
from typing import Optional

class ClinicChargeResponse(BaseModel):
    id: int
    medical_centre_name: str
    patient_visit_type: str
    charge_type: str
    amount: float = Field(gt=0)

    class Config:
        from_attributes = True

class ChargesResponse(BaseModel):
    rows: list[ClinicChargeResponse]
    total: int

class ClinicChargeCreate(BaseModel):
    medical_centre_name: str
    patient_visit_type: str
    charge_type: str
    amount: float = Field(gt=0)

class ClinicChargeUpdate(BaseModel):
    medical_centre_name: Optional[str] = None
    patient_visit_type: Optional[str] = None
    charge_type: Optional[str] = None
    amount: Optional[float] = Field(None, gt=0)
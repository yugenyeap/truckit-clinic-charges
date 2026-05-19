from fastapi import FastAPI, Depends, Query
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from database import engine, get_db
from models import Base, ClinicCharge
from schemas  import (
    ClinicChargeResponse,
    ClinicChargeCreate,
    ClinicChargeUpdate
)

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

@app.get("/")
def root():
    return {"message": "API working!"}

@app.get("/charges")
def get_charges(
    startRow: int = Query(0, ge=0),
    endRow: int = Query(20, ge=1),
    sort_field: str | None = None,
    sort_direction: str | None = None,
    medical_centre_name: str | None = None,
    charge_type: str | None = None,
    db: Session = Depends(get_db)
):
    query = db.query(ClinicCharge)
    query = query.order_by(ClinicCharge.id.asc())

    total = query.count()

    limit = endRow - startRow

    # Filtering
    if medical_centre_name:
        query = query.filter(
            ClinicCharge.medical_centre_name.ilike(f"%{medical_centre_name}%")
        )

    if charge_type:
        query = query.filter(
            ClinicCharge.charge_type == charge_type
        )

    sortable_columns = {
        "id": ClinicCharge.id,
        "medical_centre_name": ClinicCharge.medical_centre_name,
        "patient_visit_type": ClinicCharge.patient_visit_type,
        "charge_type": ClinicCharge.charge_type,
        "amount": ClinicCharge.amount,
    }

    if sort_field in sortable_columns:

        column = sortable_columns[sort_field]

        if sort_direction == "desc":
            query = query.order_by(column.desc())
        else:
            query = query.order_by(column.asc())

    total = query.count()

    rows = (
        query
        .offset(startRow)
        .limit(limit)
        .all()
    )

    # Convert SQLAlchemy objects into JSON-safe response objects
    return {
        "rows": [
            ClinicChargeResponse.model_validate(row)
            for row in rows
        ],
        "total": total
    }

@app.post("/charges")
def create_charge(
    charge: ClinicChargeCreate,
    db: Session = Depends(get_db)
):
    new_charge = ClinicCharge(
        medical_centre_name=charge.medical_centre_name,
        patient_visit_type=charge.patient_visit_type,
        charge_type=charge.charge_type,
        amount=charge.amount
    )

    db.add(new_charge)

    db.commit()

    db.refresh(new_charge)

    return ClinicChargeResponse.model_validate(new_charge)

@app.patch("/charges/{charge_id}")
def update_charge(
    charge_id: int,
    charge_update: ClinicChargeUpdate,
    db: Session = Depends(get_db)
):
    charge = db.query(ClinicCharge).filter(ClinicCharge.id == charge_id).first()

    if not charge:
        return {"error": "Charge not found"}

    #excelu_unset = true, only updates fields actually sent
    update_data = charge_update.model_dump(exclude_unset=True)

    for key, value in update_data.items():
        setattr(charge, key, value) #dynamically updates object fields

    db.commit()

    db.refresh(charge)

    return ClinicChargeResponse.model_validate(charge)
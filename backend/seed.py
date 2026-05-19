from faker import Faker
import random

from database import SessionLocal
from models import ClinicCharge

fake = Faker()

db = SessionLocal()

visit_types = ["New Patient", "Follow-up", "Emergency"]
charge_types = [
    "Consultation",
    "X-Ray",
    "Blood Test",
    "MRI",
    "Vaccination",
]

# Loop that generates 500 random clinic charge records and adds them to the database
for _ in range(500):
    charge = ClinicCharge(
        medical_centre_name=fake.company(),
        patient_visit_type=random.choice(visit_types),
        charge_type=random.choice(charge_types),
        amount=round(random.uniform(50, 500), 2),
    )
    db.add(charge)

db.commit()
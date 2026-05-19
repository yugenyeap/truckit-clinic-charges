import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ChargesService } from '../services/charges';

@Component({
  selector: 'app-add-charge-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-charge-form.html',
  styleUrls: ['./add-charge-form.css']
})
export class AddChargeFormComponent {

  private chargesService = inject(ChargesService);

  medicalCentreName = '';
  patientVisitType = '';
  chargeType = '';
  amount = 0;

  submit(): void {

    const payload = {
      medical_centre_name: this.medicalCentreName,
      patient_visit_type: this.patientVisitType,
      charge_type: this.chargeType,
      amount: this.amount
    };

    console.log('Creating charge:', payload);

    this.chargesService
      .createCharge(payload)
      .subscribe({

        next: (response) => {

          console.log('Charge created:', response);

          this.resetForm();

          // Simple refresh for assessment purposes
          window.location.reload();

        },

        error: (error) => {

          console.error('Create failed:', error);

        }

      });

  }

  resetForm(): void {

    this.medicalCentreName = '';
    this.patientVisitType = '';
    this.chargeType = '';
    this.amount = 0;

  }

}
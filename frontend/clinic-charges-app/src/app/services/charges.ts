import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface ClinicCharge {
  id: number;
  medical_centre_name: string;
  patient_visit_type: string;
  charge_type: string;
  amount: number;
}

interface ChargesResponse {
  rows: ClinicCharge[];
  total: number;
}

@Injectable({
  providedIn: 'root',
})
export class ChargesService {

  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:8000';

  getCharges(
    startRow: number,
    endRow: number,
    sortField?: string,
    sortDirection?: string,
    medicalCentreName?: string,
    chargeType?: string
  ) {

    let url =
      `${this.apiUrl}/charges?startRow=${startRow}&endRow=${endRow}`;

    if (medicalCentreName) {
      url += `&medical_centre_name=${medicalCentreName}`;
    }

    if (chargeType) {
      url += `&charge_type=${chargeType}`;
    }

    if (sortField && sortDirection) {

      url +=
        `&sort_field=${sortField}` +
        `&sort_direction=${sortDirection}`;

    }
    console.log(url);
    return this.http.get<ChargesResponse>(url);

  }

  updateCharge(id: number, data: any) {
    return this.http.patch(
      `${this.apiUrl}/charges/${id}`,
      data
    );
  }

  createCharge(data: any) {
    return this.http.post(
      `${this.apiUrl}/charges`,
      data
    );
  }
}

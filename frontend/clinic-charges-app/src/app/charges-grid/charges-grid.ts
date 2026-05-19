import {
  Component,
  ViewChild,
  AfterViewInit,
  ChangeDetectorRef,
  inject
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { AgGridAngular } from 'ag-grid-angular';

import {
  ColDef,
  IDatasource,
  IGetRowsParams
} from 'ag-grid-community';

import { ChargesService } from '../services/charges';

@Component({
  selector: 'app-charges-grid',
  standalone: true,
  imports: [CommonModule, AgGridAngular],
  templateUrl: './charges-grid.html',
  styleUrls: ['./charges-grid.css']
})
export class ChargesGridComponent implements AfterViewInit {
  private chargesService = inject(ChargesService);
  private cdr = inject(ChangeDetectorRef);

  @ViewChild(AgGridAngular)
  agGrid!: AgGridAngular;

  columnDefs: ColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      sortable: true,
      width: 84,
      minWidth: 72,
      maxWidth: 96,
      suppressSizeToFit: true,
    },
    {
      field: 'medical_centre_name',
      headerName: 'Medical Centre Name',
      sortable: true,
      filter: 'agTextColumnFilter',
      editable: true,
      flex: 2,
      minWidth: 210,
    },
    {
      field: 'patient_visit_type',
      headerName: 'Patient Visit Type',
      sortable: true,
      editable: true,
      flex: 1.35,
      minWidth: 170,
    },
    {
      field: 'charge_type',
      headerName: 'Charge Type',
      sortable: true,
      filter: 'agTextColumnFilter',
      editable: true,
      flex: 1.25,
      minWidth: 170,
    },
    {
      field: 'amount',
      headerName: 'Amount',
      sortable: true,
      editable: true,
      flex: 1,
      minWidth: 130,
    },
  ];

  totalRows: number = 0;

  ngAfterViewInit(): void {
    this.setupDatasource();
  }

  onSortChanged(): void {
    this.agGrid.api.purgeInfiniteCache();
  }

  onCellValueChanged(event: any): void {
    const row = event.data;

    const updatePayload = {
      medical_centre_name: row.medical_centre_name,
      patient_visit_type: row.patient_visit_type,
      charge_type: row.charge_type,
      amount: row.amount
    };

    this.chargesService
      .updateCharge(row.id, updatePayload)
      .subscribe({
        next: () => {
          this.setupDatasource();
        },
        error: (error) => {
          console.error(error);
        }
      });
  }

  setupDatasource(): void {
    const datasource: IDatasource = {
      getRows: (params: IGetRowsParams) => {
        const startRow = params.startRow;
        const endRow = params.endRow;

        const sortModel = params.sortModel?.[0];

        const sortField = sortModel?.colId;
        const sortDirection = sortModel?.sort;

        const filterModel = params.filterModel;

        const medicalCentreFilter =
          filterModel['medical_centre_name']?.filter;

        const chargeTypeFilter =
          filterModel['charge_type']?.filter;

        this.chargesService
          .getCharges(
            startRow,
            endRow,
            sortField,
            sortDirection,
            medicalCentreFilter,
            chargeTypeFilter
          )
          .subscribe({
            next: (response) => {

              // Keep debugging logs to prove in console, scrolling pagination chunks
              console.log('params', params)
              console.log('response', response)

              this.totalRows = response.total;
              this.cdr.detectChanges();

              params.successCallback(
                response.rows,
                response.total
              );
            },
            error: () => {
              params.failCallback();
            }
          });
      }
    };

    this.agGrid.api.setGridOption(
      'datasource',
      datasource
    );
  }
}

// onGridReady(params: GridReadyEvent): void {
//   const datasource: IDatasource = {
//     getRows: (params: IGetRowsParams) => {
//       // console.log('Requesting rows', params.startRow, params.endRow);
//       // console.log('Params', params);

//       const start = params.startRow;
//       const limit = params.endRow - params.startRow;

//       const sortModel = params.sortModel?.[0];

//       const sortField = sortModel?.colId;
//       const sortDirection = sortModel?.sort;

//       this.chargesService
//         .getCharges(
//           start,
//           limit,
//           sortField,
//           sortDirection
//         )
//         .subscribe({
//           next: (response) => {
//             params.successCallback(
//               response.rows,
//               response.total,
//             );
//           },
//           error: (error) => {
//             console.error(error);
//             params.failCallback();
//           },
//         });
//     },
//   };

//   this.gridApi = params.api;

//   this.gridApi.setGridOption('datasource', datasource);
// }

// Static, no scrolling, auto pagination or backend row fetching solution
// rowData = toSignal(
//   this.chargesService.getCharges(0, 20).pipe(
//     map((response) => {
//       console.log(response);
//       return response.rows ?? [];
//     }),
//     catchError((error) => {
//       console.error(error);
//       return of([]);
//     })
//   ),
//   { initialValue: [] }
// );

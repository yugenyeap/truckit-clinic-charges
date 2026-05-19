import { Component } from '@angular/core';
import { ChargesGridComponent } from './charges-grid/charges-grid';
import { AddChargeFormComponent } from './add-charge-form/add-charge-form';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ChargesGridComponent, AddChargeFormComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class AppComponent {}
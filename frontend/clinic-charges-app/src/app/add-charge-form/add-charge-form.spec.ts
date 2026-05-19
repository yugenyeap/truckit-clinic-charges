import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddChargeForm } from './add-charge-form';

describe('AddChargeForm', () => {
  let component: AddChargeForm;
  let fixture: ComponentFixture<AddChargeForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddChargeForm],
    }).compileComponents();

    fixture = TestBed.createComponent(AddChargeForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

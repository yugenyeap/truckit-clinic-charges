import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargesGrid } from './charges-grid';

describe('ChargesGrid', () => {
  let component: ChargesGrid;
  let fixture: ComponentFixture<ChargesGrid>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChargesGrid],
    }).compileComponents();

    fixture = TestBed.createComponent(ChargesGrid);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

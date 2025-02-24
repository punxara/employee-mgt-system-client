import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeDraftComponent } from './employee-draft.component';

describe('EmployeeDraftComponent', () => {
  let component: EmployeeDraftComponent;
  let fixture: ComponentFixture<EmployeeDraftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeDraftComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeDraftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

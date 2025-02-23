import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentDraftComponent } from './department-draft.component';

describe('DepartmentDraftComponent', () => {
  let component: DepartmentDraftComponent;
  let fixture: ComponentFixture<DepartmentDraftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepartmentDraftComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepartmentDraftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

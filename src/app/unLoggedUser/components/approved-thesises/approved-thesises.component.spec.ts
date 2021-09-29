import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedThesisesComponent } from './approved-thesises.component';

describe('ApprovedThesisesComponent', () => {
  let component: ApprovedThesisesComponent;
  let fixture: ComponentFixture<ApprovedThesisesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovedThesisesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovedThesisesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedThesesComponent } from './approved-theses.component';

describe('ApprovedThesesComponent', () => {
  let component: ApprovedThesesComponent;
  let fixture: ComponentFixture<ApprovedThesesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovedThesesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovedThesesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

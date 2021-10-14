import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyThesesCandidateComponent } from './my-theses-candidate.component';

describe('MyThesesCandidateComponent', () => {
  let component: MyThesesCandidateComponent;
  let fixture: ComponentFixture<MyThesesCandidateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyThesesCandidateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyThesesCandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

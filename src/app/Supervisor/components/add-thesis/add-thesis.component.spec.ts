import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddThesisComponent } from './add-thesis.component';

describe('AddThesisComponent', () => {
  let component: AddThesisComponent;
  let fixture: ComponentFixture<AddThesisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddThesisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddThesisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

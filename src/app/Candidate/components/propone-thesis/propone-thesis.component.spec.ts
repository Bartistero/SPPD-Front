import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProponeThesisComponent } from './propone-thesis.component';

describe('ProponeThesisComponent', () => {
  let component: ProponeThesisComponent;
  let fixture: ComponentFixture<ProponeThesisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProponeThesisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProponeThesisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

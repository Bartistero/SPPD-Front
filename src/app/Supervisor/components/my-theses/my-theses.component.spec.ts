import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyThesesComponent } from './my-theses.component';

describe('MyThesesComponent', () => {
  let component: MyThesesComponent;
  let fixture: ComponentFixture<MyThesesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyThesesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyThesesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockedAcountsComponent } from './blocked-acounts.component';

describe('BlockedAcountsComponent', () => {
  let component: BlockedAcountsComponent;
  let fixture: ComponentFixture<BlockedAcountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlockedAcountsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockedAcountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

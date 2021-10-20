import { TestBed } from '@angular/core/testing';

import { UnLoggedGuard } from './un-logged.guard';

describe('UnLoggedGuard', () => {
  let guard: UnLoggedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UnLoggedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { AddGuardGuard } from './add-guard.guard';

describe('AddGuardGuard', () => {
  let guard: AddGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AddGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

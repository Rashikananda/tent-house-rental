import { TestBed } from '@angular/core/testing';

import { GuardServiceGuard } from './guard-service.guard';

describe('GuardServiceGuard', () => {
  let guard: GuardServiceGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GuardServiceGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

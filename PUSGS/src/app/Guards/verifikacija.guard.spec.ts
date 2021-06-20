import { TestBed } from '@angular/core/testing';

import { VerifikacijaGuard } from './verifikacija.guard';

describe('VerifikacijaGuard', () => {
  let guard: VerifikacijaGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(VerifikacijaGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { WorkrequestGuard } from './workrequest.guard';

describe('WorkrequestGuard', () => {
  let guard: WorkrequestGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(WorkrequestGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

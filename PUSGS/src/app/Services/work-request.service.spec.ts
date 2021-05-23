import { TestBed } from '@angular/core/testing';

import { WorkRequestService } from './work-request.service';

describe('WorkRequestService', () => {
  let service: WorkRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { ClockerService } from './clocker.service';

describe('ClockerService', () => {
  let service: ClockerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClockerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

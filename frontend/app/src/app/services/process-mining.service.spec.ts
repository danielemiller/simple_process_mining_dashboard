import { TestBed } from '@angular/core/testing';

import { ProcessMiningService } from './process-mining.service';

describe('ProcessMiningService', () => {
  let service: ProcessMiningService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProcessMiningService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

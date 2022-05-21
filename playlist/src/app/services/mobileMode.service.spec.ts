import { TestBed } from '@angular/core/testing';

import { MobileModeService } from './mobileMode.service';

describe('MobileModeService', () => {
  let service: MobileModeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MobileModeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { GeoServiceService } from './geo-service.service';

describe('GeoServiceService', () => {
  let service: GeoServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeoServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { GlobalVisivelService } from './global-visivel.service';

describe('GlobalVisivelService', () => {
  let service: GlobalVisivelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalVisivelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

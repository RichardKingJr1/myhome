import { TestBed } from '@angular/core/testing';

import { AddImovelService } from './add-imovel.service';

describe('AddImovelService', () => {
  let service: AddImovelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddImovelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { UtilFunctionsService } from './util-functions.service';

describe('UtilFunctionsService', () => {
  let service: UtilFunctionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtilFunctionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

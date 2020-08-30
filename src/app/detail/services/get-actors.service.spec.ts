import { TestBed } from '@angular/core/testing';

import { GetActorsService } from './get-actors.service';

describe('GetActorsService', () => {
  let service: GetActorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetActorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

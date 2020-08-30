import { TestBed } from '@angular/core/testing';

import { ObjectsContainerService } from './objects-container.service';

describe('ObjectsContainerService', () => {
  let service: ObjectsContainerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObjectsContainerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

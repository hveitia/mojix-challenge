import { TestBed } from '@angular/core/testing';

import { GetPopularMoviesService } from './get-popular-movies.service';

describe('GetPopularMoviesService', () => {
  let service: GetPopularMoviesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetPopularMoviesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

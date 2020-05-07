import { TestBed } from '@angular/core/testing';

import { HoroService } from './horo.service';

describe('HoroService', () => {
  let service: HoroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HoroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

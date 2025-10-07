import { TestBed } from '@angular/core/testing';

import { ComplexListService } from './complex-list';

describe('ComplexList', () => {
  let service: ComplexListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComplexListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { AdminsList } from './admins-list';

describe('AdminsList', () => {
  let service: AdminsList;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminsList);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { OrganizationService } from './organization.service';

describe('SchoolService', () => {
  let service: OrganizationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrganizationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

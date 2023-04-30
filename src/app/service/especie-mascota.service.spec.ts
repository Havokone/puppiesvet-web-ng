import { TestBed } from '@angular/core/testing';

import { EspecieMascotaService } from './especie-mascota.service';

describe('EspecieMascotaService', () => {
  let service: EspecieMascotaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EspecieMascotaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { RazaMascotaService } from './raza-mascota.service';

describe('RazaMascotaService', () => {
  let service: RazaMascotaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RazaMascotaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

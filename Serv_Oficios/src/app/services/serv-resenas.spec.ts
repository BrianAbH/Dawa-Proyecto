import { TestBed } from '@angular/core/testing';

import { ServResenas } from './serv-resenas';

describe('ServResenas', () => {
  let service: ServResenas;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServResenas);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

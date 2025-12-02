import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudResena } from './crud-resena';

describe('CrudResena', () => {
  let component: CrudResena;
  let fixture: ComponentFixture<CrudResena>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudResena]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudResena);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

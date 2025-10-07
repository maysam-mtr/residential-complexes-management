import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplexAdminComplexes } from './complex-admin-complexes';

describe('ComplexAdminComplexes', () => {
  let component: ComplexAdminComplexes;
  let fixture: ComponentFixture<ComplexAdminComplexes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComplexAdminComplexes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComplexAdminComplexes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

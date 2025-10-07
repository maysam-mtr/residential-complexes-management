import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplexesList } from './complexes-list';

describe('ComplexesList', () => {
  let component: ComplexesList;
  let fixture: ComponentFixture<ComplexesList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComplexesList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComplexesList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

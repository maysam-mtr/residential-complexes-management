import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildingAdminBuildings } from './building-admin-buildings';

describe('BuildingAdminBuildings', () => {
  let component: BuildingAdminBuildings;
  let fixture: ComponentFixture<BuildingAdminBuildings>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuildingAdminBuildings]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuildingAdminBuildings);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MantencionRutasPlanAutoComponent } from './mantencion-rutas-plan-auto.component';

describe('MantencionRutasPlanAutoComponent', () => {
  let component: MantencionRutasPlanAutoComponent;
  let fixture: ComponentFixture<MantencionRutasPlanAutoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MantencionRutasPlanAutoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MantencionRutasPlanAutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

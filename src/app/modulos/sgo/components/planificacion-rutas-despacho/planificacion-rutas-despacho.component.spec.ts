import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanificacionRutasDespachoComponent } from './planificacion-rutas-despacho.component';

describe('PlanificacionRutasDespachoComponent', () => {
  let component: PlanificacionRutasDespachoComponent;
  let fixture: ComponentFixture<PlanificacionRutasDespachoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanificacionRutasDespachoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanificacionRutasDespachoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

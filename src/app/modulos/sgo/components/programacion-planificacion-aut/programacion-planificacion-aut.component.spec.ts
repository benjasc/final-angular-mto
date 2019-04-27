import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramacionPlanificacionAutComponent } from './programacion-planificacion-aut.component';

describe('ProgramacionPlanificacionAutComponent', () => {
  let component: ProgramacionPlanificacionAutComponent;
  let fixture: ComponentFixture<ProgramacionPlanificacionAutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramacionPlanificacionAutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramacionPlanificacionAutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

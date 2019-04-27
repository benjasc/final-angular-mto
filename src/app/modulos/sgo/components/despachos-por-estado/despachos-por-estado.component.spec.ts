import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DespachosPorEstadoComponent } from './despachos-por-estado.component';

describe('DespachosPorEstadoComponent', () => {
  let component: DespachosPorEstadoComponent;
  let fixture: ComponentFixture<DespachosPorEstadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DespachosPorEstadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DespachosPorEstadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

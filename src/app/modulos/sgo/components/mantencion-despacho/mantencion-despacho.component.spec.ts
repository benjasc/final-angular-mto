import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MantencionDespachoComponent } from './mantencion-despacho.component';

describe('MantencionDespachoComponent', () => {
  let component: MantencionDespachoComponent;
  let fixture: ComponentFixture<MantencionDespachoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MantencionDespachoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MantencionDespachoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferenciaSucursalComponent } from './transferencia-sucursal.component';

describe('TransferenciaSucursalComponent', () => {
  let component: TransferenciaSucursalComponent;
  let fixture: ComponentFixture<TransferenciaSucursalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferenciaSucursalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferenciaSucursalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

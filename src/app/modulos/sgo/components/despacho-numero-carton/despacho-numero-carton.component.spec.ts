import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DespachoNumeroCartonComponent } from './despacho-numero-carton.component';

describe('DespachoNumeroCartonComponent', () => {
  let component: DespachoNumeroCartonComponent;
  let fixture: ComponentFixture<DespachoNumeroCartonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DespachoNumeroCartonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DespachoNumeroCartonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

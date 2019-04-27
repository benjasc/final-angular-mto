import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlProcesoComponent } from './control-proceso.component';

describe('ControlProcesoComponent', () => {
  let component: ControlProcesoComponent;
  let fixture: ComponentFixture<ControlProcesoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlProcesoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlProcesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

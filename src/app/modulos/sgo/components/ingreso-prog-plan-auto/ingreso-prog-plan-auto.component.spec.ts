import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresoProgPlanAutoComponent } from './ingreso-prog-plan-auto.component';

describe('IngresoProgPlanAutoComponent', () => {
  let component: IngresoProgPlanAutoComponent;
  let fixture: ComponentFixture<IngresoProgPlanAutoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngresoProgPlanAutoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngresoProgPlanAutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

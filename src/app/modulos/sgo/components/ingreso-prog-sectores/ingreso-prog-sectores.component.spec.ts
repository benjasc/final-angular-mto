import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresoProgSectoresComponent } from './ingreso-prog-sectores.component';

describe('IngresoProgSectoresComponent', () => {
  let component: IngresoProgSectoresComponent;
  let fixture: ComponentFixture<IngresoProgSectoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngresoProgSectoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngresoProgSectoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

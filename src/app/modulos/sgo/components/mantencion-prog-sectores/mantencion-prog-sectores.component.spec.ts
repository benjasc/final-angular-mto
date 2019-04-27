import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MantencionProgSectoresComponent } from './mantencion-prog-sectores.component';

describe('MantencionProgSectoresComponent', () => {
  let component: MantencionProgSectoresComponent;
  let fixture: ComponentFixture<MantencionProgSectoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MantencionProgSectoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MantencionProgSectoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

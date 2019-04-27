import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NcvencimientoRetComponent } from './ncvencimiento-ret.component';

describe('NcvencimientoRetComponent', () => {
  let component: NcvencimientoRetComponent;
  let fixture: ComponentFixture<NcvencimientoRetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NcvencimientoRetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NcvencimientoRetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LpnbatchNumberComponent } from './lpnbatch-number.component';

describe('LpnbatchNumberComponent', () => {
  let component: LpnbatchNumberComponent;
  let fixture: ComponentFixture<LpnbatchNumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LpnbatchNumberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LpnbatchNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

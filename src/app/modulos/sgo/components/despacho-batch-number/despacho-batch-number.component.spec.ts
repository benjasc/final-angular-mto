import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DespachoBatchNumberComponent } from './despacho-batch-number.component';

describe('DespachoBatchNumberComponent', () => {
  let component: DespachoBatchNumberComponent;
  let fixture: ComponentFixture<DespachoBatchNumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DespachoBatchNumberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DespachoBatchNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

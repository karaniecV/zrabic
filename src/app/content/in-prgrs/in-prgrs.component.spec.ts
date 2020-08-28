import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InPrgrsComponent } from './in-prgrs.component';

describe('InPrgrsComponent', () => {
  let component: InPrgrsComponent;
  let fixture: ComponentFixture<InPrgrsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InPrgrsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InPrgrsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

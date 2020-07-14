import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartPgComponent } from './start-pg.component';

describe('StartPgComponent', () => {
  let component: StartPgComponent;
  let fixture: ComponentFixture<StartPgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartPgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartPgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

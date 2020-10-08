import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { TaskService } from 'src/app/shared/services/task-service/task.service';

import { TaskComponent } from './task.component';

describe('TaskComponent', () => {
  let component: TaskComponent;
  let fixture: ComponentFixture<TaskComponent>;
  const TASK_SERVICE_MOCK = {
    getTaskId: () => true
  }
  const ROUTER_MOCK = {}
  const ACTIVATED_ROUTE_MOCK = {
    paramMap: of({
      has: () => true,
      get: () => 1,
      getAll: () => [1, 2, 3],
    })
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskComponent ],
      providers: [
        {provide: TaskService, usValue: TASK_SERVICE_MOCK},
        {provide: Router, usValue: ROUTER_MOCK},
        {provide: ActivatedRoute, usValue: ACTIVATED_ROUTE_MOCK},
      ]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('onInit should be work', () => {
    component.ngOnInit();
    expect(component.taskId).toBe('1')



    // expect(component).toBeTruthy();
  });


});

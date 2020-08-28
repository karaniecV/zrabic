import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Task } from '../../models/task.model';
import { TaskService } from './task.service';

@Injectable({
  providedIn: 'root',
})

export class TaskDResolver implements Resolve<Task[]>{

  constructor(private taskService: TaskService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Task[]> {
    return this.taskService.getDTasks()
  }

}

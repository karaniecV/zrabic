import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CONFIG } from './../../config';
import { tap, map} from 'rxjs/operators';
import { Task } from '../../models/task.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  tasks: Task[];

  constructor(private http: HttpClient) { }

  addNewTodoTask(task, aniBase) {
    return this.http.post(`${CONFIG.dataBaseUsers}/${localStorage
      .getItem(`${CONFIG.localStorageUserId}`)}/${aniBase}.json`, task)
  }

  getTodoTasks() : Observable<Task[]>{
    return this.http.get(`${CONFIG.dataBaseUsers}/${localStorage
      .getItem(`${CONFIG.localStorageUserId}`)}/${CONFIG.todoBase}.json`)
      .pipe(
        map((data) => {
          console.log(data)
          const tasks = [];
          for (let key in data) {
            tasks.unshift({ id: key, ...data[key] });
          }
          this.tasks = tasks;
          return this.tasks;
        }
        //   : { name: string }) => {
        //   this.tasks.unshift({ id: data.name, ...tasks })
        // }
        )
      )
  }

  getInProgressTasks(folder) {
    return this.http.get(`${CONFIG.dataBaseUsers}/${localStorage
      .getItem(`${CONFIG.localStorageUserId}`)}/${folder}.json`)
  }



}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CONFIG } from './../../config';
import { tap, map} from 'rxjs/operators';
import { Task } from '../../models/task.model';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private _tasks: Task[];
  private _listChange: BehaviorSubject<any> = new BehaviorSubject<any>(this._tasks);

  get tasks() {
    return this._listChange.asObservable();
  }

  constructor(private http: HttpClient) { }

  addNewTodoTask(task, aniBase) {
    return this.http.post(`${CONFIG.dataBaseUsers}/${localStorage
      .getItem(`${CONFIG.localStorageUserId}`)}/${aniBase}.json`, task)
      .pipe(
        tap((data: { name: string }) => {
          this._tasks.unshift({ id: data.name, ...task })
        })
      )
    }

  getTodoTasks(): Observable<Task[]>{
    return this.http.get(`${CONFIG.dataBaseUsers}/${localStorage
      .getItem(`${CONFIG.localStorageUserId}`)}/${CONFIG.todoBase}.json`)
      .pipe(
        map((data) => {
          const tasks = [];
          for (let key in data) {
            tasks.unshift({ id: key, ...data[key] });
          }
          this._tasks = tasks;
          return this._tasks;
        }
        )
      )
  }

  getInProgressTasks(folder) {
    return this.http.get(`${CONFIG.dataBaseUsers}/${localStorage
      .getItem(`${CONFIG.localStorageUserId}`)}/${folder}.json`)
  }



}

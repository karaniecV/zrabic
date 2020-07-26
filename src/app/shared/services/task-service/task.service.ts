import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { Task } from '../../models/task.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { CONFIG } from 'src/app/shared/config';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private _tasks: Task[];
  private _tasksIP: Task[];
  private _tasksD: Task[];
  // private _listChange: BehaviorSubject<any> = new BehaviorSubject<any>(this._tasks);

  // get tasks() {
  //   return this._listChange.asObservable();

  // }


  constructor(private http: HttpClient) { }

  addTask(task, state) {
    return this.http.post(`${CONFIG.dataBaseUsers}/${localStorage
      .getItem(`${CONFIG.localStorageUserId}`)}/${state}.json`, task)
      .pipe(
        tap((data: { name: string }) => {
          this._tasks.unshift({ id: data.name, ...task })
        })
      )
  }

  changeTask(task, id, state) {
    return this.http.put(`${CONFIG.dataBaseUsers}/${localStorage
      .getItem(`${CONFIG.localStorageUserId}`)}/${state}/${id}.json`, task)
      .pipe(
        tap((data: { name: string }) => {
          this._tasks.unshift({ id: data.name, ...task })
        })
      )
  }

  addTaskIP(task, state) {
    return this.http.post(`${CONFIG.dataBaseUsers}/${localStorage
      .getItem(`${CONFIG.localStorageUserId}`)}/${state}.json`, task)
      .pipe(
        tap((data: { name: string }) => {
          this._tasksIP.unshift({ id: data.name, ...task })
        })
      )
  }

  addTaskD(task, state) {
    return this.http.post(`${CONFIG.dataBaseUsers}/${localStorage
      .getItem(`${CONFIG.localStorageUserId}`)}/${state}.json`, task)
      .pipe(
        tap((data: { name: string }) => {
          this._tasksD.unshift({ id: data.name, ...task })
        })
      )
  }

  getTodoTasks(): Observable<Task[]> {
    return this.http.get(`${CONFIG.dataBaseUsers}/${localStorage
      .getItem(`${CONFIG.localStorageUserId}`)}/${CONFIG.todo}.json`)
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

  getIPTasks(): Observable<Task[]> {
    return this.http.get(`${CONFIG.dataBaseUsers}/${localStorage
      .getItem(`${CONFIG.localStorageUserId}`)}/${CONFIG.inProgress}.json`)
      .pipe(
        map((data) => {
          const tasks = [];
          for (let key in data) {
            tasks.unshift({ id: key, ...data[key] });
          }
          this._tasksIP = tasks;
          return this._tasksIP;
        }
        )
      )
  }
  getDTasks(): Observable<Task[]> {
    return this.http.get(`${CONFIG.dataBaseUsers}/${localStorage
      .getItem(`${CONFIG.localStorageUserId}`)}/${CONFIG.done}.json`)
      .pipe(
        map((data) => {
          const tasks = [];
          for (let key in data) {
            tasks.unshift({ id: key, ...data[key] });
          }
          this._tasksD = tasks;
          return this._tasksD;
        }
        )
      )
  }

  getTaskId(id: string) {
    const post = this._tasks.find(
      (p) => {
        return String(p.id) === String(id);
      })
    if (!post) {
      let post = this._tasksIP.find(
        (p) => {
          return String(p.id) === String(id);
        })
      if (!post) {
        let post = this._tasksD.find(
          (p) => {
            return String(p.id) === String(id);
          })
        return post
      } else { return post }
    } else { return post }
  }

  deleteTask(id, state) {
    return this.http.delete(`${CONFIG.dataBaseUsers}/${localStorage
      .getItem(`${CONFIG.localStorageUserId}`)}/${state}/${id}.json`)
      .pipe(
        tap((data) => {
          console.log('data', data)
          return data;
        })
      )
  }



}

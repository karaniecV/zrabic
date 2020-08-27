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
    return this.http.post(`${CONFIG.dataBaseUsers}/tasksData/${localStorage
      .getItem(`${CONFIG.localStorageUserId}`)}.json`, task)
      .pipe(
        tap((data: { name: string }) => {
          if (state === CONFIG.todo) {
            this._tasks.unshift({ id: data.name, ...task })
          } else if (state === CONFIG.inProgress) {
            this._tasksIP.unshift({ id: data.name, ...task })
          } else if (state === CONFIG.done) {
            this._tasksD.unshift({ id: data.name, ...task })
          }
        })
      )
  }

  changeTask(task, id, state) {
    return this.http.put(`${CONFIG.dataBaseUsers}/tasksData/${localStorage
      .getItem(`${CONFIG.localStorageUserId}`)}/${id}.json`, task)
      .pipe(
        tap((data: { name: string }) => {
          if (state === CONFIG.todo) {
            this._tasks.unshift({ id: data.name, ...task })
          } else if (state === CONFIG.inProgress) {
            this._tasksIP.unshift({ id: data.name, ...task })
          } else if (state === CONFIG.done) {
            this._tasksD.unshift({ id: data.name, ...task })
          }
        })
      )
  }

  // addTaskIP(task, state) {
  //   return this.http.post(`${CONFIG.dataBaseUsers}/tasksData/${localStorage
  //     .getItem(`${CONFIG.localStorageUserId}`)}/${state}.json`, task)
  //     .pipe(
  //       tap((data: { name: string }) => {
  //         this._tasksIP.unshift({ id: data.name, ...task })
  //       })
  //     )
  // }

  // addTaskD(task, state) {
  //   return this.http.post(`${CONFIG.dataBaseUsers}/tasksData/${localStorage
  //     .getItem(`${CONFIG.localStorageUserId}`)}/${state}.json`, task)
  //     .pipe(
  //       tap((data: { name: string }) => {
  //         this._tasksD.unshift({ id: data.name, ...task })
  //       })
  //     )
  // }

  getTasks(): Observable<Task[]> {
    return this.http.get(`${CONFIG.dataBaseUsers}/tasksData/${localStorage
      .getItem(`${CONFIG.localStorageUserId}`)}.json`)
      .pipe(
        map((data) => {
          let tasks = [];
          for (let key in data) {
            tasks.unshift({ id: key, ...data[key] })
          }
          tasks = tasks.filter(item => item.state == CONFIG.todo)
          this._tasks = tasks;
          return this._tasks;
        }
        )
      )
  }

  getIPTasks(): Observable<Task[]> {
    return this.http.get(`${CONFIG.dataBaseUsers}/tasksData/${localStorage
      .getItem(`${CONFIG.localStorageUserId}`)}.json`)
      .pipe(
        map((data) => {
          let tasks = [];
          for (let key in data) {
            tasks.unshift({ id: key, ...data[key] })
          }
          tasks = tasks.filter(item => item.state == CONFIG.inProgress)
          this._tasksIP = tasks;
          return this._tasksIP;
        }
        )
      )
  }

  getDTasks(): Observable<Task[]> {
    return this.http.get(`${CONFIG.dataBaseUsers}/tasksData/${localStorage
      .getItem(`${CONFIG.localStorageUserId}`)}.json`)
      .pipe(
        map((data) => {
          let tasks = [];
          for (let key in data) {
            tasks.unshift({ id: key, ...data[key] })
          }
          tasks = tasks.filter(item => item.state == CONFIG.done)
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
    if (state == CONFIG.todo) {
      this._tasks = this._tasks.filter(i => i.id !== id)
      console.log('this._tasks', this._tasks)
    } else if (state == CONFIG.inProgress) {
      this._tasksIP = this._tasksIP.filter(i => i.id !== id)
    } else if (state == CONFIG.done) {
      this._tasksD = this._tasksD.filter(i => i.id !== id)
    }
    return this.http.delete(`${CONFIG.dataBaseUsers}/tasksData/${localStorage
      .getItem(`${CONFIG.localStorageUserId}`)}/${id}.json`)
  }

  ELEMENT_DATA: Task[] = []

  getAllTasks(): Observable<Task[]> {
    return this.http.get(`${CONFIG.dataBaseUsers}/tasksData.json`)
      .pipe(
        map((data) => {
          const tasks = [];
          for (let key in data) {
            tasks.unshift({ id: key, ...data[key] });
          }
          tasks.forEach(i => {
              const tasks1 = [];
              for (let key in i) {
                tasks1.unshift({ id: key, ...i[key] });
              }
              tasks1.pop();
              // const ELEMENT_DATA = [];
              tasks1.forEach(i => this.ELEMENT_DATA.push(i))
              this.ELEMENT_DATA.forEach(i => {
                // delete i.date
                // delete i.id
                // delete i.name
              })
            })
          
          return this.ELEMENT_DATA;
        })
      )
  }



}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CONFIG } from './../../config';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  addNewTodoTask(task, aniBase) {
    return this.http.post(`${CONFIG.dataBaseUsers}/${localStorage
      .getItem(`${CONFIG.localStorageUserId}`)}/${aniBase}.json`, task)
  }

  getTodoTasks() {
    return this.http.get(`${CONFIG.dataBaseUsers}/${localStorage
      .getItem(`${CONFIG.localStorageUserId}`)}/${CONFIG.todoBase}.json`)
      // .pipe(
      //   tap((data: { name: string }) => {
      //     this._posts.unshift({ id: data.name, ...post })
      //   })
      // )
  }

  getInProgressTasks(folder) {
    return this.http.get(`${CONFIG.dataBaseUsers}/${localStorage
      .getItem(`${CONFIG.localStorageUserId}`)}/${folder}.json`)
  }



}

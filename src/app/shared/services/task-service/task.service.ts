import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CONFIG } from './../../config';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  addNewTodoTask(task){
    this.http.post(`${CONFIG.dataBaseUsers}/${localStorage.getItem(`${CONFIG.userId}`)}.json`, task)
  }



}

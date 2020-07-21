import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { TaskService } from '../../shared/services/task-service/task.service';
import { CONFIG } from './../../shared/config';
import { Task } from 'src/app/shared/models/task.model';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  hide = false;
  tasks: Task[] = [];
  title = new FormControl('', [Validators.required]);
  body = new FormControl('', [Validators.required]);
  date = new FormControl('', [Validators.required]);

  constructor( private taskService: TaskService) { }

  ngOnInit(): void {
    if(localStorage.getItem(CONFIG.localStorageUserId)){
      this.taskService.getTodoTasks()
      .subscribe((data: Task[]) => {
        this.tasks = data
      }
      )
    }
  }

  onCreateTask(){
    const task = {
      title: `${this.title.value}`,
      body: `${this.body.value}`,
      date: `${this.date.value}` 
    }
    this.taskService.addNewTodoTask(task, CONFIG.todoBase).subscribe()
  }

  closeForm(){
    this.hide = false;
    this.title.reset();
    this.body.reset();
    this.date.reset();
  }

}

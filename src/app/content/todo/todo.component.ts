import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { TaskService } from '../../shared/services/task-service/task.service';
import { Task } from 'src/app/shared/models/task.model';
import { CONFIG } from 'src/app/shared/config';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit, OnDestroy {

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
        let tasks: Task[] = []
        tasks = data
        data.filter(i =>{
          if(i.state == CONFIG.todo){
            this.tasks.push
          }
        })
      }
      )
    }
  }

  onCreateTask(){
    if(this.title.valid && this.body.valid && this.date.valid){
    const task = {
      title: `${this.title.value}`,
      body: `${this.body.value}`,
      date: `${this.date.value} `,
      state:  CONFIG.todo
    }
    this.taskService.addTask(task, CONFIG.todo).subscribe()
    this.closeForm()
  }
}

  closeForm(){
    this.hide = false;
    this.title.reset();
    this.body.reset();
    this.date.reset();
  }

  ngOnDestroy(){

  }

}

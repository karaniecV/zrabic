import { Component, OnInit } from '@angular/core';
import { CONFIG } from 'src/app/shared/config';
import { FormControl, Validators } from '@angular/forms';
import { Task } from '../shared/models/task.model';
import { TaskService } from '../shared/services/task-service/task.service';
import { AuthService } from '../shared/services/auth.service';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  user = false;
  hide = false;
  noTasks = false;
  tasksTD: Task[];
  tasksIP: Task[];
  tasksD: Task[];
  title = new FormControl('', [Validators.required]);
  body = new FormControl('', [Validators.required]);
  date = new FormControl('', [Validators.required]);
  state: string;

  constructor(private taskService: TaskService, private authService: AuthService) { }

  ngOnInit(): void {
    if(localStorage.getItem(`${CONFIG.localStorageUserId}`)){
      this.user = true;
    }
    if (localStorage.getItem(CONFIG.localStorageUserId)) {
      this.taskService.getIPTasks().subscribe((data: Task[]) => {
        this.tasksIP = data
      });
      this.taskService.getDTasks().subscribe((data: Task[]) => {
        this.tasksD = data
      });
      this.taskService.getTasks().subscribe((data: Task[]) => {
        this.tasksTD = data
      });
    }
  }

  onStateTodo(){
    this.state = CONFIG.todo;
    this.hide = true;
  }

  onStateInProgress(){
    this.state = CONFIG.inProgress;
    this.hide = true;
  }

  onStateDone(){
    this.state = CONFIG.done;
    this.hide = true;
  }

  onCreateTask() {
    if (this.title.valid && this.body.valid && this.date.valid) {
      const task = {
        title: `${this.title.value}`,
        body: `${this.body.value}`,
        date: `${this.date.value} `,
        state: this.state,
        name: this.authService.userName.value.name
      }
      this.taskService.addTask(task, this.state).subscribe()
      this.closeForm()
    }
  }

  closeForm() {
    this.hide = false;
    this.state = null;
    this.title.reset();
    this.body.reset();
    this.date.reset();
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer != event.container) {
      debugger
      if (event.previousContainer.id == 'tdList') {
        let movedTask = this.tasksTD[`${event.previousIndex}`];
        if (event.container.id == 'dList') {
          const task = {
            title: movedTask.title,
            body: movedTask.body,
            date: movedTask.date,
            state: CONFIG.done,
            name: movedTask.name
          }
          this.taskService.changeTask(task, movedTask.id, CONFIG.done).subscribe()
        } else {
          const task = {
            title: movedTask.title,
            body: movedTask.body,
            date: movedTask.date,
            state: CONFIG.inProgress,
            name: movedTask.name
          }
          this.taskService.changeTask(task, movedTask.id, CONFIG.inProgress).subscribe()
        }
        this.tasksTD.splice(event.previousIndex, 1)

      } else if (event.previousContainer.id == 'ipList') {
        let movedTask = this.tasksIP[`${event.previousIndex}`];
        if (event.container.id == 'dList') {
          const task = {
            title: movedTask.title,
            body: movedTask.body,
            date: movedTask.date,
            state: CONFIG.done,
            name: movedTask.name
          }
          this.taskService.changeTask(task, movedTask.id, CONFIG.done).subscribe()
        } else {
          const task = {
            title: movedTask.title,
            body: movedTask.body,
            date: movedTask.date,
            state: CONFIG.todo,
            name: movedTask.name
          }
          this.taskService.changeTask(task, movedTask.id, CONFIG.todo).subscribe()
        }
        this.tasksIP.splice(event.previousIndex, 1)
      } else if (event.previousContainer.id == 'dList') {
        let movedTask = this.tasksD[`${event.previousIndex}`];
        if (event.container.id == 'tdList') {
          const task = {
            title: movedTask.title,
            body: movedTask.body,
            date: movedTask.date,
            state: CONFIG.todo,
            name: movedTask.name
          }
          this.taskService.changeTask(task, movedTask.id, CONFIG.todo).subscribe()
        } else {
          const task = {
            title: movedTask.title,
            body: movedTask.body,
            date: movedTask.date,
            state: CONFIG.inProgress,
            name: movedTask.name
          }
          this.taskService.changeTask(task, movedTask.id, CONFIG.inProgress).subscribe()
        }
        this.tasksD.splice(event.previousIndex, 1)
      }
    }
  }



}
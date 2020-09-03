import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormControl, Validators } from '@angular/forms';
import { TaskService } from 'src/app/shared/services/task-service/task.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CONFIG } from 'src/app/shared/config';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  @ViewChild('form', { static: true }) formPost: NgForm;

  task: any;
  taskId: string;
  hide = false;
  isMoved = false;
  isDeleted = false;
  isDeletedOk: any;
  title = new FormControl('', [Validators.required]);
  body = new FormControl('', [Validators.required]);
  date = new FormControl('', [Validators.required]);

  constructor(
    private taskService: TaskService,
    private activatedRoute: ActivatedRoute,
    private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    if (localStorage.getItem(`${CONFIG.localStorageUserId}`)) {
      this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
        this.taskId = paramMap.get('id');
        this.task = this.taskService.getTaskId(this.taskId);
      });
    }
  }

  onDeleteTask() {
    const isDelete = confirm("Will you want delete this task?");
    if (isDelete) {
      this.taskService.deleteTask(this.task.id, this.task.state)
        .subscribe()
      this.router.navigate([CONFIG.redirectUrl])
    }
  }

  onMoveTaskToDone() {
    const task = {
      title: this.task.title,
      body: this.task.body,
      date: this.task.date,
      state: CONFIG.done,
      name: this.task.name
    }
    this.taskService.changeTask(task, this.task.id, CONFIG.done)
      .subscribe()
    this.toMainPage()
  }

  onMoveTaskToInProgress() {
    const task = {
      title: this.task.title,
      body: this.task.body,
      date: this.task.date,
      state: CONFIG.inProgress,
      name: this.task.name
    }
    this.taskService.changeTask(task, this.task.id, CONFIG.inProgress)
      .subscribe()
    this.toMainPage()
  }

  onMoveTaskToTodo() {
    const task = {
      title: this.task.title,
      body: this.task.body,
      date: this.task.date,
      state: CONFIG.todo,
      name: this.task.name
    }
    this.taskService.changeTask(task, this.task.id, CONFIG.todo)
      .subscribe()
    this.toMainPage()
  }

  onEditTask() {
    if (this.title.valid && this.body.valid && this.date.valid) {
      this.task = {
        title: this.title.value,
        body: this.body.value,
        date: this.date.value,
        state: this.task.state,
        name: this.task.name
      }
      this.taskService.changeTask(this.task, this.taskId, this.task.state).subscribe(data => {
        if (data) {
          this.hide = false
        }
      })
    }
  }

  toMainPage() {
    this.router.navigate([''])
  }

}

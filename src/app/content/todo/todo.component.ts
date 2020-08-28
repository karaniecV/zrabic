import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { TaskService } from '../../shared/services/task-service/task.service';
import { Task } from 'src/app/shared/models/task.model';
import { CONFIG } from 'src/app/shared/config';
import { Observable } from 'rxjs';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  hide = false;
  tasks: Observable<Task[]>;
  title = new FormControl('', [Validators.required]);
  body = new FormControl('', [Validators.required]);
  date = new FormControl('', [Validators.required]);
  userName: string;

  constructor(private taskService: TaskService, private authService: AuthService) { }

  ngOnInit(): void {
    if (localStorage.getItem(CONFIG.localStorageUserId)) {
      this.tasks = this.taskService.getTasks()
    }
  }

  onCreateTask() {
    if (this.title.valid && this.body.valid && this.date.valid) {
      const task = {
        title: `${this.title.value}`,
        body: `${this.body.value}`,
        date: `${this.date.value} `,
        state: CONFIG.todo,
        name: this.authService.userName.value.name
      }
      this.taskService.addTask(task, CONFIG.todo).subscribe()
      this.closeForm()
    }
  }

  closeForm() {
    this.hide = false;
    this.title.reset();
    this.body.reset();
    this.date.reset();
  }

}

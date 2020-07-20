import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/shared/services/task-service/task.service';
import { FormControl, Validators } from '@angular/forms';
import { CONFIG } from 'src/app/shared/config';

@Component({
  selector: 'app-in-prgrs',
  templateUrl: './in-prgrs.component.html',
  styleUrls: ['./in-prgrs.component.scss']
})
export class InPrgrsComponent implements OnInit {

  hide = false;
  noTasks = false;

  title = new FormControl('', [Validators.required]);
  body = new FormControl('', [Validators.required]);
  date = new FormControl('', [Validators.required]);


  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    if (localStorage.getItem(CONFIG.localStorageUserId)) {
      this.taskService.getInProgressTasks(CONFIG.inProgressBase)
        .subscribe(data => {
          if (!data) {
            this.noTasks = true;
          } else this.noTasks = false
          // console.log('getTsksIP', data)
        }
        )
    }
  }

  onCreateTask() {
    const task = {
      title: this.title.value,
      body: this.body.value,
      date: this.date.value
    }
    this.taskService.addNewTodoTask(task, CONFIG.inProgressBase).subscribe(data => console.log('inprogr', data))

  }
  closeForm(){
    this.hide = false;
    this.title.reset();
    this.body.reset();
    this.date.reset();
  }

}

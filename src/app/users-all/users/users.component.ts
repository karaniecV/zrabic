import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/shared/services/task-service/task.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users = [];

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.taskService.getUsersTasks().subscribe(data => {
      data.forEach(i => {
        const mapped = Object.keys(i)
          .map(key => ({ type: key, value: i[key] }))
        this.users.unshift(mapped)
      })
    })
  }

  
}

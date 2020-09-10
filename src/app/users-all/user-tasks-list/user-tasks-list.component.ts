import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Task } from 'src/app/shared/models/task.model';
import { TaskService } from 'src/app/shared/services/task-service/task.service';

@Component({
  selector: 'app-user-tasks-list',
  templateUrl: './user-tasks-list.component.html',
  styleUrls: ['./user-tasks-list.component.scss']
})
export class UserTasksListComponent implements OnInit {

  userId: string;
  userTasks: Task[];
  userTask: Task;
  hide = true;

  constructor(private activatedRoute: ActivatedRoute, private taskService: TaskService, private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.userId = paramMap.get('id');
      this.taskService.getUserTasks(this.userId).subscribe(data => {
        this.userTasks = data;
      });
    });
  }

  showTask(item) {
    // this.router.navigate(['/id/item'])
    this.hide = false;
    this.userTask = item;
  }

}

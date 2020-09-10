import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { TaskService } from '../../shared/services/task-service/task.service';
import { Task } from 'src/app/shared/models/task.model';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent implements OnInit {
  taskId: string;
  task: Task;
  userId: string;

  constructor(private activatedRoute: ActivatedRoute, private taskService: TaskService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.taskId = paramMap.get('task.id');
      this.userId = paramMap.get('id');
      this.taskService.getUserTasks(this.userId).subscribe(data => {
        data.forEach(item => {
          if (item.id == this.taskId) {
            this.task = item
          }
        });
      });
    })
  }
}



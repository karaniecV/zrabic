import { Component, OnInit } from '@angular/core';
import { TaskService } from '../shared/services/task-service/task.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
   this.taskService.getAllTasks().subscribe()
  }

}

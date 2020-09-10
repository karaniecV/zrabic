import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContentComponent } from './content.component';
import { AuthResolver } from '../auth/auth-service/auth.resolver';
import { TodoComponent } from './todo/todo.component';
import { InPrgrsComponent } from './in-prgrs/in-prgrs.component';
import { DoneComponent } from './done/done.component';
import { TaskComponent } from './task/task.component';
import { TaskResolver } from '../shared/services/task-service/task.resolver';


const routes: Routes = [
  { path: '', component: ContentComponent,
    resolve: { userName: AuthResolver },
  },
  { path: 'todo-list', component: TodoComponent },
  { path: 'in-progress-list', component: InPrgrsComponent },
  { path: 'done-list', component: DoneComponent },
  { path: 'tasks/:id', component: TaskComponent,
    resolve: { tasks: TaskResolver }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ContentRoutingModule { }

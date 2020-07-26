import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogInComponent } from './log-in/log-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ContentComponent } from './content/content.component';
import { TaskComponent } from './content/task/task.component';
import { TaskResolver } from './shared/services/task-service/task.resolver';
import { TodoComponent } from './content/todo/todo.component';
import { InPrgrsComponent } from './content/in-prgrs/in-prgrs.component';


const routes: Routes = [
  {path: '', component: ContentComponent},
  {path: 'log-in', component: LogInComponent},
  {path: 'tasks/:id', component: TaskComponent,
  resolve: {tasks: TaskResolver}} ,
  {path: 'sign-up', component: SignUpComponent},
  {path: 'todo-list', component: TodoComponent},
  {path: 'in-progress-list', component: InPrgrsComponent},
  {path: 'done-list', component: TodoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

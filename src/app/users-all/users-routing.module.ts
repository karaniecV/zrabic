import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { UsersListComponent } from './users-list/users-list.component';
import { UserTasksListComponent } from './user-tasks-list/user-tasks-list.component';
import { TaskItemComponent } from './task-item/task-item.component';


const routes: Routes = [
  { path: 'users-list', component: UsersListComponent },
  { path: 'users', component: UsersComponent },
  { path: 'users/:id', component: UserTasksListComponent },
  { path: 'users/:id/:task.id', component: TaskItemComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }

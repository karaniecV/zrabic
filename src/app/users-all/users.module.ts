import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersComponent } from './users/users.component';
import { UserTasksListComponent } from './user-tasks-list/user-tasks-list.component';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UsersRoutingModule } from './users-routing.module';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { TaskItemComponent } from './task-item/task-item.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    UsersListComponent,
    UsersComponent,
    UserTasksListComponent,
    TaskItemComponent

  ],
  imports: [
    CommonModule,
    RouterModule.forChild([]),
    MatTableModule,
    MatFormFieldModule,
    UsersRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatInputModule,
  ]
})
export class UsersModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ContentComponent } from './content.component';
import { ContentRoutingModule } from './content-routing.module';
import { TodoComponent } from './todo/todo.component';
import { InPrgrsComponent } from './in-prgrs/in-prgrs.component';
import { DoneComponent } from './done/done.component';
import { TaskComponent } from './task/task.component';
import { RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';



@NgModule({
  declarations: [
    ContentComponent,
    TodoComponent,
    InPrgrsComponent,
    DoneComponent,
    TaskComponent

  ],
  imports: [
    CommonModule,
    RouterModule.forChild([]),
    ContentRoutingModule,
    DragDropModule,
    MatMenuModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatNativeDateModule,
  ]
})
export class ContentModule { }

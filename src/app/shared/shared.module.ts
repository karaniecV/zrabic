import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorsComponent } from './errors/errors.component';
import { LoaderComponent } from './loader/loader.component';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    ErrorsComponent,
    HeaderComponent,
    LoaderComponent,
  ],
  exports:[
    ErrorsComponent,
    HeaderComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([])
  ]
})
export class SharedModule { }

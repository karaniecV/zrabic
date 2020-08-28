import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { HeaderComponent } from './header/header.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LogInComponent } from './log-in/log-in.component';
import { MatIconModule } from '@angular/material/icon';
import { ErrorsComponent } from './shared/errors/errors.component';
import { ErrorInterceptor } from './shared/errors/error.interceptor';
import { ContentComponent } from './content/content.component';
import { TodoComponent } from './content/todo/todo.component';
import { InPrgrsComponent } from './content/in-prgrs/in-prgrs.component';
import { DoneComponent } from './content/done/done.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { TaskComponent } from './content/task/task.component';
import { UsersListComponent } from './users-list/users-list.component';
import { MatTableModule } from '@angular/material/table';
import { LoaderComponent } from './loader/loader.component';
import { LoaderInterceptor } from './loader/loader.interceptor';
import { Focus1Directive } from './shared/services/directives/focus1.directive';
import { Focus2Directive } from './shared/services/directives/focus2.directive';

@NgModule({
  declarations: [
    Focus1Directive,
    Focus2Directive,
    AppComponent,
    HeaderComponent,
    SignUpComponent,
    LogInComponent,
    ErrorsComponent,
    ContentComponent,
    TodoComponent,
    InPrgrsComponent,
    DoneComponent,
    TaskComponent,
    UsersListComponent,
    LoaderComponent
  ],
  imports: [
  BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    ReactiveFormsModule,
    MatStepperModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    HttpClientModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule
    


  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true},


  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

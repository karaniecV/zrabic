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
import {MatStepperModule} from '@angular/material/stepper';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { LogInComponent } from './log-in/log-in.component';
import { MatIconModule } from '@angular/material/icon';
import { ContentComponent } from './content/content.component';
import { StartPgComponent } from './content/start-pg/start-pg.component';
import { TodoComponent } from './content/todo/todo.component';
import { InPrgrsComponent } from './content/in-prgrs/in-prgrs.component';
import { DoneComponent } from './content/done/done.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SignUpComponent,
    LogInComponent,
    ContentComponent,
    StartPgComponent,
    TodoComponent,
    InPrgrsComponent,
    DoneComponent
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
    MatNativeDateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogInComponent } from './log-in/log-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ContentComponent } from './content/content.component';


const routes: Routes = [
  {path: '', component: ContentComponent},
  {path: 'log-in', component: LogInComponent},
  {path: 'sign-up', component: SignUpComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

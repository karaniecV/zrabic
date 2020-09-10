import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContentComponent } from './content/content.component';
import { AuthResolver } from './auth/auth-service/auth.resolver';


const routes: Routes = [
  { path: '', component: ContentComponent,
    resolve: { userName: AuthResolver },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { CONFIG } from './shared/config';
import { UserName } from './shared/models/user-name.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  user: string;
  // userName =

  constructor(private authService: AuthService){}

  ngOnInit(){
    console.log('1')
    this.authService.autoLogIn();
  }
}

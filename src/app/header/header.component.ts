import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { CONFIG } from 'src/app/shared/config';
import { UserName } from '../shared/models/user-name.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user: string;
  $user = this.authService.user;


  constructor( private authService: AuthService) { }

  ngOnInit(): void {
    console.log('3')
    if(localStorage.getItem(`${CONFIG.localStorageUserId}`)){
      this.user = localStorage.getItem(`${CONFIG.localStorageUserId}`)
    }
    this.authService.getSignUser(this.user).subscribe((data: UserName) => console.log(data.userName))
  }


  onLogOut(){
    this.authService.logOut()
  }

}

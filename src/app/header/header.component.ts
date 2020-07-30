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
  userName: string;
  $userName = this.authService.userName;
  


  constructor( private authService: AuthService) { }

  ngOnInit(): void {
    console.log('3')
    if(localStorage.getItem(`${CONFIG.localStorageUserId}`)){
      this.user = localStorage.getItem(`${CONFIG.localStorageUserId}`)
      this.authService.getSignUser(this.user).subscribe((data: UserName) => this.userName = data.name)

    }
    // this.authService.userName.subscribe(a=>{console.log(a)})

  }


  onLogOut(){
    this.authService.logOut()
  }

}

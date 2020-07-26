import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { CONFIG } from 'src/app/shared/config';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user: string;

  constructor( private authService: AuthService) { }

  ngOnInit(): void {
    if(localStorage.getItem(`${CONFIG.localStorageUserId}`)){
      this.user = localStorage.getItem(`${CONFIG.localStorageUserId}`)
    }
  }
  onLogOut(){
    this.authService.logOut()
  }

}

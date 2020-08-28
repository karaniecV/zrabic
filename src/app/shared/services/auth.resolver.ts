import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserName } from '../models/user-name.model';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { CONFIG } from 'src/app/shared/config';

@Injectable({
  providedIn: 'root'
})
export class AuthResolver implements Resolve<UserName>{
  
  constructor(private authServise: AuthService){}

  resolve(router: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UserName>{
    if(localStorage.getItem(`${CONFIG.localStorageUserId}`)){
    return this.authServise.getSignUser(localStorage.getItem(`${CONFIG.localStorageUserId}`))
    }
  }
}
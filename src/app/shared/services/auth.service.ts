import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CONFIG } from '../config';
import { AuthResponse } from '../interfaces/auth.response';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }


  onSignUp(email: string, password: string) {
    return this.http.post(`${CONFIG.signUp}${CONFIG.apiKey}`, 
      { email, password, returnSecureToken: true })
      .pipe(
        tap((data: AuthResponse) => {
          this.onLogLs(data.localId)
        })
      )
  }

  onLogIn(email: string, password: string){
    return this.http.post(`${CONFIG.signIn}${CONFIG.apiKey}`,
      { email, password, returnSecureToken: true })
      .pipe(
        tap((data: AuthResponse) => {
          this.onLogLs(data.localId)
        })
      )
  }

  onLogLs(userId) {
    localStorage.removeItem(`${CONFIG.localStorageUserId}`);
    localStorage.setItem(`${CONFIG.localStorageUserId}`, userId)
  }

  logOut(){
    return localStorage.removeItem(`${CONFIG.localStorageUserId}`);


  }




}

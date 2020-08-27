import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthResponse } from '../interfaces/auth.response';
import { tap, map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { CONFIG } from 'src/app/shared/config';
import { UserName } from '../models/user-name.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  userName: BehaviorSubject<UserName> = new BehaviorSubject<UserName>(null);

  constructor(private http: HttpClient, private router: Router) { }

  onSignUp(email: string, password: string) {
    return this.http.post(`${CONFIG.signUp}${CONFIG.apiKey}`,
      { email, password, returnSecureToken: true })
      .pipe(
        tap((data: AuthResponse) => {
          if(data){
            localStorage.setItem(`${CONFIG.localStorageUserId}`, data.localId)
          }
        })
      )
  }

  onLogIn(email: string, password: string) {
    return this.http.post(`${CONFIG.signIn}${CONFIG.apiKey}`,
      { email, password, returnSecureToken: true })
      .pipe(
        tap((data: AuthResponse) => {
          this._loginHendler(data);
        })
      )
  }

  startLogin(data){
    this._loginHendler(data);
  }

  private _loginHendler(data: AuthResponse) {
    localStorage.setItem(`${CONFIG.localStorageUserId}`, data.localId)
    const user: User = new User(data.email, data.localId);
    this.user.next(user);
    this.router.navigate([CONFIG.redirectUrl]);
    localStorage.setItem(`${CONFIG.userLocalStorage}`, JSON.stringify(user))
    this.getSignUser(data.localId)
  }

  logOut() {
    localStorage.removeItem(`${CONFIG.localStorageUserId}`);
    localStorage.removeItem(`${CONFIG.userLocalStorage}`);
    this.user.next(null);
    this.userName.next(null);
    this.router.navigate(['log-in'])
  }

  

  getSignUser(userId): Observable<any> {
    return this.http.get(`${CONFIG.dataBaseUsers}/userData/${userId}.json`)
      .pipe(
        map((data) => {
          const usersData = [];
          for (let key in data) {
            usersData.unshift({ id: key, ...data[key] });
          }
          let dataUser: UserName = new UserName(String(usersData[0].id), usersData[0].name);
          this.userName.next(dataUser);
          return dataUser;
        })
      )
  }

  addUserData(userData) {
    return this.http.post(`${CONFIG.dataBaseUsers}/userData/${localStorage
      .getItem(CONFIG.localStorageUserId)}.json`, userData)
      
  }

  autoLogIn() {
    if (localStorage.getItem(CONFIG.localStorageUserId)) {
      let user: {
        email: string,
        id: string,
      }
      user = JSON.parse(localStorage.getItem(`${CONFIG.userLocalStorage}`));
      const loadedUser = new User(user.email, user.id)
      this.user.next(loadedUser);
      this.getSignUser(user.id).subscribe()
    }
  }

}

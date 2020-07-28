import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthResponse } from '../interfaces/auth.response';
import { tap, map, filter, switchMap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { CONFIG } from 'src/app/shared/config';
import { UserName } from '../models/user-name.model';
import { UpperCasePipe } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  // userId: string;

  userName: BehaviorSubject<UserName> = new BehaviorSubject<UserName>(null);



  constructor(private http: HttpClient, private router: Router) { }


  onSignUp(email: string, password: string) {
    return this.http.post(`${CONFIG.signUp}${CONFIG.apiKey}`, 
      { email, password, returnSecureToken: true })
      .pipe(
        tap((data: AuthResponse) => {
          // this.onLogLs(data.localId)
          this._loginHendler(data);
        })
      )
  }

  onLogIn(email: string, password: string){
    return this.http.post(`${CONFIG.signIn}${CONFIG.apiKey}`,
      { email, password, returnSecureToken: true })
      .pipe(
        tap((data: AuthResponse) => {
          // this.onLogLs(data.localId)
          this._loginHendler(data);
        })
      )
  }

  onLogLs(userId) {
    localStorage.removeItem(`${CONFIG.localStorageUserId}`);
    localStorage.setItem(`${CONFIG.localStorageUserId}`, userId)
  }

  logOut(){
    localStorage.removeItem(`${CONFIG.localStorageUserId}`);
    this.user.next(null);
  }

  private _loginHendler(data: AuthResponse) {
    // const expirationDate: Date = new Date(new Date().getTime() + Number(data.expiresIn) * 1000);
    const user: User = new User(data.email, data.localId);
    this.user.next(user);
    this.router.navigate([CONFIG.redirectUrl]);
    // this.userId = user.id
    // this.getSignUser(this.userId);
    this.getSignUser(data.localId);
    localStorage.setItem(`${CONFIG.userLocalStorage}`, JSON.stringify(user))
    this.onLogLs(data.localId)
  }

  getSignUser(userId): Observable<any> {
    return this.http.get(`${CONFIG.dataBaseUsers}/userData/${userId}.json`)
      .pipe(
        tap((data) => {

          
          

          return data;

          const usersData = [];
          for (let key in data) {
            usersData.unshift({ id: key, ...data[key] });
          }
          const dataUser = usersData[0];
          console.log('dataUser', dataUser)
          this.userName.next(dataUser);
          // this.userValue = this.userData.getValue();
          return dataUser;
        })
      )
  }

  addUserData(userData) {
    return this.http.post(`${CONFIG.dataBaseUsers}/userData/${localStorage
      .getItem(CONFIG.localStorageUserId)}.json`, userData)
      .subscribe()
  }


  autoLogIn() {
    console.log('2')
    let user: {
      email: string,
      id: string,
    }
    user = JSON.parse(localStorage.getItem(`${CONFIG.userLocalStorage}`));
    const loadedUser = new User(user.email, user.id)
    this.user.next(loadedUser);
  }






}

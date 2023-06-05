import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';

export interface AuthResponseData {
  idToken: string,
  email:	string
  refreshToken:	string,
  expiresIn:	string,
  localId:	string,
  registered?:	boolean,
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) { }

  API_KEY = 'AIzaSyCNJMp_ohqP0WQ_z3mGW1UcSMIL3JiE6r4';
  // API_KEY = '';

  url = 'https://identitytoolkit.googleapis.com/v1/accounts:'

  autoLogin() {
    const userData: {
      email: string,
      id: string,
      _token: string,
      _tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem('userData'));
    if(!userData)  return;

    const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));

    if(loadedUser.token){
      this.user.next(loadedUser);
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);

    }
  }

  autoLogout(experirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, experirationDuration);
  }

  logout(){
    this.user.next(null);
    this.router.navigate(['/auth']);
    // localStorage.clear();
    localStorage.removeItem('userData');

    if(this.tokenExpirationTimer){
      clearTimeout(this.tokenExpirationTimer);
    }
  }

  login(email: string, password: string){
    const user =  { email: email, password:password, returnSecureToken:true }
    const url = `${this.url}signInWithPassword?key=${this.API_KEY}`

    return this.http.post<AuthResponseData>(url, user)
      .pipe(
        catchError(this.handleError),
        tap(resData => this.handleAuthentication(resData.email, resData.idToken, resData.idToken, +resData.expiresIn))
      );
  }

  signup(email: string, password: string){
    const url = `${this.url}signUp?key=${this.API_KEY}`
    const user =  { email: email, password:password, returnSecureToken:true }

    return this.http.post<AuthResponseData>(url, user)
      .pipe(
        catchError(this.handleError),
        tap(resData => this.handleAuthentication(resData.email, resData.idToken, resData.idToken, +resData.expiresIn))
      );
  }

  private handleAuthentication(email: string, id: string, token: string, expiresIn: number){
    const tokenExpirationDate = new Date((new Date().getTime()) + (expiresIn * 1000));
    const user = new User(email, id, token, tokenExpirationDate);
    localStorage.setItem('userData', JSON.stringify(user));
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
  }

  private handleError(errorResponse: HttpErrorResponse){
    let errorMessage = 'An unknow error occured!'
    console.log('[errorResponse]',errorResponse);

    if(!errorResponse.error || !errorResponse.error.error){
      return throwError(errorMessage);
    }

    switch(errorResponse.error.error.message){
      case 'EMAIL_EXISTS' :
            errorMessage = 'This email exists already';
            break;
      case 'EMAIL_NOT_FOUND' :
            errorMessage = 'There is no user corresponding to this email';
            break;
      case 'INVALID_PASSWORD' :
            errorMessage = 'The password is invalid.';
            break;
      case 'USER_DISABLED' :
            errorMessage = 'The user account has been disabled by an administrator';
            break;
    }

    return throwError(errorMessage);
  }

}

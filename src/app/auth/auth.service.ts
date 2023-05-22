import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

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

  constructor(private http: HttpClient) { }

  API_KEY = '';

  url = 'https://identitytoolkit.googleapis.com/v1/accounts:'

  login(email: string, password: string){
    const user =  { email: email, password:password, returnSecureToken:true }
    const url = `${this.url}signInWithPassword?key=${this.API_KEY}`

    return this.http.post<AuthResponseData>(url, user).pipe(catchError(this.handleError));
  }

  signup(email: string, password: string){
    const url = `${this.url}signUp?key=${this.API_KEY}`
    const user =  { email: email, password:password, returnSecureToken:true }

    return this.http.post<AuthResponseData>(url, user).pipe(catchError(this.handleError));
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

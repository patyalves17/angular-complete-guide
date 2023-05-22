import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

interface AuthResponseData {
  idToken: string,
  email:	string
  refreshToken:	string,
  expiresIn:	string,
  localId:	string,
  registered:	boolean,
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  API_KEY = '';

  url = 'https://identitytoolkit.googleapis.com/v1/accounts:'

  login(){}

  signup(email: string, password: string){
    const url = `${this.url}signUp?key=${this.API_KEY}`
    const user =  { email: email, password:password, returnSecureToken:true }
    return this.http.post<AuthResponseData>(url, user).pipe(catchError(errorResponse => {
      let errorMessage = 'An unknow error occured!'

      if(!errorResponse.error || !errorResponse.error.error){
        return throwError(errorMessage);
      }

      switch(errorResponse.error.error.message){
        case 'EMAIL_EXISTS' : errorMessage = 'This email exists already';
      }

      return throwError(errorMessage);
    }));
  }

}

import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponseData, AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm){
    const { email, password } = form.value;
    this.isLoading = true;

    let authObs: Observable<AuthResponseData>;

    if(this.isLoginMode){
      console.log('[login]');
      authObs = this.authService.login(email, password);
    } else {
      console.log('[signup]');
      authObs = this.authService.signup(email, password);
    }

    authObs.subscribe(responseData => {
      console.log('[responseData]',responseData)
      this.isLoading = false;
    }, errorMessage => {
      this.error = errorMessage;
      this.isLoading = false;
    })

    form.reset();
  }
}

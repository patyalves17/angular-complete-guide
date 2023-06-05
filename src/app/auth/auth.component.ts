import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { AlertComponent } from './../shared/alert/alert.component';
import { AuthResponseData, AuthService } from './auth.service';
import { PlaceholderDirective } from '../shared/placeholder/placeholder-directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;
  private closeSub:Subscription;

  constructor(
    private authService: AuthService,
    private router: Router, private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    if(this.closeSub) this.closeSub.unsubscribe();
  }


  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }

  onHandleError(){
    this.error = null;
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
      this.router.navigate(['/recipes']);
    }, errorMessage => {
      this.showErrorAlert(errorMessage);
      this.error = errorMessage;
      this.isLoading = false;
    })

    form.reset();
  }

  private showErrorAlert(message: string){
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerREf = this.alertHost.viewContainerRef;
    hostViewContainerREf.clear();
    const componentRef = hostViewContainerREf.createComponent(alertCmpFactory);
    componentRef.instance.message = message;

    this.closeSub = componentRef.instance.close.subscribe(() => {
     this.closeSub.unsubscribe();
     hostViewContainerREf.clear();
    });


  }
}

import { Component, ComponentFactoryResolver, ElementRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { of, range } from 'rxjs';
import { concatMap, delay, filter, takeWhile } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { GoogleLoginComponent } from './google-login.component';

@Component({
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {
  constructor(private auth: AuthService,
              private router: Router,
              private resolver: ComponentFactoryResolver,
              private elementRef: ElementRef) {}

  @ViewChild('googleLogin', { read: ViewContainerRef })
  private googleLoginContainerRef: ViewContainerRef;

  ngOnInit(): void {
    if (this.auth.hasToken()) {
      this.router.navigate(['']);
    } else {
      this.addGoogleLoginButton();
    }
  }

  private addGoogleLoginButton(): void {
    this.addScript('assets/google-login-handler.js');

    let hasGoogleClientId = false;
    let hasActiveAttempt = false;
    range(0, 100)
      .pipe(concatMap((x: number) => of(x).pipe(delay(Math.sqrt(x) * 1000))))
      .pipe(takeWhile(() => !hasGoogleClientId))
      .pipe(filter(() => !hasGoogleClientId && !hasActiveAttempt))
      .subscribe(() => {
        hasActiveAttempt = true;
        this.auth.googleClientId()
          .then(googleClientId => {
            const factory = this.resolver.resolveComponentFactory(GoogleLoginComponent);
            const componentRef = this.googleLoginContainerRef.createComponent(factory);
            componentRef.instance.clientId = googleClientId;        
            this.addScript('https://accounts.google.com/gsi/client');
            hasGoogleClientId = true;
          })
          .catch(error => {
            console.error(error.message)
          })
          .finally(() => {
            hasActiveAttempt = false
          });
      });
  }

  private addScript(src: string): void {
    const scriptElement = document.createElement('script');
    scriptElement.src = src;
    scriptElement.async = true;
    scriptElement.defer = true;
    this.elementRef.nativeElement.appendChild(scriptElement);
  }
}

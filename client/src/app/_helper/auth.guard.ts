
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthCheckerService {
  constructor(
    private jwtHelper: JwtHelperService,
  ) { }

  public isAuthenticated(): boolean {
    const accessToken = localStorage.getItem('accessToken');
    return !this.jwtHelper.isTokenExpired(accessToken);
  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(public auth: AuthCheckerService, public router: Router) {}

  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}

@Injectable({
  providedIn: 'root'
})
export class NavigateLoggedIn implements CanActivate {
  constructor(public auth: AuthCheckerService, public router: Router) {}

  canActivate(): boolean {
    if (this.auth.isAuthenticated()) {
      this.router.navigate(['']);
      return false;
    }
    return true;
  }
}

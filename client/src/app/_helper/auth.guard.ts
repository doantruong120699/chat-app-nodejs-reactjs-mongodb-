
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

class AuthService {
  constructor(
    private jwtHelper: JwtHelperService,
  ) { }

  public isAuthenticated(): boolean {
    const accessToken = localStorage.getItem('accessToken');
    return !this.jwtHelper.isTokenExpired(accessToken);
  }
}


@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}

  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { User } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(
    private router: Router,
    private http: HttpClient,
  ) { }

  login(email: string, password: string) {
    return this.http.post<any>(`${environment.apiUrl}/auth/login`, { email, password })
      .pipe(map(data => {
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        return data;
      }));
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  register(username: string, email: string, password: string) {
    return this.http.post<User>(`${environment.apiUrl}/auth/register`, { username, email, password })
      .pipe(map(user => {
        localStorage.setItem('user', JSON.stringify(user));
        return user;
      }));
  }
}

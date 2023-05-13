import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { User, loginInput } from '@app/_models';
import { Store } from '@ngrx/store';
import { ApplicationState } from '@app/store/reducers';
import { LogoutAction } from '@app/store/actions';

@Injectable()
export class AuthService {

  constructor(
    private http: HttpClient,
    private store: Store<ApplicationState>,
  ) { }

  login(data: loginInput) {
    return this.http.post(`${environment.apiUrl}/auth/login`, data);
  }

  logout() {
    this.store.dispatch(new LogoutAction());
  }
}

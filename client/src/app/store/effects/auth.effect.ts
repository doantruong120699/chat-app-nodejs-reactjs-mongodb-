import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import * as AuthActions from '../actions/auth.action';
import * as UserActions from '../actions/user.action';
import { switchMap, mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '@app/_services';
import { Auth } from '@app/_models';

@Injectable()
export class AuthEffect {
    private return: string = '';

    constructor(
        private action$: Actions,
        private authService: AuthService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.route.queryParams.subscribe(params => this.return = params['return'] || '');
    }

    proccessAfterLogin(data: Auth) {
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        if (this.router.url.indexOf('/login') > -1)
            this.router.navigateByUrl(this.return);
    }

    loadLogin$ = createEffect(() => this.action$.pipe(
      ofType(AuthActions.AuthActionType.LOGIN_LOAD),
      map((action: AuthActions.LoginLoadAction) => action.payload),
      switchMap((payload) => this.authService.login(payload)
        .pipe(
            mergeMap((auth: any) => {
                this.proccessAfterLogin(auth);
                return [
                    new AuthActions.LoginLoadSuccessAction(),
                    // new UserActions.GetUserProfileLoadAction()
                ]
            }),
            catchError(error => {
              console.log(error)
                return of(new AuthActions.LoginLoadFailAction('Login fail. Please try again'))
            })
        )
      )
  ));

}

import { loginInput } from '@app/_models';
import { type } from '@app/_services';
import { Action } from '@ngrx/store';

// export const AuthActionType = {
//     LOGIN_LOAD: type('LOGIN_LOAD'),
//     LOGIN_LOAD_SUCCESS: type('LOGIN_LOAD_SUCCESS'),
//     LOGIN_LOAD_FAIL: type('LOGIN_LOAD_FAIL'),
//     LOGOUT: type('LOGOUT'),
// }

export enum AuthActionType {
  LOGIN_LOAD='LOGIN_LOAD',
  LOGIN_LOAD_SUCCESS='LOGIN_LOAD_SUCCESS',
  LOGIN_LOAD_FAIL='LOGIN_LOAD_FAIL',
  LOGOUT='LOGOUT',
}

export class LoginLoadAction implements Action {
    type = AuthActionType.LOGIN_LOAD;
    constructor(public payload: loginInput) {}
}

export class LoginLoadSuccessAction implements Action {
    type = AuthActionType.LOGIN_LOAD_SUCCESS;
}

export class LoginLoadFailAction implements Action {
    type = AuthActionType.LOGIN_LOAD_FAIL;
    constructor(public payload: string) {}
}

export class LogoutAction implements Action {
    type = AuthActionType.LOGOUT;
}

export type AuthActions = LoginLoadAction | LoginLoadSuccessAction | LoginLoadFailAction | LogoutAction

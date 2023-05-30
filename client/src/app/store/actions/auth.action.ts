import { loginInput } from '@app/_models';
import { Action } from '@ngrx/store';

export enum AuthActionType {
  LOGIN_LOAD = 'LOGIN_LOAD',
  LOGIN_LOAD_SUCCESS = 'LOGIN_LOAD_SUCCESS',
  LOGIN_LOAD_FAIL = 'LOGIN_LOAD_FAIL',
  LOGOUT = 'LOGOUT',
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

export type AuthActions =
  | LoginLoadAction
  | LoginLoadSuccessAction
  | LoginLoadFailAction
  | LogoutAction;

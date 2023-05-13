import { Auth, User } from '@app/_models';
import { type } from '@app/_services';
import { Action } from '@ngrx/store';

export const UserActionType = {
    GET_USER_LOAD_SUCCESS: type('GET_USER_LOAD_SUCCESS'),
    GET_USER_LOAD_FAIL: type('GET_USER_LOAD_FAIL'),
    UPDATE_USER_LOAD: type('UPDATE_USER_LOAD'),
    GET_USER_PROFILE_LOAD: type('GET_USER_PROFILE_LOAD'),
    GET_USER_PROFILE_LOAD_SUCCESS: type('GET_USER_PROFILE_LOAD_SUCCESS'),
}

export class GetUserLoadSuccessAction implements Action {
    type = UserActionType.GET_USER_LOAD_SUCCESS;
    constructor(public payload: Auth) {}
}

export class GetUserLoadFailAction implements Action {
    type = UserActionType.GET_USER_LOAD_FAIL;
    constructor(public payload: string) {}
}

export class GetUserProfileLoadAction implements Action {
    type = UserActionType.GET_USER_PROFILE_LOAD;
}

export class GetUserProfileLoadSuccessAction implements Action {
    type = UserActionType.GET_USER_PROFILE_LOAD_SUCCESS;
    constructor(public payload: User) {}
}

export class UpdateUserLoadAction implements Action {
  type = UserActionType.UPDATE_USER_LOAD;
}

export type UserActions = UpdateUserLoadAction
    | GetUserLoadSuccessAction
    | GetUserLoadFailAction
    | GetUserProfileLoadAction
    | GetUserProfileLoadSuccessAction

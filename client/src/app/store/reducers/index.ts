import { ActionReducerMap } from '@ngrx/store';
import * as userReducer from './user.reducer';
import * as authReducer from './auth.reducer';

export interface ApplicationState {
  auth: authReducer.State;
  user: userReducer.State;
}

export const reducers: ActionReducerMap<ApplicationState, any> = {
  auth: authReducer.AuthReducer,
  user: userReducer.UserReducer,
};

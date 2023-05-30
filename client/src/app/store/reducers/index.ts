import { ActionReducerMap } from '@ngrx/store';
import * as userReducer from './user.reducer';
import * as authReducer from './auth.reducer';
import * as postReducer from './post.reducer';

export interface ApplicationState {
  auth: authReducer.State;
  user: userReducer.State;
  posts: postReducer.State;
}

export const reducers: ActionReducerMap<ApplicationState, any> = {
  auth: authReducer.AuthReducer,
  user: userReducer.UserReducer,
  posts: postReducer.PostReducer,
};

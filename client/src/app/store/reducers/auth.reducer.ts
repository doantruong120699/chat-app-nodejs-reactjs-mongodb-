import { Action } from '@ngrx/store';
import * as _ from 'lodash';
import * as authAction from '../actions/auth.action';

export interface State {
  loading: boolean;
  isError: boolean;
  message: string;
}

const initialState: State = {
  loading: false,
  isError: false,
  message: '',
};

export interface ActionWithPayload<T> extends Action {
  payload: T;
}

export function AuthReducer(
  state = initialState,
  action: ActionWithPayload<State>
): State {
  switch (action.type) {
    case authAction.AuthActionType.LOGIN_LOAD: {
      return _.assign({}, state, {
        loading: true,
        isError: false,
        message: '',
      });
    }

    case authAction.AuthActionType.LOGIN_LOAD_SUCCESS: {
      return _.assign({}, state, {
        loading: false,
        isError: false,
        message: '',
      });
    }

    case authAction.AuthActionType.LOGIN_LOAD_FAIL: {
      return _.assign({}, state, {
        loading: false,
        isError: true,
        message: action.payload,
      });
    }

    case authAction.AuthActionType.LOGOUT: {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      return _.assign({}, state, {
        loading: false,
        data: {},
      });
    }

    default: {
      return state;
    }
  }
}

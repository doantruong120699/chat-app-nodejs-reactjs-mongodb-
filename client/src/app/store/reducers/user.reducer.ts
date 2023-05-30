import { Action } from '@ngrx/store';
import * as _ from 'lodash';
import * as userAction from '../actions/user.action';
import { User } from '@app/_models';

export interface State {
  loading: boolean;
  data: any;
}

const initialState: State = {
  loading: false,
  data: {
    user: {} as User,
  },
};

export interface ActionWithPayload<T> extends Action {
  payload: T;
}

export function UserReducer(
  state = initialState,
  action: ActionWithPayload<State>
): State {
  switch (action.type) {
    case userAction.UserActionType.GET_USER_LOAD_SUCCESS: {
      return _.assign({}, state, {
        loading: false,
        data: action.payload,
      });
    }

    case userAction.UserActionType.GET_USER_PROFILE_LOAD: {
      return _.assign({}, state, {
        loading: true,
      });
    }

    case userAction.UserActionType.GET_USER_PROFILE_LOAD_SUCCESS: {
      return _.assign({}, state, {
        loading: false,
        data: _.assign({}, state.data, {
          user: action.payload,
        }),
      });
    }

    default: {
      return state;
    }
  }
}

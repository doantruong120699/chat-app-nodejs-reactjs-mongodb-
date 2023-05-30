import { Action } from '@ngrx/store';
import * as _ from 'lodash';
import * as postAction from '../actions/post.action';
import { Post, User } from '@app/_models';

export interface State {
  loading: boolean;
  data: any;
}

const initialState: State = {
  loading: false,
  data: [] as Post,
};

export interface ActionWithPayload<T> extends Action {
  payload: T;
}

export function PostReducer(
  state = initialState,
  action: ActionWithPayload<State>
): State {
  switch (action.type) {
    case postAction.PostActionType.GET_POST_LOAD: {
      return _.assign({}, state, {
        loading: true,
      });
    }

    case postAction.PostActionType.GET_POST_LOAD_SUCCESS: {
      return _.assign({}, state, {
        loading: false,
        data: action.payload,
      });
    }

    default: {
      return state;
    }
  }
}

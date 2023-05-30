import { Post } from '@app/_models';
import { Action } from '@ngrx/store';

export enum PostActionType {
  GET_POST_LOAD = 'GET_POST_LOAD',
  GET_POST_LOAD_SUCCESS = 'GET_POST_LOAD_SUCCESS',
}

export class GetPostLoadAction implements Action {
  type = PostActionType.GET_POST_LOAD;
}

export class GetPostLoadSuccessAction implements Action {
  type = PostActionType.GET_POST_LOAD_SUCCESS;
  constructor(public payload: Post[]) {}
}

export type PostActions = GetPostLoadAction | GetPostLoadSuccessAction;

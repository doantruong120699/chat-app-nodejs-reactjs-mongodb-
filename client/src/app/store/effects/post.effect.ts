import { Injectable } from '@angular/core';
import { PostService, UserService } from '@app/_services';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import * as PostActions from '../actions/post.action';
import { mergeMap, map } from 'rxjs/operators';
import { Post, User } from '@app/_models';

@Injectable()
export class PostEffect {
  constructor(private action$: Actions, private postService: PostService) {}

  loadGetProfile$ = createEffect(() =>
    this.action$.pipe(
      ofType(PostActions.PostActionType.GET_POST_LOAD),
      mergeMap(() =>
        this.postService.getPosts().pipe(
          map((posts: any) => {
            return new PostActions.GetPostLoadSuccessAction(posts);
          })
        )
      )
    )
  );
}

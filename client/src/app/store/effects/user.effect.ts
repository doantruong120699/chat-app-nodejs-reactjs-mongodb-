import { Injectable } from '@angular/core';
import { UserService } from '@app/_services';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import * as UserActions from '../actions/user.action';
import { mergeMap, map } from 'rxjs/operators';
import { User } from '@app/_models';

@Injectable()
export class UserEffect {
    constructor(
        private action$: Actions,
        private userService: UserService,
    ) { }

    loadGetProfile$ = createEffect(() => this.action$.pipe(
        ofType(UserActions.UserActionType.GET_USER_PROFILE_LOAD),
        mergeMap(() => this.userService.me()
            .pipe(
                map((user: User) => {
                  return new UserActions.GetUserProfileLoadSuccessAction(user)
                }),
            )
        )
    ))
}

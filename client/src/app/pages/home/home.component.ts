import { Component, OnInit } from '@angular/core';
import { Post, User } from '@app/_models';
import { GetPostLoadAction } from '@app/store/actions';
import { ApplicationState } from '@app/store/reducers';
import { transformTime } from '@app/utils/string';
import { PostUtils } from '@app/utils/post.utils';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public user$: Observable<User> = this.store.select(
    (state) => state.user.data.user
  );
  public posts$: Observable<Post> = this.store.select(
    (state) => state.posts.data
  );
  private subscriptions: Subscription[] = [];
  public user?: User;
  public posts?: Post[];
  public parseTime = transformTime;
  // public postUtils: PostUtils;

  constructor(private store: Store<ApplicationState>) {
    this.store.dispatch(new GetPostLoadAction());
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.posts$.subscribe((sub: any) => {
        if (sub) {
          this.posts = [...sub];
        }
      })
    );
  }
}

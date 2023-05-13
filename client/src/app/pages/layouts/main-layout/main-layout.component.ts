import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, User } from '@app/_models';
import { UserService } from '@app/_services';
import { GetUserProfileLoadAction } from '@app/store/actions/user.action';
import { ApplicationState } from '@app/store/reducers';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit {

  public user$: Observable<User> = this.store.select(state => state.user.data);

  constructor(
    private store: Store<ApplicationState>,
  ) {
    this.store.dispatch(new GetUserProfileLoadAction());
  }

  ngOnInit(): void {
  }
}

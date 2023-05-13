import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@app/_models';
import { AuthService, UserService } from '@app/_services';
import { LogoutAction } from '@app/store/actions';
import { ApplicationState } from '@app/store/reducers';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  public user$: Observable<User> = this.store.select(state => state.user.data.user);
  private subscriptions: Subscription[] = [];
  public user?: User;

  constructor(private store: Store<ApplicationState>, private router: Router) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this.user$.subscribe(sub => {
        this.user = sub;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  public onClickLogout(e: any) {
    this.store.dispatch(new LogoutAction());
    this.router.navigate(['/login']);
  }
}

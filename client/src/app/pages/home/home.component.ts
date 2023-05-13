import { Component, OnInit } from '@angular/core';
import { User } from '@app/_models';
import { ApplicationState } from '@app/store/reducers';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public user$: Observable<User> = this.store.select(state => state.user.data.user);
  private subscriptions: Subscription[] = [];
  public user?: User;

  constructor(
    private store: Store<ApplicationState>,
  ) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this.user$.subscribe(sub => {
        this.user = sub;
      })
    );
  }
}

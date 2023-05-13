import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { LoginFormInterface } from './login.interface';
import { AuthService } from '@app/_services';
import { Store } from '@ngrx/store';
import { ApplicationState } from '@app/store/reducers';
import { LoginLoadAction } from '@app/store/actions';
import { Observable, Subscription } from 'rxjs';
import { State as AuthState } from '@app/store/reducers/auth.reducer';

// @Component({ templateUrl: 'login.component.html' })
@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  public loginForm: FormGroup;
  public isError: boolean = false;
  public loading: boolean = false;
  public message: string = '';
  private subscriptions: Subscription[] = [];
  private auth$: Observable<AuthState> = this.store.select(state => state.auth);

  constructor(
    private fb: FormBuilder,
    private store: Store<ApplicationState>,
  ) {
    this.loginForm = this.fb.group({
      'email': new FormControl('', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(255), Validators.email])),
      'password': new FormControl('', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(255)]))
    });
    this.subscriptions.push(
      this.auth$.subscribe(auth => {
        this.loading = auth.loading;
        this.isError = auth.isError;
        this.message = auth.message;
      })
    );
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  onSubmit({ value, valid }: { value: LoginFormInterface, valid: boolean }) {
    if (valid) {
      console.log("Submit")
      this.store.dispatch(new LoginLoadAction(value));
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}

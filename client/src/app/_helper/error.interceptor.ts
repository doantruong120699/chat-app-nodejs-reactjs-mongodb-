import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthService } from '@app/_services';
import { Store } from '@ngrx/store';
import { ApplicationState } from '@app/store/reducers';
import { LogoutAction } from '@app/store/actions';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private store: Store<ApplicationState>, private router: Router) {

    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if ([401, 403].includes(err.status)) {
              this.store.dispatch(new LogoutAction());
              this.router.navigate(['/login']);
            }
            const error = err.error?.message || err.statusText;
            return throwError(() => error);
        }))
    }
}

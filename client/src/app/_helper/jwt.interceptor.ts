import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthCheckerService } from './auth.guard';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authService: AuthCheckerService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if user is logged in and request is to the api url
        const isAuthenticated = this.authService.isAuthenticated()
        if (isAuthenticated) {
          const accessToken = localStorage.getItem('accessToken');
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
        }
        return next.handle(request);
    }
}

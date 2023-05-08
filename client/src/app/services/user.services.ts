import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { User } from '../models';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const API_URL = "http://localhost:8080/laravel-angular/public/api";
@Injectable({
    providedIn: 'root',
})

export class UserService {
    constructor(private http: HttpClient) { }

    /**
     * POST LOGIN USER
     */
    login(user: any) {
        return this.http.post<any>('http://localhost:8080/laravel-angular/public/api/user/login', user, httpOptions)
            .pipe(map(user => {
                return user;
            }));
    }


}
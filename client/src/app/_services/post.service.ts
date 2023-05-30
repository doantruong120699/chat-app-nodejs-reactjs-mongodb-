import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { toFormData } from '../utils';
import { PostFormInterface } from '../pages/post/post.interface';

@Injectable()
export class PostService {
  constructor(private http: HttpClient) {}

  createPost(data: any) {
    return this.http.post(`${environment.apiUrl}/user/posts`, data);
  }

  getPosts() {
    return this.http.get(`${environment.apiUrl}/user/posts`);
  }
}

import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Post } from '../class/cours';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private apiUrl = 'http://localhost:3000/api/post';

  constructor(private http: HttpClient) { }

  addPost(post: Post): Observable<any> {
    return this.http.post('http://localhost:3000/api/post/add', {
      post: Post
    });
  }
}

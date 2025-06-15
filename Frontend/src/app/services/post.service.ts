import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Post } from '../class/cours';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  addPost(): Observable<Post[]> {
    return this.http.get<any[]>(`${this.apiUrl}/posts`).pipe(
      map(postsArray => postsArray.map(p => new Post(
        p.id, p.title, p.type, p.message, p.publish_date
      )))
    );
  }
}



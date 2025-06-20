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

  //methode pour ajouter un nouveau post
  addPost(newPost: { post: Post, ue_id: number }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/posts/addPost`, newPost);
  }

  //methode pour recuperer les posts d'une ue donné
  getPostsbyCourseId(id: number): Observable<Post[]> {
    return this.http.get<any[]>(`${this.apiUrl}/course_content/${id}`).pipe(
      map(postsArray => postsArray.map(p => new Post(
        p.id, p.title, p.type, p.message, p.publish_date
      )))
    );
  }
}



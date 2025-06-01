import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



export interface Message {
  _id: string;  
  content: string;
  createdAt: string;
  authorId?: string;
}

export interface Forum {
  _id: string;
  coursId: string;
  title: string;
  createdAt: string;
  messages: Message[];
}



@Injectable({
  providedIn: 'root'
})


export class ForumService {

  private apiUrl = 'http://localhost:3000/api/forums';

  constructor(private http: HttpClient) {}

  getForumsByCours(coursId: string): Observable<Forum[]> {
    return this.http.get<Forum[]>(`${this.apiUrl}/cours/${coursId}`);
  }

  getMessagesByForum(forumId: string): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.apiUrl}/${forumId}/messages`);
  }

  addMessage(forumId: string, content: string, authorId?: string): Observable<Message> {
    return this.http.post<Message>(`${this.apiUrl}/${forumId}/messages`, { content, authorId});
  }

  addForum(coursId: string, title: string): Observable<Forum> {
    return this.http.post<Forum>(`${this.apiUrl}/cours/${coursId}`, { coursId, title });
  }
  
  deleteForum(forumId: string): Observable<Forum> {
    return this.http.delete<Forum>(`${this.apiUrl}/${forumId}`);
  }

  deleteMessage(forumId: string, messageId: string): Observable<Message> {
    return this.http.delete<Message>(`${this.apiUrl}/${forumId}/messages/${messageId}`);
  }
}

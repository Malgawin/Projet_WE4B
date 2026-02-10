import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Forum, Message } from '../class/forum';



@Injectable({
  providedIn: 'root'
})
export class ForumService {

  private apiUrl = 'http://localhost:3000/api/forums';

  constructor(private http: HttpClient) {}

  //methode pour recuperer tout les forums d'un cours avec l'id du cours
  getForumsByCours(coursId: number): Observable<Forum[]> {
    return this.http.get<Forum[]>(`${this.apiUrl}/cours/${coursId}`);
  }

  //methode pour recuperer tous les messages d'un forum grace a son id
  getMessagesByForum(forumId: string): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.apiUrl}/${forumId}/messages`);
  }
  
  //methode pour ajouter un message a un forum
  addMessage(forumId: string, content: string, authorId: number): Observable<Message> {
    return this.http.post<Message>(`${this.apiUrl}/${forumId}/messages`, { content, authorId });
  }

  //methode pour creer un nouveau forum
  addForum(coursId: number, title: string, authorId: number): Observable<Forum> {
    return this.http.post<Forum>(`${this.apiUrl}/cours/${coursId}`, { coursId, title, authorId });
  }
  
  //methode pour suprimer un forum
  deleteForum(forumId: string): Observable<Forum> {
    return this.http.delete<Forum>(`${this.apiUrl}/${forumId}`);
  }

  //methode pour supprimer un message d'un forum 
  deleteMessage(forumId: string, messageId: string): Observable<Message> {
    return this.http.delete<Message>(`${this.apiUrl}/${forumId}/messages/${messageId}`);
  }
}

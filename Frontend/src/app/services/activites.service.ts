import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface Activite {
  id: number;
  title: string;
  publish_date: string;
  ue_name: string;
  author_name: string;
  author_familyName: string;
  // Ajoute d'autres champs si besoin
}

@Injectable({
  providedIn: 'root'
})
export class ActivitesService {

  private apiUrl = 'http://localhost:3000/api/activites';

  constructor(private http: HttpClient) { }

  getActivites(userId: number, offset: number, limit: number = 6): Observable<{ posts: Activite[], fin: boolean }> {
    return this.http.get<{ posts: Activite[], fin: boolean }>(
      `${this.apiUrl}?userId=${userId}&offset=${offset}&limit=${limit}`
    );
  }
}

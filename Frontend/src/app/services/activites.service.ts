import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Activite } from '../class/activite';


@Injectable({
  providedIn: 'root'
})
export class ActivitesService {

  private apiUrl = 'http://localhost:3000/api/activites';

  constructor(private http: HttpClient) { }

  // methodes pour recupere les activites ayant eu lieu dans les cours d'un utilisateur donné avec une pagination
  getActivites(userId: number, offset: number, limit: number = 6): Observable<{ posts: Activite[], fin: boolean }> {
    return this.http.get<{ posts: Activite[], fin: boolean }>(
      `${this.apiUrl}/${userId}/${offset}/${limit}`
     ).pipe(
        map(res => ({
          posts: res.posts.map(a =>
            new Activite(
              a.id,
              a.title,
              a.publish_date,
              a.ue_name,
              a.author_name,
              a.author_familyname
            )
          ),
          fin: res.fin
        }))
    );
  }
}

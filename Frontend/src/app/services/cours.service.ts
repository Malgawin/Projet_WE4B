import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Cours, Inscrit } from '../class/cours';




@Injectable({
  providedIn: 'root'
})
export class CoursService {

  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getCours(): Observable<Cours[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(coursArray => coursArray.map(c => new Cours(
        c.id, c.code, c.name, c.description, c.image
      )))
    );
  }

  getCoursbyId(id: string): Observable<Cours> {
    return this.http.get<any>(`${this.apiUrl}/ue/${id}`).pipe(
      map(c => new Cours(
        c.id, c.code, c.name, c.description, c.image
      ))
    );
  }

  getInscrits(id: number): Observable<Inscrit[]> {
    return this.http.get<any[]>(`${this.apiUrl}/ue/${id}/inscrits`).pipe(
      map(inscritsArray => inscritsArray.map(i => ({
        id: i.id,
        name: i.name,
        familyName: i.family_name,
        mail: i.mail,
        role: i.role
      })))
    )
    ;
  }

  addInscrit(userId: number, coursId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/enrollment/add`, {
      user_id: userId,
      ue_id: coursId
    });
  }

  updateImage(coursId: number, image: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/ue/updateImage`, {
      id: coursId,
      image: image
    });
  }


  getCoursByIdLog(userId: number): Observable<Cours[]> {
    return this.http.get<any[]>(`${this.apiUrl}/enrollment/user/${userId}/cours`).pipe(
      map(coursArray => coursArray.map(c => new Cours(
        c.id, c.code, c.name, c.description, c.image, [], c.is_pinned
      )).sort((a, b) => {
        if (a.isPinned && !b.isPinned) return -1;
        if (!a.isPinned && b.isPinned) return 1;
        return a.name.localeCompare(b.name);
      }
      ))
    );
  }

  pinCours(userId: number, coursId: number): Observable<{is_pinned: boolean}> {
    return this.http.put<{is_pinned: boolean}>(`${this.apiUrl}/enrollment/pin`, {
      user_id: userId, ue_id: coursId
    });
  }
}
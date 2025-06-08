import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Cours, Inscrit } from '../class/cours';



@Injectable({
  providedIn: 'root'
})
export class CoursService {

  private apiUrl = 'http://localhost:3000/api/ue';

  constructor(private http: HttpClient) { }

  getCours(): Observable<Cours[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(coursArray => coursArray.map(c => new Cours(
        c.id, c.code, c.name, c.description, c.image
      )))
    );
  }

  getCoursbyId(id: string): Observable<Cours> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map(c => new Cours(
        c.id, c.code, c.name, c.description, c.image
      ))
    );
  }

  getInscrits(id: number): Observable<Inscrit[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${id}/inscrits`).pipe(
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
    return this.http.post('http://localhost:3000/api/enrollment/add', {
      user_id: userId,
      ue_id: coursId
    });
  }

}
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
    return this.http.get<Inscrit[]>(`${this.apiUrl}/${id}/inscrits`);
  }

}

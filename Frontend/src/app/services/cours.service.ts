import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface Cours {
  _id: string;
  name: string;
  code: string;
  description: string;

  enseignantId?: string[];   
  moduleIds?: string[];
  étudiantsInscrits?: string[];

  image?: {
    name: string;
    url: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class CoursService {

  private apiUrl = 'http://localhost:3000/api/cours';

  constructor(private http: HttpClient) { }

  getCours(): Observable<Cours[]> {
    return this.http.get<Cours[]>(this.apiUrl);
  }

  getCoursbyId(id: string): Observable<Cours> {
    return this.http.get<Cours>(`${this.apiUrl}/${id}`);
  }
}

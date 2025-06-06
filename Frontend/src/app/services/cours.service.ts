import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface Cours {
  id: number;
  code: string;
  name: string;
  description: string;

  image : string
  

  enseignantId?: string[];   
  moduleIds?: string[];
  étudiantsInscrits?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class CoursService {

  private apiUrl = 'http://localhost:3000/api/ue';

  constructor(private http: HttpClient) { }

  getCours(): Observable<Cours[]> {
    return this.http.get<Cours[]>(this.apiUrl);
  }

  getCoursbyId(id: string): Observable<Cours> {
    return this.http.get<Cours>(`${this.apiUrl}/${id}`);
  }
}

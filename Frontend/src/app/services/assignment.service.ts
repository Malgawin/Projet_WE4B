import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Assignment } from '../class/cours';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {

  private apiUrl = 'http://localhost:3000/api/assignments';
  
  constructor(private http: HttpClient) {}

  addAssignment(assignment: Assignment): Observable<Assignment> {
      return this.http.post<Assignment>(`${this.apiUrl}/addAssignment`, { assignment });
    }
  
  getAssignementsByCours(coursId: number): Observable<Assignment[]> {
      return this.http.get<Assignment[]>(`${this.apiUrl}/cours/${coursId}`);
    }

  getAssignementsById(assignId: any): Observable<Assignment> {
      return this.http.get<Assignment>(`${this.apiUrl}/assignment/${assignId}`);
    } 
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Assignment, Submit } from '../class/cours';
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
  
  addSubmit({ submit, id_assignment }: { submit: Submit; id_assignment: string | null}): Observable<Submit> {
      return this.http.post<Submit>(`${this.apiUrl}/addSubmit`, { submit, id_assignment });
    }
  
  getAssignementsByCours(coursId: number): Observable<Assignment[]> {
      return this.http.get<Assignment[]>(`${this.apiUrl}/cours/${coursId}`);
    }

  getAssignementsById(assignId: any): Observable<Assignment> {
      return this.http.get<Assignment>(`${this.apiUrl}/assignment/${assignId}`);
    }

  getSubmitsByAssignment(assignId: any): Observable<Submit[]> {
      return this.http.get<Submit[]>(`${this.apiUrl}/submit/${assignId}`);
    }

  updateAllSubmits({ id_assignment, submits }: { id_assignment: string | null; submits: Submit[]}): Observable<any> {
      return this.http.put(`${this.apiUrl}/updateAllSubmits`, { id_assignment, submits });
  }
  
  getSubmitByAssignmentAndUser(assignmentId: string | null, userId: number): Observable<Submit> {
    return this.http.get<Submit>(`${this.apiUrl}/submit/${assignmentId}/${userId}`);
  }

  updateSubmitFileId(id_assignment: string | null, id_user: number, fileId: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/updateFileId`, { id_assignment, id_user, fileId });
  }
}

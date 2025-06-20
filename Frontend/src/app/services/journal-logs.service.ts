import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { UserLog } from '../class/journal_logs';

@Injectable({
  providedIn: 'root'
})
export class JournalLogsService {

  private apiUrl = 'http://localhost:3000/api/logs';

  constructor(private http: HttpClient) { }

  //recuperation des log d'un utilisateur avec son id
  getLogByUserId(userId: number): Observable<UserLog> {
    return this.http.get<UserLog>(`${this.apiUrl}/${userId}`);
  }

  //methode pour mettre a jour ou creer les logs d'un utilisateur
  updateCourseLog(userId: number, courseId: number, data: any) {
    return this.http.patch(`${this.apiUrl}/${userId}/course/${courseId}`, data);
  }

}

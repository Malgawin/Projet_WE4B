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

  //methode pour update les logs de l'utilisateur au momement de la connexion (log creer si non existant)
  updateLogin(userId: number): Observable<UserLog> {
    return this.http.patch<UserLog>(`${this.apiUrl}/${userId}`, {
      $inc: { loginCount: 1 },
      lastLogin: new Date()
    });
  }

  //metohde pour mettre a jour les logs de l'utilisateur au momment de la deconnexion
  updateLogout(userId: number) {
    return this.http.patch(`${this.apiUrl}/${userId}/logout`, {});
  }
}

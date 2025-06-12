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

  getLogByUserId(userId: number): Observable<UserLog> {
    return this.http.get<UserLog>(`${this.apiUrl}/${userId}`);
  }

}

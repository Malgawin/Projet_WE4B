import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ActivityLog {
  type: string; 
  date: string;
  postId?: string;
  forumId?: string;
  messageId?: string;
  devoirId?: string;
}


export interface CourseLog {
  courseId: number;
  lastViewed?: string; 
  viewsCount?: number;
  progressCount?: number;
  forumMsg?: number;
  activity?: ActivityLog[];
}

export interface UserLog {
  _id?: string;
  userId: number;
  lastLogin?: string;
  lastLogout?: string;
  loginCount?: number;
  courses?: CourseLog[];
}

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

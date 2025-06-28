// src/app/services/enrollment.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {

  private apiUrl = 'http://localhost:3000/api/enrollment';

  constructor(private http: HttpClient) {}

  getAllCourseByUser(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/${userId}/cours`);
  }

  enrollUserToCourse(userId: number, courseId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, {
      user_id: userId,
      ue_id: courseId
    })
  }

  deleteAll(userId: number): Observable<any>{
    return this.http.delete(`${this.apiUrl}/deleteAll/${userId}`);
  }

  deleteOne(userId: number, courseId:number): Observable<any>{
    return this.http.delete(`${this.apiUrl}/deleteOne/${userId}/${courseId}`);
  }
}

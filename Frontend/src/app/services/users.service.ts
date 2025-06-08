import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface User {
  id: number;
  name: string;
  familyName: string;
  mail: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<User[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map( usersArray => usersArray.map(u => ({
        id: u.id,
        name: u.name,
        familyName: u.family_name,
        mail: u.mail,
      })))
    );
  }


}

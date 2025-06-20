import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { User } from '../class/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiUrl = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) { }

  // recupere tous les utilisateur depuis l'api et les transformes en objet user 
  getAllUsers(): Observable<User[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map( usersArray => usersArray.map(u => 
        new User(u.id, u.name, u.family_name, u.mail)
      ))
    );
  }

  //reupere un utilisateur via son id 
  getUserById(id: number): Observable<User> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map(u => new User(u.id, u.name, u.family_name, u.mail))
    );
  }


}

import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { User } from '../class/user';
import {UserFormData} from "../admin/user-page/user-page.component";

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

  createUserFromFirebase(user: { id: string, name: string, family_name: string, email: string, password: string, birth_date: string, icon: string }): Observable<any> {
  return this.http.post<any>(this.apiUrl, user);
}

  getUserRoles(firebaseUid: string): Observable<string[]> {
    return this.http.get<{ roles: string[] }>(`${this.apiUrl}/roles/${firebaseUid}`)
      .pipe(map(response => response.roles));
  }

  createUser(newId: number, data: UserFormData): Observable<any>{
    return this.http.post(`${this.apiUrl}/create`, {
      id: "",
      name: data.name,
      email: data.email,
      password: "",
      family_name: data.familyName,
      birth_date: "2000-01-01",
      icon: ""
    })
  }

  updateUser(userId: number, newUser: UserFormData): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${userId}`, {
      name: newUser.name,
      familyName: newUser.familyName,
      email: newUser.email
    })
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${userId}`)
  }

  getUserByUid(uid: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/by-uid/${uid}`);
  }

}

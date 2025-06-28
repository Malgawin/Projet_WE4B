import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Cours, Inscrit } from '../class/cours';
import {UeFormData} from "../admin/ue-page/ue-page.component";


@Injectable({
  providedIn: 'root'
})
export class CoursService {

  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  //methode pour recupere tout les cours existant
  getCours(): Observable<Cours[]> {
    return this.http.get<any[]>(`${this.apiUrl}/ue`).pipe(
      map(coursArray => coursArray.map(c => new Cours(
        c.id, c.code, c.name, c.description, c.image
      )))
    );
  }

  // methode pour recuperer un cours a partir de son id
  getCoursbyId(id: string): Observable<Cours> {
    return this.http.get<any>(`${this.apiUrl}/ue/${id}`).pipe(
      map(c => new Cours(
        c.id, c.code, c.name, c.description, c.image
      ))
    );
  }

  //methodes pour recuperer tous les inscrits a un cours donné
  getInscrits(id: number): Observable<Inscrit[]> {
    return this.http.get<any[]>(`${this.apiUrl}/ue/${id}/inscrits`).pipe(
      map(inscritsArray => inscritsArray.map(i => ({
        id: i.id,
        name: i.name,
        familyName: i.family_name,
        mail: i.mail,
        role: i.role
      })))
    )
    ;
  }

  addInscrit(userId: number, coursId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/enrollment/add`, {
      user_id: userId,
      ue_id: coursId
    });
  }

  //methode pour mettre a jour l'id de l'image utilisé
  updateImage(coursId: number, image: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/ue/updateImage`, {
      id: coursId,
      image: image
    });
  }

  //methode pour mettre a jour les informations un cours
  updateCours(coursId: number, newCours: UeFormData): Observable<any> {
    return this.http.put(`${this.apiUrl}/ue/update/${coursId}`, {
      code: newCours.code,
      name: newCours.name,
      desc: newCours.description
    });
  }

  //methode pour recuperer les cours ou un utilisateur est inscrit en le trient par les favoris d'abord
  getCoursByIdLog(userId: number): Observable<Cours[]> {
    return this.http.get<any[]>(`${this.apiUrl}/enrollment/user/${userId}/cours`).pipe(
      map(coursArray => coursArray.map(c => new Cours(
        c.id, c.code, c.name, c.description, c.image, [], c.is_pinned
      )).sort((a, b) => {
        if (a.isPinned && !b.isPinned) return -1;
        if (!a.isPinned && b.isPinned) return 1;
        return a.name.localeCompare(b.name);
      }
      ))
    );
  }

  //methode pour mettre en favoris un cours
  pinCours(userId: number, coursId: number): Observable<{is_pinned: boolean}> {
    return this.http.put<{is_pinned: boolean}>(`${this.apiUrl}/enrollment/pin`, {
      user_id: userId, ue_id: coursId
    });
  }

  //methode pours supprimer un cours
  deleteCours(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/ue/delete/${id}`);
  }

  createCours(ue: Cours): Observable<any> {
    return this.http.post(`${this.apiUrl}/ue/create/`, {
      name: ue.name,
      code: ue.code,
      desc: ue.description
    });
  }
}

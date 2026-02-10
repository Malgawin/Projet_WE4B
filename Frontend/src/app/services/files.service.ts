import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  private apiUrl = 'http://localhost:3000/api/files';

  constructor(private http: HttpClient) { }

  //methode pour recuperer une image grace a son id
  getImage(id: string): string {
    return `${this.apiUrl}/images/${id}`;
  }

  //methode pour upload un image dans la bdd
  uploadImage(file: File): Observable<string> {
    const formData = new FormData();
    formData.append('image', file);
    return this.http.post<{_id: string}>(`${this.apiUrl}/upload/image`, formData,) 
      .pipe(map(res => res._id));
  }

  //methode pour recuperer un pdf grace a son id
  getPdf(id: string): string {
    return `${this.apiUrl}/pdf/${id}`;
  }
    
  //methode pour recuperer un pdf grace a son id
  uploadPdf(file: File): Observable<string> {
    const formData = new FormData(); // Creer un nouveau FormData object
    formData.append('pdf', file); // Ajouter le fichier PDF au FormData
    return this.http.post<{ _id: string }>(`${this.apiUrl}/upload/pdf`, formData) // Envoyer le FormData au serveur
      .pipe(map(res => res._id)); // map la réponse pour retourner l'id du PDF dans mongodb
  }
}

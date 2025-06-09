import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  private apiUrl = 'http://localhost:3000/api/files';

  constructor(private http: HttpClient) { }

  getImage(id: string): string {
    return `${this.apiUrl}/images/${id}`;
  }

  uploadImage(file: File): Observable<any> {}
}

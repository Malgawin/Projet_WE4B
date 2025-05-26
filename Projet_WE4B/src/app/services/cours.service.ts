import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { COURS_FAKE } from '../DATA-a-supp-quand-bdd/datatest';

@Injectable({
  providedIn: 'root'
})
export class CoursService {

  constructor() { }

  getCours(): Observable<any[]> {
    return of(COURS_FAKE); // renvoie un Observable comme une vraie API
  }
}


import { Component, OnInit } from '@angular/core';


import { Auth } from '@angular/fire/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { Observable, of } from 'rxjs';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-user-test',
  templateUrl: './user-test.component.html'
})
export class UserTestComponent implements OnInit {
  uid: string | null = null;
  userFromDb: any = null;
  roles$: Observable<string[]> = of([]);

  constructor(private auth: Auth, private usersService: UsersService) {}


  ngOnInit() {
    onAuthStateChanged(this.auth, user => {
      this.uid = user?.uid ?? null; //Récupere l'id firebase actuellement connecté
      console.log('UID Firebase:', this.uid);

      if (this.uid) {
        // Récupère les rôles
        this.roles$ = this.usersService.getUserRoles(this.uid);

        // Récupère le user complet depuis la base SQL
        this.usersService.getUserByUid(this.uid).subscribe({
          next: user => {
            this.userFromDb = user;
            console.log('User from DB:', user);
          },
          error: err => {
            console.error('Erreur lors de la récupération du user SQL', err);
          }
        });
      }
    });
  }

}

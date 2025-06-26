
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
  roles$: Observable<string[]> = of([]);

  constructor(private auth: Auth, private usersService: UsersService) {}


  ngOnInit() {
    onAuthStateChanged(this.auth, user => {
      this.uid = user?.uid ?? null;
      console.log('UID:', this.uid);
      if (this.uid) {
        this.roles$ = this.usersService.getUserRoles(this.uid);
      }
    });
  }
}
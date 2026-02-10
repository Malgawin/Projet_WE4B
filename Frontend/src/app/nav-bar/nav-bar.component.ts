import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../services/user-auth.service';
import { Router } from '@angular/router';
import { Auth, signOut } from '@angular/fire/auth';
import { JournalLogsService } from '../services/journal-logs.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  constructor(
    public userAuthService: UserAuthService,
    private router: Router,
    private auth: Auth,
    private journalLogsService: JournalLogsService
  ) {}

  ngOnInit(): void {}

  logout() {
    const userId = this.userAuthService.user?.id;
    if (userId) {
      this.journalLogsService.updateLogout(userId).subscribe();
    }
    this.userAuthService.clear(); // Vide user + rôles côté frontend
    signOut(this.auth).then(() => {
      this.router.navigate(['/login']);
    }).catch((error) => {
      console.error('Erreur lors de la déconnexion :', error);
    });
  }
}

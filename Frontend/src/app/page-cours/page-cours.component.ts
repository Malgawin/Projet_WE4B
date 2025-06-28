import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursService } from '../services/cours.service';
import { Cours, Inscrit } from '../class/cours';
import { Router } from '@angular/router';
import { JournalLogsService } from '../services/journal-logs.service';
import { UserAuthService } from '../services/user-auth.service';


@Component({
  selector: 'app-page-cours',
  templateUrl: './page-cours.component.html',
  styleUrls: ['./page-cours.component.css']
})
export class PageCoursComponent implements OnInit {

  cours!: Cours; //recupere le cours selectione
  idLogin?: number; // id de l'utilisateur connecté
  roles: string[] = [];

  constructor(private router: Router, private activatedroute: ActivatedRoute, private coursService: CoursService, private journalLogsService: JournalLogsService, private userAuthService: UserAuthService) { }

  ngOnInit(): void {

    this.idLogin = this.userAuthService.user?.id;
    this.roles = this.userAuthService.roles;

    // Récupération de l'ID du cours depuis l'URL
    const id = this.activatedroute.snapshot.paramMap.get('id') || '0';
    
    if (id) {
      // Récupération des informations du cours via son id
      this.coursService.getCoursbyId(id).subscribe(data => {
      this.cours = data;
        // Récupération des inscrits au cours
        this.coursService.getInscrits(Number(id)).subscribe(inscrits => {
            this.cours.inscrits = inscrits;
        });
      
        // ajout du log de l'utilisateur pour indiquer qu'il a vu le cours
        if (!this.idLogin) {
          console.error("L'utilisateur n'est pas connecté.");
          return;
        }
        this.journalLogsService.updateCourseLog(
            this.idLogin,
            this.cours.id,
            { activity: { type: "view" } }
          ).subscribe();
      });
    }
  }


  //gestion de la vue : 

  currentView: string = 'Cours'; // Vue actuelle, par défaut 'Cours'

  // Méthodes pour changer la vue et naviguer vers les différentes sections du cours
  
  selectCours() {
    this.currentView = 'Cours'
    this.router.navigate(['/cours', this.cours.id ,'course'])
  }

  selectParticipants() {
    this.currentView = 'Participants'
    this.router.navigate(['/cours', this.cours.id ,'participants']);
  }

  selectParametres() {
    this.currentView = 'Parametres'
    this.router.navigate(['/cours', this.cours.id ,'parametres'])
  }

  selectForum() {
    this.currentView = 'Forum'
    this.router.navigate(['/cours', this.cours.id ,'forum'])
  }

  showParametres(): boolean {
    return this.roles.includes('admin') || this.roles.includes('prof');
  }
}

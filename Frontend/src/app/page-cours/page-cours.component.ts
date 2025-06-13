import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursService } from '../services/cours.service';
import { Cours, Inscrit } from '../class/cours';
import { Router } from '@angular/router';
import { JournalLogsService } from '../services/journal-logs.service';


@Component({
  selector: 'app-page-cours',
  templateUrl: './page-cours.component.html',
  styleUrls: ['./page-cours.component.css']
})
export class PageCoursComponent implements OnInit {

  cours!: Cours;
  idLogin: number = 40; // id a changer avec le vrai

  constructor(private router: Router, private activatedroute: ActivatedRoute, private coursService: CoursService, private journalLogsService: JournalLogsService) { }

  ngOnInit(): void {
    const id = this.activatedroute.snapshot.paramMap.get('id') || '0';
    if (id) {
      this.coursService.getCoursbyId(id).subscribe(data => {
      this.cours = data;
      this.coursService.getInscrits(Number(id)).subscribe(inscrits => {
          this.cours.inscrits = inscrits;
        });
      this.journalLogsService.updateCourseLog(
          this.idLogin,
          this.cours.id,
          { lastViewed: new Date() }
        ).subscribe();
    });
    }
  }

  currentView: string = 'Cours';

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
}

import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursService } from '../services/cours.service';
import { Cours, Inscrit } from '../class/cours';
import { Router } from '@angular/router';


@Component({
  selector: 'app-page-cours',
  templateUrl: './page-cours.component.html',
  styleUrls: ['./page-cours.component.css']
})
export class PageCoursComponent implements OnInit {

  cours!: Cours;

  constructor(private router: Router, private activatedroute: ActivatedRoute, private coursService: CoursService) { }

  ngOnInit(): void {
    const id = this.activatedroute.snapshot.paramMap.get('id') || '0';
    if (id) {
      this.coursService.getCoursbyId(id).subscribe(data => {
      this.cours = data;
      this.coursService.getInscrits(Number(id)).subscribe(inscrits => {
          this.cours.inscrits = inscrits;
        });
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

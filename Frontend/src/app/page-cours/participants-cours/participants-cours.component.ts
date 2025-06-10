import { Component, OnInit, Input } from '@angular/core';
import { Inscrit,Cours } from '../../class/cours';
import { ActivatedRoute } from '@angular/router';
import { CoursService } from 'src/app/services/cours.service';



@Component({
  selector: 'app-participants-cours',
  templateUrl: './participants-cours.component.html',
  styleUrls: ['./participants-cours.component.css']
})
export class ParticipantsCoursComponent implements OnInit {

  
  cours!: Cours;
  
  selectedParticipant?: any;
  showWindowAdd: boolean = false;
  filtre = { prenom: '', nom: '', role: '', search: '' };

  constructor( private activatedroute: ActivatedRoute, private coursService: CoursService) { }

  ngOnInit(): void {
    const id = this.activatedroute.parent?.snapshot.paramMap.get('id');
    if (id) {
      this.coursService.getCoursbyId(id).subscribe(cours => {
        this.cours = cours;
        this.coursService.getInscrits(cours.id).subscribe(inscrits => {
          this.cours.inscrits = inscrits;
        });
      });
    }
  }

  get inscrits(): Inscrit[] {
    return this.cours.inscrits || [];
  }

  closeWindowAdd() {
    this.showWindowAdd = false;
  }

  participantSelected(inscrit: any): void {
    this.selectedParticipant = inscrit;
  }
}

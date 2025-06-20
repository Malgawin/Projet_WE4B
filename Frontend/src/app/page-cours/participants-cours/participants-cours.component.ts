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
  
  selectedParticipant?: any; // utiliser pour savoir si on doit afficher les details du participant
  showWindowAdd: boolean = false; // pour afficher la fenetre d'ajout de participant
  filtre = { prenom: '', nom: '', role: '', search: '' }; // pour filtrer les participants

  constructor( private activatedroute: ActivatedRoute, private coursService: CoursService) { }

  ngOnInit(): void {
    // Récupération de l'id du cours depuis l'URL
    const id = this.activatedroute.parent?.snapshot.paramMap.get('id');

    if (id) {
      // Récupération des informations du cours via son id
      this.coursService.getCoursbyId(id).subscribe(cours => {
        this.cours = cours;
        // Récupération des inscrits au cours
        this.coursService.getInscrits(cours.id).subscribe(inscrits => {
          this.cours.inscrits = inscrits;
        });
      });
    }
  }


  get inscrits(): Inscrit[] {
    return this.cours.inscrits || [];
  }

  //methode pour fermer la fenetre d'ajout de participant
  closeWindowAdd() {
    this.showWindowAdd = false;
  }


}

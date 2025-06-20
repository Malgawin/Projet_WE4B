import { Component, OnInit } from '@angular/core';
import { CoursService } from '../../services/cours.service';
import { Cours } from '../../class/cours';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-liste-cours-carte',
  templateUrl: './liste-cours-carte.component.html',
  styleUrls: ['./liste-cours-carte.component.css']
})
export class ListeCoursCarteComponent implements OnInit {

  cours: Cours[] = []; // initialisation de la liste des cours
  userId: number = 40; // id temporaire
  viewType: string = 'carte';

  constructor(private coursService: CoursService, private router: Router) { }

  ngOnInit(): void {

    //recupere la vue du cours pour changer le css
    this.viewType = this.router.url.includes('carte-etendue') ? 'carte-etendue' : 'carte'; 

    //recupere la liste des cours de l'utilisateur
    this.coursService.getCoursByIdLog(this.userId).subscribe(data => {
      this.cours = data;
    });
  }

  //methode pour changer la vue des cartes
  get isExtended(): boolean {
    return this.viewType === 'carte-etendue';
  }

  //methode pour rafraichir la listes des cours
  reloadLists() {
  this.coursService.getCoursByIdLog(this.userId).subscribe(data => {
    this.cours = data;
  });
}

}

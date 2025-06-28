import { Component, OnInit } from '@angular/core';
import { CoursService } from '../../services/cours.service';
import { Cours } from '../../class/cours';
import { ActivatedRoute, Router } from '@angular/router';
import { UserAuthService } from '../../services/user-auth.service';

@Component({
  selector: 'app-liste-cours-carte',
  templateUrl: './liste-cours-carte.component.html',
  styleUrls: ['./liste-cours-carte.component.css']
})
export class ListeCoursCarteComponent implements OnInit {

  cours: Cours[] = []; // initialisation de la liste des cours
  userId?: number ; // id user connecté
  roles: string[] = [];
  viewType: string = 'carte';

  constructor(private coursService: CoursService, private router: Router, private userAuthService: UserAuthService) { }

  ngOnInit(): void {
    
    //recupere l'id de l'utilisateur connecté
    this.userId = this.userAuthService.user?.id;
    this.roles = this.userAuthService.roles;
 

    //recupere la vue du cours pour changer le css
    this.viewType = this.router.url.includes('carte-etendue') ? 'carte-etendue' : 'carte'; 

    //recupere la liste des cours de l'utilisateur
   if (this.roles.includes('admin')) {
      // Si admin on récupère tous les cours
      this.coursService.getCours().subscribe(data => {
        this.cours = data;
      });
    } else if (this.userId !== undefined) {
      // sinon que les cours ou l'utilisateur est inscrit
      this.coursService.getCoursByIdLog(this.userId).subscribe(data => {
        this.cours = data;
      });
    }
  }

  //methode pour changer la vue des cartes
  get isExtended(): boolean {
    return this.viewType === 'carte-etendue';
  }

  //methode pour rafraichir la listes des cours
   reloadLists() {
    if (this.roles.includes('admin')) { //si on est admin on affiche tous les cours
      this.coursService.getCours().subscribe(data => {
        this.cours = data;
      });
    } else if (this.userId !== undefined) {
      this.coursService.getCoursByIdLog(this.userId).subscribe(data => {
        this.cours = data;
      });
    }
  }

}

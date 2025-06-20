import { Component, OnInit } from '@angular/core';
import { ActivitesService } from '../../services/activites.service';
import { Activite } from '../../class/activite';

@Component({
  selector: 'app-activite',
  templateUrl: './activite.component.html',
  styleUrls: ['./activite.component.css']
})
export class ActiviteComponent implements OnInit {

  activites: Activite[] = []; // initialisation des liste des activites
  offset = 0; // initilise le compteur de pagination (offset) a 0
  end = false; // variable pour savoir si on a atteint la fin de la liste des activites
  limit = 6; // nombre d'activites a charger a chaque fois

  userId = 40;

  constructor(private activitesService: ActivitesService) {}

  ngOnInit(): void {
    this.loadMore(); // charge le debut des activites lors de l'initialisation du composant
  }

  // methode pour charger plus d'activites
  loadMore(): void {
    this.activitesService.getActivites(this.userId, this.offset, this.limit).subscribe(res => {
      this.activites.push(...res.posts); // ajoute toutes les nouvelles activites charger a la liste
      this.offset += res.posts.length; // met a jour l'offset pour la prochaine requete
      this.end = res.fin; // met a jour la variable fin pour savoir si on a atteint la fin de la liste
    });
  }

}

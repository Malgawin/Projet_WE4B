import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-tableau-de-bord',
  templateUrl: './tableau-de-bord.component.html',
  styleUrls: ['./tableau-de-bord.component.css']
})
export class TableauDeBordComponent implements OnInit {

  userId: number = 40; // id users log 

  currentView: string = 'Carte'; // gere la vu soit en carte soit en carte entendue
  menuOpen: boolean = false; //gere l'affichage ou non du menu deroulant

  constructor(private router: Router, private acrivatedroute: ActivatedRoute) { }

  ngOnInit(): void {

  }

  
  //methode pour afficher le menu deroulant
  showMenu(): void { 
    this.menuOpen = !this.menuOpen;
  }

  //menu pour changer l'affichage des carte en carte ou carte entendue ou la liste des activité
  selectView(view: string): void {
    this.currentView = view; //change la vue actuelle avec la nouvelle
    this.menuOpen = false; //ferme le menu 

    if (view === 'Carte') { //si on selectionne Carte
      this.router.navigate(['carte'], { relativeTo: this.acrivatedroute }); // on navigue vers la route carte
    } else if (view === 'Liste') {
      this.router.navigate(['carte-etendue'], { relativeTo: this.acrivatedroute }); // on navigue vers la route carte etendue
    } else if (view === 'Activité') {
      this.router.navigate(['activite'], { relativeTo: this.acrivatedroute }); // on navigue vers la route activité
    }
  }
  

}

import { Component, OnInit, Input } from '@angular/core';
import { Inscrit } from '../../../class/cours';
import { Router, ActivatedRoute } from '@angular/router';
import { UserAuthService } from 'src/app/services/user-auth.service';


@Component({
  selector: 'app-participants-liste',
  templateUrl: './participants-liste.component.html',
  styleUrls: ['./participants-liste.component.css']
})
export class ParticipantsListeComponent implements OnInit {


  @Input() coursId!: number;
  @Input() inscrits: Inscrit[] = [];

  // Inputs qui recupere les filtres a aplliquer sur les inscrits
  @Input() filterPrenom = '';
  @Input() filterNom = '';
  @Input() filterRole = '';
  @Input() filterSearch = '';

  @Input() roles: string[] = [];

  
  constructor(private router: Router, private activatedroute: ActivatedRoute, private userAuthService: UserAuthService) {}

  ngOnInit(): void { }

  // getter pour filtrer les inscrits en fonction des filtres appliqués
  get inscritsFiltres(): Inscrit[] {
    return this.inscrits
      //filtre par role si un le filtre est choisi sinon on affiche tous les inscrits
      .filter(i => !this.filterRole || i.role === this.filterRole)
      
      //filtre par prenom puis par nom si un des filtres est choisis, filtre sur le debut du prenom et du nom
      .filter(i => !this.filterPrenom || i.name.toUpperCase().startsWith(this.filterPrenom))
      .filter(i => !this.filterNom || i.familyName.toUpperCase().startsWith(this.filterNom))
      
      //filtre de recherche, cherche dans le nom, le prenom et l'email si contient la chaine aplliquer
      .filter(i =>
        !this.filterSearch ||
        i.name.toLowerCase().includes(this.filterSearch.toLowerCase()) ||
        i.familyName.toLowerCase().includes(this.filterSearch.toLowerCase()) ||
        i.mail.toLowerCase().includes(this.filterSearch.toLowerCase())
      );
  }


  page: number = 1;
  slice: number = 10; //defini nombre de participants afficher par page

  // getter pour recuperer les inscrits a afficher en fonction de la page
  get inscritsSlice(): Inscrit[] {
    return this.inscritsFiltres.slice(((this.page -1) * this.slice), ((this.page -1) * this.slice) + this.slice);
  }

  // getter pour calculer le nombre de pages necessaire a l'affichage
  get pageMax(): number {
    return Math.ceil(this.inscritsFiltres.length / this.slice); //calcule le nombre de pages necesaire a l'affichage en arondisant a l'entier superieur;
  }
  
  // Methode pour changer de page
  prevPage() {
    if (this.page > 0){
      this.page--;
    }  
  }

  // Methode pour changer de page
  nextPage() {
    if (this.page < this.pageMax ){ 
      this.page++;
    }
  }

  

  // Methode pour afficher les détails d'un participant
  clickParticipant(inscrit: any): void {
    if (this.roles.includes('admin') || this.roles.includes('prof')){
      this.router.navigate(['../participants', inscrit.id, 'details'], { relativeTo: this.activatedroute });
    }
  }
}

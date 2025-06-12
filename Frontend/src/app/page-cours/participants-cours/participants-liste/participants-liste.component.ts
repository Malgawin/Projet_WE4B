import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Inscrit } from '../../../class/cours';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-participants-liste',
  templateUrl: './participants-liste.component.html',
  styleUrls: ['./participants-liste.component.css']
})
export class ParticipantsListeComponent implements OnInit {

  @Output() particpantClick = new EventEmitter<any>();
  @Input() coursId!: number;
  @Input() inscrits: Inscrit[] = [];
  @Input() filterPrenom = '';
  @Input() filterNom = '';
  @Input() filterRole = '';
  @Input() filterSearch = '';

  get inscritsFiltres(): Inscrit[] {
  return this.inscrits
    .filter(i => !this.filterRole || i.role === this.filterRole)
    .filter(i => !this.filterPrenom || i.name.toUpperCase().startsWith(this.filterPrenom))
    .filter(i => !this.filterNom || i.familyName.toUpperCase().startsWith(this.filterNom))
    .filter(i =>
      !this.filterSearch ||
      i.name.toLowerCase().includes(this.filterSearch.toLowerCase()) ||
      i.familyName.toLowerCase().includes(this.filterSearch.toLowerCase()) ||
      i.mail.toLowerCase().includes(this.filterSearch.toLowerCase())
    );
  }

  constructor(private router: Router, private activatedroute: ActivatedRoute) {}

  ngOnInit(): void {
  }

  page: number = 1;
  slice: number = 10; //defini nombre de participants afficher par page

  get inscritsSlice(): Inscrit[] {
    return this.inscritsFiltres.slice(((this.page -1) * this.slice), ((this.page -1) * this.slice) + this.slice);
  }

  get pageMax(): number {
    return Math.ceil(this.inscritsFiltres.length / this.slice); //calcule le nombre de pages necesaire a l'affichage en arondosant a l'entier superieur;
  }
  
  prevPage() {
    if (this.page > 0){
      this.page--;
    }  
  }

  nextPage() {
    if (this.page < this.pageMax ){ 
      this.page++;
    }
  }

  clickParticipant(inscrit: any): void {
    this.router.navigate(['../participants', inscrit.id, 'details'], { relativeTo: this.activatedroute });
  }
}

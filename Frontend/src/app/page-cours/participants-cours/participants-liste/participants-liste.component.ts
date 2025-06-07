import { Component, OnInit, Input } from '@angular/core';
import { Inscrit } from '../../../class/cours';


@Component({
  selector: 'app-participants-liste',
  templateUrl: './participants-liste.component.html',
  styleUrls: ['./participants-liste.component.css']
})
export class ParticipantsListeComponent implements OnInit {

  @Input() inscrits: Inscrit[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  page: number = 1;
  slice: number = 10; //defini nombre de participants afficher par page

  get inscritsSlice(): Inscrit[] {
    return this.inscrits.slice(((this.page -1) * this.slice), ((this.page -1) * this.slice) + this.slice);
  }

  get pageMax(): number {
    return Math.ceil(this.inscrits.length / this.slice); //calcule le nombre de pages necesaire a l'affichage en arondosant a l'entier superieur;
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
}

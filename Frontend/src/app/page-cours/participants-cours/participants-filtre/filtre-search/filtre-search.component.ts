import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filtre-search',
  templateUrl: './filtre-search.component.html',
  styleUrls: ['./filtre-search.component.css']
})
export class FiltreSearchComponent implements OnInit {

  @Input() placeholder = 'Rechercher...'; //texte placer dans l'input
  @Input() search = '';  //valeur de l'input de recherche
  @Output() searchChange = new EventEmitter<string>();//evenement emis lors de changement de la recherche

  constructor() { }

  ngOnInit(): void {
  }

  // methode appelée pour émettre la nouvelle valeur de recherche au parent
  Search() {
    this.searchChange.emit(this.search);
  }

}

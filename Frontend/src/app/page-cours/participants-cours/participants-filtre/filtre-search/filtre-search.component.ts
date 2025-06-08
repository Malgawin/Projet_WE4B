import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filtre-search',
  templateUrl: './filtre-search.component.html',
  styleUrls: ['./filtre-search.component.css']
})
export class FiltreSearchComponent implements OnInit {

  @Input() placeholder = 'Rechercher...';
  @Input() search = '';
  @Output() searchChange = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  Search() {
    this.searchChange.emit(this.search);
  }

}

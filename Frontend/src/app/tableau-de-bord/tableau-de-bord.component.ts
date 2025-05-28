import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-tableau-de-bord',
  templateUrl: './tableau-de-bord.component.html',
  styleUrls: ['./tableau-de-bord.component.css']
})
export class TableauDeBordComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }




  currentView: string = 'Carte';
  menuOpen: boolean = false;

  showMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  selectView(view: string): void {
    this.currentView = view;
    this.menuOpen = false;
  }

  

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-tableau-de-bord',
  templateUrl: './tableau-de-bord.component.html',
  styleUrls: ['./tableau-de-bord.component.css']
})
export class TableauDeBordComponent implements OnInit {

  constructor(private router: Router, private acrivatedroute: ActivatedRoute) { }

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

    if (view === 'Carte') {
      this.router.navigate(['carte'], { relativeTo: this.acrivatedroute });
    } else if (view === 'Liste') {
      this.router.navigate(['carte-etendue'], { relativeTo: this.acrivatedroute });
    } else if (view === 'Activité') {
      this.router.navigate(['activite'], { relativeTo: this.acrivatedroute });
    }
  }
  

}

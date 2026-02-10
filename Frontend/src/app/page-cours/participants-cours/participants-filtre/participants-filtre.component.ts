import { Component, OnInit, Input, Output } from '@angular/core';

import { EventEmitter } from '@angular/core';



@Component({
  selector: 'app-participants-filtre',
  templateUrl: './participants-filtre.component.html',
  styleUrls: ['./participants-filtre.component.css']
})
export class ParticipantsFiltreComponent implements OnInit {
  


  constructor() { }

  ngOnInit(): void {
  }

  //evenement emis lors de changement des filtres
  @Output() filtreChange = new EventEmitter<{prenom: string, nom: string, role: string, search: string}>();

  //recupere valeurs des filtres 
  search = '';
  filterPrenom = '';
  filterNom = '';
  filterRole = '';

  //methode pour changer le filtre de recherche
  filter(type: 'prenom' | 'nom' | 'role', value: string) {
    if (type === 'prenom') this.filterPrenom = value;
    if (type === 'nom') this.filterNom = value;
    if (type === 'role') this.filterRole = value;
    this.filtreChange.emit({ prenom: this.filterPrenom, nom: this.filterNom, role: this.filterRole, search: this.search });
  }

  //methode utiliser pour lancer une recher globale sur les inscrits avec un input
  Search() {
    this.filtreChange.emit({
      prenom: this.filterPrenom,
      nom: this.filterNom,
      role: this.filterRole,
      search: this.search
    });
  }
}

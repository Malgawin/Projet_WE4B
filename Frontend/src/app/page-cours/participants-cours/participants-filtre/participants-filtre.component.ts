import { Component, OnInit, Input, Output } from '@angular/core';
import { Inscrit } from '../../../class/cours';
import { EventEmitter } from '@angular/core';



@Component({
  selector: 'app-participants-filtre',
  templateUrl: './participants-filtre.component.html',
  styleUrls: ['./participants-filtre.component.css']
})
export class ParticipantsFiltreComponent implements OnInit {
  
  @Input() inscrits: Inscrit[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  @Output() filtreChange = new EventEmitter<{prenom: string, nom: string, role: string, search: string}>();

  
  search = '';
  filterPrenom = '';
  filterNom = '';
  filterRole = '';

  get inscritsFiltres(): Inscrit[] {
    return this.inscrits
      .filter(i => !this.filterRole || i.role === this.filterRole)
      .filter(i => !this.filterPrenom || i.name.toUpperCase().startsWith(this.filterPrenom))
      .filter(i => !this.filterNom || i.familyName.toUpperCase().startsWith(this.filterNom))
      .filter(i =>
        !this.search ||
        i.name.toLowerCase().includes(this.search.toLowerCase()) ||
        i.familyName.toLowerCase().includes(this.search.toLowerCase()) ||
        i.mail.toLowerCase().includes(this.search.toLowerCase())
      );
  }

  filter(type: 'prenom' | 'nom' | 'role', value: string) {
    if (type === 'prenom') this.filterPrenom = value;
    if (type === 'nom') this.filterNom = value;
    if (type === 'role') this.filterRole = value;
    this.filtreChange.emit({ prenom: this.filterPrenom, nom: this.filterNom, role: this.filterRole, search: this.search });
  }

  Search() {
    this.filtreChange.emit({
      prenom: this.filterPrenom,
      nom: this.filterNom,
      role: this.filterRole,
      search: this.search
    });
  }
}

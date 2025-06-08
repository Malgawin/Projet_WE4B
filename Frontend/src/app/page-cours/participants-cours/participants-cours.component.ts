import { Component, OnInit, Input } from '@angular/core';
import { Inscrit,Cours } from '../../class/cours';


@Component({
  selector: 'app-participants-cours',
  templateUrl: './participants-cours.component.html',
  styleUrls: ['./participants-cours.component.css']
})
export class ParticipantsCoursComponent implements OnInit {

  
  @Input() cours!: Cours;

  constructor( ) { }

  ngOnInit(): void {
    
  }

  showWindowAdd: boolean = false;
  filtre = { prenom: '', nom: '', role: '', search: '' };

  get inscrits(): Inscrit[] {
    return this.cours.inscrits || [];
  }

  closeWindowAdd() {
    this.showWindowAdd = false;
  }
}

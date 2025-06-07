import { Component, OnInit, Input } from '@angular/core';
import { Inscrit } from '../../class/cours';


@Component({
  selector: 'app-participants-cours',
  templateUrl: './participants-cours.component.html',
  styleUrls: ['./participants-cours.component.css']
})
export class ParticipantsCoursComponent implements OnInit {

  @Input() inscrits: Inscrit[] = [];

  constructor( ) { }

  ngOnInit(): void {
    
  }

}

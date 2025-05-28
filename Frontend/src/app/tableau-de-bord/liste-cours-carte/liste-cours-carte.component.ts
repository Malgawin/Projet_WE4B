import { Component, OnInit } from '@angular/core';
import { CoursService, Cours } from '../../services/cours.service';


@Component({
  selector: 'app-liste-cours-carte',
  templateUrl: './liste-cours-carte.component.html',
  styleUrls: ['./liste-cours-carte.component.css']
})
export class ListeCoursCarteComponent implements OnInit {

  cours: Cours[] = [];
  

  constructor(private coursService: CoursService) { }

   ngOnInit(): void {
    this.coursService.getCours().subscribe(data => {
      this.cours = data;
    });
  }



}

import { Component, OnInit } from '@angular/core';
import { CoursService, Cours } from '../../services/cours.service';

@Component({
  selector: 'app-liste-cours-etendue',
  templateUrl: './liste-cours-etendue.component.html',
  styleUrls: ['./liste-cours-etendue.component.css']
})
export class ListeCoursEtendueComponent implements OnInit {

  cours: Cours[] = [];

  constructor(private coursService: CoursService) { }

  ngOnInit(): void {
    this.coursService.getCours().subscribe(data => {
      this.cours = data;
    });
  }
}
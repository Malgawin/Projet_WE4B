import { Component, OnInit, Input } from '@angular/core';
import { Cours } from '../../class/cours';
import { ActivatedRoute } from '@angular/router';
import { CoursService } from 'src/app/services/cours.service';

@Component({
  selector: 'app-parametres-cours',
  templateUrl: './parametres-cours.component.html',
  styleUrls: ['./parametres-cours.component.css']
})
export class ParametresCoursComponent implements OnInit {

  cours!: Cours;

  constructor( private activatedroute: ActivatedRoute, private coursService: CoursService) { }

  ngOnInit(): void {
    // Récupération de l'ID du cours depuis l'URL
    const id = this.activatedroute.parent?.snapshot.paramMap.get('id') || '0';
    
    if (id) {
      // Récupération des informations du cours via son id
      this.coursService.getCoursbyId(id).subscribe(cours => {
        this.cours = cours;
      });
    }
  }

}

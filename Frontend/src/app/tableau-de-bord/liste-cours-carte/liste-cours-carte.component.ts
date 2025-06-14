import { Component, OnInit } from '@angular/core';
import { CoursService } from '../../services/cours.service';
import { Cours } from '../../class/cours';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-liste-cours-carte',
  templateUrl: './liste-cours-carte.component.html',
  styleUrls: ['./liste-cours-carte.component.css']
})
export class ListeCoursCarteComponent implements OnInit {

  cours: Cours[] = [];
  userId: number = 40; // id temporaire
  viewType: string = 'carte';

  constructor(private coursService: CoursService, private router: Router) { }

  ngOnInit(): void {

    this.viewType = this.router.url.includes('carte-etendue') ? 'carte-etendue' : 'carte';

    this.coursService.getCoursByIdLog(this.userId).subscribe(data => {
      this.cours = data;
    });
  }


  get isExtended(): boolean {
    return this.viewType === 'carte-etendue';
  }



}

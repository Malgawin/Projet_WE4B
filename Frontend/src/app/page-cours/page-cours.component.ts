import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cours, CoursService } from '../services/cours.service';


@Component({
  selector: 'app-page-cours',
  templateUrl: './page-cours.component.html',
  styleUrls: ['./page-cours.component.css']
})
export class PageCoursComponent implements OnInit {

  cours!: Cours;

  constructor(private route: ActivatedRoute, private coursService: CoursService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.coursService.getCoursbyId(id).subscribe(data => {
      this.cours = data;
    });
    }
  }

  currentView: string = 'Cours';
  selectView(view: string): void {
    this.currentView = view;
  }
  

}

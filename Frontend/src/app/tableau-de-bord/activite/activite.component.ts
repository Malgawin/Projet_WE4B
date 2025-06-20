import { Component, OnInit } from '@angular/core';
import { ActivitesService, Activite } from '../../services/activites.service';

@Component({
  selector: 'app-activite',
  templateUrl: './activite.component.html',
  styleUrls: ['./activite.component.css']
})
export class ActiviteComponent implements OnInit {

  activites: Activite[] = []; 
  offset = 0; 
  end = false;

  userId = 40;

  constructor(private activitesService: ActivitesService) {}

  ngOnInit(): void {
    this.loadMore();
  }

  loadMore(): void {
    this.activitesService.getActivites(this.userId, this.offset).subscribe(res => {
      this.activites.push(...res.posts); // ajoute toutes les nouvelles activites charger a la liste
      this.offset += res.posts.length;
      this.end = res.fin; 
    });
  }

}

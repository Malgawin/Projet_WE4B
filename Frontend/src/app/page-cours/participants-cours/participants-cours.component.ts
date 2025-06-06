import { Component, OnInit } from '@angular/core';
import { CoursService, Inscrit } from '../../services/cours.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-participants-cours',
  templateUrl: './participants-cours.component.html',
  styleUrls: ['./participants-cours.component.css']
})
export class ParticipantsCoursComponent implements OnInit {

  inscrits: Inscrit[] = [];

  constructor( private coursService: CoursService, private route: ActivatedRoute ) { }

  ngOnInit(): void {
    const coursId = Number(this.route.snapshot.paramMap.get('id'));
    this.coursService.getInscrits(coursId).subscribe(data => {
  this.inscrits = data;
  });
  }

}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Inscrit, Cours} from 'src/app/class/cours'
import { CoursService } from 'src/app/services/cours.service';


@Component({
  selector: 'app-participants-details',
  templateUrl: './participants-details.component.html',
  styleUrls: ['./participants-details.component.css']
})
export class ParticipantsDetailsComponent implements OnInit {

  inscrit!: Inscrit;

  coursId!: number;

  constructor(  private router: Router, private activatedroute: ActivatedRoute, private coursService: CoursService) { }

  ngOnInit(): void {
    const coursId = Number(this.activatedroute.parent?.snapshot.paramMap.get('id'));
    this.coursId = coursId;

    const inscritId = Number(this.activatedroute.snapshot.paramMap.get('id'));
    this.coursService.getInscrits(coursId).subscribe(inscrits => {
      this.inscrit = inscrits.find(i => i.id === inscritId)!;
    });
  }

  return() {
    this.router.navigate(['/cours', this.coursId, 'participants']);
  }
  
}

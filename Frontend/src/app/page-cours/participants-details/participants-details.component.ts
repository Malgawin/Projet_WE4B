import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Inscrit, Cours} from 'src/app/class/cours'
import { CoursService } from 'src/app/services/cours.service';
import { JournalLogsService } from 'src/app/services/journal-logs.service';
import {UserLog, CourseLog } from 'src/app/class/journal_logs'


@Component({
  selector: 'app-participants-details',
  templateUrl: './participants-details.component.html',
  styleUrls: ['./participants-details.component.css']
})
export class ParticipantsDetailsComponent implements OnInit {

  inscrit!: Inscrit; 
  coursId!: number;
  
  userLog?: UserLog;
  courseLog?: CourseLog;

  constructor(  private router: Router, private activatedroute: ActivatedRoute, private coursService: CoursService, private journalLogsService: JournalLogsService) { }

  ngOnInit(): void {

    // Récupération de l'id du cours depuis l'URL de la route parent
    const coursId = Number(this.activatedroute.parent?.snapshot.paramMap.get('id'));
    this.coursId = coursId;

    // Récupération de l'id de l'inscrit depuis l'URL de la route actuelle
    const inscritId = Number(this.activatedroute.snapshot.paramMap.get('id'));
    
    //recupere les inscrits au cours
    this.coursService.getInscrits(coursId).subscribe(inscrits => {
      //recupère l'inscrit correspondant à l'id
      this.inscrit = inscrits.find(i => i.id === inscritId)!;
       
      if (this.inscrit) {

        // Récupération des logs de l'utilisateur
        this.journalLogsService.getLogByUserId(this.inscrit.id).subscribe( log => {
            this.userLog = log;
            
            //recupere le journal d'activité de l'utilisateur pour ce cours
            if (log.courses) {
              this.courseLog = log.courses.find(c => c.courseId === this.coursId);
            }
        });
        }
    });
  }

  // methode pour naviguer vers la page des participants du cours
  return() {
    this.router.navigate(['/cours', this.coursId, 'participants']);
  }









}

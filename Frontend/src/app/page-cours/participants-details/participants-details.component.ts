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
    const coursId = Number(this.activatedroute.parent?.snapshot.paramMap.get('id'));
    this.coursId = coursId;

    const inscritId = Number(this.activatedroute.snapshot.paramMap.get('id'));
    this.coursService.getInscrits(coursId).subscribe(inscrits => {
      this.inscrit = inscrits.find(i => i.id === inscritId)!;
       if (this.inscrit) {
        this.journalLogsService.getLogByUserId(this.inscrit.id).subscribe( log => {
            this.userLog = log;
            if (log.courses) {
              this.courseLog = log.courses.find(c => c.courseId === this.coursId);
            }
        });
        }
    });
  }

  return() {
    this.router.navigate(['/cours', this.coursId, 'participants']);
  }


  getActivityByType(activity: any): string {
  switch (activity.type) {
    case 'create-forum':
      return 'a créé un forum';
    case 'forum-message':
      return 'a posté un message dans un forum';
    case 'forum-message-delete':
      return 'a suprimer un message dans un forum';
    case 'view':
      return 'a consulté ce cours';
    case 'check-post':
      return 'a valide un post';

      
    default:
      return 'a fait quelque chose';
  }
}







}

import { Component, OnInit, Input } from '@angular/core';
import { CourseLog } from 'src/app/class/journal_logs';


@Component({
  selector: 'app-journal-activite-cours',
  templateUrl: './journal-activite-cours.component.html',
  styleUrls: ['./journal-activite-cours.component.css']
})
export class JournalActiviteCoursComponent implements OnInit {

  @Input() courseLog?: CourseLog;

  constructor() { }

  ngOnInit(): void {
  }

  //methode pour traduiire les types d'activités en phrases
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

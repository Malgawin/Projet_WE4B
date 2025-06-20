import { Component, OnInit, Input } from '@angular/core';
import { CourseLog } from 'src/app/class/journal_logs';


@Component({
  selector: 'app-journal-activite-cours',
  templateUrl: './journal-activite-cours.component.html',
  styleUrls: ['./journal-activite-cours.component.css']
})
export class JournalActiviteCoursComponent implements OnInit {

  @Input() courseLog?: CourseLog;
  @Input() getActivityByType!: (activity: any) => string;


  constructor() { }

  ngOnInit(): void {
  }

}

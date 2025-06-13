import { Component, OnInit, Input } from '@angular/core';
import { CourseLog } from 'src/app/class/journal_logs';


@Component({
  selector: 'app-activite-cours',
  templateUrl: './activite-cours.component.html',
  styleUrls: ['./activite-cours.component.css']
})
export class ActiviteCoursComponent implements OnInit {

  @Input() courseLog?: CourseLog;
  @Input() DateToPhrase!: (dateStr?: string) => string;
  @Input() timePast!: (dateStr?: string) => string;

  constructor() { }

  ngOnInit(): void {
  }

}

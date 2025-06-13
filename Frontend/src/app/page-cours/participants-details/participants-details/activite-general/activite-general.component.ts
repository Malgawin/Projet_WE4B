import { Component, OnInit, Input } from '@angular/core';

import { UserLog } from 'src/app/class/journal_logs';


@Component({
  selector: 'app-activite-general',
  templateUrl: './activite-general.component.html',
  styleUrls: ['./activite-general.component.css']
})
export class ActiviteGeneralComponent implements OnInit {

  @Input() userLog?: UserLog;
  @Input() DateToPhrase!: (dateStr?: string) => string;
  @Input() timePast!: (dateStr?: string) => string;

  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Inscrit} from 'src/app/class/cours'

@Component({
  selector: 'app-participants-details',
  templateUrl: './participants-details.component.html',
  styleUrls: ['./participants-details.component.css']
})
export class ParticipantsDetailsComponent implements OnInit {

  @Input() inscrit!: Inscrit;
  @Output() close = new EventEmitter<void>();
  

  constructor() { }

  ngOnInit(): void {
  }

  
}

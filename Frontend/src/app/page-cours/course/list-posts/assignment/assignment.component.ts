import { Component, Input, OnInit } from '@angular/core';
import { Assignment } from 'src/app/class/cours';

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.css']
})
export class AssignmentComponent implements OnInit {

  @Input() assignement!: Assignment;

  constructor() { }

  ngOnInit(): void {
  }

  uploadFile(){
    
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Assignment } from 'src/app/class/cours';

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.css']
})
export class AssignmentComponent implements OnInit {

  @Input() assignment!: Assignment;

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
    console.log("test", this.assignment);
  }

  uploadFile(){
    this.router.navigate(['soumission-devoir/', this.assignment._id])
  }

}

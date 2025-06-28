import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    console.log("test", this.assignment);
  }

  uploadFile(){
    const id_course : number = Number(this.route.parent?.snapshot.paramMap.get('id'));
    this.router.navigate(['soumission-devoir/', id_course, this.assignment._id])
  }
  
  getSubmit(){
    this.router.navigate(['travaux-rendus/', this.assignment._id]);
  }

}

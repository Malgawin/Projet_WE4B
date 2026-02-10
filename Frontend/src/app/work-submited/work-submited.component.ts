import { Component, OnInit } from '@angular/core';
import { Assignment } from '../class/cours';
import { AssignmentService } from '../services/assignment.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-work-submited',
  templateUrl: './work-submited.component.html',
  styleUrls: ['./work-submited.component.css']
})
export class WorkSubmitedComponent implements OnInit {

  assignment!: Assignment;
  

  constructor(
    private service: AssignmentService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id_assignment = this.route.snapshot.paramMap.get('id_assignment');
    this.service.getAssignementsById(id_assignment).subscribe(result => {
        this.assignment = result;
      });
    
  }



}

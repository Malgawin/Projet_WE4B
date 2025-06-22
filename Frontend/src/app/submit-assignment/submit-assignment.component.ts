import { Component, OnInit } from '@angular/core';
import { AssignmentService } from '../services/assignment.service';
import { ActivatedRoute } from '@angular/router';
import { Assignment } from '../class/cours';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { checkFileExtension } from '../validators/validator-check-extension';

@Component({
  selector: 'app-submit-assignment',
  templateUrl: './submit-assignment.component.html',
  styleUrls: ['./submit-assignment.component.css']
})
export class SubmitAssignmentComponent implements OnInit {

  public assignment !: Assignment
  assignForm = new FormGroup({
      file: new FormControl('', [Validators.required, checkFileExtension]),
    })

  constructor(
    private service: AssignmentService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const assignId = this.route.snapshot.paramMap.get('id');
    this.service.getAssignementsById(assignId).subscribe(result => {
        this.assignment = result;
      });
  }

  submitForm(): void {

  }

}

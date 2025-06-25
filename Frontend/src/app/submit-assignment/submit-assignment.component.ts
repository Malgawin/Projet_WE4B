import { Component, OnInit } from '@angular/core';
import { AssignmentService } from '../services/assignment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Assignment, Submit } from '../class/cours';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { checkFileExtension } from '../validators/validator-check-extension';
import { FilesService } from '../services/files.service';

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
    private assign_service: AssignmentService,
    private files_service: FilesService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    const assignId = this.route.snapshot.paramMap.get('id');
    this.assign_service.getAssignementsById(assignId).subscribe(result => {
        this.assignment = result;
      });
  }

  submitForm(): void {
    console.log(this.assignForm.value.file!)
    this.files_service.uploadPdf(this.assignForm.value.file!).subscribe(result => {
    console.log('Résultat de uploadPdf :', result);
    });
    let id_course : number = Number(this.route.snapshot.paramMap.get('id'));
    let submit : Submit = {
      _id: 0,
      userId: 0,
      fileId : 0,
      grade: null,
      comment: null,
      state: "En attente"
    }
    /*
    this.service.addAssignment(submit).subscribe(result => {
    console.log('Résultat de addAssignment :', result);
    });
    */
    /*this.router.navigate(['cours/', id_course])*/
  }

}

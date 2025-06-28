import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Assignment } from 'src/app/class/cours';
import { AssignmentService } from 'src/app/services/assignment.service';
import { checkDate } from 'src/app/validators/validator-check-date';

@Component({
  selector: 'app-form-create-assignment',
  templateUrl: './form-create-assignment.component.html',
  styleUrls: ['./form-create-assignment.component.css']
})
export class FormCreateAssignmentComponent implements OnInit {

  assignForm = new FormGroup({
  title: new FormControl('', Validators.required),
  publishDate: new FormControl('', [Validators.required, checkDate]),
  type: new FormControl('', Validators.required),
  message: new FormControl('', Validators.required),
  deadline : new FormControl('', [Validators.required, checkDate]),

  })
 
  @Input() idLogin!: number;

  constructor(
    private service : AssignmentService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  submitForm(): void {
    let id_course : number = Number(this.route.snapshot.paramMap.get('id'));
    let assignment : Assignment = {
      _id: 0,
      id_course: id_course,
      title: this.assignForm.value.title!,
      type: this.assignForm.value.type!,
      messages: this.assignForm.value.message!,
      publishDate: this.assignForm.value.publishDate!,
      deadline: this.assignForm.value.deadline!,
      author_id: this.idLogin,
      sort_order: 11 // Assuming a static sort order for now
    }
    console.log('Devoir :', assignment);
    this.service.addAssignment(assignment).subscribe(result => {
    console.log('Résultat de addAssignment :', result);
    });
    this.router.navigate(['cours/', id_course])
  }

}

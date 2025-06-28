import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Assignment } from 'src/app/class/cours';
import { AssignmentService } from 'src/app/services/assignment.service';
import { UserAuthService } from 'src/app/services/user-auth.service';
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
    private userAuthService : UserAuthService
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
      author_id: this.userAuthService.user?.id, // Assuming a static author ID for now
      sort_order: 11 // Assuming a static sort order for now
    }
    console.log('Devoir :', assignment);
    this.service.addAssignment(assignment).subscribe(result => {
    console.log('Résultat de addAssignment :', result);
    });
    this.router.navigate(['cours/', id_course])
  }

  get deadline () {
    return this.assignForm.get('deadline');
  }

  get publishDate () {
    return this.assignForm.get('publishDate');
  }

  get title () {
    return this.assignForm.get('title');
  }

  get type () {
    return this.assignForm.get('type');
  }

  get message () {
    return this.assignForm.get('message');
  }


}

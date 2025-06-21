import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
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

  constructor(
    private service : PostService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  submitForm(): void {
  }

}

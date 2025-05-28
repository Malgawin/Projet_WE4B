import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-create-repository',
  templateUrl: './form-create-repository.component.html',
  styleUrls: ['./form-create-repository.component.css']
})
export class FormCreateRepositoryComponent implements OnInit {

  repoForm = new FormGroup({
      title: new FormControl(''),
      publishDate: new FormControl(''),
      type: new FormControl(''),
      file: new FormControl(''),
      message: new FormControl(''),
      
    })

  constructor() { }

  ngOnInit(): void {
  }

}

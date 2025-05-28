import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-create-text',
  templateUrl: './form-create-text.component.html',
  styleUrls: ['./form-create-text.component.css']
})
export class FormCreateTextComponent implements OnInit {

  textForm = new FormGroup({
    title: new FormControl(''),
    publishDate: new FormControl(''),
    type: new FormControl(''),
    message: new FormControl(''),
    
  })

  constructor() { }

  ngOnInit(): void {
  }

}

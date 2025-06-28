import { Component, Input, OnInit } from '@angular/core';
import { Submit } from 'src/app/class/cours';

@Component({
  selector: 'app-submit',
  templateUrl: './submit.component.html',
  styleUrls: ['./submit.component.css']
})
export class SubmitComponent implements OnInit {

  @Input() submit!: Submit;

  constructor() { }

  ngOnInit(): void {
  }

}

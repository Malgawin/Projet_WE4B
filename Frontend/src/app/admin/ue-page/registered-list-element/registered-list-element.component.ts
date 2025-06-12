import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../../class/user";

@Component({
  selector: 'app-registered-list-element',
  templateUrl: './registered-list-element.component.html',
  styleUrls: ['./registered-list-element.component.css']
})
export class RegisteredListElementComponent implements OnInit {
  @Input() registered!: User;

  constructor() { }

  ngOnInit(): void {
  }

}

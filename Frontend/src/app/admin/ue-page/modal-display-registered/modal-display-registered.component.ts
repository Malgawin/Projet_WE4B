import { Component, OnInit } from '@angular/core';
import {User} from "../../../class/user";

@Component({
  selector: 'app-modal-display-registered',
  templateUrl: './modal-display-registered.component.html',
  styleUrls: ['./modal-display-registered.component.css']
})
export class ModalDisplayRegisteredComponent implements OnInit {

  registered: User[] = [
    new User(0, "Joshua", "Plouzennec", "aaaa"),
    new User(0, "Joshua", "Plouzennec", "aaaa"),
    new User(0, "Joshua", "Plouzennec", "aaaa"),
    new User(0, "Joshua", "Plouzennec", "aaaa"),
    new User(0, "Joshua", "Plouzennec", "aaaa"),
    new User(0, "Joshua", "Plouzennec", "aaaa")
  ];

  constructor() { }

  ngOnInit(): void {
  }

}

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
    new User(1, "Joshua", "Plouzennec", "aaaa"),
    new User(2, "Joshua", "Plouzennec", "aaaa"),
    new User(3, "Joshua", "Plouzennec", "aaaa"),
    new User(4, "Joshua", "Plouzennec", "aaaa"),
    new User(5, "Joshua", "Plouzennec", "aaaa")
  ];

  constructor() { }

  ngOnInit(): void {
  }

  handleEvent(regId: number) {
    if (confirm("Voulez-vous vraiment désinscrire cet utilisateur ?")){
      this.registered = this.registered.filter(reg => reg.id !== regId);
    }
  }

}

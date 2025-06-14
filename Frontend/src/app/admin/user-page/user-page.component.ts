import { Component, OnInit } from '@angular/core';
import {User} from "../../class/user";
import {Cours} from "../../class/cours";

export interface UserFormData {
  name: string;
  familyName: string;
  email: string;
  ues: Cours[];
}

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {

  users: User[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  handleUserCreated(data: UserFormData) {
    const newId = this.users.length > 0 ? Math.max(...this.users.map(u => u.id)) + 1 : 0;
    this.users.push(new User(newId, data.name, data.familyName, data.email));
  }

}

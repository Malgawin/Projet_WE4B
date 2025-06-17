import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../../class/user";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  @Input() users: User[] = [];

  constructor() { }

  handleDelete(userId: number){
    if (confirm("Voulez-vous vraiment supprimer cet utilisateur ?")){
      this.users = this.users.filter(user => user.id !== userId);
    }
  }

  ngOnInit(): void {
  }

}

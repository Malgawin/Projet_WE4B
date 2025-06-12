import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from "../../../class/user";

@Component({
  selector: 'app-user-list-element',
  templateUrl: './user-list-element.component.html',
  styleUrls: ['./user-list-element.component.css']
})
export class UserListElementComponent implements OnInit {
  @Input() user!: User;

  @Output() delete = new EventEmitter<number>();

  constructor() {
    this.user = new User(0, "Joshua", "Plouzennec", "joshua.plouzennec@gmail.com")
    //TODO : changer ici pour avoir les entrées de la bdd
  }

  onModify(){
    console.log('Modify user:', this.user.id);
    //todo : les modales
  }

  onDelete(){
    this.delete.emit(this.user.id);
  }

  ngOnInit(): void {
  }
}

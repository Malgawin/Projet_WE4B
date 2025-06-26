import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from "../../../class/user";
import {UserFormData} from "../user-page.component";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  @Input() users: User[] = [];

  @Output() modify = new EventEmitter<[number, UserFormData]>();
  @Output() delete = new EventEmitter<number>();

  constructor() { }

  handleDeletion(userId: number){
    this.delete.emit(userId);
  }

  handleModification(id: number, data: UserFormData){
    this.modify.emit([id, data]);
  }

  ngOnInit(): void {
  }

}

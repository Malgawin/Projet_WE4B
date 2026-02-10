import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from "../../../class/user";
import {UserFormData} from "../user-page.component";

@Component({
  selector: 'app-user-list-element',
  templateUrl: './user-list-element.component.html',
  styleUrls: ['./user-list-element.component.css']
})
export class UserListElementComponent implements OnInit {

  @Input() user!: User;

  @Output() delete = new EventEmitter<number>();
  @Output() modify = new EventEmitter<UserFormData>();

  constructor() {}

  onModify(event: UserFormData){
    this.modify.emit(event);
  }

  onDelete(){
    this.delete.emit(this.user.id);
  }

  ngOnInit(): void {
  }
}

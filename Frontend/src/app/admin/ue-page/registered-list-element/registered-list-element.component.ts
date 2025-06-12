import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from "../../../class/user";

@Component({
  selector: 'app-registered-list-element',
  templateUrl: './registered-list-element.component.html',
  styleUrls: ['./registered-list-element.component.css']
})
export class RegisteredListElementComponent implements OnInit {

  @Input() registered!: User;

  @Output() delete = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  onDelete() {
    this.delete.emit(this.registered.id);
  }
}

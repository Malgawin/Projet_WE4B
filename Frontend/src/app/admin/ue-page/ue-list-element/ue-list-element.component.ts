import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Cours} from "../../../class/cours";

@Component({
  selector: 'app-ue-list-element',
  templateUrl: './ue-list-element.component.html',
  styleUrls: ['./ue-list-element.component.css']
})
export class UeListElementComponent implements OnInit {

  @Input() ue! : Cours;

  @Output() delete = new EventEmitter<number>();
  constructor() { }

  ngOnInit(): void {
  }

  onDelete(){
    this.delete.emit(this.ue.id);
  }
}

import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Cours} from "../../../class/cours";
import {UeFormData} from "../ue-page.component";

@Component({
  selector: 'app-ue-list-element',
  templateUrl: './ue-list-element.component.html',
  styleUrls: ['./ue-list-element.component.css']
})
export class UeListElementComponent implements OnInit {

  @Input() ue! : Cours;

  @Output() delete = new EventEmitter<number>();
  @Output() modify = new EventEmitter<UeFormData>();
  constructor() { }

  ngOnInit(): void {
  }

  onModify(event: UeFormData){
    this.modify.emit(event);
  }

  onDelete(){
    this.delete.emit(this.ue.id);
  }
}

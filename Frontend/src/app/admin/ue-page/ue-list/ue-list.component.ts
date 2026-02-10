import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Cours} from "../../../class/cours";
import {UeFormData} from "../ue-page.component";

@Component({
  selector: 'app-ue-list',
  templateUrl: './ue-list.component.html',
  styleUrls: ['./ue-list.component.css']
})
export class UeListComponent implements OnInit {

  @Input() ues!: Cours[];

  @Output() deleteCours = new EventEmitter<number>()
  @Output() modifyCours = new EventEmitter<[number,UeFormData]>()

  constructor() { }

  ngOnInit(): void {
  }

  handleDeletion(ueId: number) {
    this.deleteCours.emit(ueId);
  }

  handleModification(id:number, data: UeFormData) {
    this.modifyCours.emit([id, data]);
  }

}

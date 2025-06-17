import {Component, Input, OnInit} from '@angular/core';
import {Cours} from "../../../class/cours";

@Component({
  selector: 'app-ue-list',
  templateUrl: './ue-list.component.html',
  styleUrls: ['./ue-list.component.css']
})
export class UeListComponent implements OnInit {

  @Input() ues!: Cours[];

  constructor() { }

  ngOnInit(): void {
  }

  handleEvent(ueId: number) {
    if (confirm("Voulez-vous vraiment supprimer ce cours ?")){
      this.ues = this.ues.filter(ue => ue.id !== ueId);
    }
  }
}

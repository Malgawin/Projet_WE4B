import { Component, OnInit } from '@angular/core';
import {Cours} from "../../../class/cours";

@Component({
  selector: 'app-ue-list',
  templateUrl: './ue-list.component.html',
  styleUrls: ['./ue-list.component.css']
})
export class UeListComponent implements OnInit {

  ues: Cours[] = [new Cours(0, "WE4B", "Web appliqué", "Dev Angular", "", [])];

  constructor() { }

  ngOnInit(): void {
  }

  handleEvent(ueId: number) {
    //todo : suppression
  }
}

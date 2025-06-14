import { Component, OnInit } from '@angular/core';
import {Cours} from "../../class/cours";

export interface UeFormData {
  code: string;
  name: string;
  description: string;
}

@Component({
  selector: 'app-ue-page',
  templateUrl: './ue-page.component.html',
  styleUrls: ['./ue-page.component.css']
})
export class UePageComponent implements OnInit {

  ues: Cours[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  handleUeCreated(data: UeFormData) {
    const newId = this.ues.length > 0 ? Math.max(...this.ues.map(u => u.id)) + 1 : 0;
    this.ues.push(new Cours(newId, data.code, data.name, data.description, "")); // todo les images
  }
}

import { Component, OnInit, Input } from '@angular/core';
import { Cours } from '../../../class/cours';


@Component({
  selector: 'app-carte-cours-etendue',
  templateUrl: './carte-cours-etendue.component.html',
  styleUrls: ['./carte-cours-etendue.component.css']
})
export class CarteCoursEtendueComponent implements OnInit {

  @Input() cours!: Cours;

  constructor() { }

  ngOnInit(): void {
  }

  flipped: boolean = false;

  turnCard(): void {
    this.flipped = !this.flipped;
  }

}

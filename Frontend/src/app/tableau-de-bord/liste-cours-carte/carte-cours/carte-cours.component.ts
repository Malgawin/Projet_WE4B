import { Component, OnInit, Input } from '@angular/core';
import { Cours } from '../../../class/cours';

@Component({
  selector: 'app-carte-cours',
  templateUrl: './carte-cours.component.html',
  styleUrls: ['./carte-cours.component.css']
})
export class CarteCoursComponent implements OnInit {
  
  @Input() cours!: Cours;

  constructor() { }

  ngOnInit(): void {
  }

  flipped: boolean = false;

  turnCard(): void {
    this.flipped = !this.flipped;
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { Cours } from '../../class/cours';

@Component({
  selector: 'app-parametres-cours',
  templateUrl: './parametres-cours.component.html',
  styleUrls: ['./parametres-cours.component.css']
})
export class ParametresCoursComponent implements OnInit {

  @Input() cours!: Cours;

  constructor() { }

  ngOnInit(): void {
  }

}

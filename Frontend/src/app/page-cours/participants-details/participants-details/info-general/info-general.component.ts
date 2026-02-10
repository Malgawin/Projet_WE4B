import { Component, OnInit, Input } from '@angular/core';
import { Inscrit } from 'src/app/class/cours';


@Component({
  selector: 'app-info-general',
  templateUrl: './info-general.component.html',
  styleUrls: ['./info-general.component.css']
})
export class InfoGeneralComponent implements OnInit {

  @Input() inscrit!: Inscrit;

  constructor() { }

  ngOnInit(): void {
  }

}

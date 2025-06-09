import { Component, OnInit, Input } from '@angular/core';
import { Cours } from '../../../class/cours';
import { FilesService } from 'src/app/services/files.service';


@Component({
  selector: 'app-carte-cours-etendue',
  templateUrl: './carte-cours-etendue.component.html',
  styleUrls: ['./carte-cours-etendue.component.css']
})
export class CarteCoursEtendueComponent implements OnInit {

  @Input() cours!: Cours;

    constructor(private filesService: FilesService) { }

  ngOnInit(): void {
  }

  flipped: boolean = false;

  turnCard(): void {
    this.flipped = !this.flipped;
  }

  getImageUrl(): string {
    return this.filesService.getImage(this.cours.image);
  }

}

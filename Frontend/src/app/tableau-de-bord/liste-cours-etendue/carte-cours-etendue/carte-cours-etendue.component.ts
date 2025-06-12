import { Component, OnInit, Input } from '@angular/core';
import { Cours } from '../../../class/cours';
import { FilesService } from 'src/app/services/files.service';
import { Router } from '@angular/router';
import { CoursService } from 'src/app/services/cours.service';


@Component({
  selector: 'app-carte-cours-etendue',
  templateUrl: './carte-cours-etendue.component.html',
  styleUrls: ['./carte-cours-etendue.component.css']
})
export class CarteCoursEtendueComponent implements OnInit {

  @Input() cours!: Cours;

  nbInscrits: number = 0;
  flipped: boolean = false;

  progresion: number = 6;
  progresionObjectif: number = 14
  pourcentageProgesion: number = Math.floor((this.progresion / this.progresionObjectif) * 100)

  constructor(private filesService: FilesService, private coursService: CoursService, private router: Router) { }

  ngOnInit(): void {
    this.coursService.getInscrits(this.cours.id).subscribe(inscrits => {
      this.nbInscrits = inscrits.length;
      this.cours.inscrits = inscrits;
    });
  }

  
  turnCard(): void {
    this.flipped = !this.flipped;
  }

  getImageUrl(): string {
    return this.filesService.getImage(this.cours.image);
  }

  toCours(){
    this.router.navigate(['/cours', this.cours.id]);
  }

}

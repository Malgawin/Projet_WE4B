import { Component, OnInit, Input } from '@angular/core';
import { Cours, Inscrit } from '../../../class/cours';
import { FilesService } from 'src/app/services/files.service';
import { CoursService } from 'src/app/services/cours.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carte-cours',
  templateUrl: './carte-cours.component.html',
  styleUrls: ['./carte-cours.component.css']
})
export class CarteCoursComponent implements OnInit {
  
  @Input() cours!: Cours;
  nbInscrits: number = 0;

  constructor(private filesService: FilesService, private coursService: CoursService, private router: Router) { }

  ngOnInit(): void {
    this.coursService.getInscrits(this.cours.id).subscribe(inscrits => {
      this.nbInscrits = inscrits.length;
      this.cours.inscrits = inscrits;
    });
  }

  flipped: boolean = false;

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

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Cours } from '../../../class/cours';
import { FilesService } from 'src/app/services/files.service';
import { CoursService } from 'src/app/services/cours.service';
import { Router } from '@angular/router';
import { JournalLogsService } from 'src/app/services/journal-logs.service';
import { CourseLog } from 'src/app/class/journal_logs';
import { PostService } from 'src/app/services/post.service';



@Component({
  selector: 'app-carte-cours',
  templateUrl: './carte-cours.component.html',
  styleUrls: ['./carte-cours.component.css']
})
export class CarteCoursComponent implements OnInit {
  
  //demande le rafraichissement de la liste des cours
  @Output() refreshRequested = new EventEmitter<void>();

  @Input() cours!: Cours;
  @Input() isExtended: boolean = false; // Pour savoir si on est en mode carte étendue ou non

  nbInscrits: number = 0; // Nombre d'inscrits au cours de base 0
  flipped: boolean = false; // Pour gerer le retournement des cartes

  progresion: number = 0; // Progression de l'utilisateur dans le cours
  progresionObjectif: number = 0; // Objectif de progression (nombre de posts total dans le cours)
  pourcentageProgesion: number = 0; // Pourcentage de progression
  
  idLogin: number = 40;  // en antendant login 

  constructor(private filesService: FilesService, private postService: PostService, private coursService: CoursService, private router: Router, private journalService: JournalLogsService,) { }

  ngOnInit(): void {

    // Récupération du nombre d'inscrits au cours 
    this.coursService.getInscrits(this.cours.id).subscribe(inscrits => {
      this.nbInscrits = inscrits.length;
      this.cours.inscrits = inscrits;
    });

    // Récupération de la progression de l'utilisateur dans le cours
    this.journalService.getLogByUserId(this.idLogin).subscribe(log => {
      const courseLog = log.courses?.find((log: CourseLog) => log.courseId === this.cours.id);
      this.progresion = courseLog?.progressCount || 0;
      if(this.cours.nbPostsTotal) {
        this.progresionObjectif = this.cours.nbPostsTotal;
      }
      this.pourcentageProgesion = Math.floor((this.progresion / this.progresionObjectif) * 100);
    });

    // Récupération du nombre total de posts dans le cours
    this.postService.getNbPostsByCourseId(this.cours.id).subscribe(nbPosts => {
      this.cours.nbPostsTotal = nbPosts;      
    });
  }

  
  // Méthode pour retourner la carte
  turnCard(): void {
    this.flipped = !this.flipped;
  }

  // Méthode pour obtenir l'URL de l'image du cours
  getImageUrl(): string {
    return this.filesService.getImage(this.cours.image);
  }

  // Méthode pour naviguer vers la page du cours
  toCours(){
    this.router.navigate(['/cours', this.cours.id]);
  }

  // Méthode pour m'ettre en favoris un cours
  pinCours(event: Event): void {
    event.stopPropagation();
    // Appelle le service pour épingler/désépingler le cours pour l'utilisateur courant
    this.coursService.pinCours(this.idLogin, this.cours.id).subscribe(
      result => {
        //maj l'etat de l'épinglé du cours pour changer l'icone
        this.cours.isPinned = result.is_pinned;
        this.refreshRequested.emit(); // emet l'événement pour rafraîchir la liste des cours
      }
    );
  }

}

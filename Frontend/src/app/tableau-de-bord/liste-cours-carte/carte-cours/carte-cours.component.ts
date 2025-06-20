import { Component, OnInit, Input } from '@angular/core';
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
  
  @Input() cours!: Cours;
  @Input() isExtended: boolean = false;

  nbInscrits: number = 0;
  flipped: boolean = false;

  progresion: number = 0;
  progresionObjectif: number = 0;
  pourcentageProgesion: number = Math.floor((this.progresion / this.progresionObjectif) * 100)

  idLogin: number = 40;  // en antendant login 

  constructor(private filesService: FilesService, private postService: PostService, private coursService: CoursService, private router: Router, private journalService: JournalLogsService,) { }

  ngOnInit(): void {
    this.coursService.getInscrits(this.cours.id).subscribe(inscrits => {
      this.nbInscrits = inscrits.length;
      this.cours.inscrits = inscrits;
    });

    this.journalService.getLogByUserId(this.idLogin).subscribe(log => {
      const courseLog = log.courses?.find((log: CourseLog) => log.courseId === this.cours.id);
      this.progresion = courseLog?.progressCount || 0;
      if(this.cours.nbPostsTotal) {
        this.progresionObjectif = this.cours.nbPostsTotal;
      }
      this.pourcentageProgesion = Math.floor((this.progresion / this.progresionObjectif) * 100);
    });


     this.postService.getNbPostsByCourseId(this.cours.id).subscribe(nbPosts => {
      this.cours.nbPostsTotal = nbPosts;
      this.updateProgression();
    });
  }

    updateProgression() {
    this.journalService.getLogByUserId(this.idLogin).subscribe(log => {
      const courseLog = log.courses?.find((log: CourseLog) => log.courseId === this.cours.id);
      this.progresion = courseLog?.progressCount || 0;
      this.progresionObjectif = this.cours.nbPostsTotal || 0;
      this.pourcentageProgesion = this.progresionObjectif > 0
        ? Math.floor((this.progresion / this.progresionObjectif) * 100)
        : 0;
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

  pinCours(event: Event): void {
    event.stopPropagation();
    this.coursService.pinCours(this.idLogin, this.cours.id).subscribe(
      result => {
        this.cours.isPinned = result.is_pinned;
        window.location.reload();
      }
    );
  }

}

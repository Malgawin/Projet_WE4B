import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/class/cours';
import { JournalLogsService } from 'src/app/services/journal-logs.service';
import { ActivatedRoute } from '@angular/router';
import { CourseLog } from 'src/app/class/journal_logs';
import { UserAuthService } from 'src/app/services/user-auth.service';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input() post!: Post;
  courseId!: number;
  userId!: number;
  
  checkedPosts: number[] = []; // tableau pour stocker les IDs des posts checké
  
  constructor( private journalLogsService: JournalLogsService, private route: ActivatedRoute, private userAuthService: UserAuthService) { }

  ngOnInit(): void {

    this.userId = this.userAuthService.user?.id;

    this.courseId = Number(this.route.parent?.snapshot.paramMap.get('id')); // Récupération de l'ID du cours depuis les paramètres de la route

    //recuperation des log de l'user connecté pour initialiser la liste des posts validés
    this.journalLogsService.getLogByUserId(this.userId).subscribe(log => { 
      // Recherche du log spécifique au cours en fonction de l'ID du cours
      const courseLog = log.courses?.find((c: any) => c.courseId === this.courseId);
      // Initialisation de la liste des posts validés si elle existe, sinon un tableau vide
      this.checkedPosts = Array.isArray(courseLog?.checkedPosts) ? courseLog!.checkedPosts!.map(Number) : [];
    });
  }

  // Méthode pour marquer un post comme validé
  checkPost() {
    this.journalLogsService.updateCourseLog(this.userId, this.courseId, { //emet le log comme quoi l'utilisateur a validé le post
      activity: {
        type: 'check-post',
        postId: this.post.id
      }
    }).subscribe(() => {
      this.checkedPosts.push(this.post.id); // maj la liste local pour desactivé le bouton
    });
  }

  // Méthode pour vérifier si le post est déjà coché
  isChecked(): boolean {
    return this.checkedPosts.includes(this.post.id);
  }
}

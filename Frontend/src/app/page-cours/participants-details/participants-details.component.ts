import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Inscrit, Cours} from 'src/app/class/cours'
import { CoursService } from 'src/app/services/cours.service';
import { JournalLogsService } from 'src/app/services/journal-logs.service';
import {UserLog, CourseLog } from 'src/app/class/journal_logs'

@Component({
  selector: 'app-participants-details',
  templateUrl: './participants-details.component.html',
  styleUrls: ['./participants-details.component.css']
})
export class ParticipantsDetailsComponent implements OnInit {

  inscrit!: Inscrit;
  coursId!: number;
  
  userLog?: UserLog;
  courseLog?: CourseLog;

  constructor(  private router: Router, private activatedroute: ActivatedRoute, private coursService: CoursService, private journalLogsService: JournalLogsService) { }

  ngOnInit(): void {
    const coursId = Number(this.activatedroute.parent?.snapshot.paramMap.get('id'));
    this.coursId = coursId;

    const inscritId = Number(this.activatedroute.snapshot.paramMap.get('id'));
    this.coursService.getInscrits(coursId).subscribe(inscrits => {
      this.inscrit = inscrits.find(i => i.id === inscritId)!;
       if (this.inscrit) {
        this.journalLogsService.getLogByUserId(this.inscrit.id).subscribe( log => {
            this.userLog = log;
            if (log.courses) {
              this.courseLog = log.courses.find(c => c.courseId === this.coursId);
            }
        });
        }
    });
  }

  return() {
    this.router.navigate(['/cours', this.coursId, 'participants']);
  }

  DateToPhrase(dateStr?: string): string { //fonction pour passer d'une date a une phrase formater

    if (!dateStr) return '';
    const date = new Date(dateStr);

    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long', // jour de la semaine
      day: '2-digit',  // jour format : 00
      month: '2-digit', // mois : 00
      year: 'numeric',  // anne : 2000
      hour: '2-digit',  // heure : 00
      minute: '2-digit',// minute : 00
      hour12: false // format 24h 
    };

    const format = new Intl.DateTimeFormat('fr-FR', options);
    const split = format.formatToParts(date); 

    //on split la date pour recuper partie par partie 
    const jourSemaine = split.find(p => p.type === 'weekday')?.value || '';
    const day = split.find(p => p.type === 'day')?.value || '';
    const month = split.find(p => p.type === 'month')?.value || '';
    const year = split.find(p => p.type === 'year')?.value || '';
    const hour = split.find(p => p.type === 'hour')?.value || '';
    const minute = split.find(p => p.type === 'minute')?.value || '';

    return `${jourSemaine} ${day}/${month}/${year} à ${hour}h${minute}`;
  }

  //fonction pour recuper le temps ecouler formater depuis la date passer en parametre
  timePast( dateStr?: string | Date ): string { 
    if (!dateStr) return '';
    const now = new Date(); //date actuelle
    const past = new Date(dateStr); //date recuperer transformer en format date

    let diff = Math.floor((now.getTime() - past.getTime()) / 1000); //calcul de la diferance en seconde entre les 2 dates

    const days = Math.floor(diff / (3600 * 24));  //calcul du nombre de jour entier passer a partir des secondes  
    diff -= days * 3600 * 24;
    const hours = Math.floor(diff / 3600); //calcul du nombre d'heure entier passer 
    diff -= hours * 3600;
    const minutes = Math.floor(diff / 60); //calcul du nombre de seconde entier passer 

    let result = 'il y a ';
    if (days > 0) result += `${days}J `;
    if (hours > 0) result += `${hours}h `;
    if (minutes > 0) result += `${minutes}min`;

    if (result === 'il y a ') result += '0min';

    return result.trim();
  }


  getActivityByType(activity: any): string {
  switch (activity.type) {
    case 'create-forum':
      return 'a créé un forum';
    case 'forum-message':
      return 'a posté un message dans un forum';
    case 'forum-message-delete':
      return 'a suprimer un message dans un forum';
    case 'view':
      return 'a consulté ce cours';


      // a ajouter
    case 'devoir-rendu':
      return 'a rendu un devoir';
    case 'check-post':
      return 'a valide un post';
    case 'post':
      return 'a creer un post';
    default:
      return 'a fait quelque chose';
  }
}







}

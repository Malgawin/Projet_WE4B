import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ForumService} from '../../../services/forum.service';
import { UsersService } from '../../../services/users.service';
import { JournalLogsService } from '../../../services/journal-logs.service';
import { Forum } from '../../../class/forum'

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {

  nouveauMessage: string = ''; // nouveau message à envoyer
  @Input() idLogin!: number; // id de l'utilisateur connecté


  @Input() forum!: Forum; //recupere le forum selectioner dans le parent


  userNames: { [key: number]: string } = {}; // dictionnaire pour stocker les noms des utilisateurs par id


  constructor(private forumService: ForumService, private usersService: UsersService, private journalLogsService: JournalLogsService ) {}

  ngOnInit(): void {
    // recuperation des noms de tous les utilisateurs qui ont posté dans le forum
    if (this.forum && this.forum.messages) {
      const userIds = new Set<number>();
      this.forum.messages.forEach(msg => {
        if (msg.authorId) userIds.add(Number(msg.authorId));
      });
      userIds.forEach(userId => {
        this.usersService.getUserById(userId).subscribe(user => {
          this.userNames[userId] = `${user.name} ${user.familyName}`;
        });
      });
    }
  }
  
  // Méthode pour obtenir le nom de l'utilisateur à partir de son ID dans le dictionnaire
  getUserName(userId: number | string | undefined): string {
    if (!userId) return '';
    const id = Number(userId);
    return this.userNames[id] || '';
  }

  // Méthode pour envoyer un message dans le forum
  sendMessage() {

    //si message non vide et qu'un forum est selectionné
    if (!this.nouveauMessage.trim() || !this.forum) return;

    //appelle le service pour ajouter le message au forum
    this.forumService.addMessage(this.forum._id, this.nouveauMessage, this.idLogin).subscribe((msg) => {
      this.forum!.messages.push(msg); // ajoute le message a la liste des messages de l'instance du forum
      this.nouveauMessage = ''; // remet a vide le champ de saisie du message
      
      //si l'auteur pas encore present dans le dictionnaire, on le rajoute
      if (!this.userNames[Number(msg.authorId)]) {
        this.usersService.getUserById(Number(msg.authorId)).subscribe(user => {
          this.userNames[Number(msg.authorId)] = `${user.name} ${user.familyName}`;
        });
    }
    
    //emet un log pour indiquer que l'utilisateur a posté un message dans le forum
    this.journalLogsService.updateCourseLog(
      this.idLogin,
      this.forum.coursId,
      { activity: { type: "forum-message", forumId: this.forum._id, messageId: msg._id } }
    ).subscribe();
    });
    
  }

  // Méthode pour supprimer un message du forum
  dltMessage(forumId: string, messageId: string) {

    if (confirm('Voulez-vous vraiment supprimer ce message?')) {
      // Appel du service pour supprimer le message du forum
      this.forumService.deleteMessage(forumId, messageId).subscribe(
        () => {

          //maj de la liste de l'instance du forum des messages du forum pour supprimer le message, filtre creer le nouveau tableau sans le message supprimé
          this.forum.messages = this.forum.messages.filter(m => m._id !== messageId);

          // emet un log pour indiquer que l'utilisateur a supprimé un message dans le forum
          this.journalLogsService.updateCourseLog(
            this.idLogin,
            this.forum.coursId,
            { activity: { type: "forum-message-delete", forumId: forumId, messageId: messageId } }
          ).subscribe();
        }
        );
      }
  }

  // Méthode pour vérifier si l'utilisateur peut supprimer un message, si il c'est son message
  canDelete(authorId: string | number | undefined): boolean {
    return Number(authorId) === this.idLogin;
  }
}

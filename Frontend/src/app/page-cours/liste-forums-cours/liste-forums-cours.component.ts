import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ForumService } from '../../services/forum.service';
import { UsersService } from '../../services/users.service';
import { JournalLogsService } from '../../services/journal-logs.service';
import { Forum } from '../../class/forum'



@Component({
  selector: 'app-liste-forums-cours',
  templateUrl: './liste-forums-cours.component.html',
  styleUrls: ['./liste-forums-cours.component.css']
})
export class ForumCoursComponent implements OnInit {

  forums: Forum[] = []; // Liste des forums du cours
  selectedForum: Forum | null = null; // Forum sélectionné pour afficher ses posts : de base aucun
  selectedCoursId: number = 0; // ID du cours sélectionné 
  nouveauTitre: string = ''; // Titre du nouveau forum à ajouter
   
  constructor(private forumService: ForumService, private activatedroute: ActivatedRoute, private usersService: UsersService, private journalLogsService: JournalLogsService) {}

  idLogin: number = 40; // id temporaire
  userNames: { [key: number]: string } = {}; //dictionnaire pour stocker les noms des utilisateurs par ID
  
  ngOnInit(): void {
      // Récupération de l'ID du cours depuis l'URL
      const coursId = Number(this.activatedroute.parent?.snapshot.paramMap.get('id') || '0');
      
      if (coursId){

        this.selectedCoursId = coursId;
        // Récupération des forums du cours via son id
        this.forumService.getForumsByCours(coursId).subscribe(forum => {
          this.forums = forum
          //récupération des id des auteur des forums
          const userIds = new Set<number>(); // Set permet d'éviter les doublons
          this.forums.forEach(forum => {
            if (forum.authorId) userIds.add(Number(forum.authorId));
          });
          // Récupération des noms et prenom des utilisateurs par leurs IDs
          userIds.forEach(userId => {
            if (!this.userNames[userId]) {
              this.usersService.getUserById(userId).subscribe(user => {
                // Stockage du nom complet de l'utilisateur dans le dictionnaire
                this.userNames[userId] = `${user.name} ${user.familyName}`;
              });
            }
          });
        })
      }
  }

  // Méthode pour obtenir le nom de l'utilisateur à partir de son ID dans le dictionnaire
  getUserName(userId: number | string | undefined): string {
    if (!userId) return '';
    const id = Number(userId);
    return this.userNames[id] || '';
  }

  // Méthode pour sélectionner un forum et afficher ses posts
  selectForum(forum: Forum) {
    this.selectedForum = forum;
  }

  // Méthode pour revenir à la liste des forums dans le composant enfant
  backToList() {
    this.selectedForum = null;
  }


  addForum() {
    // recupere le titre du forum a créer 
    const titre = this.nouveauTitre.trim(); // trim pour enlever les espace
    
    //appelle du service pour ajouter un forum
    this.forumService.addForum(this.selectedCoursId, titre, this.idLogin).subscribe(
      forum => {
        // Ajout du forum à la liste des forums local
        this.forums.unshift(forum);
        // Réinitialisation du champ de saisie du titre
        this.nouveauTitre = '';

        //si le nom de l'auteur est pas encore dans le dictionnaire, on le récupère
        if (!this.userNames[forum.authorId]) {
          this.usersService.getUserById(forum.authorId).subscribe(user => {
            this.userNames[forum.authorId] = `${user.name} ${user.familyName}`;
          });
        }

        //emets un log de creeation de post
        this.journalLogsService.updateCourseLog(
          this.idLogin,
          this.selectedCoursId,
          { activity: { type: "create-forum", forumId: forum._id } }
        ).subscribe();
      }
    );
  }

  // Méthode pour supprimer un forum
  dltForum(forumId: string): void {
    if (confirm('Voulez-vous vraiment supprimer ce forum ?')) {
      // Appel du service pour supprimer le forum
      this.forumService.deleteForum(forumId).subscribe(
         () => {
          this.forums = this.forums.filter(f => f._id !== forumId);
        });
    }
  }

  
}
  

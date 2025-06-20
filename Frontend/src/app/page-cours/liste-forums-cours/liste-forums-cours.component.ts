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

  forums: Forum[] = [];
  selectedForum: Forum | null = null;
  selectedCoursId: number = 0;
  nouveauTitre: string = '';
  
  constructor(private forumService: ForumService, private activatedroute: ActivatedRoute, private usersService: UsersService, private journalLogsService: JournalLogsService) {}

  idLogin: number = 40; // id temporaire
  userNames: { [key: number]: string } = {};
  
  ngOnInit(): void {
      const coursId = Number(this.activatedroute.parent?.snapshot.paramMap.get('id') || '0');
      if (coursId){
        this.selectedCoursId = coursId;
        this.forumService.getForumsByCours(coursId).subscribe(forum => {
          this.forums = forum
          const userIds = new Set<number>();
          this.forums.forEach(forum => {
            if (forum.authorId) userIds.add(Number(forum.authorId));
          });
          userIds.forEach(userId => {
            if (!this.userNames[userId]) {
              this.usersService.getUserById(userId).subscribe(user => {
                this.userNames[userId] = `${user.name} ${user.familyName}`;
              });
            }
          });
        })
      }
  }

  getUserName(userId: number | string | undefined): string {
    if (!userId) return '';
    const id = Number(userId);
    return this.userNames[id] || '';
  }

  selectForum(forum: Forum) {
    this.selectedForum = forum;
  }

  backToList() {
    this.selectedForum = null;
  }


  addForum() {
    const titre = this.nouveauTitre.trim();
    this.forumService.addForum(this.selectedCoursId, titre, this.idLogin).subscribe(
      forum => {
        this.forums.unshift(forum);
        this.nouveauTitre = '';
        if (!this.userNames[forum.authorId]) {
        this.usersService.getUserById(forum.authorId).subscribe(user => {
          this.userNames[forum.authorId] = `${user.name} ${user.familyName}`;
        });
        }
        this.journalLogsService.updateCourseLog(
          this.idLogin,
          this.selectedCoursId,
          { activity: { type: "create-forum", forumId: forum._id } }
        ).subscribe();
      }
    );
  }

  dltForum(forumId: string): void {
    if (confirm('Voulez-vous vraiment supprimer ce forum ?')) {
      this.forumService.deleteForum(forumId).subscribe(
         () => {
          this.forums = this.forums.filter(f => f._id !== forumId);
        });
    }
  }

  















  

}
  
